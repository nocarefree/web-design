<template>
    <fieldset class="n2R4Q MhG6u" v-draggable="{ handle:'.AlcTh' , onSorted:onSorted }" aria-invalid="false" ref="draggerWrapperRef">
        <legend class="Bsi15">列</legend>
        <li class="pl3Sf" v-for="column in columns">
            <div class="c4vwe">
                <choice :label="column.label"></choice>
            </div>
            <div class="AlcTh" role="button" 
                tabindex="0"
                aria-disabled="false"
                aria-roledescription="sortable"
                aria-describedby="DndDescribedBy-6">
                <icon svg-name="DragHandleMinor"></icon>
            </div>
        </li>
    </fieldset>
</template>

<script lang="ts" setup>
import Icon from '../icon/Index.vue';
import $style from './index.module.scss';
import { ref } from 'vue';
import { uid } from 'quasar';
import { draggable as vDraggable } from '@/directives/draggable'

const props = defineProps(['label', 'labelHidden','modelValue','id']);

const isHover = ref(false)
const inputId = props.id || uid();

</script>

<style>
</style>