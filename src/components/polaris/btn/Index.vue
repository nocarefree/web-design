<template>
    <button 
        ref="btnRef" @click.native="onClick" 
        :class="[
            $style['Button'],
            pressed!== false ? $style['Button--pressed'] : null,
            disabled!== false ? $style['Button--disabled'] : null,
            connectedDisclosure!== false ? $style['Button--connectedDisclosure'] : null,
            plain!== false ? $style['Button--plain'] : null,
            textAlignLeft!== false ? $style['Button--textAlignLeft'] : null,
            textAlignStart!== false ? $style['Button--textAlignStart'] : null,
            textAlignCenter!== false ? $style['Button--textAlignCenter'] : null,
            textAlignRight!== false ? $style['Button--textAlignRight'] : null,
            textAlignEnd!== false ? $style['Button--textAlignEnd'] : null,
            fullWidth!== false ? $style['Button--fullWidth'] : null,
            hidden!== false ? $style['Button--hidden'] : null,
            primary!== false ? $style['Button--primary'] : null,
            destructive!== false ? $style['Button--destructive'] : null,
            outline!== false ? $style['Button--outline'] : null,
            loading!== false ? $style['Button--loading'] : null,
            removeUnderline!== false ? $style['Button--removeUnderline'] : null,
            iconOnly!== false ? $style['Button--iconOnly'] : null,
            size == 'slim' ? $style['Button--sizeSlim'] : null,
            size == 'large' ? $style['Button--sizeLarge'] : null,
            monochrome!== false ? $style['Button--monochrome'] : null,
        ]" type="button" tabindex="0" :aria-label="label">
        <span :class="$style.Button__Content">
            <span v-if="icon" :class="$style.Button__Icon"><icon :svg-name="icon"></icon></span>
            <span v-if="iconOnly !== false" :class="$style.Button__Text">{{ label }}</span>
            <span v-if="disclosure !== false" :class="$style.Button__Icon"><icon svg-name="CaretDownMinor"></icon></span>
        </span>
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue'
import Icon from '../icon/Index.vue'

withDefaults(defineProps([
    'icon',
    'to',
    'iconOnly',
    'link',
    'label',
    'primary',
    'hidden',
    'fullWidth',
    'textAlignStart',
    'textAlignLeft',
    'textAlignCenter',
    'textAlignRight',
    'textAlignEnd',
    'monochrome',
    'connectedDisclosure',
    'plain',
    'hidden',
    'outline',
    'removeUnderline',
    'destructive',
    'size',
    'disabled',
    'loading',
    'pressed',
    'disclosure',
]),{
    pressed: false,
    disabled: false,
    connectedDisclosure: false,
    plain: false,
    textAlignLeft: false,
    textAlignStart: false,
    textAlignCenter: false,
    textAlignRight: false,
    textAlignEnd: false,
    fullWidth: false,
    hidden: false,
    primary: false,
    destructive: false,
    outline: false,
    loading: false,
    removeUnderline: false,
    iconOnly: false,
    size: 'medium',
    monochrome: false,
    disclosure: false,
})

const emit = defineEmits(['click'])

const btnRef = ref<HTMLElement |null>(null)

const onClick = (e:PointerEvent)=>{

    emit('click', btnRef.value)

    e.cancelable !== false && e.preventDefault()
    e.stopPropagation()
    btnRef.value?.blur();
}

</script>

<style module>
    
.Button {
    --pc-button-slim-min-height: var(--p-line-height-4);
    --pc-button-large-min-height: var(--p-line-height-7);
    --pc-button-vertical-padding: calc((var(--p-line-height-6) - var(--p-line-height-2) - var(--p-space-05))/2);
    --pc-button-slim-vertical-padding: calc((var(--pc-button-slim-min-height) - var(--p-line-height-2) - var(--p-space-05))/2);
    --pc-button-large-vertical-padding: calc((var(--pc-button-large-min-height) - var(--p-line-height-2) - var(--p-space-05))/2);
    --pc-button-spinner-size: 1.25rem;
    --pc-button-segment: 10;
    --pc-button-focused: 20;
    --pc-button-disclosure-icon-offset: -0.375rem;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    background: var(--p-surface);
    border: var(--p-border-width-1) solid var(--p-border-neutral-subdued);
    border-bottom-color: var(--p-border-shadow-subdued);
    border-radius: var(--p-border-radius-1);
    border-top-color: var(--p-border-subdued);
    box-shadow: var(--p-shadow-button);
    color: var(--p-text);
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    line-height: 1;
    margin: 0;
    min-height: var(--p-line-height-6);
    min-width: var(--p-line-height-6);
    padding: calc((var(--p-line-height-6) - var(--p-line-height-2) - var(--p-space-05))/2) var(--p-space-4);
    position: relative;
    text-align: center;
    text-decoration: none;
    -webkit-user-select: none;
    user-select: none
}

.Button svg {
    fill: var(--p-icon)
}

.Button:after {
    border-radius: calc(var(--p-border-radius-1) + .0625rem);
    bottom: calc(var(--p-border-width-1)*-1 - .0625rem);
    box-shadow: 0 0 0 calc(var(--p-border-width-1)*-1 - .0625rem) var(--p-focused);
    content: "";
    display: block;
    left: calc(var(--p-border-width-1)*-1 - .0625rem);
    pointer-events: none;
    position: absolute;
    right: calc(var(--p-border-width-1)*-1 - .0625rem);
    top: calc(var(--p-border-width-1)*-1 - .0625rem);
    transition: box-shadow var(--p-duration-100) var(--p-ease);
    z-index: 1
}

.Button:hover {
    background: var(--p-action-secondary-hovered);
    outline: var(--p-border-width-1) solid #0000
}

.Button:focus {
    box-shadow: var(--p-shadow-button);
    outline: 0
}

.Button:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.Button:active {
    background: var(--p-action-secondary-pressed);
    box-shadow: var(--p-shadow-button)
}

.Button:active:after {
    border: none;
    box-shadow: none
}

.Button.Button--pressed {
    background: var(--p-action-secondary-depressed);
    border-color: var(--p-border-depressed);
    box-shadow: var(--p-shadows-inset-button-pressed);
    color: var(--p-text-on-primary)
}

.Button.Button--pressed svg {
    fill: currentColor
}

@media (-ms-high-contrast:active) {
    .Button {
        border: var(--p-border-width-1) solid windowText
    }
}

.Button.Button--disabled {
    background: var(--p-surface-disabled);
    border-color: var(--p-border-disabled);
    box-shadow: none;
    color: var(--p-text-disabled);
    transition: none
}

.Button.Button--disabled svg {
    fill: var(--p-icon-disabled)
}

.Button.Button--connectedDisclosure {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    z-index: var(--pc-button-segment)
}

.Button.Button--connectedDisclosure:after {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0
}

.Button.Button--connectedDisclosure:focus {
    z-index: var(--pc-button-focused)
}

.Button__Content {
    align-items: center;
    display: flex;
    font-size: var(--p-font-size-4);
    font-weight: var(--p-font-weight-medium);
    justify-content: center;
    letter-spacing: normal;
    line-height: var(--p-line-height-1);
    min-height: .0625rem;
    min-width: .0625rem;
    position: relative;
    text-transform: none
}

@media (min-width: 40em) {
    .Button__Content {
        font-size:var(--p-font-size-3)
    }
}

.Button:not(.Button--plain) .Button__Content {
    width: 100%
}

.Button--textAlignLeft {
    justify-content: flex-start;
    text-align: left
}

.Button--textAlignLeft .Button__Content {
    justify-content: flex-start
}

.Button--textAlignStart {
    justify-content: flex-start;
    text-align: start
}

.Button--textAlignStart .Button__Content {
    justify-content: flex-start
}

.Button--textAlignCenter {
    justify-content: center;
    text-align: center
}

.Button--textAlignRight {
    justify-content: flex-end;
    text-align: right
}

.Button--textAlignRight .Button__Content {
    justify-content: flex-end
}

.Button--textAlignEnd {
    justify-content: flex-end;
    text-align: end
}

.Button--textAlignEnd .Button__Content {
    justify-content: flex-end
}

.Button__Icon {
    margin-left: calc((var(--p-space-1))*-1)
}

.Button__Icon:last-child {
    margin-left: var(--p-space-1);
    margin-right: var(--pc-button-disclosure-icon-offset)
}

.Button--fullWidth.Button--textAlignLeft .Button__Icon:last-child:not(:only-child) {
    margin-left: auto
}

.Button__Icon+:not(.Button__Icon) {
    margin-left: var(--p-space-1)
}

.Button--hidden {
    visibility: hidden
}

.Button__Spinner {
    left: 50%;
    margin-left: calc((var(--pc-button-spinner-size)/2)*-1);
    margin-top: calc((var(--pc-button-spinner-size)/2)*-1);
    position: absolute;
    top: 50%
}

.Button--destructive,.Button--primary {
    background: var(--pc-button-color);
    border-color: #0000;
    border-width: 0;
    box-shadow: var(--p-shadow-button),var(--p-shadows-inset-button);
    color: var(--pc-button-text);
    position: relative
}

.Button--destructive:after,.Button--primary:after {
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

.Button--destructive:hover,.Button--primary:hover {
    background: var(--pc-button-color-hover);
    border-color: #0000;
    color: var(--pc-button-text)
}

.Button--destructive:active,.Button--destructive:focus,.Button--primary:active,.Button--primary:focus {
    border-color: #0000;
    box-shadow: var(--p-shadow-button),var(--p-shadows-inset-button)
}

.Button--destructive:active,.Button--primary:active {
    background: var(--pc-button-color-active)
}

.Button--destructive.Button--pressed,.Button--primary.Button--pressed {
    background: var(--pc-button-color-depressed);
    border-color: #0000;
    box-shadow: var(--p-shadow-button),var(--p-shadows-inset-button);
    color: var(--pc-button-text)
}

.Button--destructive.Button--pressed:focus,.Button--destructive.Button--pressed:hover,.Button--primary.Button--pressed:focus,.Button--primary.Button--pressed:hover {
    background: var(--pc-button-color-depressed);
    box-shadow: var(--p-shadow-button),var(--p-shadows-inset-button)
}

.Button--destructive.Button--disabled,.Button--primary.Button--disabled {
    border-color: #0000;
    box-shadow: none;
    color: var(--p-text-disabled)
}

.Button--destructive.Button--disabled svg,.Button--primary.Button--disabled svg {
    fill: var(--p-icon-disabled)
}

.Button--primary {
    --pc-button-color: var(--p-action-primary);
    --pc-button-text: var(--p-text-on-primary);
    --pc-button-color-hover: var(--p-action-primary-hovered);
    --pc-button-color-active: var(--p-action-primary-pressed);
    --pc-button-color-depressed: var(--p-action-primary-depressed)
}

.Button--primary svg {
    fill: var(--p-icon-on-primary)
}

.Button--primary.Button--disabled {
    background: var(--p-action-primary-disabled)
}

.Button--destructive {
    --pc-button-color: var(--p-action-critical);
    --pc-button-text: var(--p-text-on-critical);
    --pc-button-color-hover: var(--p-action-critical-hovered);
    --pc-button-color-active: var(--p-action-critical-pressed);
    --pc-button-color-depressed: var(--p-action-critical-depressed)
}

.Button--destructive svg {
    fill: var(--p-icon-on-critical)
}

.Button--destructive.Button--disabled {
    background: var(--p-action-critical-disabled)
}

.Button--outline {
    background: #0000;
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none;
    color: var(--p-text);
    position: relative
}

.Button--outline:after {
    border-radius: calc(var(--p-border-radius-1) + .0625rem);
    bottom: -.125rem;
    box-shadow: 0 0 0 -.125rem var(--p-focused);
    content: "";
    display: block;
    left: -.125rem;
    pointer-events: none;
    position: absolute;
    right: -.125rem;
    top: -.125rem;
    transition: box-shadow var(--p-duration-100) var(--p-ease);
    z-index: 1
}

.Button--outline:hover {
    background: var(--p-surface-hovered)
}

.Button--outline:focus,.Button--outline:hover {
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none
}

.Button--outline:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.Button--outline:active {
    background: var(--p-surface-pressed);
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none
}

.Button--outline:active:after {
    box-shadow: none
}

.Button--outline.Button--pressed {
    background: var(--p-action-secondary-pressed);
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none;
    color: var(--pc-button-text)
}

.Button--outline.Button--disabled {
    border: var(--p-border-width-1) solid var(--p-border-disabled);
    color: var(--p-text-disabled)
}

.Button--outline.Button--destructive {
    background: #0000;
    border: var(--p-border-width-1) solid var(--p-border-critical);
    box-shadow: none;
    color: var(--p-interactive-critical)
}

.Button--outline.Button--destructive svg {
    fill: var(--p-icon-critical)
}

.Button--outline.Button--destructive:hover {
    background: var(--p-surface-critical-subdued);
    border: var(--p-border-width-1) solid var(--p-border-critical)
}

.Button--outline.Button--destructive:focus {
    border: var(--p-border-width-1) solid var(--p-border-critical)
}

.Button--outline.Button--destructive:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.Button--outline.Button--destructive:active {
    background: var(--p-surface-critical-subdued);
    border: var(--p-border-width-1) solid var(--p-border-critical)
}

.Button--outline.Button--destructive.Button--disabled {
    background: #0000;
    border: var(--p-border-width-1) solid var(--p-border-critical-disabled);
    color: var(--p-interactive-critical-disabled)
}

.Button--outline.Button--destructive.Button--pressed {
    background: var(--p-surface-critical-subdued);
    border: var(--p-border-width-1) solid var(--p-border-critical);
    color: var(--p-interactive-critical)
}

.Button--outline.Button--disabled {
    background: #0000;
    box-shadow: none
}

.Button--destructive.Button--outline {
    background: #0000;
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none;
    color: var(--p-text);
    position: relative
}

.Button--destructive.Button--outline:after {
    border-radius: calc(var(--p-border-radius-1) + .0625rem);
    bottom: -.125rem;
    box-shadow: 0 0 0 -.125rem var(--p-focused);
    content: "";
    display: block;
    left: -.125rem;
    pointer-events: none;
    position: absolute;
    right: -.125rem;
    top: -.125rem;
    transition: box-shadow var(--p-duration-100) var(--p-ease);
    z-index: 1
}

.Button--destructive.Button--outline:hover {
    background: var(--p-surface-hovered);
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none
}

.Button--destructive.Button--outline:focus {
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none
}

.Button--destructive.Button--outline:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.Button--destructive.Button--outline:active {
    background: var(--p-surface-pressed);
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none
}

.Button--destructive.Button--outline:active:after {
    box-shadow: none
}

.Button--destructive.Button--outline.Button--pressed {
    background: var(--p-action-secondary-pressed);
    border: var(--p-border-width-1) solid var(--p-border);
    box-shadow: none;
    color: var(--pc-button-text)
}

.Button--destructive.Button--outline.Button--disabled {
    background: #0000;
    border: var(--p-border-width-1) solid var(--p-border-disabled);
    box-shadow: none;
    color: var(--p-text-disabled)
}

.Button--destructive.Button--outline.Button--destructive {
    background: #0000;
    border: var(--p-border-width-1) solid var(--p-border-critical);
    box-shadow: none;
    color: var(--p-interactive-critical)
}

.Button--destructive.Button--outline.Button--destructive svg {
    fill: var(--p-icon-critical)
}

.Button--destructive.Button--outline.Button--destructive:hover {
    background: var(--p-surface-critical-subdued);
    border: var(--p-border-width-1) solid var(--p-border-critical)
}

.Button--destructive.Button--outline.Button--destructive:focus {
    border: var(--p-border-width-1) solid var(--p-border-critical)
}

.Button--destructive.Button--outline.Button--destructive:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.Button--destructive.Button--outline.Button--destructive:active {
    background: var(--p-surface-critical-subdued);
    border: var(--p-border-width-1) solid var(--p-border-critical)
}

.Button--destructive.Button--outline.Button--destructive.Button--disabled {
    background: #0000;
    border: var(--p-border-width-1) solid var(--p-border-critical-disabled);
    color: var(--p-interactive-critical-disabled)
}

.Button--destructive.Button--outline.Button--destructive.Button--pressed {
    background: var(--p-surface-critical-subdued);
    border: var(--p-border-width-1) solid var(--p-border-critical);
    color: var(--p-interactive-critical)
}

.Button--disabled {
    cursor: default;
    pointer-events: none
}

.Button--loading {
    position: relative
}

.Button--loading,.Button--loading.Button--disabled,.Button--loading:hover {
    color: #0000
}

.Button--loading.Button--disabled svg {
    fill: var(--p-icon-subdued)
}

.Button--plain {
    background: #0000;
    border: 0;
    box-shadow: none;
    color: var(--p-interactive);
    margin: calc(var(--pc-button-vertical-padding)*-1) calc(var(--p-space-2)*-1);
    padding-left: var(--p-space-2);
    padding-right: var(--p-space-2)
}

.Button--plain svg {
    fill: var(--p-interactive)
}

.Button--plain>.Button__Content {
    font-weight: var(--p-font-weight-regular);
    position: relative
}

.Button--plain>.Button__Content:after {
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

.Button--plain:focus:not(.Button--disabled),.Button--plain:hover {
    background: #0000;
    box-shadow: none;
    color: var(--p-interactive-hovered)
}

.Button--plain:focus:not(.Button--disabled) svg,.Button--plain:hover svg {
    fill: var(--p-interactive-hovered)
}

.Button--plain:focus:not(.Button--disabled):not(.Button--removeUnderline),.Button--plain:hover:not(.Button--removeUnderline) {
    text-decoration: underline
}

.Button--plain.Button--pressed,.Button--plain:active {
    background: #0000;
    box-shadow: none;
    color: var(--p-interactive-pressed)
}

.Button--plain.Button--pressed svg,.Button--plain:active svg {
    fill: var(--p-interactive-pressed)
}

@media (-ms-high-contrast:active) {
    .Button--plain.Button--pressed,.Button--plain:active {
        outline: none
    }
}

.Button--plain:focus:after {
    content: none
}

@media (-ms-high-contrast:active) {
    .Button--plain:focus {
        outline: none
    }

    .Button--plain:focus>.Button__Content {
        outline: var(--p-border-width-2) dotted
    }
}

.Button--plain:focus:not(:active)>.Button__Content:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.Button--plain.Button--pressed:not(.Button--iconOnly)>.Button__Content,.Button--plain:active:not(.Button--iconOnly)>.Button__Content {
    background: #0000;
    border-radius: var(--p-border-radius-base);
    margin: calc(var(--p-space-05)*-1) calc(var(--p-space-1)*-1);
    padding: var(--p-space-05) var(--p-space-1)
}

.Button--plain.Button--fullWidth {
    margin-left: 0;
    margin-right: 0
}

.Button--plain.Button--disabled {
    background: none;
    color: var(--p-text-disabled)
}

.Button--plain.Button--disabled.Button--loading {
    color: #0000
}

.Button--plain.Button--destructive {
    color: var(--p-interactive-critical)
}

.Button--plain.Button--destructive svg {
    fill: var(--p-interactive-critical)
}

.Button--plain.Button--destructive:hover {
    color: var(--p-interactive-critical-hovered)
}

.Button--plain.Button--destructive.Button--pressed,.Button--plain.Button--destructive:active {
    color: var(--p-interactive-critical-pressed)
}

.Button--plain.Button--destructive.Button--disabled {
    color: var(--p-interactive-critical-disabled)
}

.Button--plain.Button--sizeSlim {
    margin-bottom: calc(var(--pc-button-slim-vertical-padding)*-1);
    margin-top: calc(var(--pc-button-slim-vertical-padding)*-1)
}

.Button--plain.Button--sizeLarge {
    margin: calc(var(--pc-button-large-vertical-padding)*-1) calc(var(--p-space-5)*-1)
}

.Button--plain.Button--iconOnly {
    margin: calc((var(--p-line-height-6) - var(--p-icon-size-medium))*-.5)
}

.Button--plain.Button--iconOnly svg {
    fill: var(--p-icon)
}

.Button--plain.Button--iconOnly:hover svg {
    fill: var(--p-icon-hovered)
}

.Button--plain.Button--iconOnly.Button--pressed svg,.Button--plain.Button--iconOnly:active svg {
    fill: var(--p-icon-pressed)
}

.Button--plain.Button--iconOnly.Button--disabled svg {
    fill: var(--p-icon-disabled)
}

.Button--plain.Button--destructive.Button--iconOnly svg {
    fill: var(--p-action-critical)
}

.Button--plain.Button--destructive.Button--iconOnly:hover svg {
    fill: var(--p-action-critical-hovered)
}

.Button--plain.Button--destructive.Button--iconOnly.Button--pressed svg,.Button--plain.Button--destructive.Button--iconOnly:active svg {
    fill: var(--p-action-critical-pressed)
}

.Button--plain.Button--destructive.Button--iconOnly.Button--disabled svg {
    fill: var(--p-action-critical-disabled)
}

.Button--plain .Button__Icon {
    margin-left: 0;
    margin-right: 0
}

.Button--fullWidth {
    display: flex;
    width: 100%
}

.Button--iconOnly {
    padding-left: var(--p-space-2);
    padding-right: var(--p-space-2)
}

.Button--iconOnly.Button--sizeLarge {
    padding-left: var(--p-space-3);
    padding-right: var(--p-space-3)
}

.Button--iconOnly .Button__Icon:first-child {
    margin-left: 0
}

.Button--iconOnly .Button__Icon:last-child {
    margin-right: calc(var(--p-space-1)*-1)
}

.Button--iconOnly .Button__Icon:only-child {
    margin-right: 0
}

.Button--sizeSlim {
    min-height: var(--pc-button-slim-min-height);
    padding: var(--pc-button-slim-vertical-padding) var(--p-space-3)
}

.Button--sizeLarge {
    min-height: var(--pc-button-large-min-height);
    min-width: var(--pc-button-large-min-height);
    padding: var(--pc-button-large-vertical-padding) var(--p-space-6)
}

.Button--sizeLarge .Button__Content {
    font-size: var(--p-font-size-6);
    font-weight: var(--p-font-weight-medium);
    letter-spacing: normal;
    line-height: var(--p-line-height-2);
    text-transform: none
}

@media (min-width: 40em) {
    .Button--sizeLarge .Button__Content {
        font-size:var(--p-font-size-5)
    }
}

.Button--monochrome.Button--outline,.Button--monochrome.Button--plain {
    color: currentColor
}

.Button--monochrome.Button--outline svg,.Button--monochrome.Button--plain svg {
    fill: currentColor
}

.Button--monochrome.Button--outline:active,.Button--monochrome.Button--outline:focus,.Button--monochrome.Button--outline:hover,.Button--monochrome.Button--plain:active,.Button--monochrome.Button--plain:focus,.Button--monochrome.Button--plain:hover {
    color: currentColor
}

.Button--monochrome.Button--outline:active svg,.Button--monochrome.Button--outline:focus svg,.Button--monochrome.Button--outline:hover svg,.Button--monochrome.Button--plain:active svg,.Button--monochrome.Button--plain:focus svg,.Button--monochrome.Button--plain:hover svg {
    fill: currentColor
}

.Button--monochrome.Button--outline.Button--disabled,.Button--monochrome.Button--plain.Button--disabled {
    color: currentColor;
    opacity: .4
}

.Button--monochrome.Button--outline.Button--disabled svg,.Button--monochrome.Button--plain.Button--disabled svg {
    fill: currentColor
}

.Button--monochrome.Button--outline.Button--loading .Button__Text,.Button--monochrome.Button--plain.Button--loading .Button__Text {
    visibility: hidden
}

.Button--monochrome.Button--outline.Button--iconOnly svg,.Button--monochrome.Button--outline.Button--iconOnly.Button--disabled svg,.Button--monochrome.Button--outline.Button--iconOnly:active svg,.Button--monochrome.Button--outline.Button--iconOnly:focus svg,.Button--monochrome.Button--plain.Button--iconOnly svg,.Button--monochrome.Button--plain.Button--iconOnly.Button--disabled svg,.Button--monochrome.Button--plain.Button--iconOnly:active svg,.Button--monochrome.Button--plain.Button--iconOnly:focus svg {
    fill: currentColor
}

.Button--monochrome.Button--plain .Button__Text:not(.Button--removeUnderline) {
    text-decoration: underline
}

.Button--monochrome.Button--outline {
    border-color: currentColor;
    box-shadow: 0 0 0 var(--p-border-width-1) currentColor;
    position: relative
}

.Button--monochrome.Button--outline:after {
    border-radius: calc(var(--p-border-radius-1) + .0625rem);
    bottom: -.1875rem;
    box-shadow: 0 0 0 -.1875rem var(--p-focused);
    content: "";
    display: block;
    left: -.1875rem;
    pointer-events: none;
    position: absolute;
    right: -.1875rem;
    top: -.1875rem;
    transition: box-shadow var(--p-duration-100) var(--p-ease);
    z-index: 1
}

.Button--monochrome.Button--outline:before {
    background-color: currentColor;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0
}

.Button--monochrome.Button--outline.Button--pressed {
    background: #0000;
    box-shadow: none;
    color: currentColor
}

.Button--monochrome.Button--outline.Button--pressed:before {
    opacity: .2
}

.Button--monochrome.Button--outline:active,.Button--monochrome.Button--outline:focus,.Button--monochrome.Button--outline:hover {
    background-color: initial;
    border-color: currentColor
}

.Button--monochrome.Button--outline:active:before,.Button--monochrome.Button--outline:focus:before,.Button--monochrome.Button--outline:hover:before {
    opacity: .07
}

.Button--monochrome.Button--outline:focus {
    box-shadow: 0 0 0 var(--p-border-width-1) currentColor
}

.Button--monochrome.Button--outline:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: var(--p-border-width-1) solid #0000
}

.Button--monochrome.Button--outline:active:after {
    box-shadow: none
}

.Button--monochrome.Button--outline:active:before,.Button--monochrome.Button--outline:hover:before {
    opacity: .05
}

.Button__ConnectedDisclosureWrapper {
    display: flex
}

.Button__ConnectedDisclosure {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    height: 100%;
    margin-left: calc(var(--p-space-025)*-1);
    z-index: var(--pc-button-segment)
}

.Button__ConnectedDisclosure:active,.Button__ConnectedDisclosure:focus {
    z-index: var(--pc-button-focused)
}

.Button__ConnectedDisclosure.Button--destructive,.Button__ConnectedDisclosure.Button--primary {
    margin-left: var(--p-space-025)
}

.Button__ConnectedDisclosure.Button--destructive.Button--outline,.Button__ConnectedDisclosure.Button--primary.Button--outline {
    border-left: 0;
    margin-left: 0
}

.Button__ConnectedDisclosure:after {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0
}


[data-buttongroup-segmented=true] .Button,[data-buttongroup-segmented=true] .Button:after {
    border-radius: 0
}

[data-buttongroup-segmented=true]>:first-child .Button,[data-buttongroup-segmented=true]>:first-child .Button:after {
    border-radius: 0;
    border-bottom-left-radius: var(--p-border-radius-1);
    border-top-left-radius: var(--p-border-radius-1)
}

[data-buttongroup-segmented=true]>:last-child .Button,[data-buttongroup-segmented=true]>:last-child .Button:after {
    border-radius: 0;
    border-bottom-right-radius: var(--p-border-radius-1);
    border-top-right-radius: var(--p-border-radius-1)
}

[data-buttongroup-segmented=true]>:last-child:first-child .Button,[data-buttongroup-segmented=true]>:last-child:first-child .Button:after {
    border-radius: var(--p-border-radius-1)
}

[data-buttongroup-connected-top=true]>:first-child .Button,[data-buttongroup-connected-top=true]>:first-child .Button:after {
    border-top-left-radius: 0
}

[data-buttongroup-connected-top=true]>:last-child .Button,[data-buttongroup-connected-top=true]>:last-child .Button:after {
    border-top-right-radius: 0
}

[data-buttongroup-full-width=true] .Button {
    display: flex;
    width: 100%
}

</style>