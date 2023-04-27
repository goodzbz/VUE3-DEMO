<script setup>

  import types from './types';
  import { computed, reactive, toRefs } from 'vue';

  let t = null;

  const state = reactive({
    visible: false,
    top: 0
  })
  
  const props = defineProps({
    type: {
      type: String,
      default: types.MESSAGE,
      validator (value) {
        return Object.values(types).includes(value);
      }
    },
    message: {
      type: String,
      default: types.MESSAGE
    }
  });

  const setVisible = (isVisible) => {
    return new Promise(resolve => {
      state.visible = isVisible;
      t = setTimeout(() => {
        clearTimeout(t);
        t = null;
        resolve('');
      }, 300);
    });
  }

  const setTop = (top) => {
    state.top = top;
    return top;
  }

  defineExpose({
    setVisible,
    setTop,
    height: 40,
    margin: 20
  })

  const styleClass = computed(() => ['jspp-message', props.type]);
  const { visible, top } = toRefs(state);
</script>

<template>
  <transition name="jspp-message-fade">
    <div 
      :class="styleClass"
      v-show="visible"
      :style="{
        top: top + 'px'
      }"
    >
      {{ message }}
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .jspp-message {
    position: fixed;
    left: 50%;
    z-index: 9999;
    width: 380px;
    height: 40px;
    margin-left: -190px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    border-radius: 5px;
    transition: top .3s ease-out;

    &.success {
      background-color: #f0f9eb;
      color: #529b2e;
    }

    &.warning {
      background-color: #fdf6ec;
      color: #b88230;
    }

    &.message {
      background-color: #f4f4f5;
      color: #73767a;
    }

    &.error {
      background-color: #fef0f0;
      color: #c45656;
    }
  }

  .jspp-message-fade-enter-active {
    transition: all .3s ease-in;
  }

  .jspp-message-fade-leave-active {
    transition: all .3s ease-out;
  }

  .jspp-message-fade-enter-from,
  .jspp-message-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>

