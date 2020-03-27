<template>
  <div class="editStu">
    <h1>编辑学生信息</h1>
    <el-form
      label-position="rigth"
      ref="stuForm"
      label-width="80px"
      :rules="rules"
      :model="studentInfo"
    >
      <el-form-item label="姓名">
        <el-input v-model="studentInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="studentInfo.className" placeholder="请选择班级">
          <el-option
            v-for="item in classList"
            :label="item.name + '班'"
            :value="item.name"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model.number="studentInfo.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="studentInfo.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('stuForm')">修改</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    var checkPhoneNum = (rule, value, callback) => {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (myreg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    var checkEmail = (rule, value, callback) => {
      let myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (myreg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱地址"));
      }
    };
    return {
      id: "",
      rules: {
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhoneNum, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["studentInfo"]),
    ...mapGetters(["classList"])
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.studentInfo._id == null) {
      // 页面刷新后重新拉取数据
      this.$store.dispatch("getStuInfoById", this.id);
    }
  },
  methods: {
    cancle() {
      this.$router.push('/student/list')
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.update();
        } else {
          return false;
        }
      });
    },
    update() {
      this.$confirm("是否确认修改该学生信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("updateStuInfo", this.studentInfo);
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push("/student/list");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.editStu {
  h1 {
    font-size: 26px;
    margin-bottom: 10px;
  }
  width: 400px;
}
</style>