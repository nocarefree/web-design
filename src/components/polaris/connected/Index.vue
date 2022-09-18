<template>
    <div :class="$bannerStyle['Labelled--hidden']">
        <div :class="$bannerStyle.Labelled__LabelWrapper">
            <div :class="$bannerStyle.Label"><label id="PolarisTextField5Label" for="PolarisTextField5"
                    :class="$bannerStyle.Label__Text">{{ props.title }}</label></div>
        </div>
        <div :class="$bannerStyle.Connected">
            <div :class="[$bannerStyle.Connected__Item, $bannerStyle['Connected__Item--primary']]">
                <div :class="$bannerStyle.TextField">
                    <div :class="$bannerStyle.TextField__Prefix" id="PolarisTextField5-Prefix">
                        <icon svg-name="SearchMinor"></icon>
                    </div>
                    <input id="PolarisTextField5" :placeholder="props.title" autocomplete="off"
                        :class="[$bannerStyle.TextField__Input, props.modelValue?$bannerStyle['TextField__Input--hasClearButton']:'']"
                        type="text" v-model="props.modelValue">
                    <div :class="$bannerStyle.TextField__Backdrop"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from '../icon/Index.vue'
import $bannerStyle from '../banner/index.module.scss'

const props = defineProps(['title','modelValue'])

</script>