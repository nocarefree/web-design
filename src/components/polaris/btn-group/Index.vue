<script lang="ts">
import { h, useCssModule, ref, inject, provide } from 'vue';

interface BtnGroupProps {
    segmented :any,
    fullWidth :any,
    extraTight :any,
    tight :any,
    loose :any,
    connectedTop: any,
}


export default {
    props: [
        'segmented',
        'fullWidth',
        'extraTight',
        'tight',
        'loose',
        'connectedTop'
    ],
    setup(props:BtnGroupProps ,{ slots } : any){

        const $style = useCssModule()

        const { segmented = false, fullWidth = false, extraTight = false, tight = false, loose = false, connectedTop= false} = props;

        let $class = [
            $style.ButtonGroup,
            segmented !== false ? $style["ButtonGroup--segmented"]:null,
            fullWidth !== false ? $style["ButtonGroup--fullWidth"]:null,
            extraTight !== false ? $style["ButtonGroup--extraTight"]:null,
            tight !== false ? $style["ButtonGroup--tight"]:null,
            loose !== false ? $style["ButtonGroup--loose"]:null
        ]

        const getItem = (plain = false, node:any)=>{
            const focused = ref(false)

            return h('div',{
                class: [
                    $style.ButtonGroup__Item,
                    plain ? $style['ButtonGroup__Item--plain']: null,
                    focused.value ? $style['ButtonGroup__Item--focused']: null,
                ],
                onFocus: ()=>{ focused.value = true },
                onBlur: ()=>{ focused.value = false },
            }, node)
        }

        const getChildren = ()=>{
            let children:any = [];

            slots.default?.().map((node:any)=>{
                children.push( getItem(node.porps && node.porps.plain ? true: false, node ))
            })
            
            return children;
        }
        

        return ()=> h('div', { 
            class: $class,
            "data-buttongroup-segmented": segmented!== false?true:null,
            "data-buttongroup-connected-top": connectedTop!==false?true :null,
            "data-buttongroup-full-width": fullWidth!==false?true :null,
        }, getChildren())
    }
    
}
</script>



<style module>
    .ButtonGroup {
    --pc-button-group-item: 10;
    --pc-button-group-focused: 20;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(var(--p-space-2)*-1);
    margin-top: calc(var(--p-space-2)*-1)
}

.ButtonGroup__Item {
    margin-left: var(--p-space-2);
    margin-top: var(--p-space-2)
}

.ButtonGroup__Item--plain:not(:first-child) {
    margin-left: var(--p-space-4)
}

.ButtonGroup__Item--plain:not(:last-child) {
    margin-right: var(--p-space-2)
}

.ButtonGroup--segmented {
    display: flex;
    flex-wrap: nowrap;
    margin-left: 0;
    margin-top: 0
}

.ButtonGroup--segmented .ButtonGroup__Item {
    line-height: normal;
    margin-left: 0;
    margin-top: 0;
    position: relative;
    z-index: var(--pc-button-group-item)
}

.ButtonGroup--segmented .ButtonGroup__Item:not(:first-child) {
    margin-left: calc(var(--p-space-025)*-1)
}

.ButtonGroup--segmented .ButtonGroup__Item--focused {
    z-index: var(--pc-button-group-focused)
}

.ButtonGroup--fullWidth .ButtonGroup__Item {
    flex: 1 1 auto
}

.ButtonGroup--extraTight {
    margin-left: calc(var(--p-space-1)*-1);
    margin-top: calc(var(--p-space-1)*-1)
}

.ButtonGroup--extraTight .ButtonGroup__Item {
    margin-left: var(--p-space-1);
    margin-top: var(--p-space-1)
}

.ButtonGroup--tight {
    margin-left: calc(var(--p-space-2)*-1);
    margin-top: calc(var(--p-space-2)*-1)
}

.ButtonGroup--tight .ButtonGroup__Item {
    margin-left: var(--p-space-2);
    margin-top: var(--p-space-2)
}

.ButtonGroup--loose {
    margin-left: calc(var(--p-space-5)*-1);
    margin-top: calc(var(--p-space-5)*-1)
}

.ButtonGroup--loose .ButtonGroup__Item {
    margin-left: var(--p-space-5);
    margin-top: var(--p-space-5)
}

</style>