import { h } from "vue";
import $style from '@/app.module.scss'


export default {
	props: [
        "noWrap",
        "spacingNone",
        "spacingExtraTight",
        "spacingTight",
        "spacingBaseTight",
        "spacingLoose",
        "spacingExtraLoose",
        "distributionLeading",
        "distributionTrailing",
        "distributionCenter",
        "distributionEqualSpacing",
        "distributionFill",
        "distributionFillEvenly",
        "alignmentLeading",
        "alignmentTrailing",
        "alignmentCenter",
        "alignmentFill",
        "alignmentBaseline",
        "vertical",
    ],
	render() {

		let innerNodes = [];
        if(this.$slots.default){
            this.$slots.default().map((i)=>{
                innerNodes.push(h('div',{class: $style.Stack__Item } , i));
            })
        }

		let $class = [
            $style['Stack'], 
            // $style['Stack__Item'],
            this.noWrap !=null ? $style['Stack--noWrap']:null,
            this.spacingNone !=null ? $style['Stack--spacingNone']:null,
            this.spacingExtraTight !=null ? $style['Stack--spacingExtraTight']:null,
            this.spacingTight !=null ? $style['Stack--spacingTight']:null,
            this.spacingBaseTight !=null ? $style['Stack--spacingBaseTight']:null,
            this.spacingLoose !=null ? $style['Stack--spacingLoose']:null,
            this.spacingExtraLoose !=null ? $style['Stack--spacingExtraLoose']:null,
            this.distributionLeading !=null ? $style['Stack--distributionLeading']:null,
            this.distributionTrailing !=null ? $style['Stack--distributionTrailing']:null,
            this.distributionCenter !=null ? $style['Stack--distributionCenter']:null,
            this.distributionEqualSpacing !=null ? $style['Stack--distributionEqualSpacing']:null,
            this.distributionFill !=null ? $style['Stack--distributionFill']:null,
            this.distributionFillEvenly !=null ? $style['Stack--distributionFillEvenly']:null,
            this.alignmentLeading !=null ? $style['Stack--alignmentLeading']:null,
            this.alignmentTrailing !=null ? $style['Stack--alignmentTrailing']:null,
            this.alignmentCenter !=null ? $style['Stack--alignmentCenter']:null,
            this.alignmentFill !=null ? $style['Stack--alignmentFill']:null,
            this.alignmentBaseline !=null ? $style['Stack--alignmentBaseline']:null,
            this.vertical !=null ? $style['Stack--vertical']:null,
		];

		return h('div', {
            class: $class ,
        }, innerNodes)

	},
};
