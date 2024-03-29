<script setup lang="ts">

import { ref } from 'vue'
// import { RouterLink, RouterView } from 'vue-router'
import HeaderArea from './components/HeaderArea.vue'
import SectionsLayout from './components/SectionsLayout.vue'
import ModuleEditor from './components/ModuleEditor.vue'

</script>

<template>
	<div class="iframe">
		<header class="header"><HeaderArea /></header>
		<aside class="sidebar"><SectionsLayout /></aside>
		<div class="sidebar secondary"><ModuleEditor /></div>
		<main class="main">{{ $t('world') }}</main>
	</div>	
	<div id="pro"></div>
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

i.q-icon svg{
	width: 100%;
	height: 100%;
}

.plain-action {
	--osui_plain-action-content-padding-x: 0.5rem;
	-webkit-appearance: none;
	appearance: none;
	margin: 0;
	padding: 0;
	background: none;
	border: none;
	font-size: inherit;
	line-height: inherit;
	color: inherit;
	cursor: pointer;
	font-size: .9375rem;
	font-weight: var(--p-font-weight-medium);
	line-height: 1rem;
	text-transform: none;
	letter-spacing: normal;
	min-width: 0;
	min-width: 2.25rem;
	max-width: 100%;
	min-height: 2.25rem;
	border-radius: var(--p-border-radius-1);
	line-height: 1;
	text-decoration: none;
	color: var(--p-text);
	transition-property: color,background-color;
	transition-duration: var(--p-duration-150);
	transition-timing-function: var(--p-ease);
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	outline: none;
	position: relative;
}
@media (min-width: 40em){
	.plain-action {
		font-size: .875rem;
	}
}
.slim{
	min-width: 1.75rem;
    min-height: 1.75rem;
}

.q-btn i.q-icon {
	display: block;
	height: 1.25rem;
	width: 1.25rem;
	max-height: 100%;
	max-width: 100%;
}

.q-btn i.prefix {
	margin-right: 0.5rem;
}


</style>
