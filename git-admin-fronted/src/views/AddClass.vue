<template>
  <div class="AddClass">
    <h1>新增班级</h1>
    <el-input placeholder="请输入班级名" v-model="name" class="input-with-select">
      <el-button slot="append" style="width:80px" @click="doAddClass">添加</el-button>
    </el-input>
  </div>
</template>

<script>
import { addClass } from "./../api/class";
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    doAddClass() {
      addClass(this.name).then(() => {
        this.$message.success("添加成功");
        this.$store.dispatch("getClass");
        this.$router.push("/class/list");
      });
    }
  }
};
</script>

<style lang="scss">
.AddClass {
  h1 {
    font-size: 26px;
    margin-bottom: 10px;
  }
}
</style>