<script setup>
//  import Message, { types } from './components/Message';
import Message, { types } from './components/Message-my'
//  import JsppMessage from './components/Message/Message';
</script>

<template>
  <div>
    <!-- <jspp-message
      type="warning"
      message="This is a test for Message Component."
      :duration="5000"
    ></jspp-message> -->
    <button
      @click="
        Message.success({
          message: 'This is a SUCCESS text.',
        })
      ">
      SHOW SUCCESS
    </button>
    <button
      @click="
        Message.warning({
          message: 'This is a WARNING text.',
        })
      ">
      SHOW WARNING
    </button>
    <button
      @click="
        Message({
          message: 'This is a MESSAGE text.',
        })
      ">
      SHOW MESSAGE
    </button>
    <button
      @click="
        Message({
          type: types.ERROR,
          message: 'This is a ERROR text.',
        })
      ">
      SHOW ERROR
    </button>
  </div>
</template>

<style lang="scss"></style>
