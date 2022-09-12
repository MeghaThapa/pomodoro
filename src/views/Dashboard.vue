<template>
  <div class="container" :style="{ 'background-color': retur.bgColor }">
    <div class="entireContent">
      <div class="firstRow">
        <!-- <i class="fa-solid fa-circle-check fa-lg" style="color:white;"></i> -->
        <div style="display: flex">
          <img
            src="https://pomofocus.io/icons/icon-white.png"
            style="padding-top: 16px"
          />
          <p style="font-weight: bold; color: white; font-size: 18px">
            &nbsp;Pomofocus
          </p>
        </div>

        <div
          type="button"
          class="settingBtn"
          :style="{ backgroundColor: retur.middleContainColor }"
          @click="SettingClick"
        >
          <i class="fa-solid fa-gear"></i>&nbsp;Setting
          <!-- <router-link to="/SettingPage"></router-link> -->
        </div>
      </div>
      <hr class="lineStyle" />
      <div
        class="middleContent"
        style="display: flex; flex-direction: column"
        :style="{ 'background-color': retur.middleContainColor }"
      >
        <div class="threeBtns">
          <div
            class="psl"
            :class="{ colorBtn: retur.activeState == 'red' }"
            @click="redColor"
          >
            Pomodoro
          </div>
          <div
            class="psl"
            :class="{ colorBtn: retur.activeState == 'green' }"
            @click="greenColor"
          >
            Short Break
          </div>
          <div
            class="psl"
            :class="{ colorBtn: retur.activeState == 'blue' }"
            @click="blueColor"
          >
            Long Break
          </div>
        </div>
        <div style="margin-top: 0px">
          <p
            style="
              font-size: 5rem;
              box-sizing: border-box;
              max-width: 680px;
              font-family: cursive;
              color: white;
              margin: auto;
              margin-left: 0%;
            "
          >
            {{ hours ? hours : displayHrMin.hours }}:{{
              minutes ? minutes : displayHrMin.minutes
            }}:{{ seconds ? seconds : displayHrMin.seconds }}
          </p>
        </div>
        <div>
          <div
            @click="startButtonClick()"
            v-if="!startToggle && !stopToggle"
            class="startBtn"
            :style="{ color: retur.bgColor }"
          >
            START
          </div>

          <!-- true false -->
          <div
            class="startBtn"
            v-if="startToggle && !stopToggle"
            @click="stopButtonClick()"
            :style="{ color: retur.bgColor }"
          >
            STOP
          </div>

          <div
            class="startBtn"
            v-if="startToggle && stopToggle"
            @click="resumeButtonClick()"
            :style="{ color: retur.bgColor }"
          >
            RESUME
          </div>
        </div>
      </div>
      <div class="endContent">
        <div>
          <p style="margin-bottom: 0px">#1</p>
          <p
            style="
              margin-top: 0px;
              align-items: center;
              font-size: 18px;
              font-family: ArialRounded;
              margin-bottom: 0px;
            "
          >
            Time to focus!
          </p>
        </div>
        <div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            "
          >
            <p style="align-items: center; margin: 0px">Task</p>
            <Deletetask @closeToggle="hide" @ClearAllTask="clearTaskList">
              <template v-slot:icons>
                <i class="fa-solid fa-ellipsis-stroke-vertical"></i>
              </template>
              <template v-slot:dltIcon>
                <i class="fa-solid fa-trash-can"></i>
              </template>
            </Deletetask>
          </div>
          <div style="margin-bottom: 15px">
            <hr style="height: 1px; background-color: white" />
          </div>

          <!-- addTask contain ref value so task.value  addedTask.addTask.length task.value-->

          <!-- Task List -->

          <div
            v-for="(task, i) in addedTask.addTask"
            :key="i"
            @click="removeTask(i)"
          >
            <div v-if="true">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
                class="task-list"
              >
                <p>{{ task.value }}</p>
                <div class="check-box" label="this task will be remove">
                  <i class="fa-sharp fa-solid fa-check"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Task Buttons -->
          <div class="task-add-button">
            <br />
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                src="https://pomofocus.io/icons/plus-circle-white.png"
                style="
                  height: 20px;
                  width: 20px;
                  margin-top: auto;
                  margin-bottom: auto;
                "
              />
              &nbsp;
              <span
                style="
                  font-family: 'Gill Sans', 'Gill Sans MT', Calibri,
                    'Trebuchet MS', sans-serif;
                  font: 14px;
                  cursor: pointer;
                "
                @click="taskAdd"
                >Add Task</span
              >
            </div>
          </div>
        </div>
        <SetingPage
          :Timer="defaultTimer"
          v-if="retur.toggle"
          @modelClose="SettingClick"
          @minHrsConversion="minHrsConvg"
          @okBtnClose="timerSettingSave"
        ></SetingPage>
        <addTask
          v-if="retur.addTaskToggle"
          @closeToggle="hideAddTask"
          @saveTask="saveTaskF"
          @taskCancled="clearCancleTask"
          @closeAddTask="closeAddTaskModel"
        >
        </addTask>
      </div>
    </div>
  </div>
</template>

<script setup>
import addTask from "../components/addTask.vue";
import SetingPage from "../components/SetingPage.vue";
import Deletetask from "../components/Deletetask.vue";

import timer from "../composable/timer";
import { onMounted, watch } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";
const addedTask = reactive({
  addTask: [],
});

//Buttons States

//Start Buttons
//startToggle = false
//stopToggle = false

//Resume Buttons
//startToggle = true
//stopToggle = false

//Stop Buttons
//stopStopToggle = true
//stopToggle =

const startToggle = ref(false);
const stopToggle = ref(false);

const taskComplete = ref(false);
const timerStart = ref(false);

const activeButton = reactive({
  pomodoroPage: true,
  shortBreakPage: false,
  longBreakPage: false,
});
function removeTask(i) {
  this.addedTask.addTask.splice(i, 1);
}
function closeAddTaskModel(task) {
  // console.log("hellllo");
  addedTask.addTask.push(task);
  retur.addTaskToggle = false;
}
function clearTaskList() {
  addedTask.addTask = [];
  retur.dltToggle = false;
}
function clearCancleTask() {
  // addedTask.addTask = [];
  retur.addTaskToggle = false;
}
//Color values of the pages
const retur = reactive({
  bgColor: "#ff5c5c",
  middleContainColor: "rgba(255, 255, 255, 0.1)",
  activeState: "red",
  toggle: false,
  dltToggle: false,
  addTaskToggle: false,
});
function saveTaskF() {
  retur.addTaskToggle = false;
}
function hideAddTask() {
  retur.addTaskToggle = false;
}
function taskAdd() {
  retur.addTaskToggle = !retur.addTaskToggle;
}
function resumeButtonClick() {
  timerStart.value = true;
   showStopButton();
  resume();
}

function showStartButton() {
  startToggle.value = false;
  stopToggle.value = false;
}
function showStopButton() {
  startToggle.value = true;
  stopToggle.value = false;
}
function showResumeButton() {
  startToggle.value = true;
  stopToggle.value = true;
}

function startButtonClick() {
  startTimer();
  // when you click to another button when started
  timerStart.value = true;
  showStopButton();
}
function stopButtonClick() {
  timerStart.value = true;
  showResumeButton();
  stop();F
}

// Setting Page Default Value
const defaultTimer = reactive({
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
});

//template and timer.js(global)
const displayHrMin = reactive({
  hours: "00",
  minutes: defaultTimer.pomodoro,
  seconds: "00",
});

const {
  countDownInterval,
  secondsLeftms,
  endTime,
  hours,
  minutes,
  shortBreakClick,
  pomodoroClick,
  seconds,
  longBreakVal,
  startTimer,
  hrsMinconvg,
  stop,
  resetTimer,
  resume,
  setCountDown,
} = timer(displayHrMin);

function dltShowModel() {
  retur.dltToggle = !retur.dltToggle;
}
function hide() {
  // console.log("fghjk");
  retur.dltToggle = false;
}
function SettingClick() {
  retur.toggle = !retur.toggle;
}
function minHrsConvg() {
  const activePageMinutes = activeButtonMinutes();
  const { hoursValue, minutesValue } = hrsMinconvg(activePageMinutes); // Min -> hrs and min
  if (hoursValue >= 1) {
    displayHrMin.hours = hoursValue;
    displayHrMin.minutes = minutesValue;
    // console.log("Hours:", hoursValue, "Minutes:", minutesValue);
    return;
  }
  //if active page is less then 60 min or 1  hours
  displayHrMin.hours = "00";
  displayHrMin.minutes = minutesValue;
  displayHrMin.seconds = "00";
}

function activeButtonMinutes() {
  if (activeButton.pomodoroPage) {
    return defaultTimer.pomodoro;
  } else if (activeButton.shortBreakPage) {
    return defaultTimer.shortBreak;
  } else {
    return defaultTimer.longBreak;
  }
}

function changePageColors({ activeState, bgColor, middleContainColor }) {
  retur.activeState = activeState;
  retur.bgColor = bgColor;
  retur.middleContainColor = middleContainColor;
}

function timerSettingSave() {
  SettingClick();
}

//Short Break Buttons
function greenColor() {
  if (timerStart.value) {
    if (window.confirm("Do You want to stop the timer?")) {
      resetTimer();
      timerStart.value = false;

      // For Start Button to appear
      startToggle.value = false;
      stopToggle.value = false;
    }
  }
  changePageColors({
    activeState: "green",
    bgColor: "rgb(76,145,149)",
    middleContainColor: "rgba(255, 255, 255, 0.1)",
  });
  // displayHrMin.minutes = defaultTimer.shortBreak;
  activeButton.pomodoroPage = false;
  activeButton.shortBreakPage = true;
  activeButton.longBreakPage = false;
  minHrsConvg();
}
//Pomodoro Break Buttons
function redColor() {
  if (timerStart.value) {
    if (window.confirm("Do You want to stop the timer?")) {
      resetTimer();
      timerStart.value = false;

      // For Start Button to appear
      startToggle.value = false;
      stopToggle.value = false;
    }
  }

  changePageColors({
    activeState: "red",
    bgColor: "#ff5c5c",
    middleContainColor: "rgba(255, 255, 255, 0.1)",
  });
  activeButton.pomodoroPage = true;
  activeButton.shortBreakPage = false;
  activeButton.longBreakPage = false;
  minHrsConvg();
}

//Long Break Buttons
function blueColor() {
  if (timerStart.value) {
    if (window.confirm("Do You want to stop the timer?")) {
      resetTimer();
      timerStart.value = false;

      // For Start Button to appear
      startToggle.value = false;
      stopToggle.value = false;
    }
  }
  changePageColors({
    activeState: "blue",
    bgColor: "rgb(69,124,163)",
    middleContainColor: "rgba(255, 255, 255, 0.1)",
  });
  // displayHrMin.minutes = defaultTimer.longBreak;
  activeButton.pomodoroPage = false;
  activeButton.shortBreakPage = false;
  activeButton.longBreakPage = true;
  minHrsConvg();
}
</script>

<style scoped>
.endContent {
  display: flex;
  flex-direction: column;
  color: white;

  max-width: 11cm;

  margin: auto;
}
.check-box {
  border: 1px solid transparent;
  border-radius: 50px;
  padding: 5px;
}
.check-box:hover {
  cursor: pointer;
  background: #ff5c5c;
  color: white;
}
.task-list {
  border-left: 5px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  background-color: white;
  color: black;
  padding: 5px;
  text-align: center;
  width: 96%;
}

.colorBtn {
  background-color: rgba(0, 0, 0, 0.15);
  opacity: 1;
}
.entireContent {
  max-width: 620px;
  margin: auto;
}
.startBtn {
  margin-top: 20px;
  max-width: 110px;
  max-height: 15px;
  border: 0px;
  padding: 15px;
  font-weight: bold;
  margin-left: 30%;
  background-color: white;
  font-size: 22px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: rgb(235 235 235) 0px 6px 0px;
  font-family: ArialRounded;
}
.task-add-button {
  padding: 10px;
  border: 1px dashed white;
  width: 96%;
  line-height: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  opacity: 1;
}
.psl {
  color: white;
  font-weight: 300;
  font-family: ArialRounded;
  border: 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 17px;
  padding: 2px 12px;
}
.threeBtns {
  display: flex;
  margin-left: 13%;
  height: 28px;
  max-width: 350px;
  border-radius: 5px;
  margin-top: 5px;
}
.middleContent {
  opacity: 1;
  padding: 5px;
  display: flex;
  flex-direction: column;
  height: 7cm;
  max-width: 11cm;
  margin: auto;

  /* margin-right:25%; */
  margin-top: 50px;
  border-radius: 5px;
}
.settingBtn {
  color: white;
  line-height: 30px;
  text-align: center;
  width: 80px;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  /* margin-left: 9cm; */
}
.container {
  min-height: 100vh;
  width: 100%;
  position: relative;

  box-sizing: border-box;

  /* background-color: #ff5c5c; */
}
.lineStyle {
  display: block;
  /* border-top: 3px; */
  border: none;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 15cm;
  position: absolute;
}
img {
  height: 20px;
  width: 20px;
}
.firstRow {
  display: flex;
  height: 45px;
  width: 15cm;
  justify-content: space-between;
}
</style>