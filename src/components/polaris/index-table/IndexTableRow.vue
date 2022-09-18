<template>
    <tr
        :class="[
            $style.IndexTable__TableRow,
            subdued !=null ? $style['IndexTable__TableRow--subdued'] : null,
            selector.selected != null ? $style['IndexTable__TableRow--selected'] : null,
            isHover ?  $style['IndexTable__TableRow--hover'] : null,
        ]"
        @mouseenter="()=> { isHover = true }"
        @mouseleave="()=> { isHover = false }"
    >
        <IndexTableCell v-if="tableInjecting.selectable" :class="$style['IndexTable__TableCell--first']">
            <div :class="$style['IndexTable-Checkbox__TableCellContentContainer']">
                <div :class="[
                    $style['IndexTable-Checkbox__Wrapper'],
                    $style['IndexTable-Checkbox--expanded']  
                ]">
                    <Checkbox :id="id" label="选择" label-hidden v-model="selector.selected"></Checkbox>
                </div>
            </div>
        </IndexTableCell>
        <slot></slot>
    </tr>
</template>

<script setup lang="ts">
    import { ref, inject, reactive } from 'vue'
    import { IndexTableKey } from './index'
    import IndexTableCell from './IndexTableCell.vue'
    import Checkbox from '../checkbox/Index.vue'
    import $style from './index.module.scss'

    const props = defineProps(['id','subdued','selected'])

    const isHover = ref(false)
    const selector = reactive({
        selected: props.selected? true: false,
        id: props.id
    })
    const tableInjecting = inject<any>(IndexTableKey, ()=>{
        throw new Error();
    })

    tableInjecting.addSelector(selector);

</script>

<style>

</style>