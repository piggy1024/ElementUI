<template>
  <div>
    <p>
      <span>总金额：{{ totalMoney }}元 </span>剩余金额：
      <span>{{ balance }}元</span>
    </p>
    <p v-if="bro">我兄弟点我了</p>
    <el-button type="primary" @click="replayBro">给我兄弟回应下</el-button>
  </div>
</template>
<script>
import bus from "../../util/eventBus";
export default {
  data() {
    return {
      balance: 1000,
      totalMoney: 1000,
      bro: false
    };
  },
  methods: {
    myEvent() {
      this.bro = !this.bro;
      // 给bro传回事件(试验能否回传事件到兄弟组件(结果是不可))
      // bus.$emit('clickMyBro')
    },
    replayBro() {
      bus.$emit("replay");
    }
  },
  mounted() {
    bus.$on("priceChange", (price, count) => {
      this.balance = this.totalMoney - price * count;
    });
    bus.$on("broClick", () => {
      // this.bro = !this.bro
      this.myEvent();
    });
  }
};
</script>
