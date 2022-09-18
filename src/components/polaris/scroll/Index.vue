<template>
    <div
        ref="scorllRef"
        :class="[
            $style.Popover__Pane,
            $style.Scrollable,
            vertical?$style['Scrollable--vertical']:'', 
            verticalHasScrolling?$style['Scrollable--verticalHasScrolling']:'',
            state.hasTopShadow?$style['Scrollable--hasTopShadow']:'', 
            state.hasBottomShadow?$style['Scrollable--hasBottomShadow']:'', 
        ]"
        data-polaris-scrollable="true">
        <slot :scrollRef="scorllRef"></slot>
        <q-scroll-observer debounce="50" :scroll-target="scorllRef" @scroll="onScrollShadow" />
    </div>
</template>

<script lang="ts" setup>
import $style from '@/app.module.scss'
import { ref, onMounted, reactive } from 'vue'

const props = defineProps({
    vertical: {
        type: Boolean,
        default : false,
    },
    verticalHasScrolling: {
        type: Boolean,
        default : false,
    },
})

const scorllRef = ref()

const state = reactive({
    hasTopShadow: false,
    hasBottomShadow:false
})

const onScrollShadow = (e:any)=>{
    if(props.verticalHasScrolling){

        state.hasTopShadow = Boolean(e.position?(e.position.top > 0): false)

        let height = 0;
        Array.from(scorllRef.value.children).map(e=>{
            height += (e as HTMLElement).offsetHeight;
        })

        state.hasBottomShadow = Boolean(
            ((e.position?e.position.top:0) + scorllRef.value.offsetHeight) < height
        );
            

    }
}


onMounted(()=>{
    setTimeout(() => {
        state.hasBottomShadow = scorllRef.value.scrollHeight > scorllRef.value.clientHeight    
    }, 100);
    
})




</script>