<template>
  <form @submit.prevent="handleSubmit">
    <input v-highlight type="text" class="form-control" v-model="name" />
    <div class="d-flex flex-row-reverse mt-3">
      <button class="btn btn-primary" type="submit">OK</button>
      <button class="btn btn-outline-secondary me-2" @click.prevent="emit('close')">Cancel</button>
    </div>
  </form>
</template>


<script setup lang="ts">
import {ref, nextTick} from "vue";

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
  data: {
    type: Object,
    required: true
  },
  submit: {
    type: Function,
    required: true
  }
})

const name = ref(props.data.name)

const handleSubmit = async () => {
  try {
    const { data } = await props.submit({ ...props.data, name: name.value }, props.data.id)
    emit('updated', data)
    emit('close')
  }
  catch (error) {
    console.error(error)
  }
}

const emit = defineEmits(['updated', 'close'])

</script>


