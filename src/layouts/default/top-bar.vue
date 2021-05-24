<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
    <el-col :span="6">
      <div class="title" @click="toLocalePath('home')">vu3 typescript starter</div>
    </el-col>
    <el-col :span="6">
      <div style="float: right; align-items: center; display: flex">
        <el-dropdown v-if="isAuthenticated" class="user-menu">
          <span class="el-dropdown-link">
            <font-awesome-icon :icon="['fa', 'user']" size="lg" style="margin-right: 4px" />
            {{ userName }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toLocalePath('changePassword')">
                <font-awesome-icon
                  :icon="['fa', 'sign-out-alt']"
                  size="lg"
                  style="margin-right: 4px"
                />
                {{ $t("_change_password_") }}
              </el-dropdown-item>
              <el-dropdown-item divided @click="onLogout">
                <font-awesome-icon :icon="['fa', 'key']" size="lg" style="margin-right: 4px" />
                {{ $t("_logout_") }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link">
            <font-awesome-icon :icon="['fa', 'globe-asia']" size="2x" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="locale in $i18n.availableLocales"
                :key="locale"
                :class="{ active: currentLocale === locale }"
                @click="toLocalePath(undefined, locale)"
              >
                {{ $t(`_lang_`, locale) }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { fallbackLocale } from "@/i18n";
import { useRouter } from "vue-router";
import { toLocalePath as _toLocalePath } from "@/router";
import { useStore } from "@/store";
import { RootMutations, AuthActions, AuthGetters } from "@/store/enums";

export default defineComponent({
  name: "DefaultTopBar",

  setup() {
    const { locale } = useI18n();
    const router = useRouter();
    const store = useStore();

    const reactiveData = reactive({
      router: computed(() => router),
      userName: computed(() => (store.getters[AuthGetters.GET_USER_INFO] || {}).userName || ""),
      currentLocale: computed(() => locale.value),
      isAuthenticated: computed(() => store.getters[AuthGetters.GET_AUTHENTICATED])
    });

    function toLocalePath(pageName?: string, locale?: string) {
      const routeLang = (router.currentRoute.value.params.lang as string) || "";
      const lang = !routeLang ? (locale !== fallbackLocale ? locale : "") : locale;
      const page = pageName || (router.currentRoute.value.name as string) || "";

      _toLocalePath(page, lang);
    }

    async function onLogout() {
      store.commit(RootMutations.DISPLAY_MASK, true);
      await store.dispatch(AuthActions.AJAX_LOGOUT);

      window.location.reload();
    }

    return { toLocalePath, onLogout, ...toRefs(reactiveData) };
  }
});
</script>

<style scoped lang="scss">
.title {
  font-size: 20px;
  cursor: pointer;
}

.el-dropdown-menu__item.active {
  color: $--color-primary;
  min-width: 160px;
}

::v-deep(.user-menu) {
  margin-right: 32px;
}

::v-deep(.el-dropdown) {
  transition-property: color;
  transition-duration: 0.4s;
  transition-timing-function: ease;

  &:hover {
    color: black;
  }
}
</style>
