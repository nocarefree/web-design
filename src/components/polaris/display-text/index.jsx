import { h } from "vue";
import $style from '@/app.module.scss'


export default {
	props: { 
        size: {
            type: String,
            default: 'medium'
        },
        element: {
            type: String,
            default: 'p'
        }
    },
	render() {

		let $class = [
            $style["DisplayText"],
            this.size == 'small' ?$style["DisplayText--sizeSmall"]:null,
            this.size == 'medium' ?$style["DisplayText--sizeMedium"]:null,
            this.size == 'large' ?$style["DisplayText--sizeLarge"]:null,
            this.size == 'extraLarge' ?$style["DisplayText--sizeExtraLarge"]:null
		];

		return h(this.element, {
            class: $class ,
        }, this.$slots.default?.())

	},
};
