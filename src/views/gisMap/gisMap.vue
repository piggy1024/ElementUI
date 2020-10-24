<template>
  <div>wantedList内容:{{ wantedList }}</div>
</template>

<script>
import _ from "underscore";
export default {
  data() {
    return {
      list: [
        { name: "张三", age: 19 },
        { name: "李四", age: 19 }
      ],
      wantedList: []
    };
  },
  created() {
    this.getWantedObject();
  },
  methods: {
    getWantedObject() {
      this.wantedList = _.where(this.list, { name: "张三" });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
