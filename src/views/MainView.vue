<template>
  <div class="main-view">
    <AppBar />
    <router-view />
  </div>
</template>
<script>
import AppBar from "@/components/AppBar.vue";

export default {
  name: "MainView",
  components: { AppBar },
};
</script>
