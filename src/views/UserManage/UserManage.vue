<template>
  <div class="manage">
    <el-dialog
      :visible.sync="isShow"
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button icon="el-icon-plus" type="primary" @click="addUser"
        >新增</el-button
      >
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      @changePage="getList"
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from "../../components/CommonForm";
import CommonTable from "../../components/CommonTable";
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      isShow: false,
      operateType: "add",
      operateForm: [
        {
          name: "",
          addr: "",
          age: "",
          birth: "",
          sex: ""
        }
      ],
      operateFormLabel: [
        {
          model: "name",
          label: "名字"
        },
        {
          model: "age",
          label: "年龄"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        },
        {
          model: "addr",
          label: "地址"
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      formLabel: [
        {
          model: "keyword",
          label: ""
        }
      ],
      searchForm: {
        keyword: ""
      }
    };
  },
  methods: {
    getList(name = "") {
      this.config.loading = true;
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : "";
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
            name
          }
        })
        .then(res => {
          console.log(res.data.list);

          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          this.$http
            .get("/api/user/del", {
              params: {
                id
              }
            })
            .then(res => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addUser() {
      this.operateForm = {};
      this.operateType = "add";
      this.isShow = true;
    },
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/api/user/edit", this.operateForm).then(res => {
          this.isShow = false;
          this.getList();
          console.log(res.data);
        });
      } else if (this.operateType === "add") {
        this.$http.post("/api/user/add", this.operateForm).then(res => {
          this.isShow = false;
          this.getList();
        });
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
