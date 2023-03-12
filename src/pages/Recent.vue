<template>
  <div class="container-fluid">
    <h5 class="pt-2 pb-3 border-bottom">Recent</h5>
    <div class="pt-2">
      <FilesList :files="files" />
    </div>
  </div>
</template>



<script setup lang="ts">
import  { recentFiles } from "@/api/recent"
import { ref, onMounted } from "vue"
import FilesList from "@/components/files/FilesList.vue"

  const files = ref([])

  const getRecentFiles = async () => {
    try {
      const { data } = await recentFiles()
      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  onMounted(async () => {
    files.value = await getRecentFiles()
  })


const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
</script>