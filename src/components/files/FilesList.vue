<template>
  <div class="row" @click="clearSelected">
    <FileItem
        v-for="file in files"
        :file="file"
        :key="+file.id"
        @click.exact.stop="selectOne(file)"
        @click.ctrl.stop="selectMultiple(file)"
        :class="{ 'selected-file': isSelected(file) }"
    />
  </div>
</template>


<script setup lang="ts">
import FileItem from "@/components/files/FileItem.vue";
import useItemsSelection from "@/composable/items-selection";

const props = defineProps({
  files: {
    type: Array,
    required: true
  },
  selected: {
    type: Array,
    default: () => []
  }
})

const emitSelectChange = defineEmits(['select-change'])
const {selectOne, selectMultiple, isSelected, clearSelected} = useItemsSelection(props, emitSelectChange)
</script>