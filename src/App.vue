<template>
  <Main />
  <div
    v-loading.fullscreen.lock="showLoading"
    element-loading-text="Loading..."
    element-loading-background="rgba(33,33,33,0.7)"
  ></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "@/store";
import Main from "@/layouts/default/index.vue";

export default defineComponent({
  name: "App",
  components: {
    Main
  },
  setup() {
    const store = useStore();

    const reactiveData = reactive({
      showLoading: computed(() => store.state.showOverlay)
    });

    return {
      ...toRefs(reactiveData)
    };
  }
});
</script>

<style lang="scss">
.el-loading-mask.is-fullscreen .el-loading-spinner .circular {
  height: 80px;
  width: 80px;
}
.el-loading-spinner .el-loading-text {
  font-size: 24px;
}
</style>
