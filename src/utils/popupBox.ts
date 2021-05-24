import { ElMessageBox } from "element-plus";
import { MessageBoxData } from "element-plus/lib/el-message-box/src/message-box.type";

export async function PopSuccess(title?: string, message?: string, stickly?: boolean) {
  return await template("success", title, message, stickly);
}

export async function PopError(title?: string, message?: string, stickly?: boolean) {
  return await template("error", title, message, stickly);
}

export async function PopConfirm(title?: string, message?: string, stickly?: boolean) {
  return await template("warning", title, message, stickly, true);
}

async function template(
  type: "success" | "error" | "warning",
  title?: string,
  message?: string,
  stickly?: boolean,
  showCancel?: boolean
) {
  return ElMessageBox({
    type: type,
    title: title,
    message: message,
    confirmButtonText: "OK",
    cancelButtonText: showCancel === true ? "Cancel" : undefined,
    showClose: stickly !== true,
    closeOnClickModal: stickly !== true,
    closeOnPressEscape: stickly !== true,
    closeOnHashChange: stickly !== true
  })
    .then((action) => {
      return action as MessageBoxData;
    })
    .catch((action) => {
      return action as MessageBoxData;
    });
}
