<template>
    <label 
        :class="[
            $style.Choice, 
            typeof labelHidden != 'undefined' labelHidden == false || ? $style['Choice--labelHidden'] : ''
        ]"
        :for="inputId">
        <span :class="$style.Choice__Control">
            <slot></slot>
            <span :class="$style.Checkbox" @mouseenter="isHover = true" @mouseleave="isHover = false">
                <input :id="inputId" type="checkbox" :class="$style.Checkbox__Input" aria-invalid="false"
                    role="checkbox" aria-checked="false" v-model="modelValue">
                <span :class="[$style.Checkbox__Backdrop, isHover ? $style['Checkbox--hover'] : '']"></span>
                <span :class="$style.Checkbox__Icon">
                    <icon svg-name="TickSmallMinor"></icon>
                </span>
            </span>
        </span>
        <span :class="$style.Choice__Label">{{ label }}</span>
    </label>
</template>

<script lang="ts" setup>
import Icon from '../icon/Index.vue';
import $style from './index.module.scss';
import { ref } from 'vue';
import { uid } from 'quasar';

const props = defineProps(['label', 'labelHidden','modelValue','id']);

const isHover = ref(false)
const inputId = props.id || uid();

</script>