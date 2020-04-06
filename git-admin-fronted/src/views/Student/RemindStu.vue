<template>
  <div
    v-loading.fullscreen="loading"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="remindStu"
  >
    <div class="remindAll">
      <el-button type="primary" @click="remindAll" :disabled="!isRemind">{{content}}</el-button>
    </div>
    <stu-list :stuList="remindList" :btnType="2" @remind="remind($event)"></stu-list>
  </div>
</template>

<script>
import StuList from "@/components/StuList.vue";
import { mapGetters } from "vuex";
export default {
  name: "RemindStu",
  data() {
    return {
      loading: true,
      loadText: "加载中",
      isRemind: true,
      totalTime: 5,
      content: "一键提醒"
    };
  },
  components: {
    StuList
  },
  computed: {
    ...mapGetters(["remindList"])
  },
  mounted() {
    this.remindStuList();
  },
  methods: {
    remindStuList() {
      this.$store
        .dispatch("getRemindList")
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    remind(stuInfo) {
      if (!stuInfo.email) {
        this.$message.warning(`请先完善${item.name}的信息`);
        return;
      }
      this.loading = true;
      this.loadText = "正在发送提醒";
      let stu = [
        {
          name: stuInfo.name,
          email: stuInfo.email
        }
      ];
      this.$store
        .dispatch("remind", stu)
        .then(res => {
          stuInfo.status = false;
          this.$message("发送成功");
          this.loading = false;
        })
        .catch(() => {
          this.$message.error("发送失败");
        });
    },
    remindAll() {
      this.loading = true;
      let list = [];
      for (const item of this.remindList) {
        if (!item.status) continue;
        if (!item.email) {
          this.$message.warning(`请先完善${item.name}的信息`);
          return;
        }
        let obj = {
          name: item.name,
          email: item.email
        };
        list.push(obj);
        item.status = false;
      }
      this.$store
        .dispatch("remind", list)
        .then(res => {
          this.$message("发送成功");
          this.loading = false;
          this.isRemind = false;
          this.countDown();
        })
        .catch(() => {
          this.$message.error("发送失败");
          this.loading = false;
        });
    },
    countDown() {
      setInterval(() => {
        this.totalTime--;
        this.content = `${this.totalTime}秒后重新提醒`;
        if (this.totalTime < 0) {
          this.isRemind = true;
          this.content = "一键提醒";
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.remindStu {
  .remindAll {
    position: fixed;
    top: 250px;
    right: 50px;
    z-index: 99;
    box-shadow: 5px 5px 10px #aaaaaa;
    border-radius: 5px;
  }
}
</style>