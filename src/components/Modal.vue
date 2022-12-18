<script setup lang="ts">
import {computed, onMounted, onUnmounted} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  large: {
    type: Boolean,
    default: false,
  },
  scrollable: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: false,
  },
})

const hide = () => {
  emit("hide");
}

const handleKeydown = (e: any) => {
  if (props.show && e.keyCode == 27) {
    hide();
  }
}

const modalClasses = computed(() => {
  return {
    "modal-dialog": true,
    "modal-lg": props.large,
    "modal-dialog-scrollable": props.scrollable,
  }
})

const emit = defineEmits(['hide'])

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
})

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
})

</script>

<template>
  <div v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div :class="modalClasses">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="emit('hide')"
              ></button>
            </div>
            <div class="modal-body">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>