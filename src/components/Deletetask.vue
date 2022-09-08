<template>
  <div class="model" v-if="props.toggle" @click.self="closetoggle">
    <div class="modal-content">
      <div style="float: left; padding-left: 5px; font-size: 14px">
        <i class="fa-solid fa-trash-can"></i>
        Clear all task
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["toggle"]);
const emit = defineEmits(["closeToggle"]);
function closetoggle() {
  emit("closeToggle");
}
</script>

<style scoped>
.model {
  position: absolute; /* Stay in place */
  z-index: 9; /* Sit on top */
  left: 0;
  top: 0px;

  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  /* visibility: hidden; */

  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
}
.model.show {
  visibility: visible;
}
.modal-content {
  background-color: #fefefe;
  margin: 35% 0% 15% 51%; /* 15% from the top and centered */

  padding-top: 10px;
  border: 1px solid #888;
  width: 140px; /* Could be more or less, depending on screen size */
  border-radius: 5px;
  height: 35px;
}
</style>