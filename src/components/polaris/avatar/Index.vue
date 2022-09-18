<template>
    <div>
        <span
        aria-label="头像和姓名缩写 y l" role="img"
        :class="[$style.Avatar, $style['Avatar--sizeSmall'], $style['Avatar--styleTwo'], $style['Avatar--imageHasLoaded']]">
        <img alt=""
            src="https://cdn.shopifycdn.net/s/files/1/0516/6563/3432/users/avatar_250x250_crop_center_970c8517-2cb1-4983-a47e-2ed6b3a85c82_128x.jpg?v=1645756265"
            :class="$style.Avatar__Image" role="presentation"></span>
    </div>
</template>
<script lang="ts" setup>
    import $style from '../index.module.scss'
</script>