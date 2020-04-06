<template>
  <div class="stuList">
    <el-table :data="stuList" stripe class="stuTable">
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="gitUserName" label="git用户名"></el-table-column>
      <el-table-column prop="className" label="班级" width="160"></el-table-column>
      <el-table-column label="最后提交时间">
        <template slot-scope="scope">{{scope.row.lastCommitTime | date-filter}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="btnType==1">
            <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
            <el-button type="text" @click="upDateStu(scope.row)">编辑</el-button>
          </div>
          <div v-else>
            <el-button
              :disabled="!scope.row.status"
              @click="$emit('remind',scope.row)"
              type="text"
            >{{scope.row.status?'提醒':'已提醒'}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StuList",
  props: {
    stuList: Array,
    btnType: {
      type: Number,
      default: 1
    }
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

<style lang="scss">
.stuList {
  .stuTable {
    width: 96%;
    padding-left: 1%;
  }
}
</style>