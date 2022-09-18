<template>
    <teleport to="body" ref="elRef">
        <div ref="overlayRef" :class="[$style.PositionedOverlay, $style.Popover__PopoverOverlay, state.showing?$style['Popover__PopoverOverlay--open']:'']" :style="state.style">
            <div v-if="state.showing" :class="[$style['Popover'],state.above ? $style['Popover--positionedAbove'] :'']">
                <div :class="$style.Popover__FocusTracker"></div>
                <div p-color-scheme="light" style="color: var(--p-text);">
                    <div :class="$style.Popover__Wrapper">
                        <div ref="contentRef" :class="$style.Popover__Content">
                            <scroll :vertical-has-scrolling="state.hasScroll" vertical>
                                <template #default="slotData">
                                    <div :class="$style.Popover__Section" ref="sectionRef">
                                        <slot v-bind="slotData"></slot>
                                    </div>
                                </template>
                            </scroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">

import $style from '@/app.module.scss'
import { scroll as scrollObject, debounce } from 'quasar'
import { ref, onMounted, reactive, nextTick, watch } from 'vue'
import scroll from '../scroll/Index.vue'

const { getScrollbarWidth } = scrollObject

interface StateType {
    hasScroll: boolean,
    above : boolean,
    showing: boolean,
    style: any
}

const props  = defineProps(['position']);
const elRef = ref<HTMLElement>()
const overlayRef = ref<HTMLElement>()
const sectionRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const state  = reactive<StateType>({
    hasScroll: false,
    above: false,
    showing: false,
    style:{}
})

let step = 1e3 / 60;
let anchorEl:HTMLElement;


onMounted(()=>{
    anchorEl = elRef.value?.parentNode as HTMLElement;
    anchorEl.addEventListener('click', toggle)
})


const updatePosition = ()=>{

    if(!elRef.value?.parentNode){
        return void 0;
    }

    let innerHeight = window.innerHeight;
    let overlayEl = overlayRef.value as HTMLElement,
        contentEl = contentRef.value as HTMLElement,
        targetEl = elRef.value,
        { top: anchorTop, left: anchorLeft, right: anchorRight, bottom:anchorBottom} = anchorEl.getBoundingClientRect(),
        margin = getScrollbarWidth(),
        innerWidth = document.body.clientWidth,
        topBarEl = document.querySelector('[data-polaris-top-bar="true"]') as HTMLElement,
        topHeight = topBarEl?topBarEl.offsetHeight:0,
        P = overlayEl.firstElementChild && overlayEl.firstChild instanceof HTMLElement ? function(e) {
            const t = window.getComputedStyle(e);
            return {
                activator: parseFloat(t.marginTop || "0"),
                container: parseFloat(t.marginBottom || "0"),
                horizontal: parseFloat(t.marginLeft || "0")
            }
        }(overlayEl.firstElementChild) : {
                activator: 0,
                container: 0,
                horizontal: 0
            };

    if(!contentEl){
        return void 0 ; 
    }

    if(props.position == 'right'){
        state.style.left = Math.max(anchorLeft - ( contentEl.offsetWidth - anchorEl.offsetWidth ) , 0) + 'px';
    }else if(props.position == 'middle'){
        state.style.left = Math.max(anchorLeft - ( contentEl.offsetWidth - anchorEl.offsetWidth ) /2 , 0) + 'px';
    }else{
        state.style.left = anchorLeft + 'px';
    }

    state.above = Boolean((innerHeight - anchorBottom) < (anchorTop - topHeight))
    state.hasScroll = Boolean((innerHeight - anchorBottom) < (sectionRef.value?sectionRef.value.offsetHeight:0))
    state.style.top = (state.above ?  topHeight : anchorBottom) + 'px';

 
    contentEl.style.height = ((state.above?  (anchorTop - topHeight) : (innerHeight- anchorBottom) ) - P.activator - P.container) + 'px';
}

const clickOutside = (e:any)=>{
    let target = e.target,
        contentEl = contentRef.value as HTMLElement;

    if (
      (
        anchorEl === null
        || anchorEl.contains(target) === false
      )
      && (
        target === document.body
        || ( contentEl && contentEl.contains(target) === false
        )
      )
    ){
        hide(e);
    }
}

const show = (evt:any)=>{
    window.removeEventListener("resize", debounce(()=>{ updatePosition() }, step ));
    window.removeEventListener("scroll", debounce(()=>{ updatePosition() }, step ));
    document.removeEventListener('mousedown', show)   

    state.showing = true;
    state.style = {};
    nextTick(updatePosition)


    window.addEventListener("resize", debounce(()=>{ updatePosition() }, step ));   
    window.addEventListener("scroll", debounce(()=>{ updatePosition() }, step ));
    document.addEventListener('mousedown', clickOutside)  
}

const hide = (evt:any)=>{
    state.showing = false;
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", debounce(()=>{ updatePosition() }, step ));
    document.removeEventListener('mousedown', clickOutside)   
}


const toggle = (evt:any)=>{
    if (state.showing === true) {
      hide(evt)
    }else {
      show(evt)
    }
}

</script>
