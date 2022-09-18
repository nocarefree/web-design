<template>
    <div>
        <div :class="[
            $style.BulkActions__Group,
            measuring ? $style['BulkActions__Group--measuring'] : null,
            entering ? $style['BulkActions__Group--entering'] : null,
            exiting ? $style['BulkActions__Group--exiting'] : null,
            entered ? $style['BulkActions__Group--entered'] : null,
            exited ? $style['BulkActions__Group--exited'] : null,
            smallScreen ? $style['BulkActions__Group--smallScreen'] : null,
            largeScreen ? $style['BulkActions__Group--largeScreen'] : null,
        ]"
        >
            <div :class="$style.BulkActions__ButtonGroupWrapper">
                <BtnGroup>
                    <Btn v-for="action in promotedActions.items" :label="action.label" @click="action.onClick?.()"></Btn>
                    <div>
                        <div>
                            <div :class="$style.BulkActions__BulkActionButton">
                                <Btn label="其他操作" disclosure>
                                    <PopupProxy position="middle">
                                        <fieldset class="n2R4Q MhG6u"></fieldset>
                                    </PopupProxy>
                                </Btn>
                            </div>
                        </div>
                    </div>
                </BtnGroup>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { withDefaults, computed } from 'vue';
    import BtnGroup from '../btn-group/Index.vue'
    import Btn from '../btn-group/Index.vue'
    import PopupProxy from '../popup-proxy/Index.vue'

    export interface BulkActionType{
        label: string,
        onClick?: ()=> void,
    }

    export interface BulkActionsType{
        items: BulkActionType[]
    }


    export interface Props {
        //style
        measuring : any,
        entering : any,
        exiting : any,
        entered : any,
        exited : any,
        smallScreen : any,
        largeScreen : any,

        actions : BulkActionsType[],
    }

    const props = withDefaults(defineProps<Props>(),{
        measuring : false,
        entering : false,
        exiting : false,
        entered : false,
        exited : false,
        smallScreen : false,
        largeScreen : false,

        //action
        actions : ()=>[],
    })

    const promotedActions = computed<BulkActionsType>(()=>{
        return props.actions[0] || []
    })

    const moreActions = computed<BulkActionsType[]>(()=>{
        return props.actions.length>1?props.actions.splice(0):[]
    })

    const d = {
            ButtonGroupWrapper: "Polaris-BulkActions__ButtonGroupWrapper_1qcgd",
            BulkActionButton: "Polaris-BulkActions__BulkActionButton_1njj8",
            CheckableContainer: "Polaris-BulkActions__CheckableContainer_3nw4p",
            disabled: "Polaris-BulkActions--disabled_hcuh9",
            PaginatedSelectAll: "Polaris-BulkActions__PaginatedSelectAll_1bm6b",
            Slide: "Polaris-BulkActions__Slide_2qcyk",
            "Slide-appear": "Polaris-BulkActions__Slide--appear_1w1pw",
            "Slide-enter": "Polaris-BulkActions__Slide--enter_1ljee",
            "Slide-exit": "Polaris-BulkActions__Slide--exit_i667h",
            "Slide-appearing": "Polaris-BulkActions__Slide--appearing_lp648",
            "Slide-entering": "Polaris-BulkActions__Slide--entering_2cgqp"
        }
</script>

<style module>
.BulkActions__Group {
    align-items: center;
    border: none;
    display: none;
    flex-wrap: wrap;
    font-size: var(--p-font-size-200);
    font-weight: var(--p-font-weight-regular);
    letter-spacing: normal;
    line-height: var(--p-font-line-height-3);
    opacity: 0;
    text-transform: none;
    width: 100%
}

@media (min-width: 48em) {
    .BulkActions__Group {
        font-size:var(--p-font-size-100)
    }
}

.BulkActions__Group.BulkActions__Group--measuring {
    display: flex;
    opacity: 0;
    transition: none
}

.BulkActions__Group--entering,.BulkActions__Group--exiting {
    display: flex;
    opacity: 0
}

.BulkActions__Group--entered {
    display: flex;
    opacity: 1
}

.BulkActions__Group--exited {
    display: none;
    opacity: 0
}

@media (min-width: 30.625em) {
    .BulkActions__Group--smallScreen {
        display:none
    }
}

.BulkActions__Group--largeScreen {
    display: none
}

@media (min-width: 30.625em) {
    .BulkActions__Group--largeScreen {
        display:flex
    }

    .BulkActions__Group--largeScreen.BulkActions__Group--exiting {
        transition: none
    }

    .BulkActions__Group--largeScreen.BulkActions__Group--exited {
        display: none;
        opacity: 0
    }
}

.BulkActions__ButtonGroupWrapper {
    max-width: 100%;
    width: 100%
}

@media (max-width: 30.62187em) {
    .BulkActions__ButtonGroupWrapper>div>div:first-child {
        flex:1 1 auto
    }
}

@media (min-width: 30.625em) {
    .BulkActions__ButtonGroupWrapper {
        justify-content:flex-start;
        margin-right: var(--p-space-2);
        width: auto
    }
}

.BulkActions__Group--measuring .BulkActions__ButtonGroupWrapper {
    position: absolute;
    width: auto
}

.BulkActions__BulkActionButton {
    white-space: nowrap
}

.BulkActions__CheckableContainer {
    flex: 1 1
}

.BulkActions--disabled {
    background: var(--p-surface-disabled);
    border-color: var(--p-border-disabled);
    box-shadow: none;
    color: var(--p-text-disabled);
    cursor: default;
    pointer-events: none;
    transition: none
}

.BulkActions--disabled svg {
    fill: var(--p-icon-disabled)
}

.BulkActions__PaginatedSelectAll {
    padding: var(--p-space-1) var(--p-space-0)
}

.BulkActions__Slide {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateY(0);
    transition: transform var(--p-ease) var(--p-duration-200);
    will-change: transform
}

.BulkActions__Slide--appear,.BulkActions__Slide--enter,.BulkActions__Slide--exit {
    transform: translateX(calc(var(--p-space-10)*-1))
}

.BulkActions__Slide--appearing,.BulkActions__Slide--entering {
    transform: translateY(0)
}
</style>