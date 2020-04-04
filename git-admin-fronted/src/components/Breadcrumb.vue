<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in curPathList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrum",
  data() {
    return {
      curPathList: []
    };
  },
  watch: {
    $route() {
      this.getPath();
    }
  },
  mounted() {
    this.getPath()
  },
  methods: {
    getPath() {
      console.log('this.$route')
      console.log(this.$route)
      this.curPathList = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      // console.log(this.curPathList)
    }
  }
};
</script>

<style lang='scss'>
.breadcrumb {
  .el-icon-arrow-right {
    color: #333333;
  }
  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
    display: inline-block;
    font-size: 18px;
    .el-breadcrumb__inner {
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>