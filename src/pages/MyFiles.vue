<template>
  <div class="container">
    <ActionBar
        :selected-count="selectedItems.length"
        @remove="handleRemove"
        @rename="modal.rename = true"
        @files-chosen="chosenFiles = $event"
        @create-folder="modal.newFolder = true"
        @starred="addItemsToStarred"
    />

    <teleport to="#search-form">
      <SearchForm v-model="query.q"/>
    </teleport>

    <DropZone @files-dropped="chosenFiles = $event" :show-message="!files.length && !folders.length">
      <SectionHeader title="Folders" @sort-change="handleSortChange" v-if="folders.length" sort-toggler />
      <FoldersList
          :folders="folders"
          @select-change="handleSelectChange($event)"
          :selected="selectedItems"
          @double-click="handleDoubleClickFolder"
      />
      <SectionHeader title="Files" @sort-change="handleSortChange" v-if="files.length" :sort-toggler="!folders.length" />
      <FilesList :files="files" @select-change="handleSelectChange($event)" :selected="selectedItems"  />
    </DropZone>


    <app-toast :show="toast.show" :message="toast.message" type="success" position="bottom-left" @hide="toast.show = false" />
    <app-modal
        :title="modal.rename ? 'Rename' : 'New Folder'"
        :show="(modal.rename && selectedItems.length === 1) || modal.newFolder"
        @hide="modal.rename = false, modal.newFolder = false">
      <FolderNewForm
          v-if="modal.newFolder"
          @folder-created="handleFolderCreated"
          @close="modal.newFolder = false"
          :folder-id="query.folderId"
      />
      <RenameForm
          :data="selectedItems[0]"
          @close="modal.rename = false"
          @updated="handleFileUpdated"
          :submit="renameFile"
          v-else-if="modal.rename && isFile"
      />
      <RenameForm
          :data="selectedItems[0]"
          @close="modal.rename = false"
          @updated="handleFolderUpdated"
          :submit="renameFolder"
          v-else
      />
    </app-modal>

    <div >
      <UploaderPopup
          :files="chosenFiles"
          @upload-complete="handleUploadComplete"
          :folder-id="query.folderId"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref, watchEffect, provide, onMounted, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { addFileToStarred, addFoldersToStarred } from "@/api/starred"
import filesApi from "../api/files"
import foldersApi from "../api/folders"

import ActionBar from "../components/ActionBar.vue"
import FilesList from "@/components/files/FilesList.vue"
import FoldersList from "@/components/files/FoldersList.vue"
import SectionHeader from "@/components/files/SectionHeader.vue"
import SearchForm from "@/components/SearchForm.vue"
import RenameForm from "@/components/files/RenameForm.vue"
import FolderNewForm from "@/components/files/FolderNewForm.vue"
import DropZone from "@/components/uploader/file-chooser/DropZone.vue"
import UploaderPopup from "@/components/uploader/popup/UploaderPopup.vue"


  // variables

  const files = ref([])
  const folders = ref([])
  const folderId = ref(0)

  const query = reactive({
    _sort: "name",
    _order: "asc",
    q: ""
  })

  const selectedItems = ref([])
  const toast = reactive({
    show: false,
    message: ''
  })
  const modal = reactive({
    rename: false,
    newFolder: false
  })
  const chosenFiles = ref([])

  const route = useRoute()
  const router = useRouter()

  const renameFile = filesApi.update
  const renameFolder = foldersApi.update

  const isFile = computed(() => selectedItems.value.length === 1 && (selectedItems.value[0] as any).mimeType)

  // methods

  const handleSelectChange = (items: any) => {
    selectedItems.value = Array.from(items)
  }

  const handleFolderCreated = (folder: any) => {
    folders.value.push(folder as never)
    toast.message = `Folder ${folder.name} created`
    toast.show = true
  }

  provide('setSelectedItem', handleSelectChange)

  const getPath = (folderId: number) => {
    let folderPath = "folders"
    let filePath = "files"

    if (folderId > 0) {
      const basePath = `folders/${folderId}`
      folderPath = `${basePath}/${folderPath}`
      filePath = `${basePath}/${filePath}`
    }

    return { folderPath: `660/${folderPath}`, filePath: `660/${filePath}` }
  }

  const fetchFoldersAndFiles = async (folderId: number, query: any) => {
    try {
      const { folderPath, filePath } = getPath(folderId)
      const apiQuery = { ...query, folderId}

      const { data: folders } = await foldersApi.index(apiQuery, folderPath)
      const { data: files } = await filesApi.index(apiQuery, filePath)
      return { folders, files }
    }
    catch (error) {
      console.error(error)
    }
  }

  const removeItem = async (item: any, items: any, fn: Function) => {
    try {
      const response = await fn(item.id);
      if (response.status === 200 || response.status === 204) {
        const index = items.value.findIndex((i: any) => i.id === item.id);
        items.value.splice(index, 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortChange = (payload: any) => {
    query._sort = payload.column
    query._order = payload.order
  }

  const handleRemove = () => {
    if (confirm("Are you sure?")) {
      selectedItems.value.forEach((item: any) => {
        if (item.mimeType) {
          removeItem(item, files, filesApi.delete);
        } else {
          removeItem(item, folders, foldersApi.delete);
        }
      });
      selectedItems.value.splice(0);
      toast.show = true;
      toast.message = "Selected item(s) successfully removed";
    }
  };

  const handleRename = (items: any, newItem: any, entity: any) => {
    const oldItem: any = selectedItems.value[0]
    const index = items.value.findIndex((item: any) => item.id === newItem.id )
    items.value.splice(index, 1, newItem as never)
    toast.show = true
    toast.message = `${entity} "${oldItem.name}" renamed to "${newItem.name}"`
  }

  const handleFileUpdated = (file: any) => {
    handleRename(files, file, "File")
  }

  const handleFolderUpdated = (folder: any) => {
    handleRename(folders, folder, "Folder")
  }

  const handleUploadComplete = (item: never) => {
    files.value.push(item)
  }

  const handleDoubleClickFolder = (folder: any) => {
    router.push({ name: 'folders', params: { folderId: folder.id } })
  }

  watchEffect(async () => {
    folderId.value = +route.params.folderId || 0
    const response = await fetchFoldersAndFiles(folderId.value, query)
    files.value = response?.files
    folders.value = response?.folders
  })

  watch(query, (newQuery) => {
    router.push({ name: route.name!, query: newQuery })
  })

  const addToStarred = (items: any) => {
    items.forEach(async (item: any) => {
      if (item.mimeType) {
        addFileToStarred(item)
      }
      else {
        addFoldersToStarred(item)
      }
    })
  }

  const addItemsToStarred = () => {
    addToStarred(selectedItems.value)
    selectedItems.value.splice(0)
    toast.message = "Selected item(s) added to starred"
  }



</script>

