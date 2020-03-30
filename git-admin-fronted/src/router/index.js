import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StudnetList from "../views/StudnetList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/student/list"
  },
  {
    path: "/student",
    name: "Home",
    component: Home,
    children: [
      {
        path: "list",
        name: "StudentList",
        component: StudnetList
      },
      {
        path: "add",
        name: "Add",
        component: () => import("./../views/AddStudent.vue")
      },
      {
        path: "edit",
        name: "EditStu",
        component: () => import("./../views/EditStudent.vue")
      },
      {
        path: "detail/:id",
        name: "StuDetail",
        component: () => import("./../views/StuDetail.vue")
      }
    ]
  },
  {
    path: "/class",
    name: "Class",
    component: Home,
    children: [
      {
        path: "list",
        name: "ClassList",
        component: () => import("./../views/ClassList.vue")
      },
      {
        path: "add",
        name: "AddClass",
        component: () => import("./../views/AddClass.vue")
      },
      {
        path: "edit/:id",
        name: "EditClass",
        component: () => import("./../views/EditClass.vue")
      },
      {
        path: "detail/:name",
        name: "ClassDetail",
        component: () => import("./../views/ClassDetail.vue")
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("./../views/404.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
