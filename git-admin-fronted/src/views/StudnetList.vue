<template>
  <div>
    <el-table :data="studentList" stripe style="width: 100%">
      <el-table-column label="头像" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="gitUserName" label="git用户名" width="180"></el-table-column>
      <el-table-column prop="class_name" label="班级"></el-table-column>
      <el-table-column label="最后提交时间">
        <template slot-scope="scope">
          {{scope.row.lastCommitTime | date-filter}}
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
        <el-button type="text">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentList } from "./../api/students";
import { mapActions,mapGetters } from 'vuex'
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['studentList'])
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    ...mapActions(['getStudents'])
  }
};
</script>

<style>
</style>