<template>
  <div class="teacher">
    <TableFilter>
      <template v-slot:leftCen>
        <FilterItem lable="姓名">
          <a-input v-model:value="formData.name" />
        </FilterItem>
        <FilterItem lable="性别">
          <a-select v-model:value="formData.sex" placeholder="please select your zone">
            <a-select-option value="0">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
          </a-select>
        </FilterItem>
      </template>
    </TableFilter>
    <a-table :dataSource="dataSource" :columns="columns" :row-selection="rowSelection" :scroll="{ y: 550 }">
      <template #operation="{ record }">
        <a-button type="primary">编辑</a-button>
        <a-button type="primary">禁用</a-button>
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
          <a-button danger type="primary">删除</a-button>
        </a-popconfirm>
      </template>
      <template v-slot:title>
        <a-button type="primary" @click="showCreate(true)">新增</a-button>
      </template>
    </a-table>
    <a-modal v-model:visible="createModal" title="Basic Modal" @ok="createFun">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import TableFilter from "@/components/table/table-filter.vue";
  import FilterItem from "@/components/table/filter-item.vue";
  import { defineComponent, reactive, ref } from "vue";
  export default defineComponent({
    components: {
      FilterItem,
      TableFilter
    },
    setup() {
      let createModal = ref(false);
      const showCreate = (value: boolean) => {
        createModal.value = value;
      };
      const createFun = () => {
        console.log("创建");
      };
      const onDelete = (key: number) => {
        console.log("删除" + key);
      };
      let formData = reactive({
        name: "",
        sex: 0
      });
      const rowSelection = {
        onChange: (selectedRowKeys: (string | number)[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
        },
        onSelect: (record: DataType, selected: boolean, selectedRows: DataType[]) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: boolean, selectedRows: DataType[], changeRows: DataType[]) => {
          console.log(selected, selectedRows, changeRows);
        }
      };

      interface DataType {
        key: number;
        name: string;
        sex: string;
        age: number;
        teach_class: string;
        phone_number: string;
        address: string;
        state: string;
        username: string;
        password: string;
        induction_at: string;
      }

      const columns = [
        { title: "姓名", dataIndex: "name", width: 140 },
        { title: "性别", dataIndex: "sex" },
        { title: "年龄", dataIndex: "age" },
        { title: "授课班级", dataIndex: "teach_class" },
        { title: "联系方式", dataIndex: "phone_number" },
        { title: "地址", dataIndex: "address" },
        { title: "状态", dataIndex: "state" },
        { title: "账号", dataIndex: "username" },
        { title: "密码", dataIndex: "password" },
        { title: "入职时间", dataIndex: "induction_at" },
        {
          title: "操作",
          slots: { customRender: "operation" },
          fixed: "right",
          width: 250
        }
      ];
      const data: DataType[] = [];

      for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          name: `Edrward ${i}`,
          sex: "男",
          age: i + 1,
          teach_class: "大班",
          phone_number: "15014006313",
          address: "中国深圳",
          state: "在岗",
          username: "username",
          password: "password",
          induction_at: "2021-12-14"
        });
      }
      return {
        formData,
        columns,
        rowSelection,
        createModal,
        showCreate,
        createFun,
        onDelete,
        dataSource: ref(data)
      };
    }
  });
</script>

<style>
</style>