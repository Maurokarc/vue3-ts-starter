<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="24">
      <div class="home-container page-container">
        <img class="vue-element-plus-logo" alt="Vue logo" src="../../assets/logo.png" />
      </div>
    </el-col>
    <el-col :span="24" :md="12">
      <el-form id="form" :label-position="'right'" label-width="100px" :model="payload">
        <el-form-item :label="$t('_account_')">
          <el-input v-model="payload.acc" name="acc"></el-input>
        </el-form-item>
        <el-form-item :label="$t('_password_')">
          <el-input v-model="payload.psd" name="psd" show-password></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" @click="onSubmit">{{ $t("_login_") }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { encrypt } from "@/utils/crypto";
import { useStore } from "@/store";
import { RootMutations, AuthActions, AuthGetters } from "@/store/enums";

const router = useRouter();
const route = useRoute();
const store = useStore();

const payload = reactive({
  acc: "",
  psd: ""
});

async function onSubmit() {
  const form: HTMLFormElement | null = document.querySelector("#form");
  if (!form) return;
  const formData = new FormData(form);
  formData.set("psd", encrypt(formData.get("psd")?.toString() || ""));

  store.commit(RootMutations.DISPLAY_MASK, true);

  await store.dispatch(AuthActions.AJAX_LOGIN, formData);

  store.commit(RootMutations.DISPLAY_MASK, false);

  if (store.getters[AuthGetters.GET_REFRESH_TOKEN])
    nextTick(() => router.push({ path: route.query["redirect"]?.toString() || "/" }));
}
</script>

<style scoped lang="scss">
.home-container {
  .vue-element-plus-logo {
    width: 50%;
  }
}
</style>
