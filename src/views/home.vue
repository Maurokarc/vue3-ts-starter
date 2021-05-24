<template>
  <div class="home-container">
    <img class="vue-element-plus-logo" alt="Vue logo" src="../assets/logo.png" />
    <div class="page-title">Home Page</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.home-container {
  text-align: center;
  .vue-element-plus-logo {
    width: 50%;
  }
}
</style>
