import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StudnetList from "../views/StudnetList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/student/list",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./../views/Login.vue"),
  },
  {
    path: "/student",
    name: "Home",
    component: Home,
    children: [
      {
        path: "list",
        name: "StudentList",
        component: StudnetList,
        meta: {
          title: "学生列表",
        },
      },
      {
        path: "add",
        name: "Add",
        component: () => import("./../views/AddStudent.vue"),
        meta: {
          title: "新增学生",
        },
      },
      {
        path: "edit/:id",
        name: "EditStu",
        component: () => import("./../views/EditStudent.vue"),
        meta: {
          title: "编辑信息",
        },
      },
      {
        path: "detail/:id",
        name: "StuDetail",
        component: () => import("./../views/StuDetail.vue"),
        meta: {
          title: "学生详情",
        },
      },
    ],
  },
  {
    path: "/class",
    name: "Class",
    component: Home,
    children: [
      {
        path: "list",
        name: "ClassList",
        component: () => import("./../views/ClassList.vue"),
        meta: {
          title: "班级列表",
        },
      },
      {
        path: "add",
        name: "AddClass",
        component: () => import("./../views/AddClass.vue"),
        meta: {
          title: "新增班级",
        },
      },
      {
        path: "edit/:id",
        name: "EditClass",
        component: () => import("./../views/EditClass.vue"),
        meta: {
          title: "班级编辑",
        },
      },
      {
        path: "detail/:name",
        name: "ClassDetail",
        component: () => import("./../views/ClassDetail.vue"),
        meta: {
          title: "班级详情",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("./../views/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
