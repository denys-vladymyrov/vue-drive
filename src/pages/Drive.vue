<template>
  <div class="container-fluid py-3">
    <div class="row">
      <div class="col-md-2">
        <SideBar />
      </div>
      <div class="col-md-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/SideBar.vue"

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
</script>