<script setup lang="ts">

import {reactive} from "vue";

const sort = reactive({
  column: "name",
  order: "asc"
})

const toggle = () => {
  sort.order = sort.order === 'asc' ? 'desc' : 'asc'
  emit('sort-change', sort)
}

/*
  emits
*/

const emit = defineEmits(['sort-change'])

</script>


<template>
  <button @click="toggle" class="rounded-button">
    <icon-arrow-up v-if="sort.order === 'asc'" />
    <icon-arrow-down v-else />
  </button>
</template>