<script setup>
  import { reactive, toRefs, h } from 'vue';
  import { fields } from './';
  
  const state = reactive({
    visible: false,
    promptValue: '',
    type: 'confirm'
  });

  const props = defineProps({
    title: {
      type: String,
      default: 'Message',
    },
    content: {
      type: String,
      default: 'Message content.'
    },
    showCancelBtn: {
      type: Boolean,
      default: false
    },
    confirmBtnText: {
      type: String,
      default: 'OK'
    },
    cancelBtnText: {
      type: String,
      default: 'Cancel'
    },
    field: {
      type: String,
      default: 'confirm',
      validator: (value) => {
        return fields.includes(value);
      }
    }
  })
  
  const { visible } = toRefs(state);

  const setVisible = (isVisible) => {
    state.visible = isVisible;
  }

  const confirmBtnClick = () => {
    state.type = 'confirm';
    setVisible(false);
  }

  const cancelBtnClick = () => {
    state.type = 'cancel';
    setVisible(false);
  }

  const ContentView = ({ field }) => {
    switch (field) {
      case !field || 'confirm':
        return h('p', null, props.content);
      case 'prompt':
        return h('input', {
          value: state.promptValue,
          onInput: e => state.promptValue = e.target.value,
          class: 'message-input',
        });
      default: 
        return '';
    }
  }

  defineExpose({
    setVisible,
    state
  });
</script>

<template>
  <transition name="my-ui-messagebox-fade">
    <div 
      class="ui-message-box"
      v-show="visible"
      @click="cancelBtnClick"
    >
      <div 
        class="ui-message-box-wrapper"
        @click.stop
      >
        <div class="message-box-title">
          <h1>{{ title }}</h1>
          <span 
            class="iconfont icon-close"
            @click="cancelBtnClick"
          ></span>
        </div>
        <div class="message-box-content">
          <content-view :field="field"></content-view>
        </div>
        <div class="message-box-btn-group">
          <button 
            class="btn btn-primary"
            @click="confirmBtnClick"
          >{{ confirmBtnText }}</button>
          <button 
            class="btn btn-default"
            @click="cancelBtnClick"
            v-if="showCancelBtn"
          >{{ cancelBtnText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
  @font-face {
  font-family: "iconfont"; /* Project id 3420381 */
  src: url('//at.alicdn.com/t/font_3420381_rram9kmwy6d.woff2?t=1653224906491') format('woff2'),
       url('//at.alicdn.com/t/font_3420381_rram9kmwy6d.woff?t=1653224906491') format('woff'),
       url('//at.alicdn.com/t/font_3420381_rram9kmwy6d.ttf?t=1653224906491') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-close:before {
  content: "\e7b4";
}


  .my-ui-messagebox-fade-enter-from,
  .my-ui-messagebox-fade-leave-to {
    opacity: 0
  }

  .my-ui-messagebox-fade-enter-active {
    transition: opacity .2s ease-in;
  }

  .my-ui-messagebox-fade-leave-active {
    transition: opacity .2s ease-out;
  }

  .ui-message-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);

    .ui-message-box-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 420px;
      height: 200px;
      margin: -100px 0 0 -210px;
      background-color: #fff;
      border-radius: 3px;

      h1,
      p {
        margin: 0;
        font-weight: normal;
      }

      .message-box-title {
        padding: 15px 15px 10px;

        h1 {
          display: inline-block;
          font-size: 18px;
        }

        .icon-close {
          float: right;
          font-size: 12px;
          color: #999;
        }
      }

      .message-box-content {
        padding: 10px 15px;

        p {
          font-size: 14px;
        }
      }

      .message-box-btn-group {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 5px 15px 15px;
        box-sizing: border-box;

        button {
          float: right;
        }
      }
    }

    .btn {
      border: none;
      outline: none;
      height: 32px;
      padding: 8px 15px;
      border-radius: 3px;

      &.btn-primary {
        background-color: #4093ff;
        color: #fff;
        margin-left: 10px;
      }

      &.btn-default {
        background-color: #fff;
        border: 1px solid #ddd;
      }
    }

    .message-input {
      border: none;
      outline: none;
      width: 100%;
      border: 1px solid #ddd;
      height: 32px;
      box-sizing: border-box;
    }
  }
</style>