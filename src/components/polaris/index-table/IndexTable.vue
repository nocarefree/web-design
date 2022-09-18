<template>
    <div :class="$style.IndexTable">
        <div v-if="loading" 
            :class="[
                $style.IndexTable__LoadingPanel, 
                $style['IndexTable__LoadingContainer--enter'],
                $style['IndexTable--loadingContainerEnterActive']
            ]">
            <div :class="$style['IndexTable__LoadingPanelRow']">
                <q-spinner color="primary" size="1em" />
                <span role="status"><span :class="$style.VisuallyHidden"></span></span>
                <span :class="$style.IndexTable__LoadingPanelText">正在加载 {{ title }}</span>
            </div>
        </div>
        <div v-if="itemCount == 0" :class="$style.IndexTable__EmptySearchResultWrapper">
            <slot name="empty-result"></slot>
        </div>
        <template v-else>
            <div v-if="stickyTable" :class="$style.IndexTable__StickyTable" role="presentation">
                <Sticky :boundingElement="table" @stickyChange="(n)=>{ isSticky = n }">
                    <div
                        v-if="selectAll !== false"
                        :class="[$style.IndexTable__StickyTableHeader, isSticky?$style['IndexTable__StickyTableHeader--isSticky']:null]">
                        <div :class="$style.IndexTable__StickyTableHeadings">
                            <div v-if="selectable" :class="[$style.IndexTable__TableHeading]">
                                <Stack>
                                    <div :class="$style.IndexTable__FirstStickyHeaderElement">
                                        <div :class="$style.IndexTable__ColumnHeaderCheckboxWrapper">
                                            <Checkbox v-model="selectAll" label="选择全部" label-hidden></Checkbox>
                                        </div>
                                    </div>
                                </Stack>
                            </div>
                            <div v-for="(column,index) in stickyColumns" :class="[$style.IndexTable__TableHeading]"
                                data-index-table-sticky-heading="true" :style="`min-width: ${column.offsetWidth}px;`">
                                <VisuallyHidden v-if="header[index].hidden">{{ header[index].title }}</VisuallyHidden>
                                <template v-else>{{ header[index].title }}</template>
                            </div>
                        </div>
                    </div>
                    <div v-else 
                        :class="[$style.IndexTable__BulkActionsWrapper, isSticky?$style['IndexTable__StickyTableHeader--isSticky']:null]">
                        <BulkActions :actions="actions"></BulkActions>
                    </div>
                </Sticky>
            </div>
            <div 
                :class="$style['IndexTable-ScrollContainer']" 
                ref="scrollContainer"
                @scroll="onScrollContainerScoll"
            >
                <table ref="table" :class="$style.IndexTable__Table">
                    <thead>
                        <tr>
                            <th v-if="selectable" 
                                :class="[$style.IndexTable__TableHeading,$style['IndexTable__TableHeading--first']]">
                                <div :class="$style.IndexTable__ColumnHeaderCheckboxWrapper">
                                    <Checkbox v-model="selectAll" label="选择全部" label-hidden></Checkbox>
                                </div>
                            </th>
                            <th v-for="(column,index) in header"
                                :ref="e=> { stickyColumns[index] = e }"
                                :class="[
                                    $style.IndexTable__TableHeading,
                                    selectable?null:(index==0?$style['IndexTable__TableHeading--first']:null),
                                    index==(selectable?0:1)?$style['IndexTable__TableHeading--second']:null,
                                    index==(header.length-1)?$style['IndexTable__TableHeading--last']:null,
                                ]"
                                data-index-table-heading="true">
                                <VisuallyHidden v-if="column.hidden == true">{{ column.title }}</VisuallyHidden>  
                                <template v-else>{{ column.title }}</template>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <slot></slot>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
    <div v-if="$slots.default">
        <div
            :class="[ 
                $style.IndexTable__ScrollBarContainer,// scrollCondensed.value == true ? $style['IndexTable--scrollBarContainerCondensed'] : null,
                scrollHidden == true ? $style['IndexTable--scrollBarContainerHidden']:null,
            ]"
            ref="scrollBarContainer"
        >
            <div 
                :class="$style.IndexTable__ScrollBar"
                ref="scrollBar"
                @scroll="onScrollbarScroll">
                <div :class="$style.IndexTable__ScrollBarContent"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, provide, computed, withDefaults } from 'vue'
import $style from './index.module.scss'
import VisuallyHidden from '../visually-hidden/index.jsx'
import Sticky from '../sticky/Index.vue'
import debounce from '@/utils/debounce'
import Checkbox from '../checkbox/Index.vue'
import { IndexTableKey } from './index'
import BulkActions from '../bulk-actions/Index.vue'
import type { BulkActionsType } from '../bulk-actions/Index.vue'

interface SelectorType{
    selected: boolean,
    id: any,
}


const { selectable } = withDefaults(defineProps<{
    title ?: string,
    itemCount ?: number,
    header: {
        title: string,
        hidden?: boolean,
    }[],
    selectable?: boolean,  
    loading?: boolean, 
    stickyTable?: boolean,
    actions : BulkActionsType[]
}>(),{ 
    stickyTable: true,  
    itemCount: 0,
    loading: false,
    selectable: true,
    actions: ()=>[],
})


const scrollHidden = ref(false);
const scrollContainer = ref<HTMLElement>();
const table = ref<HTMLElement>();
const scrollBarContainer = ref<HTMLElement>();
const scrollBar = ref<HTMLElement>();
const scrolling =ref(false);
const stickyColumns = ref<any[]>([]);
const selectors = ref<any[]>([]);
const isSticky = ref(false)


provide(IndexTableKey, {
    selectable,
    addSelector:(item:SelectorType)=>{
        selectors.value.push(item)
    },
    selectors,
});

const selectAll = computed({
    get: () => {
        let status:any;

        status = selectors.value.filter(i=> i.selected == true).length == 0? false: true;
        status = status? (selectors.value.filter(i=> i.selected == false).length == 0 ? true:  null ) :false;

        return status
    },
    set: (val) => {
        selectors.value.map(i=>{
            i.selected = val
        })
    }
})

const onScrollbarScroll = debounce(()=>{
    if(scrollContainer.value && scrollBar.value){
        scrollContainer.value.scrollLeft = scrollBar.value.scrollLeft;
        scrolling.value = scrollContainer.value.scrollLeft>0
    }
}, 40, {
    trailing: !0,
    leading: !0,
    maxWait: 40
});

const onScrollContainerScoll = debounce(()=>{
    if(scrollBar.value && scrollContainer.value){
        scrollBar.value.scrollLeft = scrollContainer.value.scrollLeft
        scrolling.value = scrollContainer.value.scrollLeft>0
    }
} , 40, {
    trailing: !0,
    leading: !0,
    maxWait: 40
});

const onCalScrollBarWith = ()=>{
    if(scrollBar.value && table.value && scrollBarContainer.value){
        let width = table.value.offsetWidth;

        scrollBar.value.style.setProperty("--pc-index-table-scroll-bar-content-width", width - 4 + "px")
        scrollHidden.value = scrollBarContainer.value.offsetWidth == width;
        setCheckboxOffset()
    }
}

const setCheckboxOffset = () =>{
    let e = 0;
    if(stickyColumns.value[0] && !scrollHidden){
        let node = stickyColumns.value[0],
            { width } = node.getBoundingClientRect();
            e = width
    }
    document.documentElement.style.setProperty("--pc-checkbox-offset", `${e}px`)
    stickyColumns.value[0]?stickyColumns.value[0].style.left = `${e}px`:null;
}


onUnmounted(()=>{
    window.removeEventListener('resize',onCalScrollBarWith)
})

onMounted(()=>{
    onCalScrollBarWith()
    window.addEventListener('resize', onCalScrollBarWith)
})

</script>