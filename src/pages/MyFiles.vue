<template>
  <div class="container py-3">
    <ActionBar
        :selected-count="selectedItems.length"
        @remove="handleRemove"
        @rename="showModal = true"
        @files-chosen="chosenFiles = $event"
    />

    <teleport to="#searchForm">
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
    <app-modal title="Rename" :show="showModal && selectedItems.length === 1" @hide="showModal = false">
      <RenameForm
          :data="selectedItems[0]"
          @close="showModal = false"
          @updated="handleFileUpdated"
          :submit="renameFile"
          v-if="isFile"
      />
      <RenameForm
          :data="selectedItems[0]"
          @close="showModal = false"
          @updated="handleFolderUpdated"
          :submit="renameFolder"
          v-else
      />
    </app-modal>

    <div >
      <UploaderPopup :files="chosenFiles" @upload-complete="handleUploadComplete" />
    </div>
  </div>
</template>


<script setup lang="ts">
import {reactive, ref, watchEffect, provide, onMounted, computed} from "vue"
import filesApi from "../api/files"
import foldersApi from "../api/folders"

import ActionBar from "../components/ActionBar.vue"
import FilesList from "@/components/files/FilesList.vue"
import FoldersList from "@/components/files/FoldersList.vue"
import SectionHeader from "@/components/files/SectionHeader.vue"
import SearchForm from "@/components/SearchForm.vue"
import RenameForm from "@/components/files/RenameForm.vue"
import DropZone from "@/components/uploader/file-chooser/DropZone.vue"
import UploaderPopup from "@/components/uploader/popup/UploaderPopup.vue"

  // variables

  const files = ref([])
  const folders = ref([])

  const query = reactive({
    _sort: "name",
    _order: "asc",
    q: "",
    folderId: 0
  })

  const selectedItems = ref([])
  const toast = reactive({
    show: false,
    message: ''
  })
  const showModal = ref(false)
  const chosenFiles = ref([])

  const renameFile = filesApi.update
  const renameFolder = foldersApi.update

  // methods

  const handleSelectChange = (items: any) => {
    selectedItems.value = Array.from(items)
  }

  provide('setSelectedItem', handleSelectChange)

  const getPath = (query: any) => {
    let folderPath = "folders"
    let filePath = "files"

    if (query.folderId > 0) {
      const basePath = `folders/${query.folderId}`
      folderPath = `${basePath}/${folderPath}`
      filePath = `${basePath}/${filePath}`
    }

    return { folderPath, filePath }
  }

  const fetchFoldersAndFiles = async (query: any) => {
    try {
      const { folderPath, filePath } = getPath(query)
      console.log("folderPath: " + folderPath)
      console.log("filePath: " + filePath)

      const { data: folders } = await foldersApi.index(query, folderPath)
      const { data: files } = await filesApi.index(query, filePath)
      return { folders, files }
    }
    catch (error) {
      console.error(error)
    }
  }

  const removeItem = async (item: any) => {
    try {
      const response = await filesApi.delete(item.id)
      if (response.status === 200 || response.status === 204) {
        const index = files.value.findIndex((file: any) => file.id === item.id)
        files.value.splice(index, 1)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleSortChange = (payload: any) => {
    query._sort = payload.column
    query._order = payload.order
  }

  const handleRemove = () => {
    if (confirm('Are you sure?')) {
      selectedItems.value.forEach(item => {
        removeItem(item)
      })
      selectedItems.value.splice(0)
      toast.show = true
      toast.message = 'selected item(s) successfully removed'
    }
  }

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
    query.folderId = folder.id
  }

  watchEffect(async () => {
    const response = await fetchFoldersAndFiles(query)
    files.value = response?.files
    folders.value = response?.folders
    history.pushState({}, "", `?${new URLSearchParams(query as any)}`)
  })

  onMounted(() => {
    window.onpopstate = () => {
      Object.assign(query, Object.fromEntries(new URLSearchParams(window.location.search)))
    }
  })

  const isFile = computed(() => selectedItems.value.length === 1 && (selectedItems.value[0] as any).mimeType)

</script>

