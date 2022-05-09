<script setup lang="ts">

import { ref } from 'vue'
// import { RouterLink, RouterView } from 'vue-router'
import HeaderArea from './components/HeaderArea.vue'
import ModuleLayout from './components/ModuleLayout.vue'
import ModuleEditor from './components/ModuleEditor.vue'

interface Item{
    id: String | Number,
    label: String,
    svg ?: String,
}

interface PageLayout{
    id: String | Number,
	label: String,
    common: Item,
    top: Item,
    bottom: Item,
    items: Array<Item>,
}


const layout = ref<PageLayout | null >();

layout.value = {
	id: 'home-1',
	label: '主页',
	common:{
		id: 'common',
		label: '模板设置',
	},
	top:{
		id: 'top',
		label: '标头',
	},
	bottom:{
		id: 'bottom',
		label: '页脚',
	},
	items:[],
}


</script>

<template>
	<div class="iframe">
		<header class="header"><HeaderArea /></header>
		<aside class="sidebar"><ModuleLayout v-if="layout" :layout="layout" /></aside>
		<div class="sidebar secondary"><ModuleEditor /></div>
		<main class="main">

		</main>
	</div>	
</template>


<style lang="scss">  

@import '@/assets/base.css';

body,html {
    font-size: var(--p-font-size-4);
    line-height: var(--p-line-height-2);
    text-transform: none;
    letter-spacing: normal;
    font-weight: var(--p-font-weight-regular);
    color: var(--p-text)
}

@media (min-width: 40em) {
    body,html {
        font-size:var(--p-font-size-3)
    }
}

body,button,html {
    font-family: var(--p-font-family-sans)
}

html {
    position: relative;
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
    text-rendering: optimizeLegibility
}

body {
    min-height: 100%;
    margin: 0;
    padding: 0;
    background-color: #f6f6f7
}

@media print {
    body {
        background-color: initial!important
    }
}

*,:after,:before {
    box-sizing: border-box
}

h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    font-size: 1em;
    font-weight: var(--p-font-weight-regular)
}


i svg{
	width: 100%;
	height: 100%;
}

.iframe{
	min-width: 0;
    max-width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto auto;
    grid-template-areas: "header" "main" "children" "primary-sidebar" "secondary-sidebar" "footer";
    width: 100vw;
    height: 100vh;
    overflow: hidden;
	background-color: #f6f6f7;

	.header{
		grid-area: header;
		position: relative;
		z-index: 50;
		width: 100%;
	}

	.sidebar{
		grid-area: primary-sidebar;
		z-index: 10;
		position: relative;
		overflow: hidden;
		&:not(.secondary){
			border-right: .0625rem solid var(-p-divider)
		}
	}

	.secondary{
		grid-area: secondary-sidebar;
    	border-left: 0.0625rem solid var(--p-divider);
	}

	@media (min-width: 41.6875em) {
		& {
			grid-template-columns:minmax(0,auto) 1fr minmax(0,auto);
			grid-template-areas: "header header header" "primary-sidebar main secondary-sidebar" "primary-sidebar children secondary-sidebar" "footer footer footer"
		}

		.main {
			padding:1rem
		}

	}

	.main {
		min-width: 0;
		max-width: 100%;
		grid-area: main;
		z-index: 40;
		position: relative;
		display: flex;

		@media (min-width: 41.6875em) {
			& {
				padding:1rem
			}

		}
	}
	
}

</style>
