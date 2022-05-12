<template>
    <ol class="sort-list" ref="draggerWrapperRef">
        <Item 
            v-for="item in props.items"  
            :id="props.parentId?`${props.parentId}/${item.id}`:item.id"
            v-bind="item" 
            :draggable="props.draggable" />
    </ol>
</template>                        

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Item from './Item.vue'
import { Draggable,Sortable, Plugins } from '@shopify/draggable'

interface Block {
    id: String | Number,
    type: String,
    json?: any,
    label?: String,
}

const draggerWrapperRef = ref(null)

const props = defineProps(
    ['items', 'draggable','parentId'],
)

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
            handle: '.drag-action',
            mirror: {
                constrainDimensions: true,
                xAxis: false,
                appendTo: '#pro'
            },
        });

        let startPoint:number = 0;
        let stepHeight:number = 0;
        let stepNum:number = 0;
        let childrenNum:number = 0;
        let startIndex:number = 0;


        function siblings(element: any){
            return Array.prototype.filter.call(element.parentNode.children,(e: any)=>{
                return e.style.display != 'none' && e.id;
            })
        }

        draggable.on('mirror:create',function(event: any){
            let {source, sensorEvent} = event, nodes = siblings(source);

            startPoint = sensorEvent.clientY;
            stepNum = 0;
            childrenNum = nodes.length;
            startIndex = Array.prototype.indexOf.call(nodes, source);
        })

        draggable.on('mirror:created',(data: any)=>{
            setTimeout(()=>{
                let {source, sensorEvent} = data;
                source.className = 'nav-item-ghost'; 
                source.style.transform = 'translate3d(0px, 0px, 0px)'; 
                source.style.transition = 'transform 150ms ease 0s';
                source.innerHTML = "";

                stepHeight = source.offsetHeight;

                let nodes = siblings(source);

                nodes.forEach((node: any, index:number)=>{
                    node.style.transform = 'translate3d(0px, 0px, 0px)'; 
                    node.style.transition = 'transform 150ms ease 0s';
                })
            })
        })

        

        draggable.on('drag:out',function(event: any){
            // console.log('drag:out')
            event.cancel()
        })

        draggable.on('drag:out:container',function(event: any){
            // console.log('drag:out:container')
            event.cancel()
        })

        draggable.on('drag:over:container',function(event: any){
            // console.log('drag:over:container')
            event.cancel()
        })

        draggable.on('drag:stop',function(event: any){
            let {sourceContainer} = event;
            sourceContainer.querySelectorAll('.nav-item').forEach((node: any, index: number)=>{
                node.style.transform = null; 
                node.style.transition = null;
            })
        })

        
        draggable.on('drag:move',function(event: any){
            const { source, sensorEvent } = event;

            let moveY = sensorEvent.clientY - startPoint;

            let _stepNum = Math.round(moveY / stepHeight), toIndex =_stepNum+startIndex ;


            if(_stepNum != stepNum && toIndex<childrenNum && toIndex>=0){
                stepNum = _stepNum;

                siblings(source).forEach((node: any, index: number)=>{
                    if(stepNum < 0 && index>= toIndex && index<startIndex ){
                        node.style.transform = 'translate3d(0px, '+ stepHeight +'px, 0px)'; 
                    }else if(stepNum > 0 && index<=toIndex  && index>startIndex ) {
                        node.style.transform = 'translate3d(0px, '+ (-1* stepHeight) +'px, 0px)'; 
                    }else{
                        node.style.transform = 'translate3d(0px, 0px, 0px)'; 
                    }
                    source.style.transform = 'translate3d(0px, '+ (stepHeight*stepNum) +'px, 0px)'; 
                }) 
            }

            

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