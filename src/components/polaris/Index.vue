<template>
    <div p-color-scheme="light">
        <div :class="[$style.Frame, $style['Frame--hasNav'], $style['Frame--hasTopBar']]">
            <div ref="topBarRef" :class="$style.Frame__TopBar">
                <div>
                    <div>
                        <div :class="$style.TopBar" data-polaris-top-bar="true">
                            <button type="button" :class="$style.TopBar__NavigationIcon" @click="toggleLeftDrawer">
                                <div :class="$style.TopBar__IconWrapper">
                                    <icon svg-name="TopBar"></icon>
                                </div>
                            </button>

                            <div
                                :class="[$style.TopBar__LogoContainer, $style.TopBar__LogoDisplayControl, $style['TopBar--hasLogoSuffix']]">
                                <a :class="$style.TopBar__LogoLink_eekya" style="width:100px" href="/admin">
                                    <img alt="Shopify"
                                        src="https://cdn.shopifycdn.net/shopifycloud/web/assets/v1/317261b82650a68141f98ad2b08254b653aaff9e2404558fe47747da00293df5.svg"
                                        :class="$style.TopBar__Logo" style="width:100px">
                                </a>
                                <span><a class="y8JU6" tabindex="0"><span class="j7WVj">Summer ’22</span></a></span>
                            </div>

                            <div :class="$style.TopBar__Contents">
                                <div :class="$style.TopBar__SearchField">
                                    <div>
                                        <button type="button" class="Kq5q1">
                                            <span class="cTtDT">
                                                <icon svg-name="SearchMinor"></icon>
                                            </span>
                                            <span class="zDkMR" title="搜索">搜索</span>
                                        </button>
                                    </div>
                                </div>
                                <div :class="$style.TopBar__SecondaryMenu">
                                    <div class="WQAz1"></div>
                                </div>
                                <div>
                                    <div :class="$style['TopBar-Menu__ActivatorWrappe']"><button type="button"
                                            :class="$style['TopBar-Menu__Activator']" tabindex="0"
                                            aria-controls="Polarispopover1" aria-owns="Polarispopover1"
                                            aria-expanded="false">
                                            <div :class="$style.MessageIndicator__MessageIndicatorWrapper">
                                                <avatar></avatar>
                                            </div><span :class="$style['TopBar-UserMenu__Details']">
                                                <p :class="$style['TopBar-UserMenu__Name']">liuyi</p>
                                                <p :class="$style['TopBar-UserMenu__Detail']"></p>
                                            </span>
                                        </button></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div>
                <div :class="$style.Frame__Navigation">
                    <navigation></navigation>
                </div>
            </div>

            <div :class="[$style.Frame__ContextualSaveBar,$style['Frame-CSSAnimation--startFade']]"></div>

            <main :class="$style.Frame__Main">
                <div :class="$style.Frame__Content">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSticky } from '@/utils/sticky-manager'
import Navigation from './navigation/index.vue'
import $style from "./index.module.scss";
import Avatar from "./avatar/Index.vue";
import Icon from "./icon/Index.vue";


const leftDrawerOpen = ref(false)
const search = ref('')
const topBarRef = ref()
const sticky = useSticky()
const state = {
    skipFocused: !1,
    globalRibbonHeight: 0,
    loadingStack: 0,
    toastMessages: [],
    showContextualSaveBar: !1
}


const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const setGlobalRibbonRootProperty = () => {
    const { globalRibbonHeight: e } = state;
    setStyle("--pc-frame-global-ribbon-height", `${e}px`)
}

const setOffset = () => {
    setStyle("--pc-frame-offset", `0px`)
}

const setStyle = (k: string, v: string) => {
    let html = null
    if ((html = document.querySelector('html')) != null) {
        html.style.setProperty(k, v)
    }
}

onMounted(() => {
    setGlobalRibbonRootProperty();
    setOffset();
    sticky.setTopBarOffset(topBarRef.value.offsetHeight)
})

</script>
