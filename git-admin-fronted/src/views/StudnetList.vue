<template>
  <div>
    <stu-list :stuList="studentList"></stu-list>
  </div>
</template>

<script>
import { getStudentList } from "./../api/students";
import { mapGetters } from "vuex";
import StuList from "./../components/StuList";
export default {
  name: "Students",
  components: {
    StuList
  },
  data() {
    return {
      count: 1
    };
  },
  computed: {
    ...mapGetters(["studentList"])
  },
};
</script>

<style>
</style>