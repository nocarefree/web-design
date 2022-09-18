import { h, ref, onMounted, inject } from 'vue'
import Checkbox from '../checkbox/Index.vue'
import IndexTableCell from './index-table-cell.jsx'
import { IndexTableKey } from './index-table'
import $style from './index.module.scss'

export default {
    props:['id','position', 'subdued', 'status', 'disabled'],
    emits:['navigation','click'],
    setup(props, {emit, slots}){
        const trRef = ref(null)
        const selected = ref(false)
        let linkNode = void 0;
        const selectNode = null;
        const isHover = ref(false);

        const tableInjecting = inject(IndexTableKey, ()=>{
            console.log('cannot find table');
        })


        const getSelectNode = ()=>{
            if(tableInjecting.selectable){
                return h(IndexTableCell, null , { default: ()=> <Checkbox v-model={selected} />  } )
            }
            return null;
        }

        const onRmoveSelected = (e)=>{
            //tableInjecting.selected(props.id, !props.selected,)
        }

        onMounted(()=>{
            linkNode = trRef.value.querySelector("[data-primary-link]");
        })

        const onClick = (e) => {
            if (trRef.value && !selected.value)
                if (e.stopPropagation(),
                e.preventDefault())
                    emit('click')
                else if (linkNode) {
                    selected.value = !0;
                    console.log(selected.value)
                    const {ctrlKey: l, metaKey: n} = e.nativeEvent;
                    if ( emit('navigation'), (l || n) && linkNode instanceof HTMLAnchorElement)
                        return selected.value = !1,
                        void window.open(linkNode.href, "_blank");
                    linkNode.dispatchEvent(new MouseEvent(e.type,e.nativeEvent))
                } else
                    selected.value = !1,
                    onRmoveSelected(e)

        }
        

        return ()=>h('tr', {
            class: [
                $style.IndexTable__TableRow,
                props.subdued !=null ? $style['IndexTable__TableRow--subdued'] : null,
                props.selected != null ? $style['IndexTable__TableRow--selected'] : null,
                isHover.value ?  $style['IndexTable__TableRow--hover'] : null,
            ],
            // stopOnClick: onClick,
            onMouseenter: ()=> { isHover.value = true },
            onMouseleave: ()=> { isHover.value = false },
            ref: trRef
         } , [ getSelectNode(), ...slots.default?.()] )
    }
}