<template>
    <li class="nav-item">
        <div :class="['interior', selected?'selected':''] ">
            <div v-if="blocks" :class="['disclosure',expanded?'expanded':'']">
                <button type="button" class="disclosure-action" @click="expanded = !expanded">
                    <i><svg viewBox="0 0 20 20"><path d="M13.098 8h-6.196c-.751 0-1.172.754-.708 1.268l3.098 3.432c.36.399 1.055.399 1.416 0l3.098-3.433c.464-.513.043-1.267-.708-1.267z"></path></svg></i>
                </button>
            </div>
            <div class="primary-action">
                <button class="primary-button" @click="onSelected()">
                    <span>{{ props.label }}</span>
                </button>
            </div>
            <div class="trailing-content" v-if="draggable">
                <button type="button" class="drag-handle" aria-pressed="true">
                    <i><svg viewBox="0 0 20 20"><path d="M7 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm6-8a2 2 0 1 0-.001-4.001 2 2 0 0 0 .001 4.001zm0 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001z"></path></svg>
                    </i>
                </button>
            </div>
        </div>
        <div v-if="blocks" class="collapsible" v-show="expanded">
            <SortList :items="blocks" draggable />
        </div>
    </li>
    <!-- <li class="nav-item-ghost" style="transition: transform 150ms ease 0s; transform: translate3d(0px, 0px, 0px);"></li> -->
</template>

<script setup lang="ts">

import { ref, watch, inject } from 'vue'
import SortList from './SortList.vue'

const props = defineProps({
    id: { type: [String, Number], required: true },
    label: { type: String, required: true },
    svg: String,
    blocks: { type: Array },
    draggable: { type: Boolean, default: false },
})


const dragging = ref(false);
const expanded = ref(false);
const selected = ref(false);

const onItemSelected = inject<Function>('onItemSelected',()=>{})

const onSelected = ()=>{
    onItemSelected((status : boolean)=>{
        selected.value = status;
    })
}





</script>