<template>
    <ol class="sort-list">
        <Item v-for="item in props.items" v-bind="item" :draggable="props.draggable"></Item>
    </ol>
</template>                        

<script setup lang="ts">
import Item from './Item.vue'

interface Block{
    id: String | Number,
	type: String,
	json ?: any,
	label ?: String,
}


const props = defineProps(
    ['items', 'draggable'],
)

</script>