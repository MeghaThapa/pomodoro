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
              font-size: 100px;
              font-family: cursive;
              color: white;
              margin-top: 10px;
              margin-bottom: 10px;
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
            v-if="!startStopToggle"
            class="startBtn"
            :style="{ color: retur.bgColor }"
          >
            START
          </div>
          <div
            class="startBtn"
            v-if="startStopToggle && !resumeToggle"
            @click="stopButtonClick()"
            :style="{ color: retur.bgColor }"
          >
            STOP
          </div>
          <div
            class="startBtn"
            v-if="startStopToggle && resumeToggle"
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
            <div
              type="button"
              @click="dltShowModel"
              class="dltBotton"
              style="
                width: 30px;
                line-height: 30px;
                position: relative;
                margin: 0px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                opacity: 1;
              "
            >
              <i
                style="align-items: center"
                class="fa-solid fa-ellipsis-vertical"
              ></i>
            </div>
          </div>
          <div style="margin-bottom: 15px">
            <hr style="height: 1px; background-color: white" />
          </div>
          
          <!-- addTask contain ref value so task.value  addedTask.addTask.length-->

          <!-- Task List -->
          <div v-if="addedTask.addTask.length">
            <div
              class="task-list"
              v-for="(task, i) in addedTask.addTask"
              :key="i"
            >
              {{ task.value }}
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
  <Deletetask :toggle="retur.dltToggle" @closeToggle="hide"> </Deletetask>
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
const startStopToggle = ref(false);
const resumeToggle = ref(false);

const activeButton = reactive({
  pomodoroPage: true,
  shortBreakPage: false,
  longBreakPage: false,
});
function closeAddTaskModel(task) {
  // console.log("hellllo");
  addedTask.addTask.push(task);
  retur.addTaskToggle = false;
}
function clearCancleTask() {
  addedTask.addTask = "";
  closeAddTaskModel();
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
  startStopToggle.value = true;
  resumeToggle.value = false;
  resume();
}
function startButtonClick() {
  startTimer();
  startStopToggle.value = true;
}
function stopButtonClick() {
  resumeToggle.value = true;
  stop();
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
  resume,
  setCountDown,
} = timer(displayHrMin);

function dltShowModel() {
  retur.dltToggle = !retur.dltToggle;
}
function hide() {
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
    console.log("Hours:", hoursValue, "Minutes:", minutesValue);
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

function greenColor() {
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

function changePageColors({ activeState, bgColor, middleContainColor }) {
  retur.activeState = activeState;
  retur.bgColor = bgColor;
  retur.middleContainColor = middleContainColor;
}

function timerSettingSave() {
  SettingClick();
}

function redColor() {
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
function blueColor() {
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

  width: 11.8cm;

  margin-left: 7%;
}
.task-list {
  border-left: 5px solid black;
  border-radius: 3px;
  margin-bottom: 10px;
  background-color: white;
  color: black;
  padding: 7px;
  line-height: 30px;
  text-align: center;
  width: 96%;
}

.colorBtn {
  background-color: rgba(0, 0, 0, 0.15);
  opacity: 1;
}
.entireContent {
  margin-left: 25%;
  margin-right: 33%;
}
.startBtn {
  width: 110px;
  height: 15px;
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
  width: 350px;
  border-radius: 5px;
  margin-top: 5px;
}
.middleContent {
  opacity: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  height: 7cm;
  width: 11cm;
  margin-left: 7%;

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
  position: absolute;

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