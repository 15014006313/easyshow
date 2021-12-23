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
    <a-table :data-source="dataSource" :columns="columns" :row-selection="rowSelection" :scroll="{ y: 550 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'induction_at'">
          <p>{{ record.induction_at.format("YYYY-MMM-Do h:mm:ss") }}</p>
        </template>
        <template v-if="column.key === 'menu'">
          <a-button type="primary" @click="showMenuModal(record)">编辑</a-button>
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="primary" @click="showEdit(record)">编辑</a-button>
          <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
            <a-button danger type="primary">删除</a-button>
          </a-popconfirm>
        </template>
      </template>
      <template #title>
        <a-button type="primary" @click="showEdit()">新增</a-button>
      </template>
    </a-table>
    <a-modal v-model:visible="editModal" title="新增" @ok="saveFun" cancelText="取消" okText="保存">
      <a-form :model="role" :label-col="{ span: 4 }">
        <a-form-item label="角色名称">
          <a-input v-model:value="role.role_name" />
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-model:value="role.remark" />
        </a-form-item>
        <a-form-item label="角色权限">
          <a-input v-model:value="role.role_power" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-drawer v-model:visible="menuDrawer" class="custom-class" style="color: red" title="Basic Drawer" placement="right">
      <a-tree v-model:checkedKeys="checkedKeys" checkable :tree-data="treeData" :fieldNames="fieldNames" :defaultExpandAll="true" @check="menuCheck">
        <template #title="{ title, key }">
          <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
          <template v-else>{{ title }}</template>
        </template>
      </a-tree>
      <template #footer>
        <a-button style="margin-right: 8px" @click="menuDrawer = false">Cancel</a-button>
        <a-button type="primary" @click="editMenu">Submit</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts">
  import TableFilter from "@/components/table/table-filter.vue";
  import FilterItem from "@/components/table/filter-item.vue";
  import { defineComponent, reactive, ref, watch } from "vue";
  import menus from "@/assets/data/menu";
  import "moment/locale/zh-cn";
  export default defineComponent({
    components: {
      FilterItem,
      TableFilter
    },
    setup() {
      let editModal = ref<boolean>(false);
      const showEdit = (row: Role) => {
        if (row) {
          role.value = row;
        } else {
          role.value = {
            key: "",
            role_id: "",
            role_name: "",
            remark: "",
            role_power: "",
            role_menu: []
          };
        }
        editModal.value = true;
      };
      const saveFun = () => {
        console.log("保存");
      };
      const onDelete = (key: number) => {
        console.log("删除" + key);
      };
      let formData = reactive({
        name: "",
        sex: "男"
      });

      const rowSelection = {
        onChange: (selectedRowKeys: (string | number)[], selectedRows: Role[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
        },
        onSelect: (record: Role, selected: boolean, selectedRows: Role[]) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: boolean, selectedRows: Role[], changeRows: Role[]) => {
          console.log(selected, selectedRows, changeRows);
        }
      };

      interface Role {
        role_id: number | string;
        key: number | string;
        role_name: string;
        remark: string;
        role_power: string;
        role_menu: string[];
      }

      const columns = [
        { title: "姓名", dataIndex: "role_name", width: 300 },
        { title: "备注", dataIndex: "remark" },
        {
          title: "菜单",
          key: "menu",
          width: 250
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 250
        }
      ];
      const data: Role[] = [
        {
          key: 1,
          role_id: 101,
          role_name: `Edrward 1`,
          remark: "",
          role_power: "",
          role_menu: ["10001", "10002", "10003", "10004"]
        },
        {
          key: 2,
          role_id: 102,
          role_name: `Edrward 2`,
          remark: "",
          role_power: "",
          role_menu: ["10001", "10002"]
        },
        {
          key: 3,
          role_id: 103,
          role_name: `Edrward 3`,
          remark: "",
          role_power: "",
          role_menu: ["10001", "10003"]
        },
        {
          key: 4,
          role_id: 104,
          role_name: `Edrward 4`,
          remark: "",
          role_power: "",
          role_menu: ["10001", "10004"]
        }
      ];
      const menuDrawer = ref<boolean>(false);
      const showMenuModal = (record: Role, show = true) => {
        role.value = record;

        checkedKeys.value = record.role_menu;
        menuDrawer.value = show;
      };
      let role = ref<Role>({
        role_id: "",
        key: "",
        role_name: ``,
        remark: "",
        role_power: "",
        role_menu: []
      });

      const treeData = menus;
      const checkedKeys = ref<string[]>(["10001"]);
      const expandedKeys = ref<string[]>([]);
      const fieldNames = ref({
        children: "children",
        title: "title",
        key: "id"
      });

      watch(checkedKeys, () => {
        console.log("checkedKeys", checkedKeys);
      });
      const menuCheck = (checkedKeys: any, e: any) => {
        console.log([...checkedKeys, ...e.halfCheckedKeys]);
        // checkedKeys.value = [...checkedKeys, ...e.halfCheckedKeys];
      };

      const editMenu = () => {
        console.log(role.value.role_id, checkedKeys.value);
        menuDrawer.value = false;
      };
      return {
        formData,
        columns,
        rowSelection,
        editModal,
        role,
        treeData,
        menuDrawer,
        fieldNames,
        expandedKeys,
        checkedKeys,
        dataSource: ref(data),
        showEdit,
        saveFun,
        onDelete,
        editMenu,
        menuCheck,
        showMenuModal
      };
    }
  });
</script>

<style>
</style>