import { reactive, ref } from "vue"
import TableFilter from "@/components/table/table-filter.vue";
import FilterItem from "@/components/table/filter-item.vue";
export default function () {
  let FormData = reactive({

  });
  let pageSize = ref(20);
  let pageIndex = ref(1);
  let searchFun = () => {
    console.log("搜索");
  };
  let resetForm = () => {
    FormData = reactive({

    });
  }
  return {
    FormData,
    pageSize,
    pageIndex,
    searchFun,
    resetForm
  }
}