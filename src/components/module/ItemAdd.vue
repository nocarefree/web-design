<template>
    <li class="nav-item interactive" >
        <div class="interior">
            <div class="primary-action">
                <q-btn flat dense align="left" class="primary-button">
                    <q-icon class="prefix">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M15 10a1 1 0 0 1-1 1h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1zm-5-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"></path></svg>
                    </q-icon>
                    <span>{{ $t(`button.${props.name}-add`) }}</span>
                </q-btn>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">

import { ref, watch, inject } from 'vue'

const props = defineProps<{name:string}>()

</script>

<style lang="scss">
.interactive{
    button{
        color: var(--p-interactive)!important;
        svg{
            fill: var(--p-interactive);
        }
    }
    
}

</style>