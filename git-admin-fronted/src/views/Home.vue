<template>
  <el-container style="height: 600px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1','1-1','1-2']" default-active="1-1-1">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>管理列表
          </template>
          <el-submenu index="1-1">
            <template slot="title">
              <i class="el-icon-view"></i>学生管理
            </template>
            <el-menu-item index="1-1-1" @click="toStudentList">
              <i class="el-icon-user"></i>学生列表
            </el-menu-item>
            <el-menu-item index="1-1-2" @click="toAddStudent">
              <i class="el-icon-circle-plus-outline"></i>新增学生
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">
              <i class="el-icon-s-home"></i>班级管理
            </template>
            <el-menu-item index="2-1" @click="toClassList">
              <i class="el-icon-user"></i>班级列表
            </el-menu-item>
            <el-menu-item index="2-2" @click="toAddClass">
              <i class="el-icon-circle-plus-outline"></i>新增班级
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 18px">
        <el-dropdown @command="getStuByClass">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in classList"
              :key="item.id"
              :command="item.name"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>旅梦学生git管理系统</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import { getClassList } from "./../api/class";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      count: 1
    };
  },
  computed: {
    ...mapGetters(["classList"])
  },
  mounted() {
    this.$store.dispatch("getClass").then(() => {
      this.$store.dispatch("getStudents");
    });
  },
  methods: {
    toAddStudent() {
      this.$router.push("/student/add");
    },
    toStudentList() {
      this.$store.dispatch("getStudents").then(() => {
        if (this.$route.path !== "/student/list") {
          this.$router.push("/student/list");
        }
      });
    },
    toClassList() {
      this.$router.push("/class/list");
    },
    toAddClass() {
      this.$router.push("/class/add");
    },
    getStuByClass(className) {
      this.$store
        .dispatch("getStudents", {
          className
        })
        .then(() => {
          if (this.$route.path !== "/student/list") {
            console.log("aaa");
            this.$router.push("/student/list");
          }
        });
    }
  }
};
</script>