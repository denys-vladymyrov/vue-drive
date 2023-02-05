import { reactive } from "vue";

const selectedItems = reactive(new Set())

const useItemsSelection = (selected: any, emit: any) => {
    const selectOne = (item: any) => {
        selectedItems.clear()
        selectedItems.add(item)
        emit('select-change', selectedItems)
    }

    const selectMultiple = (item: any) => {
        if (selectedItems.has(item)) {
            selectedItems.delete(item)
        } else {
            selectedItems.add(item)
        }
        emit('select-change', selectedItems)
    }

    const clearSelected = () => {
        selectedItems.clear()
        emit('select-change', selectedItems)
    }

    const isSelected = (item: any) => selectedItems.has(item) || selected?.length && selected[0].id === item.id && selected[0].mimeType

    return {selectOne, selectMultiple, isSelected, clearSelected}
}

export default useItemsSelection;
