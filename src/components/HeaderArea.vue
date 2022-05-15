 <template>
    <q-toolbar class="top-bar shadow-2">
        <div class="row flex-center">
            <q-btn flat dense>
                <q-icon>
                    <IconOut />
                </q-icon>
                <span>退出</span>
            </q-btn>
        </div>
        <div class="col-grow row justify-center flex-center q-pr-sm q-pl-sm">
            <q-btn class="select-template-btn" outline align="between" label="主页" icon-right="arrow_drop_down" >
                <q-menu fit class="page-template-menu" :offset="[0, 5]">
                    <q-list style="min-width: 100px">
                        <q-item>
                            <div class="title">模板</div>
                        </q-item>
                        <q-separator />
                        <q-item v-for="template in pageTemplates">
                            <q-btn align="left" flat dense class="full-width">
                                <q-icon class="prefix"><component :is="template.svg"></component></q-icon>
                                <span>{{ $t(`page-title.${template.value}`) }}</span>
                            </q-btn>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </div>
        <div class="row flex-center top-bar-right">
            <q-btn flat desne size="md" class="screen-toggle-btn">
                <q-icon v-if="screens[currentScreen]"><component :is="screens[currentScreen].svg" ></component></q-icon>
                <q-menu fit class="screen-menu" :offset="[0, 5]"  persistent auto-close>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-for="(screen,key) in screens" @click="onSwitchSceen(key)" :class="['items-center', currentScreen==key?'active':'']">
                            <q-btn flat dense>
                                <q-icon><component :is="screen.svg"></component></q-icon>
                                <span class="block">{{ screen.label }}</span>
                            </q-btn>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
            <q-separator vertical  />

            <q-btn flat desne size="md" class="screen-toggle-btn">
                <q-icon><IconUndo /></q-icon>
            </q-btn>
            <q-btn flat desne size="md" class="screen-toggle-btn">
                <q-icon><IconRedo /></q-icon>
            </q-btn>

            <q-separator vertical  />

            <q-btn style="margin-left: 0.5rem;" unelevated color="primary"  size="md" label="保存" disabled />
        </div>
    </q-toolbar>
</template>

<script setup lang="ts">
    import { ref, defineAsyncComponent  } from 'vue'
    import IconHome from './icons/pageTypes/IconHome.vue'
    import IconCollection from './icons/pageTypes/IconCollection.vue'
    import IconProduct from './icons/pageTypes/IconProduct.vue'
    import IconCart from './icons/pageTypes/IconCart.vue'
    import IconArticle from './icons/pageTypes/IconArticle.vue'

    import IconDesktop from './icons/screen/IconDesktop.vue'
    import IconShort from './icons/screen/IconShort.vue'
    import IconFull from './icons/screen/IconFull.vue'

    import IconOut from './icons/IconOut.vue'
    import IconUndo from './icons/IconUndo.vue'
    import IconRedo from './icons/IconRedo.vue'

    interface PageTemplate {
        value: string,
        icon?: string,
        svg?: any,
    }

    interface ScreenType {
        label: string,
        value: string,
        icon?: string,
        svg?: any,
    }

    const pageTemplates : Array<PageTemplate> = [
        { value: 'home', svg: IconHome },
        { value: 'collection', svg: IconCollection },
        { value: 'product', svg: IconProduct },
        { value: 'cart', svg: IconCart },
        { value: 'checkout', svg: IconCart },
        { value: 'article',svg: IconArticle },
    ]

    const screens : Array<ScreenType> = [
        { label:'桌面', value: 'desktop', svg: IconDesktop },
        { label:'移动版', value: 'mobile', svg: IconShort },
        { label:'全屏', value: 'full', svg: IconFull },
    ]

    const currentScreen = ref<number>(0);

    const onSwitchSceen = (key:number)=>{
        currentScreen.value = key
    } 

</script>
 
<style lang="scss">

    .page-template-menu .q-item{
        padding:0;

        .title{
            display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    width: 100%;
        }
        .q-btn{
            -webkit-appearance: none;
            appearance: none;
            margin: 0;
            padding: 0;
            background: none;
            border: none;
            font-size: inherit;
            line-height: inherit;
            color: inherit;
            cursor: pointer;
            outline: none;
            position: relative;
            display: flex;
            padding: 0.5rem 1rem;
            width: 100%;
            min-height: 2.75rem;
            text-align: left;

        }
    }

    .screen-menu .q-list{
        padding:8px;
    }
    .screen-menu .q-item{
        appearance: none;
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        font-size: inherit;
        line-height: inherit;
        cursor: pointer;
        width: 100%;
        min-height: 2.25rem;
        text-align: left;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 4px;
        color: inherit;

        button{
            -webkit-appearance: none;
            appearance: none;
            margin: 0;
            padding: 0;
            background: none;
            border: none;
            font-size: inherit;
            line-height: inherit;
            color: inherit;
            cursor: pointer;
            text-align: left;
            position: relative;
            display: flex;
            align-items: flex-start;
            width: 100%;
            cursor: pointer;
            border-radius: 4px;
            padding: 8px;
            word-wrap: break-word;
            word-break: break-word;
            overflow-wrap: break-word;
        }
    }


    .screen-menu .q-item.active{
        background-color: rgb(242, 247, 254);

        button:before {
            content: "";
            background-color: rgb(44, 110, 203);
            position: absolute;
            top: 0;
            left: -8px;
            height: 100%;
            display: block;
            width: 3px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }

    .top-bar{

        position: relative;
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        height: 3.5rem;
        background-color: rgba(255, 255, 255, 1)!important;
        border: 0;
        box-shadow: 0 2px 1px rgb(0 0 0 / 5%), 0 0 1px rgb(66 71 76 / 45%)!important;
    
        > *{
            height: 100%;
        }

 
        .q-separator--vertical{
            width: 0.0625rem;
            background-color: #c4cdd5;
            height: 100%;
        }
        .top-bar-right > * + *{
            margin-left: 0.5rem;
        }

        .select-template-btn{
            width: 21.5625rem; 
            height: 2.25rem;
            color: #202223;
            
            &.q-btn--outline:before{
                color: #c9cccf;
            }
            
        }
        .screen-toggle-btn{
            min-width: 2.25rem!important;
            min-height: 2.25rem!important;
            padding:0!important;
        }

        .q-item.active{
            position:relative;
        }

    }
    
    
    
 </style>