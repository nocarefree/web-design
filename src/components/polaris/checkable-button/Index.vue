<template>
    <div :class="[
        $style.CheckableButton,
        selectMode?$style['CheckableButton__CheckableButton--selectMode']:null, 
        plain?$style['CheckableButton__CheckableButton--plain']:null,
        modelValue== true?$style['CheckableButton__CheckableButton--selected']:null
    ]">
        <div :class="$style.CheckableButton__Checkbox">
            <Checkbox :model-value="modelValue" @update:model-value="e=>$emit('update:modelValue', e)" :label="label" :disabled="disabled"></Checkbox>
        </div> 
    </div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue'
import Checkbox from "../checkbox/Index.vue";


withDefaults(defineProps(['modelValue','selectMode','plain','disabled','smallScreen','label']),{
    selectMode: false,
    plain:false,
    disabled:false
});

defineEmits(['update:modelValue','change'])

</script>

<style module>

.CheckableButton {
    align-items: center;
    background: var(--p-surface);
    border: var(--p-border-width-1) solid var(--p-border-neutral-subdued);
    border-bottom-color: var(--p-border-shadow-subdued);
    border-radius: var(--p-border-radius-1);
    border-top-color: var(--p-border-subdued);
    box-shadow: var(--p-shadow-button);
    cursor: pointer;
    display: flex;
    font-size: .9375rem;
    font-weight: var(--p-font-weight-medium);
    letter-spacing: normal;
    line-height: var(--p-font-line-height-1);
    line-height: 1;
    margin: 0;
    min-height: 2.25rem;
    min-width: 2.25rem;
    padding: calc((2.25rem - var(--p-font-line-height-2) - var(--p-space-05))/2) var(--p-space-4);
    text-align: left;
    text-decoration: none;
    text-transform: none;
    -webkit-user-select: none;
    user-select: none;
    width: 100%
}

@media (min-width: 48em) {
    .CheckableButton {
        font-size:var(--p-font-size-100)
    }
}

.CheckableButton svg {
    fill: var(--p-icon-on-interactive)
}

[data-buttongroup-segmented=true] .CheckableButton {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0
}

.CheckableButton:hover {
    background: var(--p-action-secondary-hovered)
}

.CheckableButton:active {
    background: var(--p-action-secondary-pressed)
}

.CheckableButton.CheckableButton__CheckableButton--measuring {
    font-size: .9375rem;
    font-weight: var(--p-font-weight-bold)
}

.CheckableButton.CheckableButton__CheckableButton--measuring:before {
    content: "";
    display: inline-block;
    width: .9375rem
}

@media (min-width: 30.625em) {
    .CheckableButton {
        flex:0 1 auto
    }
}

.CheckableButton:focus {
    outline: none
}

.CheckableButton.CheckableButton__CheckableButton--plain {
    background: #0000;
    border: none;
    border-radius: var(--p-border-radius-base);
    box-shadow: none
}

.CheckableButton.CheckableButton__CheckableButton--plain:hover {
    background: #0000
}

.CheckableButton.CheckableButton__CheckableButton--selectMode {
    color: var(--p-text-subdued);
    font-weight: var(--p-font-weight-medium)
}

.CheckableButton.CheckableButton__CheckableButton--selected {
    color: var(--p-text)
}

.CheckableButton__Checkbox {
    height: var(--p-choice-size);
    margin-left: calc(var(--p-space-2)*-1 - var(--p-control-border-width));
    pointer-events: none;
    width: var(--p-choice-size)
}

.CheckableButton__CheckableButton--selectMode .CheckableButton__Checkbox {
    margin-left: calc(var(--p-space-2)*-1 - var(--p-control-border-width) - var(--p-border-width-1))
}

.CheckableButton__Label {
    flex: 1 1;
    margin-left: calc(var(--p-space-5) - var(--p-control-border-width));
    max-width: 100%;
    overflow: hidden;
    padding: var(--p-space-025) 0;
    text-overflow: ellipsis;
    white-space: nowrap
}    
</style>