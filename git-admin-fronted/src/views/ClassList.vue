<template>
  <el-table :data="classList" stripe style="width: 100%">
    <el-table-column prop="name" label="班级名" width="180"></el-table-column>
    <el-table-column prop="stuNum" label="人数" width="180"></el-table-column>
    <el-table-column label="创建时间" width="280">
      <template slot-scope="scope">{{scope.row.created | date-filter}}</template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="toClassDetail(scope.row)" type="text">查看</el-button>
        <el-button @click="editClass(scope.row)" type="text">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["classList"])
  },
  methods: {
    toClassDetail(classInfo) {
      this.$router.push(`/class/detail/${classInfo.name}`);
    },
    editClass(classInfo) {
      this.$store.dispatch("saveClassInfo", classInfo);
      this.$router.push(`/class/edit/${classInfo._id}`);
    }
  }
};
</script>

<style>
</style>