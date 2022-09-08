<template>
  <!-- The Modal -->
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close" @click="$emit('modelClose')">&times;</span>
      <form @submit.prevent="okSubmitHandeller">
        <div class="columnArrg">
          <p class="title">TIMER SETTING</p>
          <hr class="lineStyle" />
          <p
            style="
              color: rgb(85, 85, 85);
              font-weight: bold;
              text-align: left;
              font-family: unset;
              font-size: 13px;
              margin-bottom: 0px;
            "
          >
            Time (minutes)
          </p>
          <div
            style="
              display: flex;
              font-size: 14px;
              font-weight: bold;
              margin-top: 0px;
              color: rgb(187, 187, 187);
            "
          >
            <p style="width: 33.3%; text-align: left">Pomodoro</p>
            <p style="width: 33.3%; text-align: center">Short Break</p>
            <p style="width: 33.3%; text-align: right">Long Break</p>
          </div>
          <div
            style="
              display: flex;
              font-size: 14px;
              font-weight: bold;
              margin-top: 0px;
              color: rgb(187, 187, 187);
              margin-bottom: 20px;
            "
          >
            <div style="width: 33.3%">
              <input
                v-model="props.Timer.pomodoro"
                type="number"
                style="
                  width: 70px;
                  float: left;
                  height: 25px;
                  border: 0px;
                  background-color: rgb(239, 239, 239);
                "
              />
            </div>
            <div style="width: 33.3%">
              <input
                v-model="props.Timer.shortBreak"
                type="number"
                style="
                  width: 80px;
                  float: center;
                  height: 25px;
                  border: 0px;
                  background-color: rgb(239, 239, 239);
                "
              />
            </div>
            <div style="width: 33.3%">
              <input
                v-model="props.Timer.longBreak"
                type="number"
                style="
                  width: 70px;
                  height: 25px;
                  float: right;
                  border: 0px;
                  background-color: rgb(239, 239, 239);
                "
              />
            </div>
          </div>
          <div>
            <button type="submit" class="okBtn">ok</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["Timer"]);
const emit = defineEmits(["okBtnClose", "minHrsConversion"]);
function okSubmitHandeller() {
  emit("okBtnClose");
  emit("minHrsConversion");
}
</script>

<style scoped>
.okBtn {
  color: white;
  background-color: rgb(34, 34, 34);
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 2px;
  cursor: pointer;
  opacity: 0.9;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  /* height: 30px; */
  float: right;
  width: 55px;
  border-radius: 4px;
}
.columnArrg {
  display: flex;
  flex-direction: column;
}
.lineStyle {
  display: block;
  /* border-top: 3px; */
  border: none;
  height: 1px;
  margin-bottom: 0px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 10cm;
  /* position: absolute; */
}
.title {
  color: rgb(187, 187, 187);
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;
}
.modal {
  /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0px;

  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: 4.5% auto; /* 15% from the top and centered */
  padding: 20px 20px 0px;
  border: 1px solid #888;
  width: 350px; /* Could be more or less, depending on screen size */
  border-radius: 5px;
  height: 200px;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>