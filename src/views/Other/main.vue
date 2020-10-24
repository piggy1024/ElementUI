<template>
  <div id="app">
    <!-- 父组件 -->
    <p>请输入单价: <input type="text" v-model="price" /></p>
    <!-- 子组件1 -->
    <page1 :price="price" @downPrice="downPrice"></page1>
    <!-- 子组件2 -->
    <page2></page2>
  </div>
</template>

<script>
import Page1 from "./PageOne";
import Page2 from "./PageTwo";
export default {
  name: "App",
  data() {
    return {
      price: ""
    };
  },
  components: {
    Page1,
    Page2
  },
  methods: {
    downPrice() {
      this.price = (this.price - 1).toString();
      console.log("highlight");
    }
  }
};
</script>

<style lang="scss" scoped></style>
