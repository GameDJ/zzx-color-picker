<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TypeTesting></TypeTesting>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import TypeTesting from "@/components/TypeTesting.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    TypeTesting,
  },
});
</script>
