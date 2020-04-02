<template>
  <div class="notFound">
    <div>
      <img @click="toHome" src="./../assets/404.jpg" title="回到首页" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    toHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.notFound {
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 400px;
      cursor: pointer;
    }
  }
}
</style>