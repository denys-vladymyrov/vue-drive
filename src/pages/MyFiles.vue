<script setup lang="ts">
import ActionBar from "../components/ActionBar.vue"
import FilesList from "@/components/files/FilesList.vue"
import SortToggler from "@/components/SortToggler.vue"
import filesApi from "../api/files"
import {reactive, ref, watch} from "vue"

const files = ref([])
const query = reactive({
  _sort: "name",
  _order: "asc"
})

const fetchFiles = async (query: any) => {
  try {
    const { data } = await filesApi.index(query)
    return data
  }
  catch (error) {
    console.error(error)
  }
}
const handleSortChange = (payload: any) => {
  query._sort = payload.column
  query._order = payload.order
}

watch(
    () => query._order,
    async () => {files.value = await fetchFiles(query)},
    { immediate: true}
)
</script>

<template>
  <div class="container py-3">
    <ActionBar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <SortToggler @sort-change="handleSortChange($event)" />
    </div>

    <FilesList :files="files" />
  </div>
</template>