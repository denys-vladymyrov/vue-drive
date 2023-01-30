import {computed} from "vue";
import states from "@/components/uploader/states";

const useUploadStatistics = (items: any) => {
  const uploadingItemsCount = computed(() => {
    return items.value.filter((item: any) => item.state === states.WAITING || item.state === states.UPLOADING).length
  }).value

  const completeItemsCount = computed(() => {
    return items.value.filter((item: any) => item.state === states.COMPLETE).length
  }).value

  const failedItemsCount = computed(() => {
    return items.value.filter((item: any) => item.state === states.FAILED || item.state === states.CANCELED).length
  }).value

  const processingItems = computed(() => {
    return items.value.filter((item: any) => item.state !== states.CANCELED && item.state !== states.FAILED)
  })

  const processingItemsCount = processingItems.value.length

  const processingItemsProgress = processingItems.value.reduce((total: any, item: any) => total + item.progress, 0)

  return {uploadingItemsCount, completeItemsCount, failedItemsCount, processingItemsCount, processingItemsProgress}
}

export default useUploadStatistics