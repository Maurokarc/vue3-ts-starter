<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="24" :md="12">
      <el-form id="form" :label-position="'right'" label-width="100px" :model="payload">
        <el-form-item :label="$t('_old_password_')">
          <el-input v-model="payload.oldPsd" name="oldPsd" show-password></el-input>
        </el-form-item>
        <el-form-item :label="$t('_new_password_')">
          <el-input v-model="payload.newPsd" name="newPsd" show-password></el-input>
        </el-form-item>
        <el-form-item :label="$t('_new_password_confirm_')">
          <el-input v-model="payload.confirmPsd" name="confirmPsd" show-password></el-input>
        </el-form-item>
        <el-form-item class="form-actions">
          <el-button type="info" @click="onReset">{{ $t("_reset_") }}</el-button>
          <el-button type="success" @click="onSubmit">{{ $t("_submit_") }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { encrypt } from "@/utils/crypto";
import { useStore } from "@/store";
import { RootMutations, AuthActions } from "@/store/enums";
import { PopSuccess } from "@/utils/popupBox";
import { toLocalePath } from "@/router";
import { useI18n } from "vue-i18n";

const store = useStore();
const i18n = useI18n();

const payload = reactive({
  oldPsd: "",
  newPsd: "",
  confirmPsd: ""
});

async function onReset() {
  payload.oldPsd = "";
  payload.newPsd = "";
  payload.confirmPsd = "";
}

async function onSubmit() {
  const form: HTMLFormElement | null = document.querySelector("#form");
  if (!form) return;
  const formData = new FormData(form);
  formData.set("oldPsd", encrypt(formData.get("oldPsd")?.toString() || ""));
  formData.set("newPsd", encrypt(formData.get("newPsd")?.toString() || ""));

  store.commit(RootMutations.DISPLAY_MASK, true);

  const result = await store.dispatch(AuthActions.AJAX_CHNAGE_PASSWORD, formData);

  store.commit(RootMutations.DISPLAY_MASK, false);

  if (result) {
    await store.dispatch(AuthActions.AJAX_LOGOUT);

    await PopSuccess(i18n.t("_updated_pass_"), i18n.t("_plz_re_login_"));

    toLocalePath("login");
  }
}
</script>

<style scoped lang="scss">
.form-actions ::v-deep(.el-form-item__content) {
  display: flex;
  justify-content: space-between;
}
::v-deep(.el-input__icon.el-icon-view.el-input__clear) {
  font-size: 1.2rem;
}
</style>
