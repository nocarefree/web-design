<template>
    <nav :class="$style.Navigation">

        <div :class="$style.Navigation__LogoContainer">
            <a data-polaris-unstyled="true" :class="$style.Navigation__LogoLink" style="width:100px" href="/admin">
                <img alt="Shopify"
                    src="https://cdn.shopifycdn.net/shopifycloud/web/assets/v1/317261b82650a68141f98ad2b08254b653aaff9e2404558fe47747da00293df5.svg"
                    :class="$style.Navigation__Logo" style="width:100px" />
            </a>
            <span><a data-polaris-unstyled="true" class="y8JU6" tabindex="0"><span
                        class="j7WVj">Summer’22</span></a></span>
        </div>

        <q-scroll-area :class="[$style.Navigation__PrimaryNavigation, $appStyle.Scrollable, 'fit']">
            <div class="VyJOa">
                <q-btn color="primary" label="Basic Menu">
                    <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                        <q-item-section>New tab</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                        <q-item-section>New incognito tab</q-item-section>
                        </q-item>
                    </q-list>
                    </q-menu>
                </q-btn>
            </div>
            
            <ul :class="$style.Navigation__Section" v-if="navItems.length > 0">
                <li v-for="item in navItems" :class="$style.Navigation__ListItem">
                    <div :class="$style.Navigation__ItemWrapper">
                        <router-link :to="item.link" custom v-slot="{ navigate }">
                            <a :href="item.link"
                                :class="[$style.Navigation__Item, selected?.link == item.link ? $style['Navigation__Item--selected'] : '']"
                                @click="navigate">
                                <span :class="$style.Navigation__Icon">
                                    <icon :svg-name="item.icon" />
                                </span>
                                <span :class="$style.Navigation__Text">{{ item.text }}</span>
                            </a>
                        </router-link>
                    </div>
                    <div v-if="item.children"
                        :class="[$style.Navigation__SecondaryNavigation, expanded?.link == item.link ? $style['Navigation--isExpanded'] : '']">
                        <div :class="$appStyle.Collapsible">
                            <ul v-if="expanded?.link == item.link && item.children.length > 0"
                                :class="$style.Navigation__List">
                                <li v-for="subitem in item.children" :class="$style.Navigation__ListItem">
                                    <div :class="$style.Navigation__ItemWrapper">
                                        <router-link :to="subitem.link" custom v-slot="{ navigate }">
                                            <a :href="subitem.link"
                                                :class="[$style.Navigation__Item, selected?.link == subitem.link ? $style['Navigation__Item--selected'] : '']"
                                                @click="navigate">
                                                <span :class="$style.Navigation__Text">{{ subitem.text }}</span>
                                            </a>
                                        </router-link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </q-scroll-area>
    </nav>
</template>

<script setup  lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import $style from './index.module.scss';
import $appStyle from '@/app.module.scss';
import Icon from '../icon/Index.vue'

const current_store = ref();
const route = useRoute()
const selected = ref<NavItem | null>(null);
const expanded = ref<NavItem | null>(null);

interface NavItem {
    icon?: string,
    link: string,
    text: string,
    children?: NavItem[],
}


let navItems: NavItem[] = [
    {
        icon: 'HomeMinor',
        link: '/',
        text: '首页',
    },
    {
        icon: 'OrdersMinor',
        link: '/orders',
        text: '订单',
        children: [
            {
                link: '/draft_orders',
                text: '草稿',
            },
            {
                link: '/checkouts',
                text: '弃单',
            },
        ]
    },
    {
        icon: 'ProductsMinor',
        link: '/products',
        text: '产品',
        children: [
            {
                link: '/products/inventory',
                text: '库存',
            },
            {
                link: '/products/transfers',
                text: '转移',
            },
            {
                link: '/collections',
                text: '产品系列',
            },
            {
                link: '/gift_cards',
                text: '礼品卡',
            },
            {
                link: '/price_lists',
                text: '价目表',
            },
        ]
    },
    {
        icon: 'CustomersMinor',
        link: '/customers',
        text: '客户'
    },
    {
        icon: 'AnalyticsMinor',
        link: '/analytics',
        text: '分析'
    },
    {
        icon: 'DiscountsMinor',
        link: '/discounts',
        text: '折扣'
    }
];


const onRouteUpdate = () => {
    let path = route.path;

    console.log(path)

    selected.value = null;
    expanded.value = null;

    navItems.map((item) => {
        if (selected.value) {
            return;
        }

        if (path == item.link) {
            selected.value = item
            expanded.value = item
        } else {

            if (item.children) {
                item.children.map((sub) => {
                    if (sub.link && path.indexOf(sub.link) === 0) {
                        selected.value = sub;
                        expanded.value = item;
                    }
                })
            }
        }
    })
}

watch(route, onRouteUpdate)
onRouteUpdate();



</script>

<style>
.VyJOa {
    height: 2.25rem;
    margin: 0 1rem 1rem;
}
</style>