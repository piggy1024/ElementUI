<template>
  <div>
    <p>
      <span>单价：</span><span>{{ price }}</span>
      <button @click="downPrice">降价1元</button>
    </p>
    <p>数量: {{ count }}</p>
    d
    <p v-if="broCallBack">兄弟收到了我的点击</p>
    <el-button type="primary" @click="showMeClick">click</el-button>
    <div v-auth="">
      {{ message | capitalize }}
    </div>
    <div v-myd="">
      {{ message | capitalize }}
    </div>
  </div>
</template>
<script>
import bus from "../../util/eventBus";
export default {
  props: {
    price: {
      type: String,
      default: ""
    }
  },
  directives: {
    auth: {
      bind: function(el, binding, vnode) {
        console.log(el);
        console.log(binding);
      },
      inserted: function(el, binding, vnode) {},
      update: function(el, binding, vnode) {},
      componentUpdated: function(el, binding, vnode) {},
      unbind: function(el, binding, vnode) {}
    }
  },
  data() {
    return {
      count: 10,
      broCallBack: false,
      message: "hello"
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    downPrice() {
      // 控制父组件的方法
      this.$emit("downPrice");
    },
    // 控制兄弟组件的方法和传值
    showMeClick() {
      bus.$emit("broClick");
    }
  },
  mounted() {
    // 接受兄弟组件传回来的事件
    bus.$on("replay", () => {
      this.broCallBack = !this.broCallBack;
    });
  },
  watch: {
    price(newPrice) {
      // 控制兄弟组件的方法和传值
      bus.$emit("priceChange", newPrice, this.count);
    }
  }
};
</script>
