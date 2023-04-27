<template>
  <div
    :class="['messageModel', props.type]"
    :style="{
      top: top + 'px',
    }">
    {{ message }}
  </div>
</template>

<script setup>
import types from './types.js'
import { ref } from 'vue'
// 我想使用type  怎么做   还是传递参数
let top = ref(0)
const setTops = (tops) => {
  top.value = tops
}
const props = defineProps({
  type: {
    type: String,
    default: types.SUCCESS,
  },
  message: {
    type: String,
    default: 'this is a message',
  },
})
console.log(props.type)
defineExpose({
  setTops,
  height: 50,
  margin: 20,
})
// 点击 num++
</script>

<style lang="scss" scoped>
.messageModel {
  height: 50px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  border-radius: 10px;
  line-height: 50px;
}
.success {
  background-color: #f0f9eb;
  color: #529b2e;
}

.warning {
  background-color: #fdf6ec;
  color: #b88230;
}

.message {
  background-color: #f4f4f5;
  color: #73767a;
}

.error {
  background-color: #fef0f0;
  color: #c45656;
}
</style>
