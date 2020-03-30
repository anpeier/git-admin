<template>
  <div class="addStudent" v-loading.fullscreen.lock="showLoading">
    <h1>新增学生</h1>
    <el-input placeholder="请输入git用户名" v-model="keyword" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" style="width:80px" @click="search"></el-button>
    </el-input>

    <div class="searchResult">
      <ul>
        <li v-for="item in res" :key="item.id">
          <img :src="item.avatar_url" alt />
          <span>{{item.login}}</span>
          <a :href="item.html_url">git地址</a>
          <el-button @click="showAddModel(item.login)">添加</el-button>
        </li>
      </ul>
    </div>
    <el-dialog title="新增学生" :visible.sync="showModel">
      <el-form :model="studentInfo">
        <el-form-item label="学生姓名" label-width="100px">
          <el-input v-model="studentInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" label-width="100px">
          <el-select v-model="studentInfo.className" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :label="item.name + '班'"
              :value="item.name"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showModel = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { searchGitUser } from "./../api/gitUsers.js";
import { addStudent } from "./../api/students.js";
import { mapGetters, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      keyword: "",
      res: [],
      showModel: false,
      showLoading: false,
      studentInfo: {}
    };
  },
  computed: {
    ...mapGetters(["classList"])
  },
  mounted() {},
  methods: {
    async search() {
      this.showLoading = true;
      this.res = await searchGitUser(this.keyword);
      this.showLoading = false;
    },
    showAddModel(gitName) {
      this.showModel = true;
      this.studentInfo.gitUserName = gitName;
    },
    addStudent() {
      this.showModel = false;
      this.showLoading = true;
      console.log(this.studentInfo)
      addStudent(this.studentInfo)
        .then(() => {
          this.showLoading = false;
          this.keyword = "";
          this.res = [];
          this.$message.success("添加成功");
          this.$store.dispatch("getClass");
          this.$router.push("/student/list");
        })
        .catch(error => {
          this.showLoading = false;
          this.$message.error("出错了，请重试");
        });
    }
  }
};
</script>

<style lang="scss">
.addStudent {
  width: 600px;
  h1 {
    font-size: 26px;
    margin-bottom: 10px;
  }
  .searchResult {
    li {
      display: block;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 800px;
      margin-left: 20px;
      margin-top: 20px;
      font-size: 18px;
      img {
        width: 50px;
        height: 50px;
      }
      a {
        font-size: 18px;
        color: rgba(0, 81, 255, 0.712);
      }
    }
  }
}
</style>