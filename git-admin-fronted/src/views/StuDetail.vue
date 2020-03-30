<template>
  <div class="stuDetail">
    <div class="student-info">
      <div class="avatar">
        <el-avatar :size="60" :src="studentInfo.avatar"></el-avatar>
        <div>
          <span>{{studentInfo.name}}</span>
        </div>
      </div>
      <div class="detail">
        <div>
          Github：
          <a :href="studentInfo.git_url">{{studentInfo.gitUserName}}</a>
        </div>
        <div>
          班级：
          <span>{{studentInfo.className}}</span>
        </div>
        <div>
          手机：
          <span>{{studentInfo.phoneNum ? studentInfo.phoneNum : '暂无'}}</span>
        </div>
        <div>
          邮箱：
          <span>{{studentInfo.email ? studentInfo.email : '暂无'}}</span>
        </div>
      </div>
    </div>
    <my-calendar :id="$route.params.id"></my-calendar>
  </div>
</template>

<script>
import MyCalendar from "./../components/Calendar";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["studentInfo"]),
  },
  components: {
    MyCalendar
  },
  mounted() {
    if (!this.studentInfo.gitUserName) {
      this.$store.dispatch("getStuInfoById", this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
.stuDetail {
  .student-info {
    font-size: 18px;
    .avatar {
      display: flex;
      div {
        margin: 20px 0 0 20px;
        font-size: 20px;
      }
    }
    .detail {
      display: flex;
      align-items: center;
      div {
        margin-right: 10px;
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>