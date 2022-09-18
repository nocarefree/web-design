import { h } from 'vue'
import $style from './index.module.scss'

export default {
    props:['flush','class'],
    setup(props, { slots }){
        return ()=>h('td', { class: [
            props.class,
            $style.IndexTable__TableCell,
            props.flush ? $style['IndexTable__TableCell--flush'] : null,
        ] } , slots.default?.())
    }
}