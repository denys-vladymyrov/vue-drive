<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
import {ref, watch} from "vue";

const q = ref("")

watch(q, () => { console.log(q) })

</script>

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
    <div class="container">
      <a class="navbar-brand" href="/"><strong>Vue</strong>Drive</a>
      <SearchForm v-model="q"/>
    </div>
  </nav>
</template>
