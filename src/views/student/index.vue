<template>
  <div class="student">
    <a-button type="primary" @click="showEdit()">新增</a-button>
    <a-modal v-model:visible="editModal" title="新增" @ok="saveFun" cancelText="取消" okText="保存">
      <p>aaaa</p>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";

  export default defineComponent({
    setup() {
      let editModal = ref<boolean>(false);
      const showEdit = () => {
        editModal.value = true;
      };
      const saveFun = () => {
        console.log("保存");
      };
      return {
        showEdit,
        saveFun,
        editModal,
        student: reactive({})
      };
    }
  });
</script>

<style>
</style>