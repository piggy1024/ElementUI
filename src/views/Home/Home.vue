<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" alt />
            <div class="userinfo">
              <p class="name">Nick</p>
              <p class="access">超级管理员用户</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              上次登陆时间:
              <span>2020-05-01</span>
            </p>
            <p>
              上次登陆地点:
              <span>广东</span>
            </p>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:522px; margin-top:20px ">
          <el-table :data="tableData">
            <el-table-column
              show-overflow-tooltip
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card
            shadow="hover"
            v-for="item in countData"
            :key="item.name"
            style="display:'flex',padding:0"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">$ {{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card shadow="hover">
          <Echart style="height:280px" :chartData="echartData.order"></Echart>
        </el-card>
        <div class="graph">
          <el-card shadow="hover">
            <Echart style="height:260px" :chartData="echartData.user"></Echart>
          </el-card>
          <el-card shadow="hover">
            <Echart style="height:260px" :chartData="echartData.video"></Echart>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Echart from "../../components/EChart";
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      countData: [
        {
          name: "今日支付订单",
          value: 6666,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 321,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "未支付订单",
          value: 6666,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月未支付订单",
          value: 6666,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 321,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月支付订单",
          value: 6666,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ],
      tableData: [],
      tableLabel: {
        name: "课程名",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  methods: {
    getTableData() {
      this.$http.get("/home/getData").then(res => {
        // console.log(res);
        res = res.data;
        this.tableData = res.data.tableData;
        // console.log(res.data);

        // 订单折线图
        const order = res.data.orderData;
        this.echartData.order.xData = order.date;
        // 第一步取出series中的name部分-键名
        let keyArray = Object.keys(order.data[0]);
        // console.log(keyArray);
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: order.data.map(item => item[key]),
            type: "line"
          });
        });
        // console.log(res.data);

        // 活跃用户柱状图
        const user = res.data.userData;
        // console.log(user);
        this.echartData.user.xData = user.map(item => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: user.map(item => item.new),
          type: "bar"
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: user.map(item => item.active),
          type: "bar"
        });

        // video饼图
        const video = res.data.videoData;
        // console.log(video);
        this.echartData.video.series.push({
          type: "pie",
          data: video
        });
      });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
</style>
