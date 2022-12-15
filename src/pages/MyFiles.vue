<script setup lang="ts">
import ActionBar from "../components/ActionBar.vue"
import FilesList from "@/components/files/FilesList.vue";
import filesApi from "../api/files"
import {onMounted, ref} from "vue"

const files = ref([])

const fetchFiles = async () => {
  try {
    const { data } = await filesApi.index("http://localhost:3030/files")
    return data
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  files.value = await fetchFiles()
})
</script>

<template>
  <div class="container py-3">
    <ActionBar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <button class="rounded-button">
        <icon-arrow-up />
      </button>
    </div>

    <FilesList :files="files" />
  </div>
</template>