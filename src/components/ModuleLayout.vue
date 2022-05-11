<template>
    <div class="layout-panel" >
        <div class="static-panel">
            <div class="wrapper">
                <div class="layout top-layout">
                    <div class="page-title">
                        <h1>{{ layout.label }}</h1>
                    </div>
                    <div style="padding-top: 0.25rem;width: 100%;">
                        <SortList :items="[props.layout.top]" />
                        <SortList :items="props.layout.items" draggable />
                        <SortList :items="[props.layout.bottom]" />
                    </div>
                </div>
                <div class="layout bottom-layout">
                    <div class="_ChildrenWrapper_b0jpb_1587">
                        <ul>
                            <Item v-bind="props.layout.common" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted , provide, reactive } from 'vue'

import Item from "./module-layout/Item.vue"
import SortList from "./module-layout/SortList.vue"



const dragRef = ref(null);
const selectedItem = ref<Function | null>(null)

const props = defineProps({
    layout: { type: Object,  required: true }
})


const onItemSelected:Function = (item: Function)=>{
    selectedItem.value? selectedItem.value(false) :'';
    selectedItem.value = item
    selectedItem.value(true)
}

provide('onItemSelected', onItemSelected);


</script>

<style lang="scss">
.layout-panel {
    position: relative;
    width: 18.75rem;
    height: 100%;

    .page-title{
        padding: 1rem 0.75rem 0.75rem 1.75rem;
        border-bottom: 1px solid var(--p-divider);

        h1{
            font-size: 1rem!important;
            font-weight: var(--p-font-weight-semibold);
            line-height: var(--p-line-height-3);
            margin: 0;
        }
    }
    .static-panel{
        z-index: 20;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        
    }
    .wrapper{
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #fff;
    }

    .layout{
        --osui_sidebar-action-offset: 0.25rem;
        display: flex;
        flex-direction: column;
        flex: 0 0 auto;

        .nav-item {
            --osui_nav-action-connected-button-width: 1.75rem;
            --osui_nav-action-connected-button-width-slim: 1.25rem;
            position: relative;
            flex: 1 1 auto;
            padding-left: 0.5rem;
            padding-right: 0.5rem;

            .nav-item{
                padding:0;
            }

            .interior{
                position: relative;
                display: grid;
                align-items: center;
                height: 2.25rem;

                .disclosure{
                    z-index: 3;
                    position: relative;
                    grid-area: 1/1;
                    justify-self: self-start;

                    >button{
                        -webkit-appearance: none;
                        appearance: none;
                        margin: 0;
                        padding: 0;
                        background: none;
                        border: none;
                        font-size: inherit;
                        line-height: inherit;
                        color: inherit;
                        cursor: pointer;
                        font-size: .9375rem;
                        font-weight: var(--p-font-weight-medium);
                        line-height: 1rem;
                        text-transform: none;
                        letter-spacing: normal;
                        min-width: 0;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        min-width: 2.25rem;
                        max-width: 100%;
                        min-height: 2.25rem;
                        border-radius: var(--p-border-radius-1);
                        line-height: 1;
                        text-decoration: none;
                        color: var(--p-text);
                        transition-property: color,background-color;
                        transition-duration: var(--p-duration-150);
                        transition-timing-function: var(--p-ease);
                        -webkit-tap-highlight-color: rgba(0,0,0,0);
                        outline: none;
                        position: relative;
                        display: flex;
                        background-color: initial;
                        min-width: auto;
                        width: 1.25rem;
                        min-height: auto;
                        height: 2.25rem;

                        &:hover{
                            color: var(--p-icon-hovered);
                            background-color: #e4e5e7;
                        }
                    }

                    &:not(.expanded) >button i {
                        transform: rotate(-90deg)
                    }
                }
                .primary-action{
                    min-width: 0;
                    max-width: 100%;
                    grid-area: 1/1;

                    >button{
                        font-size: .875rem;
                        -webkit-appearance: none;
                        appearance: none;
                        margin: 0;
                        padding: 0;
                        background: none;
                        border: none;
                        font-size: inherit;
                        line-height: inherit;
                        color: inherit;
                        cursor: pointer;
                        font-size: .9375rem;
                        font-weight: var(--p-font-weight-medium);
                        line-height: 1rem;
                        text-transform: none;
                        letter-spacing: normal;
                        min-width: 0;
                        display: inline-flex;
                        justify-content: center;
                        min-width: 2.25rem;
                        max-width: 100%;
                        min-height: 2.25rem;
                        border-radius: var(--p-border-radius-1);
                        line-height: 1;
                        text-decoration: none;
                        color: var(--p-text);
                        transition-property: color,background-color;
                        transition-duration: var(--p-duration-150);
                        transition-timing-function: var(--p-ease);
                        -webkit-tap-highlight-color: rgba(0,0,0,0);
                        outline: none;
                        position: relative;
                        display: flex;
                        background-color: initial;
                        min-width: auto;
                        width: 100%;
                        min-height: auto;
                        height: 2.25rem;
                        justify-content: left;
                        text-align: left;
                        z-index: 1;
                        gap: 0.5rem;
                        padding-left: 1.25rem;
                        background-color: var(--p-surface);
                        transition: background-color var(--p-duration-150) var(--p-ease);

                        &:hover{
                            color: var(--p-icon-hovered);
                            background-color: var(--p-surface-hovered);
                        }
                    }
                }

                .trailing-content{
                    z-index: 2;
                    position: relative;
                    display: flex;
                    align-items: center;
                    grid-area: 1/1;
                    justify-self: self-end;
                }

                .drag-action-wrapper, .plain-action-wrapper:not(.hidden){
                    opacity: 0;
                    transition: opacity var(--p-duration-100) var(--p-ease);
                }

                
                &.selected:before {
                    content: "";
                    background-color: var(--p-interactive);
                    position: absolute;
                    top: 0;
                    left: -0.5rem;
                    height: 100%;
                    display: block;
                    width: 0.1875rem;
                    border-top-right-radius: var(--p-border-radius-1);
                    border-bottom-right-radius: var(--p-border-radius-1);
                }

                &.selected .primary-action > button {
                    background-color: var(--p-surface-selected);
                }

                &:hover{
                    .drag-action-wrapper, .plain-action-wrapper:not(.hidden){
                        opacity: 1;
                    }
                }
            }

            

            .drag-action{
                font-size: .875rem;
                -webkit-appearance: none;
                appearance: none;
                margin: 0;
                padding: 0;
                background: none;
                border: none;
                font-size: inherit;
                line-height: inherit;
                color: inherit;
                cursor: pointer;
                font-size: .9375rem;
                font-weight: var(--p-font-weight-medium);
                line-height: 1rem;
                text-transform: none;
                letter-spacing: normal;
                min-width: 0;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 2.25rem;
                max-width: 100%;
                min-height: 2.25rem;
                border-radius: var(--p-border-radius-1);
                line-height: 1;
                text-decoration: none;
                color: var(--p-text);
                transition-property: color,background-color;
                transition-duration: var(--p-duration-150);
                transition-timing-function: var(--p-ease);
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                outline: none;
                position: relative;
                display: flex;
                background-color: initial;
                min-width: auto;
                width: 1.75rem;
                min-height: auto;
                height: 2.25rem;
                cursor: grab;
                touch-action: none;

                &:after{
                    content: "";
                    position: absolute;
                    z-index: 1;
                    top: -0.0625rem;
                    right: -0.0625rem;
                    bottom: -0.0625rem;
                    left: -0.0625rem;
                    display: block;
                    pointer-events: none;
                    box-shadow: 0 0 0 -0.0625rem var(--p-focused);
                    transition: box-shadow .1s var(--p-ease);
                    border-radius: calc(var(--p-border-radius-1) + 0.0625rem);
                }

                i{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 0 0 auto;
                    width: 0.75rem;
                    height: 0.75rem;
                }
            }

        }

        .nav-item-ghost{
            display: flex;
            align-items: center;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            height: 2.25rem;


            &:before {
                content: "";
                display: block;
                flex: 0 0 auto;
                margin-right: -.0625rem;
                width: .75rem;
                height: .75rem;
                border: .1875rem solid var(--p-interactive);
                border-radius: 50%
            }

            &:after {
                content: "";
                flex: 1 1 auto;
                height: .1875rem;
                background-color: var(--p-interactive);
                border-radius: .1875rem
            }
        }
    }

    .top-layout{
        flex: 1 1 auto;
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 1rem;

        .sort-list{
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            background-color: var(--p-surface);
        }
        .sort-list .sort-list{
            padding-left: 2.5rem;
            .primary-action > button{
                padding-left: 0.25rem;
            }

            .selected:before {
                content :none;
            }
        }

        .sort-list + .sort-list:before {
            content: "";
            margin: 0.25rem 1rem;
            height: 0.0625rem;
            background-color: var(--p-divider);
        }

    }

    .bottom-layout{
        border-top: 1px solid var(--p-divider);

        ul{
            list-style: none;
            padding: 0.5rem 0;
            margin: 0;
        }
    }

}


</style>