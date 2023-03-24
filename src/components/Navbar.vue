<template>
  <nav
      class="
      navbar navbar-light
      bg-white
      navbar-expand-lg
      border-bottom
      fixed-top
    "
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><strong>Vue</strong>Drive</a>
      <div id="search-form"></div>
      <div class="form-inline mt-2 mt-md-0">
        <template v-if="!loggedIn">
          <a href="#" class="btn btn-outline-secondary color-danger me-2">Login</a>
          <a href="#" class="btn btn-success me-2">Register</a>
        </template>
        <a href="#" v-else class="btn btn-outline-secondary color-danger">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { loggedIn } from "@/store"

console.log(loggedIn)

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
</script>