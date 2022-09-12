<template>
  <div class="model" @click.self="closetoggle">
    <div class="modal-content">
      <p
        style="
          margin-top: 0px;
          margin-bottom: 15px;
          font-family: Georgia, 'Times New Roman', Times, serif;
          font-weight: bold;
        "
      >
        Add today's task
      </p>
      <form @submit.prevent="saveTaskHandler">
        <input
          v-model="saveForm"
          type="text"
         style="line-height:25px;margin-top:0px;"
          placeholder="What are you working on?"
          class="placeholderStyle"
        />
        <div
          style="
            display: flex;
            float: right;
            margin-right: 30px;
            margin-top: 10px;
          "
        >
          <div type="submit" @click="cancleTask" class="cancleSaveStyle">
            cancle
          </div>
          &nbsp;
          <div type="submit" @click="removeModel" class="cancleSaveStyle">
            save
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "@vue/reactivity";

// const props = defineProps(["taskReciever"]);
const saveForm = ref("");
const emit = defineEmits([
  "closeToggle",
  "saveTask",
  "closeAddTask",
  "taskCancled",
]);
function closetoggle() {
  emit("closeToggle");
}
function saveTaskHandler() {
  emit("saveTask");
}
function removeModel() {
  emit("closeAddTask", saveForm);
}
function cancleTask() {
  emit("taskCancled");
}
</script>
  
  <style scoped>
.cancleSaveStyle {
  height: 25px;
  width: 50px;
  color: rgb(136, 136, 136);
  background-color: rgb(239, 239, 239);
  border-radius: 4px;
  cursor: pointer;
}

.cancleSaveStyle:hover {
  color: white;
  background-color: rgb(136, 136, 136);
  cursor: pointer;
}
::placeholder {
  color: #d1d1d1;
  opacity: 4px;
  font-size: 25px;
  /* line-height: 80px; */
}

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
  margin-top:350px ;
 margin-left:460px;
  border: 1px solid #888;
  max-width: 444px; /* Could be more or less, depending on screen size */
  border-radius: 5px;
  height: 110px;
  /* margin:auto; */
}
input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: black;
  width: 350px;
}
input:focus {
  border-color: red;
}
</style>