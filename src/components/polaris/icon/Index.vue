<template>
    <span :class="[
        $style.Icon, 
        applyColor!=null ? $style['Icon--applyColor'] : null,
        hasBackdrop!=null ? $style['Icon--hasBackdrop'] : null,
        colorBase!=null ? $style['Icon--colorBase'] : null,
        colorSubdued!=null ? $style['Icon--colorSubdued'] : null,
        colorCritical!=null ? $style['Icon--colorCritical'] : null,
        colorInteractive!=null ? $style['Icon--colorInteractive'] : null,
        colorWarning!=null ? $style['Icon--colorWarning'] : null,
        colorHighlight!=null ? $style['Icon--colorHighlight'] : null,
        colorSuccess!=null ? $style['Icon--colorSuccess'] : null,
        colorPrimary!=null ? $style['Icon--colorPrimary'] : null,
    ]">
        <VisuallyHidden></VisuallyHidden>
        <img v-if="$slots.default" :class="$style.Icon__Img" :src="`data:image/svg+xml;utf8,${$slots.default()}`" alt="" aria-hidden="true">
        <svg v-if="svgName !=null" :class="$style.Icon__Svg" aria-hidden="true">
            <use :xlink:href="`#${svgName}`" />
        </svg>
        <div v-if="placeholder !=null" :class="$style.Icon__Placeholder"></div>
    </span>
</template>

<script lang="ts" setup>
    import VisuallyHidden from '../visually-hidden/index.jsx'

    const props = defineProps([
        'svgName',
        'placeholder',
        'applyColor',
        'hasBackdrop',
        'colorBase',
        'colorSubdued',
        'colorCritical',
        'colorInteractive',
        'colorWarning',
        'colorHighlight',
        'colorSuccess',
        'colorPrimary',
	])
    
</script>

<style module>
.Icon {
    display: block;
    height: 1.25rem;
    margin: auto;
    max-height: 100%;
    max-width: 100%;
    width: 1.25rem
}

.Icon--applyColor {
    color: var(--p-surface)
}

.Icon--hasBackdrop {
    align-items: center;
    display: flex;
    margin: var(--p-space-1);
    position: relative
}

.Icon--hasBackdrop:before {
    border-radius: var(--p-border-radius-half);
    bottom: calc(var(--p-space-1)*-1);
    content: "";
    left: calc(var(--p-space-1)*-1);
    position: absolute;
    right: calc(var(--p-space-1)*-1);
    top: calc(var(--p-space-1)*-1)
}

.Icon--colorBase svg {
    fill: var(--p-icon)
}

.Icon--colorBase:before {
    background-color: var(--p-surface-neutral)
}

.Icon--colorSubdued svg {
    fill: var(--p-icon-subdued)
}

.Icon--colorCritical svg {
    fill: var(--p-icon-critical)
}

.Icon--colorCritical:before {
    background-color: var(--p-surface-critical)
}

.Icon--colorInteractive svg {
    fill: var(--p-interactive)
}

.Icon--colorWarning svg {
    fill: var(--p-icon-warning)
}

.Icon--colorWarning:before {
    background-color: var(--p-surface-warning)
}

.Icon--colorHighlight svg {
    fill: var(--p-icon-highlight)
}

.Icon--colorHighlight:before {
    background-color: var(--p-surface-highlight)
}

.Icon--colorSuccess svg {
    fill: var(--p-icon-success)
}

.Icon--colorSuccess:before {
    background-color: var(--p-surface-success)
}

.Icon--colorPrimary svg {
    fill: var(--p-action-primary)
}

.Icon__Img,.Icon__Svg {
    display: block;
    max-height: 100%;
    max-width: 100%;
    position: relative;
    width: 100%
}

.Icon__Placeholder {
    background: currentColor;
    padding-bottom: 100%
}    
</style>