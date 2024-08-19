<template>
    <div class="color-controls-container">
        <table class="color-controls">
            <tr>
                <th>Address</th>
                <th>Original Color</th>
                <th>New Color</th>
            </tr>
            <tr v-for="(color, index) in loadedPalette" :key="index">
                <td>{{ loadedAddresses.addr[index] }}</td>
                <td class="color-sample" :style="{backgroundColor: Color.rgbString(color, true)}" />
                <td>
                    <input type="color" :value="Color.hexString(loadedPalette[index], true)" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import store from '@/store/store';
import { Color } from '@/types/colorTypes';
import { computed } from 'vue';
const loadedAddresses = computed(() => store.addresses());
const loadedPalette = computed(() => store.palette().slice(1));

</script>

<style scoped>
.color-controls-container {
    float: left;
    background-color: #ddd;
    width: 248px;
    height: 780px;
    min-height: 780px;
    text-align: center;
}

.color-controls {
    margin: auto;
    margin-top: 5px;
    margin-bottom: 7px;
}

.color-sample {
    display: inline-block;
    width: 50%;
    height: 20px;
}
</style>