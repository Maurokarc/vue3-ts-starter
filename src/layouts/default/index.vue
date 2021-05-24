<template>
  <el-container class="root-container">
    <el-header>
      <top-bar />
    </el-header>
    <el-container>
      <el-scrollbar v-if="isAuthenticated" class="left-side-bar-scrollar" height="100%">
        <el-aside :width="null">
          <lef-side-bar />
        </el-aside>
      </el-scrollbar>
      <el-container class="main-view">
        <el-scrollbar height="100%">
          <el-main>
            <router-view v-slot="{ Component }">
              <transition name="el-fade-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import { useStore } from "@/store";
import { AuthGetters } from "@/store/enums";
import Header from "./top-bar.vue";
import SideBar from "./lef-side-bar.vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    "top-bar": Header,
    "lef-side-bar": SideBar
  },
  setup() {
    const store = useStore();

    const reactiveData = reactive({
      isAuthenticated: computed(() => store.getters[AuthGetters.GET_AUTHENTICATED])
    });

    return { ...toRefs(reactiveData) };
  }
});
</script>

<style scoped lang="scss">
$padding-side: 10px;

.root-container {
  background: $--second-background-color;

  .el-header {
    width: 100%;
    background: $--background-color;
    height: $--top-height;
    margin-bottom: 10px;
    display: flex;
    font-weight: bold;
  }

  ::v-deep(.main-view) {
    width: 100%;
    height: calc(100vh - #{$--top-height} - #{$padding-side});
    box-sizing: border-box;
    position: relative;
    padding: 0 $padding-side $padding-side $padding-side;
    flex-direction: column;

    .el-main {
      height: 100%;
      min-height: calc(100vh - #{$--top-height} - calc(#{$padding-side} * 2));
      background: $--background-color;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }

  ::v-deep(.el-aside) {
    width: $--left-bar-width;
    margin-right: $padding-side;
    height: calc(100vh - #{$--top-height} - calc(#{$padding-side} * 2));
    background: $--background-color;
  }

  .left-side-bar-scrollar {
    width: calc(#{$--left-bar-width} + 40px);
  }
}
</style>
