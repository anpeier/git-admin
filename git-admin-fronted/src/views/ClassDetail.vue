<template>
  <div class="classDetail">
    <h1>{{classInfo.name}}</h1>
    
    <stu-list :stuList="studentList"></stu-list>
  </div>
</template>

<script>
import StuList from "./../components/StuList";
import { mapGetters } from "vuex";
export default {
  name: "ClassDetail",
  components: {
    StuList
  },
  computed: {
    ...mapGetters(["studentList"]),
    ...mapGetters(['classInfo'])
  },
  mounted() {
    const className = this.$route.params.name;
    this.getClassInfo(className);
  },
  methods: {
    getClassInfo(className) {
      this.$store.dispatch("getOneClass", {
        name: className
      });
      this.$store.dispatch("getStudents", {
        className
      });
    }
  }
};
</script>

<style>
</style>