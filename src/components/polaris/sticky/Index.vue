<template>
    <div>
        <div ref="placeHolderNodeRef" style="padding-bottom: 0px;"></div>
        <div ref="stickyNodeRef" :style="stickyStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, nextTick, watch } from 'vue'
import { useSticky } from '@/utils/sticky-manager'

const props = defineProps<{
    boundingElement:HTMLElement | void
}>();
const emit = defineEmits(['stickyChange']);

const stickyNodeRef = ref<HTMLElement | null>(null);
const placeHolderNodeRef = ref<HTMLElement | null>(null);

const sticky = useSticky();
const isStick = ref(false);
const stickyStyle = ref({})

const handlePositioning = (e:boolean,s=0,o=0,t=0)=>{
    let n = isStick.value;
    (e && !n || !e && n) && (
        adjustPlaceHolderNode(e),
        isStick.value = !n,
        nextTick( ()=> { emit('stickyChange',!n), props.boundingElement?.toggleAttribute("data-sticky-active") } )
    );
    stickyStyle.value = e ? {
        position: "fixed",
        top: s + 'px',
        left: o+ 'px',
        width: t+ 'px'
    } : {};
}

const adjustPlaceHolderNode = (e:boolean)=>{
    placeHolderNodeRef.value && stickyNodeRef.value && (placeHolderNodeRef.value.style.paddingBottom = e ? `${stickyNodeRef.value.getBoundingClientRect().height}px` : "0px")
}

watch(props,()=>{
    if(stickyNodeRef.value && placeHolderNodeRef.value && props.boundingElement){
        sticky.unregisterStickyItem(stickyNodeRef.value)
        sticky.registerStickyItem({
            stickyNode: stickyNodeRef.value,
            placeHolderNode: placeHolderNodeRef.value,
            handlePositioning,
            offset: 0,
            boundingElement:props.boundingElement,
            disableWhenStacked: 0,
        })
    }
})

onUnmounted(()=>{
    if(stickyNodeRef.value){
        sticky.unregisterStickyItem(stickyNodeRef.value)
    }
})


</script>