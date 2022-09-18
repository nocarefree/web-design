import { h } from "vue";
import Icon from '../Icon/Index.vue'
import $appStyle from '@/app.module.scss'


export default {
	props: [
		'icon',
		'to',
		'iconOnly',
		'link',
		'label',
		'primary',
		'hidden',
		'fullWidth',
		'textAlignStart',
		'textAlignLeft',
		'textAlignCenter',
		'textAlignRight',
		'textAlignEnd',
		'monochrome',
		'connectedDisclosure',
		'plain',
		'hidden',
		'outline',
		'removeUnderline',
		'destructive',
		'sizeLarge',
		'sizeSlim',
		'disabled',
		'loading',
		'pressed'
	],
	emits: ['click'],
	render() {

		let buttonText = [];

		if(this.icon){
			buttonText.push( h('span', { class: $appStyle.Button__Icon }, [h(Icon, { svgName: this.icon })]) );
		}

		if(typeof this.iconOnly == 'undefined'){
			buttonText.push(h('span', { class: $appStyle.Button__Text }, [this.label]))
		}


		let buttonContent = [
			h(
				'span',
				{ class: $appStyle.Button__Content },
				buttonText
			)
		]

		const onClick = (e) => {
			this.$emit('click')
		}

		if (this.$slots.default !== void 0) {
			buttonContent.push(this.$slots.default())
		}

		let $class = [
			$appStyle['Button'],
			this.pressed!= null ? $appStyle['Button--pressed'] : null,
			this.disabled!= null ? $appStyle['Button--disabled'] : null,
			this.connectedDisclosure!= null ? $appStyle['Button--connectedDisclosure'] : null,
			this.plain!= null ? $appStyle['Button--plain'] : null,
			this.textAlignLeft!= null ? $appStyle['Button--textAlignLeft'] : null,
			this.textAlignStart!= null ? $appStyle['Button--textAlignStart'] : null,
			this.textAlignCenter!= null ? $appStyle['Button--textAlignCenter'] : null,
			this.textAlignRight!= null ? $appStyle['Button--textAlignRight'] : null,
			this.textAlignEnd!= null ? $appStyle['Button--textAlignEnd'] : null,
			this.fullWidth!= null ? $appStyle['Button--fullWidth'] : null,
			this.hidden!= null ? $appStyle['Button--hidden'] : null,
			this.primary!= null ? $appStyle['Button--primary'] : null,
			this.destructive!= null ? $appStyle['Button--destructive'] : null,
			this.outline!= null ? $appStyle['Button--outline'] : null,
			this.loading!= null ? $appStyle['Button--loading'] : null,
			this.removeUnderline!= null ? $appStyle['Button--removeUnderline'] : null,
			typeof this.iconOnly != 'undefined' ? $appStyle['Button--iconOnly'] : null,
			this.sizeSlim!= null ? $appStyle['Button--sizeSlim'] : null,
			this.sizeLarge!= null ? $appStyle['Button--sizeLarge'] : null,
			this.monochrome!= null ? $appStyle['Button--monochrome'] : null,
		];

		if (this.link || this.to) {
			return h('a', {
				href: this.link,
				class: $class ,
			}, buttonContent)
		} else {
			return h('button', {
				type: 'button',
				class: $class,
				ariaLabel: this.label,
				'onClick': onClick
			}, buttonContent)
		}

	},
};
