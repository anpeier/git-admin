<template>
  <div>
    <el-table :data="commitList" style="width: 100%">
      <el-table-column prop="commits[0].message" label="提交信息" width="280"></el-table-column>
      <el-table-column label="提交时间" width="260">
        <template slot-scope="scope">{{scope.row.commitDate | date-filter}}</template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间">
        <template slot-scope="scope">{{scope.row.created | date-filter}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CommitList",
  props: {
    commitList: Array
  },
  mounted() {
    console.log(this.commitList);
  }
};
</script>

<style>
</style>