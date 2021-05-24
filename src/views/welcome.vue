<template>
  <div class="page-title">{{ $t("_welcome_") }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { AuthGetters } from "@/store/enums";

export default defineComponent({
  name: "Test",
  setup() {
    const store = useStore();

    //will be ignore when production , set in vite.config
    console.log(JSON.stringify(store.getters[AuthGetters.GET_USER_INFO]));

    return {};
  }
});
</script>

<style scoped lang="scss"></style>
