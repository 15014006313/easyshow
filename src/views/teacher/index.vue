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
        <template v-if="column.key === 'action'">
          <a-button type="primary" @click="showEdit(record)">编辑</a-button>
          <a-button type="primary">禁用</a-button>
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
      <a-form :model="teacher" :label-col="{ span: 4 }">
        <a-form-item label="姓名">
          <a-input v-model:value="teacher.name" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group name="radioGroup" v-model:value="teacher.sex">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="年龄">
          <a-input-number v-model:value="teacher.age" />
        </a-form-item>
        <a-form-item label="授课班级">
          <a-select v-model:value="teacher.teach_class">
            <a-select-option value="1">大班</a-select-option>
            <a-select-option value="2">中班</a-select-option>
            <a-select-option value="3">小班</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="地址">
          <a-input v-model:value="teacher.address" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="teacher.status">
            <a-select-option value="1">在岗</a-select-option>
            <a-select-option value="2">休假</a-select-option>
            <a-select-option value="3">离职</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="入职时间">
          <a-date-picker v-model:value="teacher.induction_at" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import TableFilter from "@/components/table/table-filter.vue";
  import FilterItem from "@/components/table/filter-item.vue";
  import { defineComponent, reactive, ref } from "vue";
  import moment from "moment";
  import "moment/locale/zh-cn";
  export default defineComponent({
    components: {
      FilterItem,
      TableFilter
    },
    setup() {
      let editModal = ref<boolean>(false);
      const showEdit = (row: DataType) => {
        if (row) {
          teacher.key = row.key;
          teacher.name = row.name;
          teacher.sex = row.sex;
          teacher.age = row.age;
          teacher.teach_class = row.teach_class;
          teacher.phone_number = row.phone_number;
          teacher.address = row.address;
          teacher.status = row.status;
          teacher.username = row.username;
          teacher.password = row.password;
          teacher.induction_at = row.induction_at;
        } else {
          teacher.key = "";
          teacher.name = "";
          teacher.sex = "男";
          teacher.age = "";
          teacher.teach_class = "大班";
          teacher.phone_number = "";
          teacher.address = "";
          teacher.status = "在岗";
          teacher.username = "";
          teacher.password = "";
          teacher.induction_at = moment();
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
        key: number | string;
        name: string;
        sex: string;
        age: number | string;
        teach_class: string;
        phone_number: string;
        address: string;
        status: string;
        username: string;
        password: string;
        induction_at: moment.Moment;
      }

      const columns = [
        { title: "姓名", dataIndex: "name", width: 140 },
        { title: "性别", dataIndex: "sex" },
        { title: "年龄", dataIndex: "age" },
        { title: "授课班级", dataIndex: "teach_class" },
        { title: "联系方式", dataIndex: "phone_number" },
        { title: "地址", dataIndex: "address" },
        { title: "状态", dataIndex: "status" },
        { title: "账号", dataIndex: "username" },
        { title: "密码", dataIndex: "password" },
        { title: "入职时间", dataIndex: "induction_at", key: "induction_at", width: 200 },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 250
        }
      ];
      const data: DataType[] = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          key: i,
          name: `Edrward ${i}`,
          sex: "男",
          age: i + 1,
          teach_class: "大班",
          phone_number: "15014006313",
          address: "中国深圳",
          status: "在岗",
          username: "username",
          password: "password",
          induction_at: moment("2021-12-15", "YYYY-MM-DD")
        });
      }
      let teacher = reactive<DataType>({
        key: "",
        name: "",
        sex: "男",
        age: "",
        teach_class: "大班",
        phone_number: "",
        address: "",
        status: "在岗",
        username: "",
        password: "",
        induction_at: moment("2015-06-06", "YYYY-MM-DD")
      });
      return {
        formData,
        columns,
        rowSelection,
        editModal,
        showEdit,
        saveFun,
        onDelete,
        teacher,
        dataSource: ref(data)
      };
    }
  });
</script>

<style>
</style>