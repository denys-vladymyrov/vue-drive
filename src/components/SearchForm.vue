<template>
  <form class="form-inline mt-2 mt-md-0">
    <input
        :value="modelValue"
        @keydown.enter.prevent="handleEnterKey"
        @keydown.esc.prevent="handleEscKey"
        class="form-control"
        type="text"
        placeholder="Search in Drive"
        aria-label="Search"
    />
  </form>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const handleEnterKey = (event: InputEvent) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

const handleEscKey = () => {
  emit('update:modelValue', "")
}

const emit = defineEmits(['update:modelValue'])

</script>

