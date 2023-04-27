<script setup>
  import { MyMessageBox } from './MyUI';

  const showMessageBox = () => {
    MyMessageBox({
      confirmBtnText: '确定',
      title: 'MessageBox',
      content: 'This is MessageBox content.'
    })
    .then(() => {
      console.log('MessageBox resolve');
    }).catch(() => {
      console.log('MessageBox reject');
    });
  }

  const showConfirmMessageBox = () => {
    MyMessageBox.confirm({
      showCancelBtn: true,
      cancelBtnText: '取消',
      title: 'ConfirmMessageBox',
      content: 'This is ConfirmMessageBox content.'
    })
    .then(() => {
      console.log('ConfirmMessageBox resolve');
    }).catch(() => {
      console.log('ConfirmMessageBox reject');
    });
  }

  const showPromptMessageBox = () => {
    MyMessageBox.prompt({
      confirmBtnText: '确定',
      showCancelBtn: true,
      cancelBtnText: '取消',
      title: 'PromptMessageBox',
      content: 'This is PromptMessageBox content.'
    })
    .then((value) => {
      console.log('PromptMessageBox resolve:', value);
    }).catch(() => {
      console.log('PromptMessageBox reject');
    });
  }
</script>

<template>
  <div>
    <button @click="showMessageBox">showMessageBox</button>
    <button @click="showConfirmMessageBox">showConfirmMessageBox</button>
    <button @click="showPromptMessageBox">showPromptMessageBox</button>
  </div>
</template>

<style lang="scss">

</style>