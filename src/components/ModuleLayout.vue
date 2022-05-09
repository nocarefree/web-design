<template>
    <div class="layout-panel" >
        <div class="static-panel">
            <div class="wrapper">
                <div class="layout top-layout">
                    <div class="page-title">
                        <h1>{{ layout.label }}</h1>
                    </div>
                    <div style="padding-top: 0.25rem;width: 100%;">
                        <ol ref="dragRef">
                            <Item v-bind="props.layout.top" />
                        <!-- </ol>
                        <ol>
                            <Item v-for="item in props.layout.items" v-bind="item" />
                        </ol>
                        <ol> -->
                            <Item v-bind="props.layout.bottom" />
                        </ol>
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

import { ref, onMounted } from 'vue'
import { Draggable,Plugins } from '@shopify/draggable'

import Item from "./module-layout/Item.vue"



const dragRef = ref(null);

const props = defineProps({
    layout: { type:Object,  required: true }
})

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
                }
                .primary-action{
                    min-width: 0;
                    max-width: 100%;
                    grid-area: 1/1;
                }
                .trailing-content{
                    z-index: 2;
                    position: relative;
                    display: flex;
                    align-items: center;
                    grid-area: 1/1;
                    justify-self: self-end;
                }
            }

            button{
                width: 100%!important;
            }

            .selected {
                &:before {
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
                button{
                    background-color: var(--p-surface-selected);
                }
            }

            .drag-handle{
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
                height: var(--osui_height-nav-action);
                cursor: grab;
                touch-action: none;

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
    }

    .top-layout{
        flex: 1 1 auto;
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 1rem;

        ol{
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            background-color: #fff;
        }
    }

    .bottom-layout{
        border-top: 1px solid var(-p-divider);

        ul{
            list-style: none;
            padding: 0.5rem 0;
            margin: 0;
        }
    }

}


</style>