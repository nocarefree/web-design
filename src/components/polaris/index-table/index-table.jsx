import { h, ref, onMounted, provide, Transition , onUnmounted, nextTick, computed} from 'vue'
import debounce from '@/utils/debounce'
import Checkbox from '../checkbox/Index.vue'
import VisuallyHidden from '../visually-hidden'
import $style from './index.module.scss'


export const IndexTableKey = Symbol()

export default {
    name: 'IndexTable',
    props:{
        title: String,
        selectable: {
            type:Boolean,
            default : true
        },
        columns: Array,
        loading: {
            type:Boolean,
            default : false
        },
        stickyTable: String,
    },
    emits:['onSelectionChange'],
    setup(props, {slots, emit}){
        const scrolling = ref(false);

        let $table = null;
        let $scrollContainer = null;
        let $scollbarContainer = null;
        let $scollbar = null;
        let $scollbarContent = null;
        let observer = null
        let stickyColumns = []
        let scrollHidden = true

        const provider = {
            selectable: props.selectable,
            selectors: [],
        };

        provide(IndexTableKey, provider);

        const selectstatus = computed(()=>{
            return provider.selectors.length == 0 ? false : 
                null;
        })
        

        onUnmounted(()=>{
            window.removeEventListener('resize',onReCalScrollWith)
        })

        onMounted(()=>{
            setCheckboxOffset()
            window.addEventListener('resize', onReCalScrollWith)
        })


        const onReCalScrollWith = ()=>{
            if($scollbar.el && $table.el && $scollbarContainer.el){
                let width = $table.el.offsetWidth;
                $scollbar.el.style.setProperty("--pc-index-table-scroll-bar-content-width", width - 4 + "px")
                scrollHidden = $scollbarContainer.el.offsetWidth == width;
                setCheckboxOffset()
            }
        }

        const setCheckboxOffset = () =>{
            let e = 0;
            if(stickyColumns[0].node && !scrollHidden){
                let node = stickyColumns[0].node.el,
                    { width } = node.getBoundingClientRect();
                    e = width
            }
            document.documentElement.style.setProperty("--pc-checkbox-offset", `${e}px`)
            stickyColumns[1]?.node?.el?stickyColumns[1].node.el.style.left = `${e}px`:null;
        }

        const onScrollContainerScoll = debounce(()=>{
            $scollbar.el.scrollLeft = $scrollContainer.el.scrollLeft
            scrolling.value = $scrollContainer.el.scrollLeft>0
        } , 40, {
            trailing: !0,
            leading: !0,
            maxWait: 40
        });

        const onScrollbarScroll = debounce(()=>{
            $scrollContainer.el.scrollLeft = $scollbar.el.scrollLeft;
            scrolling.value = $scrollContainer.el.scrollLeft>0
        }, 40, {
            trailing: !0,
            leading: !0,
            maxWait: 40
        });

        const getTableScrollbarNode = ()=>{
            return slots.default?.() ? ( 
                $scollbarContent = h('div', { class:$style.IndexTable__ScrollBarContent }),  
                $scollbar = h(
                    'div', 
                    { class: $style.IndexTable__ScrollBar, onScroll: onScrollbarScroll } , 
                    [ $scollbarContent ]
                ) , 
                $scollbarContainer = h(
                    'div',
                    { 
                        class: [ 
                            $style.IndexTable__ScrollBarContainer,
                            // scrollCondensed.value == true ? $style['IndexTable--scrollBarContainerCondensed'] : null,
                            scrollHidden == true ? $style['IndexTable--scrollBarContainerHidden']:null,
                        ]
                    },
                    [ $scollbar ]
            )): ( $scollbarContent = null,  $scollbar = null, $scollbarContainer = null , $scollbarContainer );
        }

        const getTheadNode = ()=>{
            stickyColumns = [];

            let theadCols = [], colNum = props.columns.length, index = 0;

            if(props.selectable){
                let node = h(
                    'th' , 
                    {
                        class:[
                            $style.IndexTable__TableHeading,
                            index==0?$style['IndexTable__TableHeading--first']:'',
                            index==1?$style['IndexTable__TableHeading--second']:'',
                            index==(colNum-1)?$style['IndexTable__TableHeading--last']:'',
                        ],
                        
                    },
                    h(Checkbox, { modelValue: selectstatus.value })
                );
                theadCols.push(node)
                stickyColumns[index] = { node, data: {} }
                index++;
            }
            

            props.columns.map((item)=>{
                let node = h('th' , 
                    {
                        class:[
                            $style.IndexTable__TableHeading,
                            index==0?$style['IndexTable__TableHeading--first']:'',
                            index==1?$style['IndexTable__TableHeading--second']:'',
                            index==(colNum-1)?$style['IndexTable__TableHeading--last']:'',
                        ],
                        
                    },
                    [item.headerHidden == true ? h(VisuallyHidden, null ):item.label]
                );
                stickyColumns[index] = { node, data: item }
                theadCols.push(node)
                index++;
            })

            nextTick(()=>{
                if(stickyColumns[0]){

                    let target = stickyColumns[0].node.el;
                    if(observer) {
                        observer.disconnect();
                    }
                    observer = new ResizeObserver(() => {
                        setCheckboxOffset()
                    });
                    observer.observe(target);
                }
            })

            return h('thead', null, [ h('tr', null, theadCols) ])
        }

        // const getTbodyNode = ()=>{
        //     let tbodyRows = [];
        //     props.data.map((row)=>{
        //         let tbodyCols = [];
        //         props.columns.map((item, index)=>{
        //             tbodyCols.push( h('td', { 
        //                 class:[
        //                     $style.IndexTable__TableCell,
        //                     index==0?$style['IndexTable__TableCell--first']:''
        //                 ] 
        //             } , row[item.field]));
        //         })

        //         tbodyRows.push(h('tr',{ 
        //             class: $style.IndexTable__TableRow
        //         }, tbodyCols));
        //     })
        //     return h('tbody', null , slots.default);
        // }

        const getChildrenNodes = ()=>{
            let childrenNodes = [];

            childrenNodes.push(h(Transition, {
                'enter-from-class':$style['IndexTable__LoadingContainer--enter'],
                'enter-active-class':$style['IndexTable--loadingContainerEnterActive'],
                'leave-from-class':$style['IndexTable__LoadingContainer--exit'],
                'leave-active-class':$style['IndexTable--loadingContainerExitActive'],
            } , ()=>{
                return props.loading ? h('div', { 
                    class: $style.IndexTable__LoadingPanel,
                }, [
                    h('div', { class: $style.IndexTable__LoadingPanelRow } , [
                        h('qSpinner', { color:'primary', size:'1em' }),
                        h('div' , { role:'status' } , [ h(VisuallyHidden) ]),
                        h('div' , { class:$style.IndexTable__LoadingPanelText } , `正在加载 ${props.title}`)
                    ] )
                ]): null;
            }))
    
            if(slots.default?.()){
    

                $table = h('table',{
                    class: [
                        $style.IndexTable__Table,
                        scrolling.value ? $style['IndexTable__Table--scrolling']:null,
                    ],
                },[
                    getTheadNode(),
                    h('tbody', null , slots.default?.())
                ])

                $scrollContainer = h(
                    'div', 
                    { 
                        class: $style['IndexTable-ScrollContainer'],
                        onScroll: onScrollContainerScoll
                    }, 
                    [
                        $table
                    ]
                );
                childrenNodes.push($scrollContainer)
            }else{
                childrenNodes.push(h('div', { 
                    class: $style.IndexTable__EmptySearchResultWrapper
                }, slots['empty-result']))
            }

            return childrenNodes
        }

        

        
        return ()=>[
            h('div', { 
                class: $style.IndexTable,
            } , getChildrenNodes()),
            getTableScrollbarNode()
        ]
    }
}


// export const TableCell = {
//     props:['flush','class'],
//     setup(props, { slots }){
//         return ()=>h('td', { class: [
//             props.class,
//             $style.IndexTable__TableCell,
//             props.flush ? $style['IndexTable__TableCell--flush'] : null,
//         ] } , slots.default?.())
//     }
// }

// export const TableRow = {
//     props:['selected','id','position', 'subdued', 'status', 'disabled'],
//     emits:['navigation','click'],
//     setup(props, {emit}){
//         const trRef = ref()
//         const selected = false
//         const linkNode = void 0;
//         const selectNode = null;
//         const hover = ref(false);
//         const $class = computed(()=>{
//             return [
//                 $style.IndexTable__TableRow,
//                 props.subdued !=null ? $style['IndexTable__TableRow--subdued'] : null,
//                 props.selected != null ? $style['IndexTable__TableRow--selected'] : null,
//                 hover.value ?  $style['IndexTable__TableRow--hover'] : null,
//             ]
//         }) ;

//         const C = ()=>{

//         }

//         onMounted(()=>{
//             linkNode = trRef.value.querySelector("[data-primary-link]");
//         })

//         const onClick = (e) => {
//             if (trRef.value && ! selected)
//                 if (e.stopPropagation(),
//                 e.preventDefault())
//                     emit('click')
//                 else if (linkNode && !f) {
//                     selected = !0;
//                     const {ctrlKey: l, metaKey: n} = e.nativeEvent;
//                     if (i && i(t),
//                     (l || n) && linkNode instanceof HTMLAnchorElement)
//                         return selected = !1,
//                         void window.open(linkNode.href, "_blank");
//                     linkNode.dispatchEvent(new MouseEvent(e.type,e.nativeEvent))
//                 } else
//                     selected = !1,
//                     C(e)

//         }

//         return ()=>h('tr', {
//             class: $class,
//             onClick: onClick,
//             onMouseEnter: ()=> { hover.value = true },
//             onMouseLeave: ()=> { hover.value = false },
//             ref: trRef
//          } , [ selectNode, ...this.$slot.default?.() ] )
//     }
// }