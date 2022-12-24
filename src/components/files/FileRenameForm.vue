<script setup lang="ts">
import {ref, nextTick} from "vue";
import filesApi from "../../api/files"

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
  file: {
    type: Object,
    required: true
  }
})

const name = ref(props.file.name)

const handleSubmit = async () => {
  try {
    const { data } = await filesApi.update({ ...props.file, name: name.value }, props.file.id)
    emit('file-updated', data)
    emit('close')
  }
  catch (error) {
    console.error(error)
  }
}

const emit = defineEmits(['file-updated', 'close'])

</script>


<template>
  <form @submit.prevent="handleSubmit">
    <input v-highlight type="text" class="form-control" v-model="name" />
    <div class="d-flex flex-row-reverse mt-3">
      <button class="btn btn-outline-secondary" @click.prevent="emit('close')">Cancel</button>
      <button class="btn btn-primary me-2" type="submit">OK</button>
    </div>
  </form>
</template>