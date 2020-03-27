<template>
  <div>
    <stu-list :stuList="studentList"></stu-list>
  </div>
</template>

<script>
import { getStudentList } from "./../api/students";
import { mapActions, mapGetters } from "vuex";
import StuList from './../components/StuList'
export default {
  name: 'Students',
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
  mounted() {
    // console.log()
    // if (this.studentList.length == 0) {
    //   this.getStudents({
    //     count: this.count
    //   });
    // }
  },
  methods: {
    ...mapActions(["getStudents"])
  }
};
</script>

<style>
</style>