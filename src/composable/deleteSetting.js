import { ref} from "vue";

const timerSetting =() =>{
    const visible = ref(false);
    function show() {
        visible.value = !visible.value;
        document.addEventListener("click", hide);
    }

    function hide() {
        visible.value = false;
        document.removeEventListener("click", hide);
    }
 return {
    show,visible,hide
 };
};

export default timerSetting;