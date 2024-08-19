<template>
    <div class="tree-container">
        <div v-for="seriesKey in seriesList.keys()" :key="seriesKey">
            <h2 class="tree">{{ seriesKey }}</h2>
            <div
                v-for="gameKey in seriesList.get(seriesKey).keys()"
                :key="gameKey"
                style="margin-left: 100px"
            >
                <h3 class="tree">{{ gameKey }}</h3>
                <div
                    v-for="spriteKey in seriesList
                        .get(seriesKey)
                        .get(gameKey)
                        .keys()"
                    :key="spriteKey"
                    style="margin-left: 100px"
                >
                    <button
                        @click="
                            selectSprite(
                                seriesList
                                    .get(seriesKey)
                                    .get(gameKey)
                                    .get(spriteKey)
                            )
                        "
                    >
                        {{ spriteKey }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import store from "@/store";
import store from "@/store/store";

import { series } from "@/assets/sprites";
import { Sprite } from "@/types/spriteTypes";
const seriesList = series;
console.log(seriesList.keys());

// const emit = defineEmits(["selectSprite"]);

// function selectSprite(sprite: Sprite) {
//     emit("selectSprite", sprite);
// }

function selectSprite(sprite: Sprite) {
    // store.dispatch("setCurrentSprite", sprite);
    // store.dispatch("resetPalette");
    store.loadSprite(sprite);
}

</script>

<style scoped>
h2,
h3,
h4 {
	margin-top: 4px;
	margin-bottom: 4px;
}

.tree-container {
	display: block;
	float: left;
}
</style>