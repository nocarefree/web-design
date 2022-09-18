<script lang="ts">
import {  computed, h, useCssModule } from 'vue';

export interface ActionItemType {
    label: string,
    onClick?: () => void,
}

export interface ActionListType {
    items: ActionItemType[]
    label ?: string, 
}

interface Props {
    items: ActionItemType[],
    sections: ActionListType[],
}


export default {
    props:['items','sections'],
    emits: ['action'],
    setup(props:Props,{ emit }:any){

        const $style = useCssModule();
        const items = computed(()=>{
            return props.items ? [ {items:props.items}, ...props.sections ] : props.sections;
        })

        const onClick = (item:ActionItemType)=>{
            item.onClick?.();
            emit('action')
        }


        const getSectionNode = (item:ActionListType)=>{

            let actionNodes:any[] = [];
            item.items.map(action=>{
                let buttonNode = h('button',{
                        class:$style.ActionList__Item,
                        type:"button",
                        onClick: ()=>onClick(action),
                    }, 
                    h('span', { class: $style.ActionList__Content},
                        h('span', { class: $style.ActionList__Text}, action.label)
                    )
                )
                actionNodes.push(h('li',null, buttonNode))
            })

            return h(
                'div',{ class: item.label ? null : $style['ActionList__Section--withoutTitle'] },
                h('ul', { class: $style.ActionList__Actions }, actionNodes)
            );
        }

        const getSectionsNodes = ()=>{
            let nodes:any = [];
            items.value.map((item:ActionListType)=>{

                let actionNodes = getSectionNode(item)

                nodes.push(
                    items.value.length > 1 ? 
                        h('li', { class: $style.ActionList__Section }, actionNodes) : 
                        h('div', { class: $style.ActionList }, actionNodes)
                )
            });
            return items.value.length > 1 ?  h('ul', { class: $style.ActionList } , nodes) : nodes;
        }

        return getSectionsNodes
        
    }
}

</script>

<style module>
.ActionList {
    list-style: none;
    margin: 0;
    outline: none;
    padding: 0
}

.ActionList__Section--withoutTitle:not(:first-child) {
    border-top: var(--p-border-divider)
}

.ActionList__Actions {
    border-top: var(--p-border-divider);
    list-style: none;
    margin: 0;
    outline: none;
    padding: var(--p-space-2)
}

.ActionList__Section:first-child>.ActionList__Section--withoutTitle .ActionList__Actions,
.ActionList>.ActionList__Section--withoutTitle .ActionList__Actions {
    border-top: none
}

.ActionList__Title {
    font-size: .8125rem;
    font-weight: var(--p-font-weight-semibold);
    line-height: var(--p-font-line-height-1);
    padding: var(--p-space-3) var(--p-space-4) var(--p-space-3) var(--p-space-4);
    text-transform: uppercase
}

@media (min-width: 48em) {
    .ActionList__Title {
        font-size: var(--p-font-size-75)
    }
}

.ActionList__Section:not(:first-child) .ActionList__Title {
    padding-top: var(--p-space-1)
}

.ActionList__Item {
    --pc-action-list-image-size: 1.25rem;
    --pc-action-list-item-min-height: var(--p-space-10);
    --pc-action-list-item-vertical-padding: calc((var(--pc-action-list-item-min-height) - var(--p-font-line-height-2))/2);
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    border-radius: var(--p-border-radius-1);
    border-top: var(--p-border-width-1) solid #0000;
    color: inherit;
    cursor: pointer;
    display: block;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    min-height: var(--pc-action-list-item-min-height);
    padding: 0;
    padding: var(--pc-action-list-item-vertical-padding) var(--p-space-2);
    position: relative;
    text-align: left;
    text-decoration: none;
    width: 100%
}

.ActionList__Item:focus {
    outline: none
}

.ActionList__Item:after {
    border-radius: calc(var(--p-border-radius-1) + .0625rem);
    bottom: -.0625rem;
    box-shadow: 0 0 0 -.0625rem var(--p-focused);
    content: "";
    display: block;
    left: -.0625rem;
    pointer-events: none;
    position: absolute;
    right: -.0625rem;
    top: -.0625rem;
    transition: box-shadow var(--p-duration-100) var(--p-ease);
    z-index: 1
}

@media (forced-colors:active) {
    .ActionList__Item {
        border: var(--p-border-width-1) solid #0000
    }
}

.ActionList__Item:hover {
    background-color: var(--p-surface-hovered);
    outline: var(--p-border-width-3) solid #0000;
    text-decoration: none
}

.ActionList__Item:active {
    background-color: var(--p-surface-pressed)
}

.ActionList__Item:active svg {
    fill: var(--p-interactive)
}

.ActionList__Item:focus:not(:active) {
    outline: var(--p-border-width-3) solid #0000
}

.ActionList__Item:focus:not(:active):after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.ActionList__Item:visited {
    color: inherit
}

.ActionList__Item.ActionList--active {
    background-color: var(--p-surface-selected)
}

.ActionList__Item.ActionList--active svg {
    fill: var(--p-interactive)
}

.ActionList__Item.ActionList--active:before {
    background-color: var(--p-interactive);
    border-bottom-right-radius: var(--p-border-radius-1);
    border-top-right-radius: var(--p-border-radius-1);
    content: "";
    display: block;
    height: 100%;
    left: calc(var(--p-space-2)*-1);
    position: absolute;
    top: 0;
    width: var(--p-border-width-3)
}

.ActionList__Item.ActionList--destructive {
    color: var(--p-interactive-critical)
}

.ActionList__Item.ActionList--destructive svg {
    fill: var(--p-icon-critical)
}

.ActionList__Item.ActionList--destructive:hover {
    background-color: var(--p-surface-critical-subdued-hovered)
}

.ActionList__Item.ActionList--destructive.ActionList--active,
.ActionList__Item.ActionList--destructive:active {
    background-color: var(--p-surface-critical-subdued-pressed)
}

.ActionList__Item.ActionList--disabled {
    background-image: none;
    color: var(--p-text-disabled)
}

.ActionList__Item.ActionList--disabled .ActionList__Prefix svg,
.ActionList__Item.ActionList--disabled .ActionList__Suffix svg {
    fill: var(--p-icon-disabled)
}

.ActionList__Content {
    align-items: center;
    display: flex
}

.ActionList__Prefix {
    align-items: center;
    background-position: 50%;
    background-size: cover;
    border-radius: var(--p-border-radius-base);
    display: flex;
    flex: 0 0 auto;
    height: var(--pc-action-list-image-size);
    justify-content: center;
    margin: calc(var(--pc-action-list-image-size)*-.5) var(--p-space-4) calc(var(--pc-action-list-image-size)*-.5) 0;
    width: var(--pc-action-list-image-size)
}

.ActionList__Prefix svg {
    fill: var(--p-icon)
}

.ActionList__Suffix {
    margin-left: var(--p-space-4)
}

.ActionList__Suffix svg {
    fill: var(--p-icon)
}

.ActionList__ContentBlockInner,
.ActionList__ContentBlock {
    display: block
}

.ActionList__Text {
    flex: 1 1 auto;
    max-width: 100%;
    min-width: 0
}
</style>