<template>
  <div class="EditClass">
    <h1>编辑班级信息</h1>
    <el-form label-position="top" label-width="80px" :model="classInfo">
      <el-form-item label="班级名称">
        <el-input v-model="classInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="班级人数">
        <el-input v-model="classInfo.stuNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "EditClass",
  computed: {
    ...mapGetters(["classInfo"])
  },
  mounted() {
    let id = this.$route.params.id;
    if (this.classInfo._id == null) {
      this.$store.dispatch("getOneClass", {
        _id: id
      });
    }
  },
  methods: {
    onSubmit() {
      this.$confirm("是否确认修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("updateClaInfo", this.classInfo).then(() => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.$router.push("/class/list");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    cancle() {
      this.$router.push("/class/list");
    }
  }
};
</script>

<style lang="scss">
.EditClass {
  width: 500px;
  h1 {
    font-size: 26px;
    margin-bottom: 10px;
  }
}
</style>