import { h } from "vue";
import $style from './index.module.scss';


export const Layout = {
	render() {

		return h('div', {
            class: $style.Layout,
        }, this.$slots.default?.())

	},
};


export const LayoutSection = {
	props: [
        'secondary',
        'fullWidth',
        'oneHalf',
        'oneThird',
	],
	render() {

		let $class = [
            $style["Layout__Section"]
            , this.secondary != null ? $style["Layout__Section--secondary"] : null
            , this.fullWidth != null ? $style["Layout__Section--fullWidth"]: null
            , this.oneHalf != null ? $style["Layout__Section--oneHalf"]: null
            , this.oneThird != null ? $style["Layout__Section--oneThird"]: null
		];

		return h('div', {
            class: $class ,
        }, this.$slots.default?.())

	},
};


export default Layout;