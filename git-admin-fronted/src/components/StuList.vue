<template>
  <div>
    <el-table :data="stuList" stripe style="width: 100%; padding-left:2%">
      <el-table-column label="头像" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="gitUserName" label="git用户名" width="180"></el-table-column>
      <el-table-column prop="className" label="班级" width="180"></el-table-column>
      <el-table-column label="最后提交时间" width="240">
        <template slot-scope="scope">{{scope.row.lastCommitTime | date-filter}}</template>
      </el-table-column>
      <el-table-column  label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
          <el-button type="text" @click="upDateStu(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StuList",
  props: {
    stuList: Array
  },
  methods: {
    handleClick(stuInfo) {
      this.$store.dispatch("saveStuInfo", stuInfo);
      this.$router.push(`/student/detail/${stuInfo._id}`);
    },
    upDateStu(stuInfo) {
      this.$store.dispatch("saveStuInfo", stuInfo);
      this.$router.push(`/student/edit/${stuInfo._id}`);
    }
  }
};
</script>

<style>
</style>