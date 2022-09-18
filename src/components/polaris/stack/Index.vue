<template>
    <div :class="[
        $style['Stack'], 
        // $style['Stack__Item'],
        noWrap !=null ? $style['Stack--noWrap']:'',
        spacingNone !=null ? $style['Stack--spacingNone']:'',
        spacingExtraTight !=null ? $style['Stack--spacingExtraTight']:'',
        spacingTight !=null ? $style['Stack--spacingTight']:'',
        spacingBaseTight !=null ? $style['Stack--spacingBaseTight']:'',
        spacingLoose !=null ? $style['Stack--spacingLoose']:'',
        spacingExtraLoose !=null ? $style['Stack--spacingExtraLoose']:'',
        distributionLeading !=null ? $style['Stack--distributionLeading']:'',
        distributionTrailing !=null ? $style['Stack--distributionTrailing']:'',
        distributionCenter !=null ? $style['Stack--distributionCenter']:'',
        distributionEqualSpacing !=null ? $style['Stack--distributionEqualSpacing']:'',
        distributionFill !=null ? $style['Stack--distributionFill']:'',
        distributionFillEvenly !=null ? $style['Stack--distributionFillEvenly']:'',
        alignmentLeading !=null ? $style['Stack--alignmentLeading']:'',
        alignmentTrailing !=null ? $style['Stack--alignmentTrailing']:'',
        alignmentCenter !=null ? $style['Stack--alignmentCenter']:'',
        alignmentFill !=null ? $style['Stack--alignmentFill']:'',
        alignmentBaseline !=null ? $style['Stack--alignmentBaseline']:'',
        vertical !=null ? $style['Stack--vertical']:'',
        // $style['Stack__Item--fill']
    ]">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';
import $style from '@/app.module.scss'

const props = defineProps([
    "noWrap",
    "spacingNone",
    "spacingExtraTight",
    "spacingTight",
    "spacingBaseTight",
    "spacingLoose",
    "spacingExtraLoose",
    "distributionLeading",
    "distributionTrailing",
    "distributionCenter",
    "distributionEqualSpacing",
    "distributionFill",
    "distributionFillEvenly",
    "alignmentLeading",
    "alignmentTrailing",
    "alignmentCenter",
    "alignmentFill",
    "alignmentBaseline",
    "vertical",
])



const slots = useSlots()

</script>