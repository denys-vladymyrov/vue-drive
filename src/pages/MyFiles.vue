<script setup lang="ts">
import ActionBar from "../components/ActionBar.vue"
import FilesList from "@/components/files/FilesList.vue"
import SortToggler from "@/components/SortToggler.vue"
import SearchForm from "@/components/SearchForm.vue"
import filesApi from "../api/files"
import {reactive, ref, watchEffect} from "vue"

const files = ref([])
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

const handleSelectChange = (items: any) => {
  selectedItems.value = Array.from(items)
}

const fetchFiles = async (query: any) => {
  try {
    const { data } = await filesApi.index(query)
    return data
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

// watch(
//     () => query._order,
//     async () => {files.value = await fetchFiles(query)},
//     { immediate: true}
// )

watchEffect(async () => (files.value = await fetchFiles(query)))
</script>

<template>
  <div class="container py-3">
    <ActionBar :selected-count="selectedItems.length" @remove="handleRemove" />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files {{ selectedItems }}</h6>
      <SortToggler @sort-change="handleSortChange($event)" />
    </div>

    <teleport to="#searchForm">
      <SearchForm v-model="query.q"/>
    </teleport>

    <FilesList :files="files" @select-change="handleSelectChange($event)" />
    <app-toast :show="toast.show" :message="toast.message" type="success" position="bottom-left" @hide="toast.show = false" />
  </div>
</template>