<template>
  <form @submit.prevent="handleSubmit">
    <input v-highlight type="text" class="form-control" v-model="name" />
    <div class="d-flex flex-row-reverse mt-3">
      <button class="btn btn-primary" type="submit">Create</button>
      <button class="btn btn-outline-secondary me-2" @click.prevent="emit('close')">Cancel</button>
    </div>
  </form>
</template>


<script setup lang="ts">
import {ref, nextTick} from "vue"
import foldersApi from "../../api/folders"

const vHighlight = {
  mounted: async (el: any) => {
    await nextTick(() => {
      const selectionEnd = el.value.split(".").slice(0, -1).join(".").length
      el.setSelectionRange(0, selectionEnd)
      el.focus()
    })
  }
}

const props = defineProps({
  folderId: {
    type: [Number, String],
    default: 0
  }
})

const name = ref("Untitled Folder")

const handleSubmit = async () => {
  try {
    const { data } = await foldersApi.create({
      name: name.value,
      folderId: props.folderId
    })

    console.log(data)
    emit('folder-created', data)
    emit('close')
  }
  catch (error) {
    console.error(error)
  }
}

const emit = defineEmits(['folder-created', 'close'])

</script>


