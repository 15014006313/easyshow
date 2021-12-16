<template>
  <div class="login">
    <div class="login-form">
      <a-form ref="formRef" name="custom-validation" :model="formData" :rules="rules" v-bind="layout" @submit="login">
        <a-form-item has-feedback label="Username" name="username">
          <a-input v-model:value="formData.username" type="text" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="Password" name="password">
          <a-input v-model:value="formData.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item label="remenber me" name="remenber" class="login-remenber">
          <a-switch v-model:checked="formData.remenber" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" class="login-btn">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import type { RuleObject } from "ant-design-vue/es/form";
  import type { UnwrapRef } from "vue";
  import { message } from "ant-design-vue";
  import { useRoute, useRouter } from "vue-router";

  export default defineComponent({
    setup() {
      interface account {
        username: string;
        password: string;
        remenber: boolean;
      }

      const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      };

      const formData: UnwrapRef<account> = reactive({
        username: "",
        password: "",
        remenber: false
      });
      const formRef = ref();
      let validateUsername = async (_rule: RuleObject, value: string) => {
        if (value === "") {
          return Promise.reject("Please input the username");
        } else {
          return Promise.resolve();
        }
      };
      let validatePassword = async (_rule: RuleObject, value: string) => {
        if (value === "") {
          return Promise.reject("Please input the password");
        } else if (value.length < 4) {
          return Promise.reject("Two inputs don't match!");
        } else {
          return Promise.resolve();
        }
      };
      const rules = {
        username: [{ required: true, validator: validateUsername, trigger: "change" }],
        password: [{ required: true, validator: validatePassword, trigger: "change" }]
      };

      const resetForm = () => {
        formRef.value.resetFields();
      };

      interface result {
        code: number;
        message: string;
        data?: any;
      }

      const loginApi = (username: string, password: string) => {
        if (username == "admin" && password == "admin") {
          return Promise.resolve({ code: 200, message: "success", data: { token: "123123" } });
        } else {
          return Promise.resolve({ code: 30402, message: "账号或密码错误", data: {} });
        }
      };
      const route = useRoute();
      const router = useRouter();

      const login = () => {
        loginApi(formData.username, formData.password)
          .then((res: result) => {
            console.log(res);
            if (res.code == 200) {
              message.success(res.message);
              localStorage.setItem("EASYSHOW_TOKEN", res.data.token);
              const next: string = route.query.from ? (route.query.from as string) : "/dashboard";
              router.push(next);
            } else {
              message.error(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

      return {
        rules,
        layout,
        formData,
        resetForm,
        login
      };
    }
  });
</script>

<style lang="scss">
  .login-form {
    width: 600px;
    margin: 0 auto;
    .login-remenber {
      .ant-form-item-control-input-content {
        display: flex;
        justify-content: flex-start;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
</style>