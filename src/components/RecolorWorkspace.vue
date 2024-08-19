<template>
    <div>
        <!-- <SpriteSelector @selectSprite="selectSprite"/> -->
        <SpriteSelector />
        <div class="workspace-container">
            <ColorControls />
            <SpriteGrid />
        </div>
    </div>
</template>

<script setup lang="ts">
import SpriteSelector from './SpriteSelector.vue';
import ColorControls from './ColorControls.vue';
import SpriteGrid from './SpriteGrid.vue';
// import { LoadedSprite, Sprite } from '@/types/spriteTypes';
// import { ref } from 'vue';

// const selectedSprite = ref(null as LoadedSprite);

// function selectSprite(sprite: Sprite) {
//     console.log("sprite selected");
//     selectedSprite.value = sprite;
// }

</script>

<style scoped>
div {
    display: block;
}
</style>