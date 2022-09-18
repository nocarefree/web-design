import { h } from "vue";
import $style from '@/app.module.scss'


export default {
	props: [
        'positive',
        'negative',
        'warning',
        'code',
        'strong',
        'subdued'
    ],
	render() {

		let $class = [
            this.positive!=null ? $style['TextStyle--variationPositive'] : null ,
            this.negative!=null ? $style['TextStyle--variationNegative'] : null ,
            this.warning!=null ? $style['TextStyle--variationWarning'] : null ,
            this.code!=null ? $style['TextStyle--variationCode'] : null ,
            this.strong!=null ? $style['TextStyle--variationStrong'] : null ,
            this.subdued!=null ? $style['TextStyle--variationSubdued'] : null 
		];

        let a = this.code?'code':'span';

		return h(a, {
            class: $class ,
        }, this.$slots.default?.())

	},
};
