<template>
    <page title="订单">
        <template #PrimaryAction>
            <btn to="/admin/draft_orders/new" label="创建订单" primary></btn>
        </template>

        <layout>
            <layout-section>
                <div class="bBxhM">
                    <div class="fI6F9">
                        <div>
                            <button class="dGGrI CB9aR y2XRD" type="button" aria-expanded="false"
                                aria-controls="Polarispopover15" tabindex="0" aria-owns="Polarispopover15"
                                aria-haspopup="listbox">
                                <div class="VDOzr">7 天<span class="igCrA">
                                        <icon svg-name="CaretDownMinor" apply-color color-base></icon>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="bSbNY">

                    </div>
                </div>
            </layout-section>

            <layout-section full-width>
                <q-card class="my-card">
                    <tabs :items="items" :current-index="currentIndex"></tabs>

                    <div class="_X7pX">
                        <div class="qZ6V1">
                            <div class="a2Rzg">
                                <Connected v-model="search" title="筛选订单"></Connected>
                            </div>

                            <btn-group segmented>
                                <btn label="筛选" icon="FilterMajor">
                                    <q-popup-proxy>
                                        <q-banner class="bg-brown text-white">
                                            <template v-slot:avatar>
                                                <q-icon name="signal_wifi_off" />
                                            </template>
                                            You have lost connection to the internet. This app is offline.
                                        </q-banner>
                                    </q-popup-proxy>
                                </btn>

                                <btn label="列" icon="ColumnMinor">
                                    <PopupProxy position="middle">
                                        <fieldset class="n2R4Q MhG6u" v-draggable="{ handle: '.AlcTh', onSorted: onSorted }"
                                            aria-invalid="false">
                                            <legend class="Bsi15">列</legend>
                                            <li class="pl3Sf" v-for="column in columns">
                                                <div class="c4vwe">
                                                    <Checkbox :label="column.label"></Checkbox>
                                                </div>
                                                <div class="AlcTh" role="button" tabindex="0" aria-disabled="false"
                                                    aria-roledescription="sortable" aria-describedby="DndDescribedBy-6">
                                                    <icon svg-name="DragHandleMinor"></icon>
                                                </div>
                                            </li>
                                        </fieldset>
                                    </PopupProxy>
                                </btn>
                                <btn label="排序" icon="SortMinor"></btn>
                            </btn-group>

                            <div class="amiPw">
                                <div class="CXyIe">
                                    <div>
                                        <div class="snr4Z">
                                            <btn icon="HorizontalDotsMinor" icon-only label="切换视图操作" @click="dataLoading = !dataLoading">
                                                <PopupProxy position="middle">
                                                    <ActionList :sections="[
                                                        { items: [
                                                            { label:'另存为' },
                                                            { label:'创建视图' },
                                                        ] }
                                                    ]"></ActionList>
                                                </PopupProxy>
                                            </btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <VisuallyHidden>
                            <div class="Whmur" aria-live="polite"></div>
                        </VisuallyHidden>
                    </div>
                    <div>
                        <IndexTable :header="header" :loading="dataLoading" title="订单" :item-count="orders.length" :actions="actions">
                            <template #empty-result>
                                <div class="uSTmD">
                                    <Stack vertical alignment-center>
                                        <Stack vertical alignment-center>
                                            <img alt="没有搜索结果"
                                                src="data:image/svg+xml,%3csvg width='60' height='60' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41.87 24a17.87 17.87 0 11-35.74 0 17.87 17.87 0 0135.74 0zm-3.15 18.96a24 24 0 114.24-4.24L59.04 54.8a3 3 0 11-4.24 4.24L38.72 42.96z' fill='%238C9196'/%3e%3c/svg%3e"
                                                draggable="false">
                                            <display-text size="small">未找到任何订单</display-text>
                                            <text-style subdued>
                                                <p>尝试更改筛选条件或搜索词。</p>
                                            </text-style>
                                        </Stack>
                                        <btn to="/admin/orders" primary label="查看所有订单"></btn>
                                    </Stack>
                                </div>
                            </template>
                            <IndexTableRow v-for="order in orders" :id="order.id">
                                <IndexTableCell v-for="item in columns">{{ order[item.field] }}</IndexTableCell>
                            </IndexTableRow>
                        </IndexTable>
                    </div>
                </q-card>
            </layout-section>

            <layout-section full-width>
                <footer-help>
                        详细了解<a
                            href="https://help.shopify.com/zh-CN/manual/orders?st_source=admin&amp;st_campaign=orders_footer&amp;utm_source=admin&amp;utm_campaign=orders_footer"
                            target="_blank" rel="noopener noreferrer" data-polaris-unstyled="true"
                            class="Polaris-Link_yj5sy">订单</a>
                </footer-help>
            </layout-section>
        </layout>
    </page>
</template>

<script lang="ts" setup>

import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { draggable as vDraggable } from '@/directives/draggable'

import Page from './page/Index.vue'
import Icon from './icon/Index.vue'
import Tabs from './tabs/Index.vue'
import Checkbox from './checkbox/index.jsx'
import Btn from './btn/index.jsx'
import BtnGroup from './btn-group/Index.vue'
import Connected from './connected/Index.vue'
import PopupProxy from './popup-proxy/Index.vue'
import {IndexTable , IndexTableRow , IndexTableCell} from './index-table/index.jsx'
import TextStyle from './text-style/index.jsx'
import DisplayText from './display-text/index.jsx'
import { Layout, LayoutSection } from './layout/index.jsx'
import VisuallyHidden from './visually-hidden/index.jsx'
import FooterHelp from './footer-help/index.jsx'
import Stack from './stack/index.jsx'
import ActionList from './action-list/Index.vue'


const route = useRoute();
const dataLoading = ref(true)
const search = ref('');
const items = ref([
    { id: 'all', link: { query: { inContextTimeframe: 'last_30_days' } }, text: '全部' },
    { id: 'b', link: { query: { inContextTimeframe: 'last_30_days', status: 'open', fulfillment_status: 'unshipped' } }, text: '未发货' },
    { id: 'c', link: { query: { inContextTimeframe: 'last_30_days', status: 'open', fulfillment_status: 'unpaid' } }, text: '未付款' },
    { id: 'd', link: { query: { inContextTimeframe: 'last_30_days', status: 'open' } }, text: '打开' },
    { id: 'e', link: { query: { inContextTimeframe: 'last_30_days', status: 'open', return_status: 'in_progress' } }, text: '测试' },
])
const conditionItems = [
    { name: 'f', label: '筛选', icon: "FilterMajor" },
    { name: 'c', label: '列', icon: "ColumnMinor" },
    { name: 's', label: '排序', icon: "SortMinor" },
];

//ORDER_DATE, CUSTOMER_NAME, CHANNEL, TOTAL_PRICE, FINANCIAL_STATUS, FULFILLMENT_STATUS, ITEM_COUNT, DELIVERY_METHOD, ORDER_TAGS, RETURN_STATUS

const visibleColumns = ref(['calories', 'desc', 'fat', 'carbs', 'protein', 'sodium', 'calcium', 'iron']);
const columns = ref([
    {
        name: 'ORDER_NUMBER',
        field: 'ORDER_NUMBER',
        label: '订单',
    },
    {
        name: 'ICON',
        field: 'ICON',
        label: '图片',
        headerHidden: true,
    },
    {
        name: 'ORDER_DATE',
        field: 'ORDER_DATE',
        label: '日期',
    },
    {
        name: 'CUSTOMER_NAME',
        field: 'CUSTOMER_NAME',
        label: '客户',
    },
    {
        name: 'CHANNEL',
        field: 'CHANNEL',
        label: '渠道',
    },
    {
        name: 'TOTAL_PRICE',
        field: 'TOTAL_PRICE',
        label: '总计',
    },
    {
        name: 'FINANCIAL_STATUS',
        field: 'FINANCIAL_STATUS',
        label: '付款状态',
    },
    {
        name: 'FULFILLMENT_STATUS',
        field: 'FULFILLMENT_STATUS',
        label: '发货状态',
    },
    {
        name: 'ITEM_COUNT',
        field: 'ITEM_COUNT',
        label: '商品',
    },
    {
        name: 'DELIVERY_METHOD',
        field: 'DELIVERY_METHOD',
        label: '配送方式',
    },
    {
        name: 'ORDER_TAGS',
        field: 'ORDER_TAGS',
        label: '标签',
    },
    {
        name: 'RETURN_STATUS',
        field: 'RETURN_STATUS',
        label: '退货状态',
    },
    {
        name: 'LABEL_STATUS',
        field: 'LABEL_STATUS',
        label: '标签状态',
    }
]);

const actions = [
    { 
        items: [
            { label: '标记为已发货', onClick:()=>{} },
            { label: '入账付款', onClick:()=>{} }
        ] 
    },
    { 
        items: [
            { label: '打印装箱单', onClick:()=>{} }
        ] 
    },
    { 
        items: [
            { label: '存档订单', onClick:()=>{} },
            { label: '取消存档订单', onClick:()=>{} }
        ] 
    },
    { 
        items: [
            { label: '添加标记', onClick:()=>{} },
            { label: '删除标记', onClick:()=>{} }
        ] 
    }
];

const header = computed(()=>{
    let h:any = [];

    columns.value.forEach(element => {
        h.push({
            title:element.label,
            hidden: element.headerHidden?true:false 
        })
    });
    
    return h;
})

const currentIndex = ref(0)
const orders = ref<any[]>([]);


const onSorted = (from: number, to: number) => {
    // let list = columns.value;
    // columns.value = Move(list, from, to);

    // console.log(columns.value)
}

const onUrlChange = () => {

    for (let i in items.value) {
        if (JSON.stringify(route.query) == JSON.stringify(items.value[i].link.query)) {
            currentIndex.value = parseInt(i);
        }
    }
}



watch(route, onUrlChange)
onUrlChange()

onMounted(()=>{
    setTimeout(()=>{
        dataLoading.value = false;

        let i = 0;
        for(;i<50;i++){
            orders.value.push({ 
                ORDER_NUMBER:i+1,  
                ICON: 123,
                ORDER_DATE:'2021-01', 
                CUSTOMER_NAME:'测试',
                CHANNEL:'online', 
                TOTAL_PRICE:'1000', 
                FINANCIAL_STATUS:'已发货', 
                FULFILLMENT_STATUS:'收货', 
                ITEM_COUNT:2, 
                DELIVERY_METHOD: 'EMS', 
                ORDER_TAGS:null,
                RETURN_STATUS:null
            })
        }
    }, 2000 )
    
})


</script>

<style>
[draggable="dragging"] * {
    cursor: default !important;
}

.UhZHS {
    grid-gap: .25rem .5rem;
    display: grid;
    grid-auto-columns: auto;
    grid-auto-rows: auto;
    max-width: calc(100% - 2rem);
    padding: .75rem 1rem;
    position: relative;
    width: 100%
}

.HmJUt {
    text-decoration: line-through
}

.x5z0b {
    color: var(--p-text-subdued);
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    line-height: var(--p-line-height-2)
}

@media (min-width: 40em) {
    .x5z0b {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.bXnyQ {
    color: var(--p-text, #006fbb);
    display: block;
    font-weight: var(--p-font-weight-semibold);
    height: 100%;
    padding: .5rem 1rem;
    position: relative;
    text-decoration: none
}

.bXnyQ:after {
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
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

.bXnyQ:active,
.bXnyQ:hover {
    text-decoration: none
}

.bXnyQ:focus:not(:active) {
    outline: none;
    text-decoration: none
}

.bXnyQ:focus:not(:active):after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.aLaWo {
    color: var(--p-text);
    color: var(--p-text-subdued);
    font-weight: var(--p-font-weight-regular)
}

.E1zDs {
    padding: 0
}

.k7pUa {
    width: 100%
}

.X4ao0 {
    display: flex
}

.HIBOI {
    text-decoration: line-through
}

.eL7FM {
    color: var(--p-text-subdued);
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    line-height: var(--p-line-height-2)
}

@media (min-width: 40em) {
    .eL7FM {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.BU9Uf {
    white-space: nowrap
}

.hCPvf {
    display: flex
}

._kGfw {
    color: var(--p-text-subdued);
    padding: 0 .25rem
}

.zmiZL:not(:first-child) {
    margin-left: .25rem
}

@media (min-width: 48em) {
    .zmiZL {
        height: 1rem;
        width: 1rem
    }
}

.adjyn {
    color: var(--p-icon, #919eab)
}

.adjyn:hover {
    color: var(--p-icon-hovered, #637381)
}

.blyYJ {
    display: flex
}

.D20ZX {
    justify-content: flex-start;
    margin-left: -.25rem;
    margin-top: -.25rem;
    text-align: left
}

.D20ZX>* {
    margin-left: .25rem;
    margin-top: .25rem
}

.D20ZX>:first-child {
    margin-left: 0
}

.tsJY5 {
    justify-content: flex-end;
    text-align: right
}

.RiQjy {
    max-width: 100%
}

.RiQjy,
.XyykG {
    align-items: center;
    display: flex
}

.XyykG {
    flex-grow: 0;
    word-break: break-word
}

.Hd_eA {
    text-decoration: line-through
}

.EzivK {
    display: contents
}

.HeU3m {
    color: var(--p-text-subdued);
    font-size: var(--p-font-size-1)
}

.kW9US {
    text-decoration: line-through
}

.Lk_oz,
.nFNgP {
    display: inline-flex
}

.nFNgP {
    align-items: center;
    background-color: initial;
    border: .0625rem solid #0000;
    box-shadow: 0 0 0 0 #0000;
    color: inherit;
    cursor: pointer;
    font-size: var(--p-font-size-4);
    font-weight: var(--p-font-weight-regular);
    letter-spacing: normal;
    line-height: var(--p-line-height-2);
    padding: .5rem 1rem;
    position: relative;
    text-decoration: none;
    text-transform: none;
    width: 100%;
    z-index: 2
}

@media (min-width: 40em) {
    .nFNgP {
        font-size: var(--p-font-size-3)
    }
}

.nFNgP:after {
    border-radius: calc(var(--p-border-radius-1) + .0625rem);
    bottom: -.0625rem;
    box-shadow: 0 0 0 -.0625rem var(--p-focused);
    content: "";
    display: block;
    left: -.0625rem;
    pointer-events: none;
    right: -.0625rem;
    top: -.0625rem;
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

.fzQkQ {
    border-width: 0;
    padding: 0
}

.mxHRX {
    border-radius: var(--p-border-radius-1, 3px)
}

.nFNgP:focus {
    outline: 0
}

@media (-ms-high-contrast:active) {
    .nFNgP:focus {
        outline: 2px dotted
    }
}

.nFNgP:focus .kQsl7 {
    opacity: 1
}

.nFNgP:after {
    border: .0625rem solid #0000;
    border-radius: var(--p-border-radius-1);
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0
}

.nFNgP:focus:not(:active):after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.kkX83,
.nFNgP:hover {
    background-color: var(--p-surface-pressed)
}

.kkX83.TsRxp,
.nFNgP:hover.TsRxp {
    background-color: var(--p-surface-selected-pressed)
}

.kkX83 .kQsl7,
.nFNgP:hover .kQsl7 {
    opacity: 1
}

.WFwvY {
    margin-right: .5rem
}

.kQsl7 {
    opacity: 0
}

.kAFuH {
    padding: 1rem 1rem 0 1rem
}

.VtiEn {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100
}

.VtiEn.ORvfx {
    z-index: 516
}

.RpFJ4 {
    opacity: 1
}

.WV6Jc {
    color: var(--p-text-subdued);
    font-size: .75rem
}

.aYVy_>:not(:first-child) {
    margin-left: .25rem
}

.FMX0H {
    font-size: var(--p-font-size-4);
    font-weight: var(--p-font-weight-regular);
    letter-spacing: normal;
    line-height: var(--p-line-height-2);
    padding: .5rem 1rem;
    text-transform: none
}

@media (min-width: 40em) {
    .FMX0H {
        font-size: var(--p-font-size-3)
    }
}

.du09y {
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    line-height: var(--p-line-height-2);
    padding: 0;
    white-space: nowrap
}

@media (min-width: 40em) {
    .du09y {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.C7ffe {
    text-decoration: line-through
}

.pdrYp {
    min-width: 15.625rem
}

.qBPZL {
    min-width: 12.5rem
}

.crxlC {
    position: relative
}

.D0835 {
    align-items: center;
    background: var(--p-surface-neutral, #637381);
    border: .125rem solid var(--p-surface, #fff);
    border-radius: 1.875rem;
    color: var(--p-text, #fff);
    display: flex;
    font-size: .75rem;
    height: 1.5rem;
    justify-content: center;
    min-width: 1.875rem;
    padding: .25rem;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(.9375rem, -50%);
    z-index: 20
}

.RMsvq+.RMsvq {
    margin-top: 1rem
}

.vnEHE {
    max-width: 12.5rem
}

.l0lSE {
    display: flex;
    font-size: .875rem;
    justify-content: flex-start
}

.B394p {
    align-items: center;
    background-color: var(--p-surface-neutral, #dfe3e8);
    border-radius: 50%;
    display: inline-flex;
    flex: 0 0 auto;
    height: 1.25rem;
    justify-content: center;
    margin-right: .5rem;
    width: 1.25rem
}

.RrMxp {
    background-color: var(--p-surface-highlight, #b4e1fa)
}

.qiKHK {
    border: .125rem solid currentcolor;
    border-radius: 50%;
    color: var(--p-text-subdued, #454f5b);
    flex-shrink: 0;
    height: .625rem;
    width: .625rem
}

.WI_b_ {
    color: var(--p-icon-highlight, #084e8a)
}

.zCzhV {
    background: #0000
}

.haovK {
    background: linear-gradient(0deg, currentcolor, currentcolor 50%, currentcolor 0)
}

.vy6Ma {
    background: linear-gradient(0deg, currentcolor, currentcolor 50%, #0000 0, #0000)
}

.nloSI:not(:empty) {
    margin-bottom: 1rem
}

.tgHlW:not(:empty) {
    margin-top: 1rem
}

.pp_rx:not(:empty) {
    margin-bottom: 1rem;
    margin-top: 1rem
}

.omvaf {
    text-decoration: line-through
}

.CgIxr {
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    line-height: var(--p-line-height-2)
}

@media (min-width: 40em) {
    .CgIxr {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.TZfs4 {
    display: flex;
    margin-left: -1rem;
    overflow-x: auto;
    white-space: nowrap
}

.PoQQR,
.TZfs4 {
    max-width: 100%
}

.PoQQR {
    margin-right: .25rem
}

.PoQQR:first-of-type {
    padding-left: 1rem
}

.PoQQR:last-of-type {
    padding-right: .5rem
}

.k_pWm {
    margin-right: -28px
}

.aDkZs {
    align-items: center;
    background-color: var(--p-surface-neutral, #dfe3e8);
    border-radius: var(--p-border-radius-1);
    color: var(--p-text, #212b36);
    display: inline-flex;
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    line-height: var(--p-line-height-2);
    min-height: 1.5625rem;
    overflow: hidden;
    padding-left: .5rem;
    padding-right: .5rem
}

@media (min-width: 40em) {
    .aDkZs {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.vhF_3 {
    align-items: center;
    background-color: var(--p-surface-neutral, #637381);
    border-radius: 1.5rem;
    color: var(--p-text, #fff);
    display: inline-flex;
    height: 1.5rem;
    justify-content: center;
    padding: 0 .5rem
}

.BioUu {
    text-decoration: line-through
}

.f9xMr {
    justify-content: flex-end;
    text-align: right
}

.t5Ni0 {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: -.25rem;
    margin-top: -.25rem
}

.t5Ni0>* {
    margin-left: .25rem;
    margin-top: .25rem
}

.VZnJw {
    display: flex
}

.rFlVC {
    padding: 0 .25rem
}

.C6G6v {
    display: flex
}

.KY4g7 {
    justify-content: flex-end;
    text-align: right
}

.tLfhv {
    text-decoration: line-through
}

.E3e7L {
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    line-height: var(--p-line-height-2)
}

@media (min-width: 40em) {
    .E3e7L {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.nc1Oh {
    display: flex
}

.kkvOa {
    justify-content: flex-end;
    text-align: right
}

.AIcn3 {
    text-decoration: line-through
}

.na8MP {
    color: var(--p-text-subdued);
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    line-height: var(--p-line-height-2)
}

@media (min-width: 40em) {
    .na8MP {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.xSHmT {
    align-items: center;
    border-bottom: .0625rem solid var(--p-border-subdued);
    display: flex;
    justify-content: space-between;
    padding: .5rem
}

.E8yr9 {
    border-top: .0625rem solid var(--p-border-subdued);
    margin: auto;
    padding: 1.5rem 1rem
}

.oyXox {
    padding: 1rem;
    padding-bottom: 0
}

@media (min-width: 28.625em) {
    .oyXox {
        padding-bottom: .5rem
    }
}

.Jr8gN {
    flex: 1 1 auto;
    margin-right: .5rem
}

.Dy76X {
    margin: 0 1rem
}

@media (max-width: 48.0625em) and (min-width:46.5em),
(min-width:61.5em) {
    [data-has-navigation] .r2wZJ {
        flex: 1 1 auto;
        overflow: hidden
    }
}

@media (min-width: 46.5em) {
    .r2wZJ {
        flex: 1 1 auto;
        overflow: hidden
    }
}

@media (max-width: 48.0625em) and (min-width:46.5em),
(min-width:61.5em) {
    [data-has-navigation] .B1Bfh {
        display: flex
    }
}

@media (min-width: 46.5em) {
    .B1Bfh {
        display: flex
    }
}

.bBJuY {
    align-items: center;
    border-bottom: var(--p-border-divider);
    display: flex;
    flex: 0 0 auto;
    padding: var(--p-space-2) var(--p-space-2);
    width: 100%
}

.bBJuY .QbZkN {
    padding: var(--p-space-4)
}

@media (max-width: 48.0625em) and (min-width:46.5em),
(min-width:61.5em) {
    [data-has-navigation] .bBJuY {
        border-left: var(--p-border-divider);
        max-width: 15.625rem;
        width: auto
    }
}

@media (min-width: 46.5em) {
    .bBJuY {
        border-left: var(--p-border-divider);
        max-width: 15.625rem;
        width: auto
    }
}

.bBJuY>div {
    height: 100%;
    width: 100%
}

.pcOqq {
    padding: var(--p-space-4);
    width: 18.75rem
}

.GqGzl,
.GqGzl button {
    height: 100%;
    width: 100%
}

.GqGzl button {
    border-radius: var(--p-border-radius-1)
}

.GqGzl button:hover {
    background: var(--p-surface-depressed)
}

.NEL5I,
.Z75iW button:hover {
    background: none
}

.NEL5I {
    align-items: center;
    border: none;
    cursor: pointer;
    display: inline-flex;
    padding: var(--p-space-2);
    width: 100%
}

.MT5AX {
    padding: 0
}

.d0Xnn {
    margin: 0 var(--p-space-1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.LhxaV {
    margin-right: 0
}

.HWkWP {
    padding: var(--p-space-4)
}

.HWkWP,
.gQW5H {
    width: 18.75rem
}

.gQW5H {
    padding: var(--p-space-2) var(--p-space-0)
}

.T_CA6 {
    padding-bottom: var(--p-space-2)
}

.s5FlS {
    padding: var(--p-space-2) var(--p-space-0);
    text-align: center;
    width: 100%
}

.GkOG3 {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%
}

.ShKpH {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden
}

.dbc4H {
    margin-left: var(--p-space-2)
}

.WLtgG {
    background-color: var(--p-surface, #fff);
    border-radius: var(--p-border-radius-2);
    box-shadow: var(--p-shadow-card)
}

@media (-ms-high-contrast:active) {
    .WLtgG {
        box-shadow: inset 0 0 0 .0625rem windowText
    }
}

.z49uC:first-child {
    border-top-left-radius: var(--p-border-radius-2);
    border-top-right-radius: var(--p-border-radius-2)
}

.z49uC:last-child {
    border-bottom-left-radius: var(--p-border-radius-2);
    border-bottom-right-radius: var(--p-border-radius-2)
}

.z49uC+.z49uC {
    border-top: .0625rem solid var(--p-border-subdued)
}

.ipjQu {
    padding-bottom: .0625rem
}

@media print {
    .ipjQu {
        display: none
    }
}

.ipjQu button {
    white-space: nowrap
}

.J3wjY {
    align-items: center;
    display: flex;
    flex-shrink: 0;
    padding-left: .5rem
}

.amiPw+.amiPw {
    margin-left: .5rem
}

.CXyIe {
    display: flex
}

.CXyIe>* {
    padding-right: .5rem
}

.CXyIe>:last-child {
    padding-right: 0
}

@media (min-width: 31.25em) {
    .KchwO {
        min-width: 21.875rem
    }
}

@media (min-width: 59.375em) {
    .ItHc1 {
        white-space: nowrap
    }
}

.dtayX {
    padding-bottom: .5rem
}

.S7yCK {
    padding-bottom: 1.25rem
}

.GnmC7 {
    min-width: 14.0625rem
}

.WnVYr {
    display: flex;
    flex-direction: column
}

.KTITT>:not(:last-child) {
    margin-bottom: .25rem;
    margin-right: .25rem
}

.snr4Z {
    display: flex
}

.sIscF {
    list-style-type: none;
    margin: 0;
    padding: 0
}

.VGDKU {
    display: flex;
    max-width: 21.875rem;
    min-width: 21.875rem
}

.VGDKU:not(:last-child) {
    margin-bottom: .75rem
}

.vh3eg {
    display: flex;
    max-width: 19.625rem;
    min-width: 19.625rem
}

.vh3eg>* {
    width: 100%
}

.nNPaB {
    width: 50%
}

.nNPaB [class^=Polaris-Button__Text] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.lqKtF {
    padding-right: .25rem
}

.JK5Vd {
    padding-left: .25rem
}

.sm1Ni {
    display: flex;
    padding-left: 1rem
}

.KT2yu {
    border-top: .0625rem solid var(--p-divider)
}

.cV3Be {
    display: flex;
    flex-direction: column;
    max-height: 18.4375rem;
    min-width: 385px
}

.iftYH {
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    background: var(--p-surface);
    background: #0000;
    border: 1px solid var(--p-border-neutral-subdued);
    border-bottom-color: var(--p-border-shadow-subdued);
    border: 0;
    border-radius: var(--p-border-radius-1);
    border-top-color: var(--p-border-subdued);
    box-shadow: var(--p-shadow-button);
    box-shadow: none;
    color: var(--p-text);
    color: var(--p-interactive);
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    line-height: 1;
    margin: 0;
    margin: -.4375rem -.5rem;
    min-height: 2.25rem;
    min-width: 2.25rem;
    padding: .4375rem 1rem;
    padding-left: .5rem;
    padding-right: .5rem;
    position: relative;
    text-align: center;
    text-decoration: none;
    -webkit-user-select: none;
    user-select: none
}

.iftYH svg {
    fill: var(--p-icon)
}

.iftYH:after {
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
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

.iftYH:hover {
    background: var(--p-action-secondary-hovered);
    outline: .0625rem solid #0000
}

.iftYH:focus {
    box-shadow: var(--p-shadow-button);
    outline: 0
}

.iftYH:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.iftYH:active {
    background: var(--p-action-secondary-pressed);
    box-shadow: var(--p-shadow-button)
}

.iftYH:active:after {
    border: none;
    box-shadow: none
}

.iftYH.aEfAz {
    background: var(--p-action-secondary-depressed);
    border-color: var(--p-border-depressed);
    box-shadow: var(--p-shadows-inset-button-pressed);
    color: var(--p-text-on-primary)
}

.iftYH.aEfAz svg {
    fill: currentColor
}

@media (-ms-high-contrast:active) {
    .iftYH {
        border: 1px solid windowText
    }
}

.iftYH svg {
    fill: var(--p-interactive)
}

.iftYH>.EZnS9 {
    font-weight: 400;
    position: relative
}

.iftYH>.EZnS9:after {
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
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

.iftYH:focus,
.iftYH:hover {
    background: #0000;
    box-shadow: none;
    color: var(--p-interactive-hovered);
    text-decoration: underline
}

.iftYH:focus svg,
.iftYH:hover svg {
    fill: var(--p-interactive-hovered)
}

.iftYH:active {
    background: #0000;
    box-shadow: none;
    color: var(--p-interactive-pressed)
}

.iftYH:active svg {
    fill: var(--p-interactive-pressed)
}

@media (-ms-high-contrast:active) {
    .iftYH:active {
        outline: none
    }
}

.iftYH:focus:after {
    content: none
}

@media (-ms-high-contrast:active) {
    .iftYH:focus {
        outline: none
    }

    .iftYH:focus>.EZnS9 {
        outline: 2px dotted
    }
}

.iftYH:focus:not(:active)>.EZnS9:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.iftYH:active>.EZnS9 {
    background: var(--p-action-secondary-hovered);
    border-radius: 3px;
    margin: -2px -5px;
    padding: 2px 5px
}

.iftYH .SBlbz {
    margin-left: 0;
    margin-right: 0
}

.iftYH.AbxM0 {
    background: var(--p-surface-disabled);
    background: none;
    border-color: var(--p-border-disabled);
    box-shadow: none;
    color: var(--p-text-disabled);
    pointer-events: none;
    transition: none
}

.iftYH.AbxM0 svg {
    fill: var(--p-icon-disabled)
}

.EZnS9 {
    align-items: center;
    display: flex;
    font-size: var(--p-font-size-4);
    font-weight: var(--p-font-weight-medium);
    letter-spacing: normal;
    line-height: var(--p-line-height-1);
    text-transform: none
}

@media (min-width: 40em) {
    .EZnS9 {
        font-size: var(--p-font-size-3)
    }
}

.SBlbz {
    margin-left: -.25rem
}

.SBlbz+:not(.SBlbz) {
    margin-left: .25rem
}

.PSb5P {
    border-top: .0625rem solid var(--p-divider);
    padding: 1rem
}

.GxRYx {
    align-items: center;
    display: flex
}

.GxRYx:not(:last-child) {
    padding-bottom: 1rem
}

.EA7yS {
    color: var(--p-text-subdued);
    display: flex;
    justify-content: space-between
}

.j4aCl {
    align-items: center;
    background-color: var(--p-interactive);
    border-radius: 50%;
    color: var(--p-surface);
    display: flex;
    font-size: var(--p-font-size-2);
    font-weight: var(--p-font-weight-regular);
    height: 1.125rem;
    justify-content: center;
    line-height: var(--p-line-height-2);
    margin-left: .5rem;
    padding: .3125rem;
    width: 1.125rem
}

@media (min-width: 40em) {
    .j4aCl {
        font-size: var(--p-font-size-1);
        line-height: var(--p-line-height-1)
    }
}

.OGFpf {
    align-items: center;
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    border-radius: var(--p-border-radius-1);
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: inherit;
    justify-content: center;
    line-height: inherit;
    margin: 0;
    padding: 0;
    padding: .5rem;
    position: relative
}

.OGFpf:focus {
    outline: none
}

.OGFpf:after {
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
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

.OGFpf:focus {
    background-color: var(--p-surface-hovered)
}

.OGFpf:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.OGFpf:hover {
    background-color: var(--p-surface-hovered)
}

.a2Rzg {
    width: 100%
}

.Whmur {
    display: flex;
    flex-wrap: wrap;
    padding-top: .5rem
}

.Whmur>* {
    margin-bottom: .5rem;
    margin-right: .5rem
}

.U7Rtj {
    margin-top: 10px
}

.qZ6V1 {
    display: flex;
    padding-bottom: .0625rem
}

.qZ6V1>:not(:last-child) {
    padding-right: .5rem
}

@media print {
    .qZ6V1 {
        display: none
    }
}

.qZ6V1 button {
    white-space: nowrap
}

._X7pX {
    padding: 1rem;
    padding-bottom: 0
}

@media (min-width: 28.625em) {
    ._X7pX {
        padding-bottom: .5rem
    }
}

.MqIWd {
    display: flex;
    justify-content: space-between;
    padding-top: .5rem
}

.MqIWd>:not(:last-child) {
    padding-right: .5rem
}

.ErdWL {
    flex: 1 1
}

.BcBUC {
    max-height: 18.4375rem
}

.BcBUC,
.HGGS1 {
    display: flex;
    flex-direction: column
}

.HGGS1 {
    align-items: flex-start;
    border-top: .0625rem solid var(--p-divider);
    padding: 1rem .5rem
}

.HGGS1>:not(:last-child) {
    padding-bottom: 1rem
}

.MWlQt {
    padding: 1rem
}

.n2R4Q {
    border: none;
    margin: 0;
    padding: 0
}

.Vf58b>.Bsi15 {
    border: 0 !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    margin: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    white-space: nowrap !important;
    width: 1px !important
}

.UPLL1 {
    list-style: none;
    margin: 0;
    padding: 0
}

.C7exb {
    padding-left: calc(.5rem + var(--p-choice-size, 1rem))
}

.C7exb,
.DpkDy {
    margin-bottom: .5rem
}

.DpkDy {
    margin-top: .25rem
}

.Bsi15 {
    display: block;
    font-size: var(--p-font-size-4);
    font-weight: var(--p-font-weight-regular);
    letter-spacing: normal;
    line-height: var(--p-line-height-2);
    margin: 0 0 1rem;
    padding: 0;
    text-transform: none
}

@media (min-width: 40em) {
    .Bsi15 {
        font-size: var(--p-font-size-3)
    }
}

.pl3Sf {
    display: flex;
    justify-content: space-between;
    pointer-events: auto !important;
    z-index: 401
}

.c4vwe {
    flex: 1 1
}

.AlcTh {
    border-radius: var(--p-border-radius-1);
    cursor: grab;
    display: flex;
    margin: -.25rem;
    margin-left: 16px;
    padding: .25rem;
    position: relative;
    visibility: hidden
}

.AlcTh:after {
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
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

.WMD7v .AlcTh,
.pl3Sf:focus-within .AlcTh,
.pl3Sf:hover .AlcTh {
    visibility: visible
}

.AlcTh:hover {
    background: var(--p-surface-hovered)
}

.AlcTh:hover svg {
    fill: var(--p-icon-hovered)
}

.WMD7v .AlcTh {
    background: var(--p-surface-pressed);
    cursor: grabbing;
    margin-right: -5px
}

.WMD7v .AlcTh svg {
    fill: var(--p-icon-pressed)
}

.AlcTh:focus {
    outline: none
}

.AlcTh:focus:not(:active):after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.MhG6u {
    color: var(--p-text-subdued)
}

.uSTmD {
    padding-bottom: 3.75rem;
    padding-top: 1.25rem;
    text-align: center
}

.kKSQY {
    display: flex;
    max-width: 11.25rem
}

.kKSQY img {
    width: 100%
}

.L6zwX {
    min-width: 46px
}

.Z6lRa,
.ymGph {
    border-radius: var(--p-border-radius-1)
}

.ymGph {
    align-items: center;
    display: flex;
    margin: 0 .5rem;
    padding: .4375rem .1875rem
}

.ymGph:hover {
    background-color: var(--p-background-hovered);
    cursor: pointer
}

@media (min-width: 48.0625em) {
    .bzE0O {
        height: 437px
    }
}

.bBxhM {
    background-color: #1f1f25;
    box-shadow: 0 .0625rem 0 #fff, inset 0 1px 10px #000000e6;
    color: #dcdcdc
}

@media (-ms-high-contrast:active) {
    .bBxhM {
        box-shadow: inset 0 0 0 .0625rem windowText
    }
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {
    [data-has-navigation] .bBxhM {
        border-radius: .5rem
    }
}

@media (min-width: 30.625em) {
    .bBxhM {
        border-radius: .5rem
    }
}

.bBxhM.KSvZf {
    background-color: var(--p-background);
    border: .0625rem solid #0000;
    border-radius: var(--p-border-radius-2);
    box-shadow: var(--p-shadow-card);
    color: var(--p-text)
}

.fI6F9 {
    align-items: center;
    display: block
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {
    [data-has-navigation] .fI6F9 {
        display: flex
    }
}

@media (min-width: 30.625em) {
    .fI6F9 {
        display: flex
    }
}

.KSvZf .fI6F9 {
    background-color: var(--p-surface);
    border-radius: .5rem
}

.ERQEw {
    -ms-overflow-style: none;
    display: flex;
    overflow-x: auto;
    position: relative;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    width: 100%
}

.ERQEw::-webkit-scrollbar {
    display: none
}

.ERQEw [data-metric-name] {
    flex: 1 0 10rem;
    max-width: 16.25rem;
    min-width: -webkit-fit-content;
    min-width: fit-content;
    min-width: -moz-fit-content
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {
    [data-has-navigation] .ERQEw {
        scroll-snap-type: none
    }
}

@media (min-width: 30.625em) {
    .ERQEw {
        scroll-snap-type: none
    }
}

.dGGrI {
    -webkit-tap-highlight-color: transparent;
    background: #1f1f25;
    border: none;
    border-right: 1px solid #000;
    box-sizing: border-box;
    color: #f1f2f3;
    cursor: pointer;
    display: block;
    font: inherit;
    height: 4.3125rem;
    min-width: 8rem;
    padding: .5rem;
    position: relative;
    -webkit-user-select: none;
    user-select: none
}

.dGGrI.Vfm38 {
    background: var(--p-surface);
    border-right: .0625rem solid var(--p-divider);
    color: var(--p-text)
}

.dGGrI.Vfm38:active {
    background: var(--p-surface-pressed)
}

.dGGrI:after {
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
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {
    [data-has-navigation] .dGGrI {
        border-bottom-left-radius: .5rem;
        border-top-left-radius: .5rem
    }
}

@media (min-width: 30.625em) {
    .dGGrI {
        border-bottom-left-radius: .5rem;
        border-top-left-radius: .5rem
    }
}

.dGGrI:after {
    border-radius: 0;
    border-bottom-left-radius: .375rem;
    border-top-left-radius: .375rem;
    bottom: .125rem;
    left: .125rem;
    right: .125rem;
    top: .125rem;
    z-index: 2
}

.dGGrI:focus {
    outline: 0
}

.dGGrI:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.dGGrI:active {
    background: #0b0b10;
    box-shadow: inset 0 2px 0 0 #ffffff0d
}

.dGGrI:active:after {
    border: none;
    box-shadow: none
}

.y2XRD:hover {
    background: #0b0b10;
    outline: .0625rem solid #0000
}

.y2XRD:hover.Vfm38 {
    background: var(--p-surface-hovered)
}

.VDOzr {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center
}

.t3FIR {
    background: #2d3033;
    border-radius: var(--p-border-radius-1)
}

.Vfm38 .t3FIR {
    background: var(--p-surface-neutral-pressed)
}

.igCrA {
    display: inline-block;
    vertical-align: bottom
}

.igCrA svg {
    fill: #8d8d8e
}

.pKmQX {
    padding: 1rem
}

.xB7sg {
    margin: 0 1.125rem;
    width: 3.625rem
}

.RCwzp {
    display: flex;
    list-style: none;
    margin: 0 0 .5rem 0;
    padding: .75rem 1rem 0
}

.E8h6v {
    align-items: center;
    background-color: initial;
    border: 0;
    border-radius: var(--p-border-radius-1);
    color: #dcdcdc;
    cursor: pointer;
    display: inline-flex;
    font-size: .9375rem;
    margin-right: 1rem;
    max-width: 100%;
    padding: .5rem .5rem
}

.E8h6v.Mj7Et {
    color: var(--p-text)
}

.E8h6v.Mj7Et:active {
    background-color: var(--p-surface-neutral)
}

.E8h6v:active,
.oRbjy {
    background-color: #52525c
}

.E8h6v:active.Mj7Et,
.oRbjy.Mj7Et {
    background-color: var(--p-surface-neutral)
}

.Ans1H,
.IIBzH,
.KlLT0,
.Ru8no,
.Uz5tT,
.YoQ4w,
.dgz9S,
.e0rLw,
.kw0Wg,
.px3vc,
.sTrYh,
.wwTyd {
    width: 8rem
}

.XdqIf,
.v5Wj5,
.xEiDB {
    width: 9.25rem
}

.CB9aR,
.H7Z8q,
.NIpy3 {
    min-width: 7.375rem;
    width: 7.375rem
}

.Bi_oN,
.q41Gq,
.s1H4h {
    width: 8rem
}

.bSbNY {
    border-bottom-right-radius: .5rem;
    border-top-right-radius: .5rem;
    display: flex;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 1
}

.bSbNY.w0b2S {
    border-bottom-left-radius: .5rem;
    border-top-left-radius: .5rem
}

@media (max-width: 30.625em),
(min-width:48.0625em) and (max-width:47.125em) {
    [data-has-navigation] .bSbNY {
        border-radius: 0
    }
}

@media (max-width: 30.625em) {
    .bSbNY {
        border-radius: 0
    }
}

.L1seX,
.PDNjh {
    fill: #fff;
    background: #1f1f25;
    border: 0;
    box-shadow: 0 0 .5rem #000;
    cursor: pointer;
    display: none;
    padding: 0;
    width: 1.875rem;
    z-index: 102
}

.KEEzy .L1seX,
.KEEzy .PDNjh {
    fill: #000;
    background: #fff;
    box-shadow: 0 0 .5rem var(--p-surface-neutral-hovered)
}

.L1seX:hover,
.PDNjh:hover {
    background: #0b0b10;
    outline: .0625rem solid #0000
}

.KEEzy .L1seX:hover,
.KEEzy .PDNjh:hover {
    background: #f1f2f3
}

.L1seX:focus,
.PDNjh:focus {
    outline: 0
}

.L1seX:focus:after,
.PDNjh:focus:after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.L1seX:active,
.PDNjh:active {
    background: #000;
    box-shadow: inset 0 2px 0 0 #ffffff0d
}

.KEEzy .L1seX:active,
.KEEzy .PDNjh:active {
    background: #f1f2f3
}

.L1seX:active:after,
.PDNjh:active:after {
    border: none;
    box-shadow: none
}

.L1seX:disabled,
.PDNjh:disabled {
    box-shadow: none;
    cursor: default
}

.L1seX:disabled:hover,
.PDNjh:disabled:hover {
    background: none
}

.KEEzy .L1seX:disabled:hover,
.KEEzy .PDNjh:disabled:hover {
    background-color: #fff
}

.L1seX:disabled>span,
.PDNjh:disabled>span {
    opacity: .2
}

.KEEzy .L1seX:disabled>span,
.KEEzy .PDNjh:disabled>span {
    color: var(--p-surface-subdued)
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {

    .GbeAk [data-has-navigation] .L1seX,
    .GbeAk [data-has-navigation] .PDNjh {
        display: block
    }
}

@media (min-width: 30.625em) {

    .GbeAk .L1seX,
    .GbeAk .PDNjh {
        display: block
    }
}

.L1seX {
    border-left: 1px solid #000
}

.KEEzy .L1seX {
    border-left: .0625rem solid var(--p-divider)
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {
    [data-has-navigation] .L1seX {
        border-bottom-right-radius: .5rem;
        border-top-right-radius: .5rem
    }
}

@media (min-width: 30.625em) {
    .L1seX {
        border-bottom-right-radius: .5rem;
        border-top-right-radius: .5rem
    }
}

.PDNjh {
    border-right: 1px solid #000
}

.KEEzy .PDNjh {
    border-right: .0625rem solid var(--p-divider)
}

.ZInGb {
    align-items: center;
    background-color: inherit;
    border: none;
    box-shadow: 0 1px 0 #0000000d;
    box-sizing: border-box;
    color: inherit;
    display: flex;
    font: inherit;
    height: 4.3125rem;
    margin: 0;
    overflow: hidden;
    padding: .25rem 1rem 1rem;
    position: relative;
    scroll-snap-align: start;
    text-align: left
}

.ZInGb.RZJgY {
    background-color: #fff;
    color: var(--p-text)
}

.ZInGb.RZJgY:before {
    background: #f6f6f799
}

.ZInGb:before {
    background: #0b0b1066;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1
}

.ZInGb:not(.V6f37).hjxv4:hover:before {
    opacity: 1
}

.ZInGb:not(.V6f37).hjxv4:hover .Ic5tp div {
    background: none
}

.ZInGb.RZJgY.hCxRs:hover>div:first-child {
    background: linear-gradient(90deg, #f1f2f3, #f1f2f300 50%)
}

.ZInGb.hCxRs:hover>div:first-child {
    background: linear-gradient(90deg, #0b0b10, #0b0b1000 50%)
}

.ZInGb:not(.V6f37).hjxv4:active {
    box-shadow: inset 0 2px 0 0 #ffffff0d
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {
    [data-has-navigation] .ZInGb {
        padding: 0 1rem
    }
}

@media (min-width: 30.625em) {
    .ZInGb {
        padding: 0 1rem
    }
}

.ZInGb:not(:first-child) {
    scroll-snap-margin-left: .75rem;
    border-left: 1px solid #000;
    scroll-margin-left: .75rem
}

.ZInGb:not(:first-child).RZJgY {
    border-left: 1px solid var(--p-divider)
}

.tOPXX [class^=Polaris-SkeletonDisplayText]:first-child,
.tOPXX div:first-child [class^=Polaris-SkeletonDisplayText] {
    height: .875rem;
    margin-bottom: .3125rem;
    width: 3.375rem
}

.tOPXX [class^=Polaris-SkeletonDisplayText]:last-child,
.tOPXX div:last-child [class^=Polaris-SkeletonDisplayText] {
    height: 1.25rem;
    margin-bottom: 0;
    width: 6.0625rem
}

.Ta9Ao {
    height: 100%;
    left: 0;
    outline: 0;
    position: relative;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 101
}

.Ta9Ao:after {
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
    transition: box-shadow .1s var(--p-ease);
    z-index: 1
}

.Ta9Ao:focus:not(:active):after {
    box-shadow: 0 0 0 .125rem var(--p-focused);
    outline: .0625rem solid #0000
}

.Ta9Ao:after {
    border-radius: 0;
    bottom: .125rem;
    left: .125rem;
    right: .125rem;
    top: .125rem
}

.ZInGb:last-child .Ta9Ao:after {
    border-bottom-right-radius: .375rem;
    border-top-right-radius: .375rem
}

.IoK8h {
    flex-grow: 1;
    font-size: .75rem;
    font-weight: 600;
    margin-right: .5rem;
    z-index: 101
}

.qVFEP {
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.25rem
}

.NNFfm .qVFEP {
    margin-bottom: 1.5rem
}

.tDObm {
    color: #fff;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-right: .25rem
}

.RZJgY .tDObm {
    color: var(--p-text)
}

.g3Sos {
    align-items: center;
    display: flex
}

.g3Sos.V6f37 {
    max-width: 11.875rem
}

.rZwTf {
    bottom: 1rem;
    left: 1rem;
    position: absolute;
    z-index: 102
}

@media (max-width: 48.0625em) and (min-width:30.625em),
(min-width:45.625em) {
    [data-has-navigation] .rZwTf {
        bottom: .625rem
    }
}

@media (min-width: 30.625em) {
    .rZwTf {
        bottom: .625rem
    }
}

.Oe1Pv {
    font-weight: 700;
    padding: .25rem;
    padding-left: 0
}

.Q_InI {
    align-items: center;
    border-radius: 1px;
    color: var(--p-text-subdued);
    display: flex;
    font-size: .75rem;
    font-weight: 400;
    height: 100%;
    line-height: 1rem;
    padding: 0 .3125rem 0 0
}

.Q_InI.OaECj {
    background-color: #fff
}

.TOM7y {
    background-color: #1f1f25b3
}

.eOZu1 svg {
    fill: currentcolor
}

.A4BHr,
.COon_,
.nHRlr {
    height: inherit
}

.QONFh,
.SYHlW,
.Swmbc,
.lAuPF {
    bottom: 0;
    height: 3rem;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    width: 100%
}

.lAuPF {
    height: 2.5625rem
}

.QONFh .COon_ {
    width: 16.25rem
}

.QONFh .COon_,
.glzTY {
    position: absolute;
    right: 0
}

.glzTY {
    background: linear-gradient(90deg, #1f1f25, #1f1f2500);
    bottom: 0;
    left: 0;
    top: 0;
    z-index: 101
}

.glzTY.Yfd9b {
    background: linear-gradient(88.16deg, #fff 1.71%, #fff0 98.61%)
}

._ChartContainer_agqfr_152 {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
    font-size: 12px;
    height: 100%;
    position: relative;
    width: 100%
}

._ChartContainer_agqfr_152 :focus,
._ChartContainer_agqfr_152 :focus-visible {
    outline: 2px solid #4b92e5;
    outline-offset: 2px
}

._Donut_feqgt_152 {
    align-items: center;
    display: flex;
    overflow: visible;
    position: relative;
    -webkit-user-select: none;
    user-select: none
}

._Donut_feqgt_152,
._Donut_feqgt_152 svg {
    height: 100%;
    width: 100%
}

._DonutWrapper_feqgt_166 {
    position: relative
}

._ContentWrapper_feqgt_174,
._DonutWrapper_feqgt_166 {
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%
}

._ContentWrapper_feqgt_174 {
    flex-flow: column nowrap;
    font-size: 20px;
    justify-content: center;
    pointer-events: none;
    position: absolute
}

._ContentWrapper_feqgt_174 span {
    color: #fff;
    font-size: 12px;
    max-width: 40%;
    text-align: center
}

._DonutChart_feqgt_192 {
    outline: none;
    overflow: visible
}

._DonutChart_feqgt_192:focus,
._DonutChart_feqgt_192:focus-visible {
    outline: none !important
}

._Arc_4bb9v_152 {
    outline: none
}

._Arc_4bb9v_152:focus,
._Arc_4bb9v_152:focus-visible {
    outline: none !important
}

._Bar_q765x_152 {
    outline: none;
    transition: fill 300 ease
}

._Bar_q765x_152:focus,
._Bar_q765x_152:focus-visible {
    outline: none !important
}

@media print {
    ._Group_q765x_161 {
        transform: none !important
    }
}

._SimpleBarSkeleton_1nscx_1 {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%
}

._Item_1nscx_8 {
    display: grid;
    gap: 20px;
    grid-template-columns: 20% auto;
    grid-template-rows: 16px 40px
}

._Item_1nscx_8>:last-child {
    grid-column: span 2
}

._SimpleNormalizedSkeleton_sdj88_1>span {
    display: block;
    height: 16px;
    width: 100%
}

._Legend_sdj88_7 {
    display: flex;
    gap: 5%;
    height: 100px;
    max-width: 60%
}

._LegendItem_sdj88_14 {
    grid-gap: 10px;
    display: block;
    display: grid;
    grid-template-columns: 16px 1fr;
    grid-template-rows: 16px;
    width: 100%
}

._LegendItem_sdj88_14>:first-child {
    height: 16px;
    width: 16px
}

._LegendItem_sdj88_14>:nth-child(2) {
    height: 16px
}

._LegendItem_sdj88_14>:nth-child(3) {
    grid-column: 2;
    height: 16px;
    width: 80%
}

._Container_1ymq9_1 {
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%
}

._Shimmer_hqp2w_1 {
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-name: _shimmer_hqp2w_1;
    animation-timing-function: linear;
    background-position-y: 0;
    background-size: calc(var(--shimmerWidth)*1) calc(var(--shimmerHeight)*1);
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: scale(5, 10);
    width: 100%
}

@keyframes _shimmer_hqp2w_1 {
    0% {
        background-position-x: calc(var(--shimmerWidth)*1*-1)
    }

    50% {
        background-position-x: calc(var(--shimmerWidth)*1*2)
    }

    51% {
        background-position-x: calc(var(--shimmerWidth)*1*-1)
    }

    to {
        background-position-x: calc(var(--shimmerWidth)*1*2)
    }
}

._VisuallyHidden_40cxj_152,
._VisuallyHidden_vn42d_152 {
    clip: rect(1px, 1px, 1px, 1px) !important;
    border: 0 !important;
    height: 1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    top: 0;
    width: 1px !important
}

._VisuallyHidden_vn42d_152 {
    opacity: 0
}

._ComparisonLine_vn42d_164 {
    stroke-linecap: round
}
</style>