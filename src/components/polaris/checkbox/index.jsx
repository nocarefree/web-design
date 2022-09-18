import { computed, h, ref } from 'vue'
import Choice from '../choice/index.jsx'
import Icon from '../icon/Index.vue'
import { uid } from 'quasar';
import $style from './index.module.scss';

export default {
    props: ["label", "modelValue"],
    emits: ['change','update:modelValue'],
    setup(props, {emit}){
        const id = uid();
        const isHover = ref(false)
        const inputRef = ref(false)
        const checked = ref(props.modelValue)
        

        const isTndeterminate = computed(()=>{
            return checked.value =='indeterminate'
        })

        const getInput = () => {
            return h('input', {
                id,
                ref: inputRef,
                value: props.modelValue,
                type: 'checkbox',
                role: 'checkbox',
                checked: checked && !isTndeterminate,
                class: [
                    $style.Checkbox__Input,
                    isTndeterminate.value  ? $style['Checkbox__Input--indeterminate'] : null
                ],
                'aria-invalid': false,
                indeterminate: isTndeterminate,
                'aria-checked': isTndeterminate.value ? 'mixed' : checked.value?'true':'false',
                onChange:()=>{

                },
                onClick: (e)=>{
                    e.stopPropagation()

                    console.log(props.modelValue)

                    emit('change' , inputRef.value, checked.value)
                    emit('update:modelValue', checked.value)
                }
            })
        }

        return ()=> h(Choice, { id, label: props.label }, 
            {
                default: ()=>h('span', { 
                    class: $style.Checkbox,
                    onMouseenter : ()=>{ isHover.value = true },
                    onMouseleave : ()=>{ isHover.value = false },
                }, [
                    getInput(),
                    h('span', {
                        class: [
                            $style.Checkbox__Backdrop,
                            isHover.value ? $style['Checkbox--hover']: null,
                        ]
                    }),
                    h('span', {
                        class: $style.Checkbox__Icon
                    }, h(Icon, {'svg-name':'TickSmallMinor'})),
                ])
            }
        )   
    }
}