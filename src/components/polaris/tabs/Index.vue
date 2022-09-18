<template>
    <div :class="$style.Tabs__Wrapper">
        <div ref="itemsRef" :class="[$style.Tabs, $style.Tabs__TabMeasurer]">
            <li v-for="item in items" :class="$style.Tabs__TabContainer" role="presentation">
                <router-link :to="item.link" custom v-slot="{ navigate, href, isActive }">
                    <a role="tab" :class="[$style.Tabs__Tab, currentTab == item ? $style['Tabs__Tab--selected'] : '']"
                        :aria-selected="currentTab == item  ? 'true' : 'false'"
                        :href="href" @click="navigate" tabindex="-1"><span :class="$style.Tabs__Title">{{
                                item.text
                        }}</span>
                    </a>
                </router-link>
            </li>
            <div :class="$style.Tabs__TabContainer">
                <div :class="$style.Tabs__TabContainer">
                    <button type="button" :class="[$style.Tabs__DisclosureActivator, $style.Tabs__Tab]"><span
                            :class="[$style.Tabs__Title, $style['Tabs--titleWithIcon']]">更多视图
                            <icon svg-name="CaretDownMinor"></icon>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <ul role="tablist" :class="$style.Tabs">
            <li v-for="item in visibleTabs" :class="$style.Tabs__TabContainer" role="presentation">
                <router-link :to="item.link" custom v-slot="{ navigate, href, isActive }">
                    <a :class="[$style.Tabs__Tab, currentTab == item ? $style['Tabs__Tab--selected'] : '']" :href="href"
                        :aria-selected="currentTab == item  ? 'true' : 'false'"
                        @click="navigate" tabindex="-1"><span :class="$style.Tabs__Title">{{ item.text }}</span></a>
                </router-link>
            </li>
            <li v-if="hiddenTabs.length > 0"
                :class="[$style.Tabs__DisclosureTab, $style['Tabs__DisclosureTab--visible']]">
                <div>
                    <div :class="$style.Tabs__TabContainer">
                        <button type="button" :class="[$style.Tabs__DisclosureActivator, $style.Tabs__Tab]"><span
                                :class="[$style.Tabs__Title, $style['Tabs--titleWithIcon']]">更多视图
                                <icon svg-name="CaretDownMinor"></icon>
                            </span>
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import $style from './index.module.scss'
import { onMounted, ref, reactive, computed } from 'vue';
import Icon from '../icon/Index.vue';
import { number } from '@intlify/core-base';

interface StateType {
    visibleTabs: number[],
    hiddenTabs: number[],
    disclosureWidth: number,
    containerWidth: number,
    tabWidths: number[],
}

const props = defineProps(['items', 'currentIndex']);
const state = reactive<StateType>({
    visibleTabs: [],
    hiddenTabs: [],
    disclosureWidth: 0,
    containerWidth: 0,
    tabWidths: [],
})
const itemsRef = ref<HTMLElement | null>(null);


const visibleTabs = computed(() => {
    return props.items.filter((i, s) => state.visibleTabs.indexOf(s) > -1)
})

const hiddenTabs = computed(() => {
    return props.items.filter((i, s) => state.hiddenTabs.indexOf(s) > -1)
})

const currentTab = computed(() => {
    return props.items[props.currentIndex];
})


const overFlow = (e: [], s: number, t: number, i: number[], n: number) => {
    const a = i.reduce(((e, s) => e + s), 0)
        , o = e.map(((e, s) => s))
        , l: number[] = []
        , r: number[] = [];
    if (n > a)
        l.push(...o);
    else {
        l.push(s);
        let e: number = i[s];
        o.forEach((a => {
            if (a !== s) {
                const s = i[a];
                if (e + s >= n - t)
                    return void r.push(a);
                l.push(a),
                    e += s
            }
        }
        ))
    }
    return {
        visibleTabs: l,
        hiddenTabs: r
    }
}

const resize = () => {
    let tabWidths: number[] = []
    if (itemsRef.value) {
        let children = itemsRef.value.children;
        for (var i = 0; i < children.length; i++) {
            let ii = children[i] as HTMLElement;
            tabWidths.push(ii.offsetWidth || 0);
        }
    }

    state.disclosureWidth = tabWidths.pop() || 0;
    state.tabWidths = tabWidths;
    state.containerWidth = itemsRef.value?.offsetWidth || 0

    let { hiddenTabs, visibleTabs } = overFlow(props.items, props.currentIndex, state.disclosureWidth, state.tabWidths, state.containerWidth)

    state.hiddenTabs = hiddenTabs;
    state.visibleTabs = visibleTabs;

}



onMounted(() => {

    window.onresize = resize
    resize()

})



</script>