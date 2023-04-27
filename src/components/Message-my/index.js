import { ref, createApp, watch } from 'vue'
import MessageComponent from './Message.vue'
import { findIndex } from '@/shared/utils'

import types from './types.js'

const messageArr = ref([])
//1 .  点击事件
const Message = (options) => {
  const msg = createApp(MessageComponent, options)
  showMessage(msg)
}
Object.values(types).forEach((type) => {
  Message[type] = (options) => {
    options['type'] = type
    console.log(options.type)
    return Message(options)
  }
})
// 用num的缺点是什么  ：当hide取消挂载的时候 并不能监听到  如果我用watch监听num的变化 也不能改变原本绑定给style的num 是style限制了
//我不用style  我要写一个方法

function showMessage(msg) {
  const Frog = document.createDocumentFragment()
  const vm = msg.mount(Frog)
  //mount（） 返回的是vue实例  我要拿到他 注销他
  messageArr.value.push(vm)
  setTop(vm)
  watch(messageArr, () => setTop(vm))
  document.body.appendChild(Frog)
  hideMessage(msg, 2000, vm)
}
function hideMessage(msg, durtime, vm) {
  vm.timer = setTimeout(() => {
    msg.unmount()
    messageArr.value = messageArr.value.filter((item) => item !== vm)
    //调用方法 改变top
    clearTimeout(vm.timer)
    vm.timer = null
  }, durtime)
}
function setTop(vm) {
  const { setTops, height, margin } = vm
  console.log(setTops, height, margin)
  const currentIndex = findIndex(messageArr.value, vm)
  console.log(margin * (currentIndex + 1) + height * currentIndex)
  vm.setTops(margin * (currentIndex + 1) + height * currentIndex)
}
export { types }
export default Message
