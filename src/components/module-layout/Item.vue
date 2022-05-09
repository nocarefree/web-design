<template>
    <li v-if="!dragging" :class="['nav-item', props.selected?'selected':''] ">
        <div class="interior">
            <div class="primary-action">
                <q-btn flat :label="props.label" @click="$emit('selected', props.id)"></q-btn>
            </div>
            <div class="trailing-content">
                <button type="button"  @drag="onDrag" class="drag-handle" aria-pressed="true">
                    <i><svg viewBox="0 0 20 20"><path d="M7 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm6-8a2 2 0 1 0-.001-4.001 2 2 0 0 0 .001 4.001zm0 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001z"></path></svg>
                    </i>
                </button>
            </div>
            
        </div>
    </li>
    <li v-else class="_Ghost_1l4w6_793" style="transition: transform 150ms ease 0s; transform: translate3d(0px, 0px, 0px);"></li>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue'

const props = defineProps({
    id: { type: [String, Number], required: true },
    label: { type: String, required: true },
    svg: String,
    selected: { type: Boolean, default: false },
})


const emit = defineEmits(['selected'])

const dragging = ref(false);

const onDrag = ()=>{
    console.log(123);
    dragging.value = true;
}


</script>