import { h } from "vue";
import $style from '@/app.module.scss'


export default {
	render() {
		return h('div', {
            class: $style.VisuallyHidden ,
        }, this.$slots.default?.())
	},
};
