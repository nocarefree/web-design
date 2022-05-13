<template>
    <ol class="sort-list" ref="draggerWrapperRef">
        <Item 
            v-for="item in props.items"  
            :id="props.parentId?`${props.parentId}/${item.id}`:item.id"
            v-bind="item" 
            :draggable="props.draggable" />
        <ItemAdd 
            v-if="props.addable !== false" 
            :name="props.name">
        </ItemAdd>
    </ol>
</template>                        

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Item from './Item.vue'
import ItemAdd from './ItemAdd.vue'
import { Draggable,Sortable, Plugins } from '@shopify/draggable'
import { isSet } from '@vue/shared';

interface Block {
    id: String | Number,
    type: String,
    json?: any,
    label?: String,
}

const draggerWrapperRef = ref(null)

const props = defineProps({
    id: { type: String, required: true },
    name: { type: String, required: true },
    items: { type:Array },
    parentId: { type: String },
    draggable: { type:Boolean, default:false },
    addable: { type:Boolean, default:false },
})

// const onDragStart = Symbol('onDragStart');
// const onDragMove = Symbol('onDragMove');
// const onDragStop = Symbol('onDragStop');
// const onDragPressure = Symbol('onDragPressure');


// class Mirror extends Draggable.Plugins.Mirror{
//     constructor(draggable :any){
//         super(draggable)
//     }

//     appendOverLay(){
//         let o = document.createElement("div");
//         o.className = 'drag-overlay'; 
//         let clone = this.mirror.clone(true);
//         this.mirror = o.appendChild(clone);
//         this.mirror.parentNode.replaceChild(o, this.mirror)
//         this.mirror = o;
//     }
// }



onMounted(() => {
    if (typeof (props.draggable) != undefined) {

        const draggable = new Draggable(draggerWrapperRef.value, {
            draggable: 'li',
            handle: ' .interior .drag-action',
            mirror: {
                constrainDimensions: true,
                xAxis: false,
                appendTo: '#pro'
            },
        });

        let sorting:boolean = true;
        let sortIds:Array<string>= [];
        let startPrefix:number = 0;
        let itemSpace:number = 0;


        function siblings(element: any){
            return Array.prototype.filter.call(element.parentNode.children,(e: any)=>{
                return e.style.display != 'none' && e.id;
            })
        }

        draggable.on('mirror:created',(data: any)=>{
            requestAnimationFrame(()=>{
                let {source, mirror, sensorEvent} = data,
                    b = mirror.querySelectorAll('.plain-action-wrapper')[0],
                    c = mirror.querySelectorAll('.collapsible')[0],
                    nodes = siblings(source);

                source.className = 'nav-item-ghost'; 
                source.style.transform = 'translate3d(0px, 0px, 0px)'; 
                source.style.transition = 'transform 150ms ease 0s';
                source.innerHTML = "";

                //修改 mirror
                mirror.style.pointerEvents = null;
                b?b.parentNode.removeChild(b):'';
                c?c.parentNode.removeChild(c):'';
                sorting = false;
                sortIds = [];

                let parentTop = source.parentNode.getBoundingClientRect().top;
                let firstTop = nodes[0].getBoundingClientRect().top;
                startPrefix = firstTop - parentTop;
                itemSpace =  nodes[1].offsetTop - nodes[0].offsetTop - nodes[0].offsetHeight;

                nodes.forEach((node: any, index:number)=>{
                    node.style.transform = 'translate3d(0px, 0px, 0px)'; 
                    node.style.transition = 'transform 150ms ease 0s';
                    sortIds.push(node);
                })
            })
        })

        draggable.on('drag:start',function(event: any){
            // console.log(event);
        })


        draggable.on('drag:out',function(event: any){
            // console.log('drag:out')
            // event.cancel()
        })

        draggable.on('drag:out:container',function(event: any){
            // console.log('drag:out:container')
            // event.cancel()
        })

        draggable.on('drag:over:container',function(event: any){
            // console.log('drag:over:container')
            // event.cancel()
        })

        draggable.on('drag:stop',function(event: any){
            let {sourceContainer} = event;
            sourceContainer.querySelectorAll('.nav-item').forEach((node: any, index: number)=>{
                node.style.transform = null; 
                node.style.transition = null;
            })
        })


        function withInContainer(fRect:any, target:any){

            if(fRect.bottom  > (target.top + fRect.height/2 ) && fRect.top < (target.top + fRect.height/2 )  ){
                return true;
            }
            return false;
        }

        function sortedNode(nodes:Array<any>, form:number, to:number){

            if(form == to && typeof nodes[form] == undefined && nodes[to] == undefined){
                return false;
            }

            let stepNum = to - form;
            let source = nodes[form];
            let stepHeight = source.offsetHeight
            let moveHeight = 0;

            console.log('css:',form, to);

            nodes.forEach((node: any, index: number)=>{
                if(stepNum < 0 && index>= to && index<form ){
                    moveHeight += -1*node.offsetHeight;
                    node.style.transform = 'translate3d(0px, '+ stepHeight +'px, 0px)'; 
                    // startHeight += node.offsetHeight
                }else if(stepNum > 0 && index<=to  && index>form ) {
                    // startHeight += node.offsetHeight
                    moveHeight += node.offsetHeight;
                    node.style.transform = 'translate3d(0px, '+ (-1* stepHeight) +'px, 0px)'; 
                }else{
                    node.style.transform = 'translate3d(0px, 0px, 0px)'; 
                }
            }) 
            source.style.transform = 'translate3d(0px, '+(moveHeight)+'px, 0px)'; 
            return true;
        }
        
        draggable.on('drag:move',function(event: any){
            const { source, sensorEvent, sourceContainer } = event;

            if(sorting && source.parentNode != sourceContainer){
                return false;
            }

            

            let mirrorRect = sensorEvent.target.getBoundingClientRect();
            let {top, bottom} = source.parentNode.getBoundingClientRect();   
            if(mirrorRect.top < top || mirrorRect.bottom > bottom ){
                return null;
            }
            
            sorting = true;
            let nodes:Array<any> = siblings(source);
            let rangHeight = 0;
            let startIndex:number = sortIds.findIndex((node:any)=>node == source)

            // top = nodes[0].getBoundingClientRect().top;
            let moveY = mirrorRect.top - top - startPrefix;

            if(startIndex <0){
                return null;
            }

            sortIds.some((node: any, index)=>{
                if( (rangHeight-10)<moveY && moveY < ( rangHeight+15)){

                    if(startIndex != index){
                        sortIds.splice(startIndex,1)
                        sortIds.splice(index, 0 , source)
                        
                        console.log('as:',startIndex,index, sortIds);
                        sortedNode(nodes, nodes.findIndex(i=>i==source), index);

                        return true;
                    }
                    return true;
                }else{
                    rangHeight += node.offsetHeight + itemSpace;
                }
            })

            sorting = false;   
            return false;
            
        })

    }
})




</script>

<style lang="scss">

@keyframes _drag-lift_1nha1_1 {
    to {
        transform: translate3d(1.25rem,0,0);
        margin-right: .5rem
    }
}


.draggable-mirror{
    z-index: 999;
    list-style: none;
    touch-action: none;
    cursor: grabbing!important;
    padding: 0!important;
    margin:0;

    .collapsible{
        display: none!important;
    }

    .disclosure >button i {
        transform: rotate(-90deg)!important;
    }

    button{
        

        pointer-events: none!important;
        touch-action: none!important;
        -webkit-user-select: none!important;
        user-select: none!important;
    }

    .interior{
        animation: _drag-lift_1nha1_1 var(--p-duration-150) cubic-bezier(0.18,0.67,0.6,1.22) both;
    }

    .drag-action-wrapper{
        opacity: 1!important;
    }

    .drag-action:after {
        box-shadow: 0 0 0 0.125rem var(--p-focused)!important;
        outline: 0.0625rem solid transparent!important;
        top: 0.1875rem!important;
        right: 0.1875rem!important;
        bottom: 0.1875rem!important;
        left: 0.1875rem!important;
        border-radius: 0.125rem!important;
    }

    .primary-button {
        border-radius: var(--p-border-radius-1)!important;
        box-shadow: 0 0.0625rem 0.1875rem 0 var(--p-backdrop)!important;
        background-color: var(--p-surface)!important;
    }
}
</style>