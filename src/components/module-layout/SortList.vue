<template>
    <ol class="sort-list" ref="draggerRef">
        <Item v-for="item in props.items" v-bind="item" :draggable="props.draggable"></Item>
    </ol>
</template>                        

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Item from './Item.vue'
import { Sortable, Plugins } from '@shopify/draggable'

interface Block {
    id: String | Number,
    type: String,
    json?: any,
    label?: String,
}

const draggerRef = ref(null)

const props = defineProps(
    ['items', 'draggable'],
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

        const draggable = new Sortable(draggerRef.value, {
            draggable: 'li',
            handle: '.drag-action',
            mirror: {
                constrainDimensions: true,
                xAxis: false,
                appendTo: '#pro'
            }
        });

        draggable.on('mirror:created',(data: any)=>{
            setTimeout(()=>{
                let {source} = data;
                source.className = 'nav-item-ghost'; 
                source.style.transform = 'translate3d(0px, 0px, 0px)'; 
                source.style.transition = 'transform 150ms ease 0s';
                source.innerHTML = "";
            },50)
            
        })
        draggable.on('drag:move',function(){
            console.log(arguments)
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