import { ref } from "@vue/reactivity";

const timer = (form) => {

    /* global variables and constants*/
    // variable to store setInterval
    let countDownInterval;

    // secondsLeft in millisecond
    let secondsLeftms;
    // end time (Future Stop time)
    let endTime;
    // .stop-btn clicked or not
    // let stopBtnClicked = false;


    ///Program start value
    let hours = ref('');
    let minutes = ref('');
    let seconds = ref('');
    /* global variables ends */

    function shortBreakClick() {
        const shortBreakValue = localStorage.getItem('shortBreak');

        form.minutes = shortBreakValue;
    }
    function pomodoroClick() {
        const pomodoroVal = localStorage.getItem('pomodoro');

        form.minutes = pomodoroVal;
    }
    function stop(){
        clearInterval(countDownInterval);
    }

    function resume(){
        endTime = secondsLeftms + Date.now();
        // set a new setInterval()
        countDownInterval = setInterval(() => {
          setCountDown(endTime);
        }, 1000);
    }

    // longbreak value on ui
    function longBreakVal() {
        const longBreakVal = localStorage.getItem('longBreak');
        form.minutes = longBreakVal;
    }
    const startTimer = () => {
        // console.log("start");
        let countDownTime = 0;

        if (!form.hours && !form.minutes && !form.seconds) {
            form.minutes = hrsMinconvg();

        }

        // check which is the format, ie the <select> element's value
        if (form.hours && form.hours > 0 && form.hours < 24) {
            // convert hours to milliseconds
            // 1 hrs = 3600000 ms (5 zeros)
            countDownTime += form.hours * 3600000;
        }
        if (form.minutes && form.minutes > 0 && form.minutes < 60) {
            // 1 minute = 60000 ms (4 zeros)
            countDownTime += form.minutes * 60000;
        }
        if (form.seconds && form.seconds > 0 && form.seconds < 60) {
            // 1 seconds = 1000 ms (3 zeros)
            countDownTime += form.seconds * 1000;
        }


        // get current time in milliseconds
        const now = Date.now();
        // calculate the ending time
        endTime = now + countDownTime;

        // activate the countdown at first
        setCountDown(endTime);

        countDownInterval = setInterval(() => {
            setCountDown(endTime);
        }, 1000);
    };

    /* setCountDown function */
    const time = 0;
    const setCountDown = (endTime) => {
        // calculate how many milliseconds is left to reach endTime from now
        secondsLeftms = endTime - Date.now();
        // console.log(secondsLeftms);
        // convert it to seconds
        const secondsLeft = Math.round(secondsLeftms / 1000);

        // calculate the hours, minutes and seconds
        hours.value = Math.floor(secondsLeft / 3600);
        minutes.value = Math.floor(secondsLeft / 60) - (hours.value * 60);

        seconds.value = secondsLeft % 60;

        // adding an extra zero infront of digits if it is < 10
        if (hours.value < 10) {
            hours.value = `0${hours.value}`;
        }
        if (minutes.value < 10) {
            minutes.value = `0${minutes.value}`;
        }
        if (seconds.value < 10) {
            seconds.value = `0${seconds.value}`;
        }
        // console.log(hours.value, minutes.value, seconds.value);
        if (secondsLeft < 0) {
            resetCountDown();
            return;
        }

    };
    /* setCountDown function ends */


    function resetCountDown() {
        hours.value = '00';
        minutes.value = '00';
        seconds.value = '00';
    }
    // function pomodoroTime() {
    //     const time = localStorage.getItem('pomodoro');
    //     form.minutes=time;
    // }
    function hrsMinconvg(pomodoroMinutes) {
        let totalMinutes = pomodoroMinutes;
        let hoursValue = Math.floor(totalMinutes / 60);
        let minutesValue = totalMinutes % 60;
        return { hoursValue, minutesValue };
    }

    return {
        countDownInterval,
        secondsLeftms,
        endTime,
        hrsMinconvg,
        shortBreakClick,
        pomodoroClick,
        longBreakVal,
        stop,
        resume,
        hours, minutes, seconds, startTimer, setCountDown, hrsMinconvg
    }

}
export default timer;