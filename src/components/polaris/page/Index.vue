<template>
    <div :class="[$style.Page,$style['Page--fullWidth']]">
        <div
            :class="[$style['Page-Header'],$style['Page-Header--hasActionMenu'],$style['Page-Header--noBreadcrumbs'],$style['Page-Header--mediumTitle']]">
            <div :class="$style['Page-Header__Row']">
                <div :class="$style['Page-Header__TitleWrapper']">
                    <h1 :class="$style['Header-Title']">{{ props.title }}</h1>
                </div>
                <div v-if="slots.Action || slots.PrimaryAction" :class="$style['Page-Header__RightAlign']">
                    <div v-if="slots.Action" :class="$style.ActionMenu">
                        <div :class="$style['ActionMenu-Actions__ActionsLayout']">
                            <q-btn-group :class="[$style.ButtonGroup,$style['ButtonGroup--extraTight']]">
                                <slot name="Action"></slot>
                            </q-btn-group>
                        </div>
                    </div>
                    <div v-if="slots.PrimaryAction" :class="$style['Page-Header__PrimaryActionWrapper']">
                        <slot name="PrimaryAction"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>


<script lang="ts" setup>
import $style from './index.module.scss'
import { useSlots } from 'vue'

const props = defineProps(['title']);
const slots = useSlots();

</script>