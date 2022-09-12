<template>
  <div class="modal-buttom" @click.stop>
    <div @click="show" class="dltBotton" style="">
      <slot name="icons"> </slot>
    </div>
  </div>
  <div class="model" v-if="visible" @click.self="closetoggle">
    <div class="DeleteButtom" @click="ClearAllTask">
      <slot name="dltIcon"></slot>
      Clear all task
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import deleteSetting from "../composable/deleteSetting";
const toggle = ref(false);

const emit = defineEmits(["closeToggle", "ClearAllTask"]);

const {show,visible,hide} = deleteSetting();
function dltShowModel() {
  toggle.value = !toggle.value;  
}

function ClearAllTask() {
  dltShowModel();
  emit("ClearAllTask");
}
function closetoggle() {
  dltShowModel();
  // emit("ClearAllTask");
}
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}
.modal-buttom {
  position: relative;
}
.model {
  position: absolute; /* Stay in place */
  width: 200px;
  float: end;
  z-index: 1;
  top: 74%;
  left: 51%;
  border-radius: 4px;
  opacity: 1;
  box-shadow: rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0 / 10%) 0px 3px 6px;
  pointer-events: auto;

  background-color: white;
  /* transform: translateX(20px); */
}
.dltBotton {
  width: 30px;
  line-height: 30px;
  margin: 0px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  opacity: 1;
}
.DeleteButtom {
  font-size: 14px;
  cursor: pointer;
  color: black;
  width: 100%;
  border: none;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
}
.DeleteButtom:hover {
  background: rgb(229, 228, 226);
  max-width: 100%;
  color: black;
}
.model.show {
  visibility: visible;
}
</style>