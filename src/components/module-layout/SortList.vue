<template>
    <ol class="sort-list" ref="draggerRef">
        <Item v-for="item in props.items" v-bind="item" :draggable="props.draggable"></Item>
    </ol>
</template>                        

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Item from './Item.vue'
import { Draggable, Plugins } from '@shopify/draggable'

interface Block {
    id: String | Number,
    type: String,
    json?: any,
    label?: String,
}

const draggerRef = ref(null)

const props = defineProps(
    ['items', 'draggable'],
)

if(props.draggable){
    onMounted(() => {
        const draggable = new Draggable(draggerRef.value, {
            draggable: 'drag-handle',
            mirror: {
                constrainDimensions: true,
                xAxis: false,
                appendTo: 'body'
            }
        });
    })
}



</script>