<template>
  <div class="row" @click="clearSelected">
    <FolderItem
        v-for="folder in folders"
        :folder="folder"
        :key="`folder-${folder.id}`"
        @click.exact.stop="selectOne(folder)"
        @click.ctrl.stop="selectMultiple(folder)"
        @dblclick.stop="emits('double-click', folder)"
        :class="{ 'selected-folder': isSelected(folder) }"
    />
  </div>
</template>


<script setup lang="ts">
import useItemsSelection from "@/composable/items-selection";
import FolderItem from "@/components/files/FolderItem.vue";

const props = defineProps({
  folders: {
    type: Array,
    required: true
  },
  selected: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['select-change', 'double-click'])
const {selectOne, selectMultiple, isSelected, clearSelected} = useItemsSelection(props, emits)
</script>