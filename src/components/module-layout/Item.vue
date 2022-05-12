<template>
    <li class="nav-item" :id="props.id">
        <div :class="['interior', selected?'selected':''] ">
            <div v-if="blocks" :class="['disclosure',expanded?'expanded':'']">
                <q-btn flat dense class="disclosure-action" @click="expanded = !expanded">
                    <q-icon type="button"><svg viewBox="0 0 20 20"><path d="M13.098 8h-6.196c-.751 0-1.172.754-.708 1.268l3.098 3.432c.36.399 1.055.399 1.416 0l3.098-3.433c.464-.513.043-1.267-.708-1.267z"></path></svg></q-icon>
                </q-btn>
            </div>
            <div class="primary-action">
                <q-btn flat dense align="left" class="primary-button" @click="onSelected()" :label="props.label"></q-btn>
            </div>
            <div class="trailing-content" v-if="draggable">
                <div class="plain-action-wrapper">
                    <q-btn flat dense class="plain-action slim">
                        <q-icon><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M17.928 9.628c-.091-.229-2.317-5.628-7.928-5.628s-7.838 5.399-7.93 5.628a1.017 1.017 0 0 0 0 .744c.093.229 2.319 5.628 7.93 5.628s7.837-5.399 7.928-5.628a1.017 1.017 0 0 0 0-.744zm-7.928 4.372a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 .002 4.001 2 2 0 0 0-.003-4.001z"></path></svg></q-icon>
                    </q-btn>
                </div>
                <div class="drag-action-wrapper">
                    <q-btn flat dense class="drag-action">
                        <q-icon><svg viewBox="0 0 20 20"><path d="M7 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm6-8a2 2 0 1 0-.001-4.001 2 2 0 0 0 .001 4.001zm0 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001z"></path></svg></q-icon>
                    </q-btn>
                </div>
            </div>
        </div>
        <div v-if="blocks" class="collapsible" v-show="expanded">
            <SortList :items="blocks" draggable :parent-id="props.id" />
        </div>
    </li>
</template>

<script setup lang="ts">

import { ref, watch, inject } from 'vue'
import SortList from './SortList.vue'

const props = defineProps({
    id: { type: String, required: true },
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