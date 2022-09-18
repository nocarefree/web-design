import { h } from 'vue'
import $style from './index.module.scss'

export default {
    render(){
        return h('div', { class: $style.FooterHelp } , [
            h('div', { class: $style.FooterHelp__Text } , this.$slots.default?.())
        ])
    }
}