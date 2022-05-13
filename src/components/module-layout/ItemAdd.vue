<template>
    <li class="nav-item" >
        <div class="interior">
            <div class="primary-action">
                <q-btn flat dense align="left" class="primary-button" :label="$t(`button.${props.name}-add`)"></q-btn>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">

import { ref, watch, inject } from 'vue'

const props = defineProps({
    name: { type: String, required: true },
})

</script>