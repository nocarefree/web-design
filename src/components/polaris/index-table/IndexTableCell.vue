<template>
    <td
        :class="[
            $style.IndexTable__TableCell,
            flush ? $style['IndexTable__TableCell--flush'] : null  
        ]"
    >
        <slot></slot>
    </td>
</template>

<script setup lang="ts">
    import $style from './index.module.scss'
    defineProps(['flush'])

</script>

<style>

</style>