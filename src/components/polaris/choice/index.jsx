import { h } from 'vue'
import $style from './index.module.scss';

export default {
    props: ['id','label', 'labelHidden'],
    setup(props , {slots}){
        return ()=>h('label', {
            class: [
                $style.Choice, 
                typeof props.labelHidden != 'undefined' ? $style['Choice--labelHidden'] : ''
            ],
            for: props.id
        }, [
            h('span', { class: $style.Choice__Control }, slots),
            h('span', { class: $style.Choice__Label }, props.label)
        ]);
    }
}

