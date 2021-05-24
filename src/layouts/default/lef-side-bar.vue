<template>
  <el-menu>
    <el-menu-item
      index="1"
      :class="{ active: 'home' === currentRouteName }"
      @click="toLocalePath('home')"
    >
      <font-awesome-icon class="font-awesome" :icon="['fa', 'home']" size="lg" />
      <span>Home</span>
    </el-menu-item>
    <el-menu-item
      index="2"
      :class="{ active: 'welcome' === currentRouteName }"
      @click="toLocalePath('welcome')"
    >
      <font-awesome-icon class="font-awesome" :icon="['fa', 'chalkboard-teacher']" size="lg" />
      <span>Welcome</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import { toLocalePath } from "@/router";
import { useStore } from "@/store";

export default defineComponent({
  name: "DefaultLefSideBar",

  setup() {
    const router = useRouter();
    const store = useStore();

    const reactiveData = reactive({
      currentRouteName: computed(() => router.currentRoute.value.name)
    });

    return {
      toLocalePath,
      ...toRefs(reactiveData)
    };
  }
});
</script>

<style scoped lang="scss">
li.el-menu-item {
  &.active {
    font-weight: bold;
    color: $--color-primary;
    background: $--second-background-color;
  }
  &.is-active {
    color: $--color-primary;
  }
}

ul.el-menu {
  border-right: solid 0px transparent !important;
}
svg.font-awesome {
  color: #909399;
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}
</style>
