<script setup>
import { defineProps, ref, watch, getCurrentInstance , onMounted } from 'vue';

const props = defineProps({
    light: {
        required: true,
    },
    water: {
        required: true,
    },
    temprature:{
        required: true,
    },
    soil:{
        required: true,
    },
    score:{
        required: true,
    }
});

onMounted(() => {
    initLight(props.light != null ? props.light : [])
    initWater(props.water != null ? props.water : [])
    initTemprature(props.temprature != null ? props.temprature : [])
    initSoil(props.soil != null ? props.soil : [])
})

const initLight = (data) =>{
    const lightButton = document.querySelectorAll("#lightButton");
    if (data === "نور خورشید(مستقیم)") {
        lightButton[0].classList.replace("border-transparent", "border-[#49b779]");
    } if (data === "نور خورشید(غیر مستقیم)") {
        lightButton[1].classList.replace("border-transparent", "border-[#49b779]");
    } if (data === "(فیلتر دار)نور خورشید") {
        lightButton[2].classList.replace("border-transparent", "border-[#49b779]");
    } if (data === "(چراغ رشد)نور مصنوعی") {
        lightButton[3].classList.replace("border-transparent", "border-[#49b779]");
    } if (data === "(تاریک یا نور خونه)بدون نور") {
        lightButton[4].classList.replace("border-transparent", "border-[#49b779]");
    }
}

const initWater = (data) =>{
    const button = document.querySelectorAll("#waterButton");
    if (data === "خشک") {
        button[0].classList.replace("border-transparent", "border-[#49b779]");
    } if (data === "مرطوب") {
        button[1].classList.replace("border-transparent", "border-[#49b779]");
    } if (data === "خیس") {
        button[2].classList.replace("border-transparent", "border-[#49b779]");
    } if (data === "گلم آبزیه") {
        button[3].classList.replace("border-transparent", "border-[#49b779]");
    }
}

const initTemprature = (data) =>{
    const button = document.querySelector("#tempButton")
    if (data == "معتدل") {
        button.value = 1
    }
    if (data == "گرم") {
        button.value = 2
    }
    if (data == "سرد") {
        button.value = 3
    }
    if(data > 4){
        button.value = 4
        temprature.value = data
    }
}

const initSoil = (data) => {
    const button = document.querySelectorAll("#soilButton");
    for(let i=0;i<data.length;i++){
        if (data[i] === "گلم آبزیه") {
            button[0].classList.replace("border-transparent", "border-[#49b779]");
    
        } if (data[i] === "(آب سریع به کف گلدون میرسه)خاکش سبکه") {
            button[1].classList.replace("border-transparent", "border-[#49b779]");
    
        } if (data[i] === "آب دیر به کف گلدون میرسه)خاکش سنگینه") {
            button[2].classList.replace("border-transparent", "border-[#49b779]");
    
        } if (data[i] === "خاکش سفته") {
            button[3].classList.replace("border-transparent", "border-[#49b779]");
    
        } if (data[i] === "روی خاکش کپک زده") {
            button[4].classList.replace("border-transparent", "border-[#49b779]");
    
        } if (data[i] === "روی خاکش شوره زده") {
            button[5].classList.replace("border-transparent", "border-[#49b779]");
    
        } if (data[i] === "خاکش حشره داره") {
            button[6].classList.replace("border-transparent", "border-[#49b779]");
    
        }
    }
}

const light = ref(props.light)
const water = ref(props.water)
const temprature = ref(props.temprature)
const soil = ref(props.soil)
const score = ref(props.score)
const { emit } = getCurrentInstance()
watch([light, water, temprature, soil, score], ([newlight, newwater, newtemprature, newsoil, newscore]) => {
    // ارسال مقدار جدید به کامپوننت بالایی
    emit('update:light', newlight);
    emit('update:water', newwater);
    emit('update:temprature', newtemprature);
    emit('update:soil', newsoil);
    emit('update:score', newscore);
},
{ deep: true } // فعال کردن ویژگی deep برای تمامی ویژگی‌ها
);

const flag1= ref(true)
const setLight = (number) => {
  const buttons = document.querySelectorAll("#lightButton");
  const activeIndex = number - 1;

  for (let i = 0; i < buttons.length; i++) {
    if (i === activeIndex) {
        // console.log(buttons[i].classList.replace("border-transparent", "border-[#49b779]"));
      buttons[i].classList.replace("border-transparent", "border-[#49b779]");
    } else {
      buttons[i].classList.replace("border-[#49b779]", "border-transparent");
    }
  }

  if(number === 1){
  light.value = "نور خورشید(مستقیم)";
  }if(number === 2){
  light.value = "نور خورشید(غیر مستقیم)";
}if(number === 3){
  light.value = "(فیلتر دار)نور خورشید";
}if(number === 4){
  light.value = "(چراغ رشد)نور مصنوعی";
}if(number === 5){
  light.value = "(تاریک یا نور خونه)بدون نور"; 
}
  
  if(flag1.value){
      score.value += 10
      flag1.value=false
  }
}

const flag2= ref(true)
const setWater = (number) => {
  const buttons = document.querySelectorAll("#waterButton");
  const activeIndex = number - 1;

  for (let i = 0; i < buttons.length; i++) {
    if (i === activeIndex) {
      buttons[i].classList.replace("border-transparent", "border-[#49b779]");
    } else {
      buttons[i].classList.replace("border-[#49b779]", "border-transparent");
    }
  }

  if(number ===1){
    water.value = "خشک";

  }if(number ===2){
    water.value = "مرطوب";
    
  }if(number ===3){
    water.value = "خیس";
    
}if(number ===4){
    water.value = "گلم آبزیه";
    
}
  if(flag2.value){
      score.value += 10
      flag2.value=false
  }
}
const tempRange = ref(null)
const tempSelect = ref(null)
const flag3= ref(true)
const setTemp = (e) =>{
    if (e.target.value == 4) {
        tempRange.value.classList.replace('hidden', 'flex')
        tempSelect.value.classList.replace('w-full', 'w-1/3')
        temprature.value = 22
    } else {
        tempRange.value.classList.replace('flex', 'hidden')
        tempSelect.value.classList.replace('w-1/3', 'w-full')
        if (e.target.value == 1) {
            temprature.value = null
            temprature.value = "معتدل"
        }
            temprature.value = null
        if (e.target.value == 2) {
            temprature.value = null
            temprature.value = "گرم"
        }
        if (e.target.value == 3) {
            temprature.value = null
            temprature.value = "سرد"
        }
    }
    if(flag3.value){
        score.value += 10
        flag3.value=false
    }
}

const setTempRange = (e) => {
    temprature.value = e.target.value
}

const flag = [false,false,false,false,false,false,false]
const flag4 =ref(true)
const setSoil = (number) => {
    const buttons = document.querySelectorAll("#soilButton");
    const index = number - 1;

    if (flag[index]) {
        buttons[index].classList.replace("border-[#49b779]", "border-transparent");
        if (number === 1) {
            soil.value = soil.value.filter(item => item !== ("گلم آبزیه"));
        } if (number === 2) {
            soil.value = soil.value.filter(item => item !== ("(آب سریع به کف گلدون میرسه)خاکش سبکه"));
        } if (number === 3) {
            soil.value = soil.value.filter(item => item !== ("آب دیر به کف گلدون میرسه)خاکش سنگینه"));
        } if (number === 4) {
            soil.value = soil.value.filter(item => item !== ("خاکش سفته"));
        } if (number === 5) {
            soil.value = soil.value.filter(item => item !== ("روی خاکش کپک زده"));
        } if (number === 6) {
            soil.value = soil.value.filter(item => item !== ("روی خاکش شوره زده"));
        } if (number === 7) {
            soil.value = soil.value.filter(item => item !== ("خاکش حشره داره"));
        }
        flag[index] = false;
        for (let i = 0; i < flag.length; i++) {
            if (flag[i]) {
                break;
            }
        }
        if(soil.value.length === 0){
            if(!flag4.value){
                score.value -= 10
                flag4.value = true
            }
        }
    } else {
        buttons[index].classList.replace("border-transparent", "border-[#49b779]");
        if (number === 1) {
            soil.value.push("گلم آبزیه");
        } if (number === 2) {
            soil.value.push("(آب سریع به کف گلدون میرسه)خاکش سبکه");
        } if (number === 3) {
            soil.value.push("آب دیر به کف گلدون میرسه)خاکش سنگینه");
        } if (number === 4) {
            soil.value.push("خاکش سفته");
        } if (number === 5) {
            soil.value.push("روی خاکش کپک زده");
        } if (number === 6) {
            soil.value.push("روی خاکش شوره زده");
        } if (number === 7) {
            soil.value.push("خاکش حشره داره");
        }
        flag[index] = true;
        if (flag4.value) {
            score.value += 10
            flag4.value = false
        }
    }
}

</script>
<template>
    <div class="max-w-[400px] w-full flex flex-col gap-2 p-[20px] mb-[70px]">

        <div class="flex flex-col justify-center items-center gap-[10px]">
            <!-- light -->
            <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                <div class="flex gap-[5px] items-center mb-[10px]">
                    <i>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 3.15508C9.13261 3.15508 9.25979 3.1024 9.35355 3.00863C9.44732 2.91486 9.5 2.78769 9.5 2.65508V0.955078C9.5 0.82247 9.44732 0.695293 9.35355 0.601525C9.25979 0.507757 9.13261 0.455078 9 0.455078C8.86739 0.455078 8.74021 0.507757 8.64645 0.601525C8.55268 0.695293 8.5 0.82247 8.5 0.955078V2.65508C8.5 2.78769 8.55268 2.91486 8.64645 3.00863C8.74021 3.1024 8.86739 3.15508 9 3.15508Z"
                                fill="#49B779" />
                            <path
                                d="M9 14.8452C8.86739 14.8452 8.74021 14.8979 8.64645 14.9917C8.55268 15.0854 8.5 15.2126 8.5 15.3452V17.0452C8.5 17.1778 8.55268 17.305 8.64645 17.3988C8.74021 17.4925 8.86739 17.5452 9 17.5452C9.13261 17.5452 9.25979 17.4925 9.35355 17.3988C9.44732 17.305 9.5 17.1778 9.5 17.0452V15.3452C9.5 15.2126 9.44732 15.0854 9.35355 14.9917C9.25979 14.8979 9.13261 14.8452 9 14.8452Z"
                                fill="#49B779" />
                            <path
                                d="M4.15983 4.87007C4.2528 4.95459 4.37419 5.001 4.49983 5.00007C4.56563 5.00045 4.63086 4.98784 4.69178 4.96296C4.7527 4.93808 4.80811 4.90141 4.85483 4.85507C4.90169 4.80859 4.93889 4.75329 4.96427 4.69236C4.98966 4.63143 5.00273 4.56608 5.00273 4.50007C5.00273 4.43407 4.98966 4.36871 4.96427 4.30778C4.93889 4.24685 4.90169 4.19155 4.85483 4.14507L3.66483 2.96007C3.56918 2.87816 3.44614 2.83536 3.3203 2.84022C3.19446 2.84508 3.07509 2.89724 2.98605 2.98629C2.897 3.07534 2.84483 3.19471 2.83997 3.32055C2.83511 3.44638 2.87791 3.56942 2.95983 3.66507L4.15983 4.87007Z"
                                fill="#49B779" />
                            <path
                                d="M13.84 13.13C13.7933 13.0833 13.738 13.0464 13.6771 13.0211C13.6162 12.9959 13.5509 12.9829 13.485 12.9829C13.419 12.9829 13.3537 12.9959 13.2928 13.0211C13.2319 13.0464 13.1766 13.0833 13.13 13.13C13.0833 13.1766 13.0464 13.2319 13.0211 13.2928C12.9959 13.3537 12.9829 13.419 12.9829 13.485C12.9829 13.5509 12.9959 13.6162 13.0211 13.6771C13.0464 13.738 13.0833 13.7933 13.13 13.84L14.335 15.04C14.3813 15.0872 14.4365 15.1248 14.4974 15.1505C14.5584 15.1763 14.6238 15.1897 14.69 15.19C14.8218 15.1881 14.9476 15.1342 15.04 15.04C15.1331 14.9463 15.1854 14.8195 15.1854 14.6875C15.1854 14.5554 15.1331 14.4286 15.04 14.335L13.84 13.13Z"
                                fill="#49B779" />
                            <path
                                d="M3.15483 9C3.15483 8.86739 3.10216 8.74021 3.00839 8.64645C2.91462 8.55268 2.78744 8.5 2.65483 8.5H0.954834C0.822226 8.5 0.695049 8.55268 0.601281 8.64645C0.507512 8.74021 0.454834 8.86739 0.454834 9C0.454834 9.13261 0.507512 9.25979 0.601281 9.35355C0.695049 9.44732 0.822226 9.5 0.954834 9.5H2.65483C2.78744 9.5 2.91462 9.44732 3.00839 9.35355C3.10216 9.25979 3.15483 9.13261 3.15483 9Z"
                                fill="#49B779" />
                            <path
                                d="M17.0451 8.5H15.3451C15.2125 8.5 15.0853 8.55268 14.9915 8.64645C14.8978 8.74021 14.8451 8.86739 14.8451 9C14.8451 9.13261 14.8978 9.25979 14.9915 9.35355C15.0853 9.44732 15.2125 9.5 15.3451 9.5H17.0451C17.1777 9.5 17.3049 9.44732 17.3986 9.35355C17.4924 9.25979 17.5451 9.13261 17.5451 9C17.5451 8.86739 17.4924 8.74021 17.3986 8.64645C17.3049 8.55268 17.1777 8.5 17.0451 8.5Z"
                                fill="#49B779" />
                            <path
                                d="M4.16004 13.13L2.96004 14.335C2.88983 14.4046 2.84184 14.4935 2.82215 14.5904C2.80246 14.6873 2.81194 14.7879 2.8494 14.8794C2.88687 14.9709 2.95062 15.0493 3.03262 15.1045C3.11461 15.1598 3.21115 15.1895 3.31004 15.19C3.37619 15.1897 3.44163 15.1763 3.50257 15.1505C3.56351 15.1248 3.61873 15.0872 3.66504 15.04L4.87004 13.84C4.96419 13.7458 5.01708 13.6181 5.01708 13.485C5.01708 13.3518 4.96419 13.2241 4.87004 13.13C4.77589 13.0358 4.64819 12.9829 4.51504 12.9829C4.38189 12.9829 4.25419 13.0358 4.16004 13.13Z"
                                fill="#49B779" />
                            <path
                                d="M13.4998 4.99971C13.5657 5.00009 13.6309 4.98748 13.6918 4.9626C13.7527 4.93772 13.8081 4.90105 13.8548 4.85471L15.0548 3.64971C15.148 3.55603 15.2002 3.42931 15.2002 3.29721C15.2002 3.16512 15.148 3.03839 15.0548 2.94471C14.9612 2.85159 14.8344 2.79932 14.7023 2.79932C14.5703 2.79932 14.4435 2.85159 14.3498 2.94471L13.1448 4.14471C13.098 4.19119 13.0608 4.24649 13.0354 4.30742C13.01 4.36835 12.9969 4.43371 12.9969 4.49971C12.9969 4.56572 13.01 4.63107 13.0354 4.692C13.0608 4.75293 13.098 4.80823 13.1448 4.85471C13.1916 4.90105 13.247 4.93772 13.3079 4.9626C13.3688 4.98748 13.434 5.00009 13.4998 4.99971Z"
                                fill="#49B779" />
                            <path
                                d="M9.06518 3.87493C8.06075 3.86204 7.07517 4.1481 6.23373 4.69676C5.39229 5.24541 4.73299 6.03188 4.33965 6.95617C3.9463 7.88047 3.83668 8.90086 4.02471 9.88761C4.21274 10.8744 4.68994 11.7829 5.39563 12.4978C6.10133 13.2127 7.00365 13.7016 7.9879 13.9023C8.97215 14.1031 9.99386 14.0066 10.9232 13.6253C11.8525 13.2439 12.6474 12.5948 13.2069 11.7605C13.7663 10.9262 14.0651 9.94444 14.0652 8.93993C14.0718 7.60581 13.5493 6.32349 12.612 5.37404C11.6747 4.4246 10.3993 3.8855 9.06518 3.87493ZM9.06518 12.9999C8.25835 13.0128 7.46592 12.7853 6.78883 12.3463C6.11174 11.9074 5.58062 11.2768 5.2631 10.535C4.94558 9.79311 4.85604 8.97355 5.00588 8.18064C5.15572 7.38773 5.53815 6.65736 6.10448 6.08254C6.67081 5.50771 7.39541 5.11445 8.18599 4.95282C8.97658 4.7912 9.79739 4.86853 10.5439 5.17496C11.2904 5.4814 11.9288 6.00308 12.3778 6.67356C12.8268 7.34404 13.0661 8.13299 13.0652 8.93993C13.0705 10.008 12.6527 11.0347 11.9031 11.7955C11.1535 12.5563 10.1332 12.9894 9.06518 12.9999Z"
                                fill="#49B779" />
                        </svg>
                    </i>
                    <span class="text-[12px]">نوری که به گلت می تابه چطوریه؟</span>
                </div>
                <div class="grid grid-cols-3 justify-center items-center gap-1">

                    <button id="lightButton" @click="setLight(1)"
                        class="relative border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 23 23" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.75"
                                    d="M11.5 17.25C13.025 17.25 14.4875 16.6442 15.5659 15.5659C16.6442 14.4875 17.25 13.025 17.25 11.5C17.25 9.97501 16.6442 8.51247 15.5659 7.43414C14.4875 6.3558 13.025 5.75 11.5 5.75C9.97501 5.75 8.51247 6.3558 7.43414 7.43414C6.3558 8.51247 5.75 9.97501 5.75 11.5C5.75 13.025 6.3558 14.4875 7.43414 15.5659C8.51247 16.6442 9.97501 17.25 11.5 17.25ZM11.5 0C11.6906 0 11.8734 0.0757252 12.0082 0.210517C12.143 0.345309 12.2188 0.528126 12.2188 0.71875V3.59375C12.2188 3.78437 12.143 3.96719 12.0082 4.10198C11.8734 4.23677 11.6906 4.3125 11.5 4.3125C11.3094 4.3125 11.1266 4.23677 10.9918 4.10198C10.857 3.96719 10.7812 3.78437 10.7812 3.59375V0.71875C10.7812 0.528126 10.857 0.345309 10.9918 0.210517C11.1266 0.0757252 11.3094 0 11.5 0ZM11.5 18.6875C11.6906 18.6875 11.8734 18.7632 12.0082 18.898C12.143 19.0328 12.2188 19.2156 12.2188 19.4062V22.2812C12.2188 22.4719 12.143 22.6547 12.0082 22.7895C11.8734 22.9243 11.6906 23 11.5 23C11.3094 23 11.1266 22.9243 10.9918 22.7895C10.857 22.6547 10.7812 22.4719 10.7812 22.2812V19.4062C10.7812 19.2156 10.857 19.0328 10.9918 18.898C11.1266 18.7632 11.3094 18.6875 11.5 18.6875ZM23 11.5C23 11.6906 22.9243 11.8734 22.7895 12.0082C22.6547 12.143 22.4719 12.2188 22.2812 12.2188H19.4062C19.2156 12.2188 19.0328 12.143 18.898 12.0082C18.7632 11.8734 18.6875 11.6906 18.6875 11.5C18.6875 11.3094 18.7632 11.1266 18.898 10.9918C19.0328 10.857 19.2156 10.7812 19.4062 10.7812H22.2812C22.4719 10.7812 22.6547 10.857 22.7895 10.9918C22.9243 11.1266 23 11.3094 23 11.5ZM4.3125 11.5C4.3125 11.6906 4.23677 11.8734 4.10198 12.0082C3.96719 12.143 3.78437 12.2188 3.59375 12.2188H0.71875C0.528126 12.2188 0.345309 12.143 0.210517 12.0082C0.0757252 11.8734 0 11.6906 0 11.5C0 11.3094 0.0757252 11.1266 0.210517 10.9918C0.345309 10.857 0.528126 10.7812 0.71875 10.7812H3.59375C3.78437 10.7812 3.96719 10.857 4.10198 10.9918C4.23677 11.1266 4.3125 11.3094 4.3125 11.5ZM19.6319 3.36806C19.7667 3.50285 19.8424 3.68563 19.8424 3.87622C19.8424 4.06681 19.7667 4.24959 19.6319 4.38437L17.5993 6.41844C17.5325 6.48517 17.4532 6.53809 17.3659 6.57416C17.2786 6.61024 17.1851 6.62878 17.0906 6.62871C16.8999 6.62858 16.7171 6.55268 16.5823 6.41772C16.5155 6.35089 16.4626 6.27158 16.4266 6.1843C16.3905 6.09702 16.3719 6.00349 16.372 5.90905C16.3721 5.71832 16.448 5.53546 16.583 5.40069L18.6156 3.36806C18.7504 3.23332 18.9332 3.15762 19.1238 3.15762C19.3144 3.15762 19.4972 3.23332 19.6319 3.36806ZM6.417 16.583C6.55175 16.7178 6.62744 16.9006 6.62744 17.0912C6.62744 17.2817 6.55175 17.4645 6.417 17.5993L4.38437 19.6319C4.24882 19.7629 4.06726 19.8353 3.87881 19.8337C3.69035 19.832 3.51008 19.7564 3.37682 19.6232C3.24356 19.4899 3.16797 19.3096 3.16633 19.1212C3.16469 18.9327 3.23714 18.7512 3.36806 18.6156L5.40069 16.583C5.53547 16.4483 5.71826 16.3726 5.90884 16.3726C6.09943 16.3726 6.28221 16.4483 6.417 16.583ZM19.6319 19.6319C19.4972 19.7667 19.3144 19.8424 19.1238 19.8424C18.9332 19.8424 18.7504 19.7667 18.6156 19.6319L16.583 17.5993C16.4521 17.4638 16.3796 17.2822 16.3813 17.0937C16.3829 16.9053 16.4585 16.725 16.5918 16.5918C16.725 16.4585 16.9053 16.3829 17.0937 16.3813C17.2822 16.3796 17.4638 16.4521 17.5993 16.583L19.6319 18.6156C19.7667 18.7504 19.8424 18.9332 19.8424 19.1238C19.8424 19.3144 19.7667 19.4972 19.6319 19.6319ZM6.417 6.41844C6.28221 6.55318 6.09943 6.62888 5.90884 6.62888C5.71826 6.62888 5.53547 6.55318 5.40069 6.41844L3.36806 4.38437C3.29941 4.31807 3.24466 4.23876 3.20699 4.15107C3.16932 4.06338 3.14949 3.96907 3.14866 3.87363C3.14783 3.7782 3.16602 3.68355 3.20216 3.59522C3.2383 3.50689 3.29167 3.42664 3.35915 3.35915C3.42664 3.29167 3.50689 3.2383 3.59522 3.20216C3.68355 3.16602 3.7782 3.14783 3.87363 3.14866C3.96907 3.14949 4.06338 3.16932 4.15107 3.20699C4.23876 3.24466 4.31807 3.29941 4.38437 3.36806L6.417 5.40069C6.48393 5.46745 6.53704 5.54677 6.57327 5.63409C6.60951 5.72141 6.62816 5.81502 6.62816 5.90956C6.62816 6.0041 6.60951 6.09771 6.57327 6.18504C6.53704 6.27236 6.48393 6.35167 6.417 6.41844Z"
                                    fill="#49B779" />
                            </svg>
                            <span class="w-full text-[10px]">نور خورشید</span>
                            <span class="w-full text-[10px]">مستقیم</span>
                        </div>
                    </button>

                    <button id="lightButton" @click="setLight(2)"
                        class="relative border  border-transparent  flex items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.1"
                                viewBox="0 0 96 96">
                                <path fill="#49b779" d="
                                M 47.06 0.00
                                L 49.06 0.00
                                C 52.48 1.80 51.30 13.11 51.21 14.49
                                Q 50.94 18.53 47.41 17.97
                                Q 44.89 17.58 44.82 15.03
                                C 44.73 11.55 43.46 1.69 47.06 0.00
                                Z" />
                                <rect fill="#49b779" x="-3.09" y="-9.17"
                                    transform="translate(20.42,20.42) rotate(-45.0)" width="6.18" height="18.34"
                                    rx="3.01" />
                                <rect fill="#49b779" x="-3.09" y="-9.16"
                                    transform="translate(75.58,20.42) rotate(45.0)" width="6.18" height="18.32"
                                    rx="3.01" />
                                <path fill="#49b779" d="
                                M 24.01 47.31
                                C 23.66 35.05 34.46 25.18 45.24 24.18
                                C 59.83 22.83 70.13 32.04 72.15 46.45
                                A 1.36 1.36 0.0 0 1 70.80 48.00
                                L 24.71 48.00
                                A 0.71 0.70 89.2 0 1 24.01 47.31
                                Z" />
                                <path fill="#49b779" d="
                                M 0.00 47.69
                                L 0.00 46.69
                                Q 1.40 44.85 3.06 44.81
                                C 7.99 44.68 17.53 43.54 17.86 47.34
                                A 0.50 0.50 0.0 0 1 17.39 47.88
                                Q 8.62 48.33 0.00 47.69
                                Z" />
                                <path fill="#49b779" d="
                                M 96.08 46.56
                                L 96.00 47.81
                                L 78.83 47.90
                                A 0.79 0.78 -83.6 0 1 78.06 46.93
                                Q 78.52 45.05 81.04 44.65
                                Q 89.00 43.41 96.08 46.56
                                Z" />
                            </svg>
                            <span class="w-full text-[10px]">نور خورشید</span>
                            <span class="w-full text-[10px]">غیر مستقیم</span>
                        </div>
                    </button>

                    <button id="lightButton" @click="setLight(3)"
                        class="relative border  border-transparent  flex items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col items-center justify-center">
                            <svg width="22" height="15" viewBox="0 0 27 17" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.5 0C18.2539 0 20.9501 2.97311 21.3416 6.562H21.4611C24.5199 6.562 27 8.89856 27 11.781C27 14.6634 24.5199 17 21.4611 17H5.53886C2.48014 17 0 14.6634 0 11.781C0 8.89856 2.48014 6.562 5.53886 6.562H5.65843C6.05379 2.94856 8.74607 0 13.5 0Z"
                                    fill="#49B779" />
                            </svg>
                            <span class="w-full text-[10px]">نور خورشید</span>
                            <span class="w-full text-[10px]">فیلتر دار</span>
                        </div>
                    </button>

                    <button id="lightButton" @click="setLight(4)"
                        class="relative border  border-transparent  flex items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col items-center justify-center">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="image0" width="24" height="24" x="0" y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAQlBMVEUAAABJt3lItXhIt3hA
                            r3BJsnlJtnlQr4BIt3hKt3pJt3lJtnlKtXpKunpIt3hItXhJuHlJuHlJtnhIt3hJt3n///+map+U
                            AAAAFHRSTlMA32AgEFBQEEB/v88wMGCAz++QgDWeEaQAAAABYktHRBXl2PmjAAAACXBIWXMAAAsT
                            AAALEwEAmpwYAAAAB3RJTUUH5wgbDy0YSOefQQAAAINJREFUKM+lkVESwiAMBQlBi7RKwXf/sypM
                            S0CwU8f9Yt5CEkCpfyD6IoAu0iwnzEXyK8jsayboIiaCNTcHzFotIJYjfH9vzBBb03TZclRFMw8U
                            fCNmEa6qQgoVOTgUCSf52vTwInQjJhn347Xkgj/8xqhQIiQRBiIPFke1YgjP8517XgM9CqSPkkaF
                            AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA4LTI3VDEzOjQ1OjI0KzAyOjAwf9ZgHgAAACV0RVh0
                            ZGF0ZTptb2RpZnkAMjAyMy0wOC0yN1QxMzo0NToyNCswMjowMA6L2KIAAAAASUVORK5CYII=" />
                            </svg>
                            <span class="w-full text-[10px]">نور مصنوعی</span>
                            <span class="w-full text-[10px]">(چراغ رشد)</span>
                        </div>
                    </button>

                    <button id="lightButton" @click="setLight(5)"
                        class="relative border  border-transparent  flex items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col items-center justify-center">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="17px" viewBox="0 0 12 17" enable-background="new 0 0 12 17" xml:space="preserve">  <image id="image0" width="12" height="17" x="0" y="0"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAMAAADe472QAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAASFBMVEUAAABIs3hKt3pJt3lJ
                            tnlJuHlJsnlAr3BJt3lJuHlIt3hKunpIt3hIt3hItXhJtnlQr4BIt3hJuHlItXhIt3hJuHlJt3n/
                            ///VUtHWAAAAFnRSTlMAQJ/fz69QEL/vgDBgIGBwEEDPgJ+PVkq80wAAAAFiS0dEFwvWmI8AAAAJ
                            cEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnCBsPLRhI559BAAAAdElEQVQI1z2O0RaDMAhDo+gK
                            q62yzfz/p660ap4SwrknADDNsqwvhJKya04tKO2d8yZUYKOUeCjC2orav7G3yphGOGggcak5oQ8/
                            8YNvUEIrfziMZ/izU7NRVRdajpuPBfXGuD9QMpUnKEVuZsy6BnZ5J+EP1BYGZ1Ah6d4AAAAldEVY
                            dGRhdGU6Y3JlYXRlADIwMjMtMDgtMjdUMTM6NDU6MjQrMDI6MDB/1mAeAAAAJXRFWHRkYXRlOm1v
                            ZGlmeQAyMDIzLTA4LTI3VDEzOjQ1OjI0KzAyOjAwDovYogAAAABJRU5ErkJggg==" />
                            </svg>
                            <span class="w-full text-[10px]">بدون نور</span>
                            <span class="w-full text-[8px]">(تاریک یا نور خونه)</span>
                        </div>
                    </button>

                </div>
            </div>

            <!-- water -->
            <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                <div class="flex gap-[5px] items-center mb-[10px]">
                    <i>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="19px" viewBox="0 0 18 19" enable-background="new 0 0 18 19" xml:space="preserve">  <image id="image0" width="18" height="19" x="0" y="0"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAMAAACqTK3AAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEUAAABJuHlJt3lJtnlI
                        s3hAr3BJtnlJuHlJt3lIt3hItnhItXhIt3hKt3pItXhKunpJuHlJsnlIt3hJtnlJtnlKuHpJtnhI
                        t3hJuHlIt3hIt3hJtnlGtnZFtXVKt3pJt3n///+mmgXZAAAAH3RSTlMA77+PQBBwr99goGAgn4Aw
                        z1CAUM9vkJ+PQLCvUDB/cYpPwwAAAAFiS0dEILNrPYAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAH
                        dElNRQfnCBsPNDoGh3e9AAAAwklEQVQY01WN22KDMAxDZZeLA3HYSsrK1s3//5dVGA+tXuwcSwpC
                        9NKhqR9GCwppmCxsRnYeS6KO+zLFh9jQ419ePrmOcWVy9Wpm0BrhLgtwk6heSmm1SSSj19jOZJeR
                        YkZfbTmrEGH2Bdwt0z9f3B1512jGo0zGhgClqRld5jOZY0dH4xG9Dw2tAmzKC0kK/n08oQX+jZbX
                        keOHNfJAZdHN8s4abIzbDv3l4DopXpSDeI139GjhVwSV4U+ubyhPQfIEafMK2EGM+S8AAAAldEVY
                        dGRhdGU6Y3JlYXRlADIwMjMtMDgtMjdUMTM6NTI6NTgrMDI6MDCR4cfKAAAAJXRFWHRkYXRlOm1v
                        ZGlmeQAyMDIzLTA4LTI3VDEzOjUyOjU4KzAyOjAw4Lx/dgAAAABJRU5ErkJggg==" />
                        </svg>
                    </i>
                    <span class="text-[12px]">هر سری که بگلت آب میدی خاکش چه شکلیه؟</span>
                </div>
                <div class="grid grid-cols-3 justify-center items-center gap-1">

                    <button id="waterButton" @click="setWater(1)"
                        class="relative border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col justify-center items-center">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="image0" width="24" height="24" x="0" y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAMFBMVEUAAABAr3BIt3hFtXVK
                            t3pJuHlJt3lKt3pIs3hJtnlJtXhIt3hItnhJtnlJt3n///+gvtykAAAADnRSTlMAECAwf+/fn0CP
                            kECgz14siKAAAAABYktHRA8YugDZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wgbEAAr
                            wGdA9QAAACtJREFUGNNjYBgMgFEBgkGA2TW9UcI10wDEfgcHIM6z1XvugfC7gXYuEAAAWB4T5+/F
                            kFAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDgtMjdUMTQ6MDA6NDMrMDI6MDBXnemJAAAAJXRF
                            WHRkYXRlOm1vZGlmeQAyMDIzLTA4LTI3VDE0OjAwOjQzKzAyOjAwJsBRNQAAAABJRU5ErkJggg==" />
                            </svg>
                            <span class="w-full text-[12px]">خشک</span>
                        </div>
                    </button>

                    <button id="waterButton" @click="setWater(2)"
                        class="relative border  border-transparent  flex items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col justify-center items-center">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="image0" width="24" height="24" x="0" y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAPFBMVEUAAABKunpFtXVIt3hJ
                            t3lJuHlJtnlKt3pJuHlIs3hIt3hAr3BItXhIt3hJt3lItXhQr4BIt3hJt3n///+k/+k4AAAAEnRS
                            TlMAMDAg3+/Pf49AQBCAYL9gEIBLUt7EAAAAAWJLR0QTDLtclgAAAAlwSFlzAAALEwAACxMBAJqc
                            GAAAAAd0SU1FB+cIGxABOSrFAPwAAABnSURBVCjPvdBLDoAgDATQKgU/IOjc/7CKhBCgLLUJm3lk
                            QiH6ZKZZzhVrJQIDRsoXgGjt8w0RsEtFL9m+KIFrX5TieKo5MACPXAVfAQpoAYZVArhSFSo4OQN3
                            X5vut3lcxTxwWfpxbnw2BudTRrn0AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA4LTI3VDE0OjAx
                            OjU3KzAyOjAwgLqmOgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wOC0yN1QxNDowMTo1NyswMjow
                            MPHnHoYAAAAASUVORK5CYII=" />
                            </svg>
                            <span class="w-full text-[10px]">مرطوب</span>
                        </div>
                    </button>

                    <button id="waterButton" @click="setWater(3)"
                        class="relative border  border-transparent  flex items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col justify-center items-center">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21px" height="21px" viewBox="0 0 21 21" enable-background="new 0 0 21 21" xml:space="preserve">  <image id="image0" width="21" height="21" x="0" y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAATlBMVEUAAABAr3BJuHlJt3lK
                            t3pJtnlIt3hIt3hJt3lItXhJuHlKtXpFtXVJtnlItXhIt3hIt3hKt3pQr4BJuHlIr3hIt3hJt3lI
                            t3hJt3n////LL4ywAAAAGHRSTlMAEK+/f3AgQN+A7zAwUGBgsJ8QzyCAoKCZJMF8AAAAAWJLR0QZ
                            7G61iAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cIGxAAK8BnQPUAAABzSURBVBjTndBJ
                            EoAgDARAENGICu7O/1+quEBcLjrHroTKIMSfyES+aAL1xBSAvmMGn/ymtCnJx75PcdmnQw0f1sDL
                            MAU1EUvEVEFrpjaoO6lxTMOsbVmRzuwddGbATis89oMmjLzGdDwxX//BqfVWZcX3LGOyC+6TYgC7
                            AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA4LTI3VDE0OjAwOjQzKzAyOjAwV53piQAAACV0RVh0
                            ZGF0ZTptb2RpZnkAMjAyMy0wOC0yN1QxNDowMDo0MyswMjowMCbAUTUAAAAASUVORK5CYII=" />
                            </svg>
                            <span class="w-full text-[10px]">خیس</span>
                        </div>
                    </button>

                    <button id="waterButton" @click="setWater(4)"
                        class="relative border  border-transparent  flex items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <div class="flex flex-col justify-center items-center">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAXVBMVEUAAABJuHlJt3lJt3lI
                            t3hIt3hIt3hJtnlFtXVAr3BJtnlQr4BItXhKt3pItXhIs3hJtnlIt3hJtXhKunpJuHlIt3hIt3hK
                            tXtItnhJuHlKt3pKuHpJuHlJt3n////BlWlkAAAAHXRSTlMA77/fYECfzzAQUBBgn4BAcCCQMM+w
                            gB+gj39vr1z+LugAAAABYktHRB5yCiArAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wgb
                            EAArwGdA9QAAAKpJREFUGNNtkNkSgyAMRWMiBSlKlFbtwv//ZiUFZWrzkpmT5SYX4H80KIkIoI0q
                            Q7pI0pig6WwNUaBqDnh1AlVvhsHLXOpETtD34zTJWqdAOQ54S+MWu+/4HWAmxwxg4zJz2dltZdo6
                            fVz2k0bMJ9kKrracRCbDwQWXYXBdhvhQmkaBfLyJ/Nx/r4TWbZXxAl+6/TGEqX2fDAmuSGU/tbyp
                            1rfQWJtchM7xAeFkB3niYKTdAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA4LTI3VDE0OjAwOjQz
                            KzAyOjAwV53piQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wOC0yN1QxNDowMDo0MyswMjowMCbA
                            UTUAAAAASUVORK5CYII=" />
                            </svg>
                            <span class="w-full text-[10px]">گلم آبزیه</span>
                        </div>
                    </button>

                </div>
            </div>

            <!-- temp -->
            <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                <div class="flex gap-[5px] items-center mb-[10px]">
                    <i>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 3.15508C9.13261 3.15508 9.25979 3.1024 9.35355 3.00863C9.44732 2.91486 9.5 2.78769 9.5 2.65508V0.955078C9.5 0.82247 9.44732 0.695293 9.35355 0.601525C9.25979 0.507757 9.13261 0.455078 9 0.455078C8.86739 0.455078 8.74021 0.507757 8.64645 0.601525C8.55268 0.695293 8.5 0.82247 8.5 0.955078V2.65508C8.5 2.78769 8.55268 2.91486 8.64645 3.00863C8.74021 3.1024 8.86739 3.15508 9 3.15508Z"
                                fill="#49B779" />
                            <path
                                d="M9 14.8452C8.86739 14.8452 8.74021 14.8979 8.64645 14.9917C8.55268 15.0854 8.5 15.2126 8.5 15.3452V17.0452C8.5 17.1778 8.55268 17.305 8.64645 17.3988C8.74021 17.4925 8.86739 17.5452 9 17.5452C9.13261 17.5452 9.25979 17.4925 9.35355 17.3988C9.44732 17.305 9.5 17.1778 9.5 17.0452V15.3452C9.5 15.2126 9.44732 15.0854 9.35355 14.9917C9.25979 14.8979 9.13261 14.8452 9 14.8452Z"
                                fill="#49B779" />
                            <path
                                d="M4.15983 4.87007C4.2528 4.95459 4.37419 5.001 4.49983 5.00007C4.56563 5.00045 4.63086 4.98784 4.69178 4.96296C4.7527 4.93808 4.80811 4.90141 4.85483 4.85507C4.90169 4.80859 4.93889 4.75329 4.96427 4.69236C4.98966 4.63143 5.00273 4.56608 5.00273 4.50007C5.00273 4.43407 4.98966 4.36871 4.96427 4.30778C4.93889 4.24685 4.90169 4.19155 4.85483 4.14507L3.66483 2.96007C3.56918 2.87816 3.44614 2.83536 3.3203 2.84022C3.19446 2.84508 3.07509 2.89724 2.98605 2.98629C2.897 3.07534 2.84483 3.19471 2.83997 3.32055C2.83511 3.44638 2.87791 3.56942 2.95983 3.66507L4.15983 4.87007Z"
                                fill="#49B779" />
                            <path
                                d="M13.84 13.13C13.7933 13.0833 13.738 13.0464 13.6771 13.0211C13.6162 12.9959 13.5509 12.9829 13.485 12.9829C13.419 12.9829 13.3537 12.9959 13.2928 13.0211C13.2319 13.0464 13.1766 13.0833 13.13 13.13C13.0833 13.1766 13.0464 13.2319 13.0211 13.2928C12.9959 13.3537 12.9829 13.419 12.9829 13.485C12.9829 13.5509 12.9959 13.6162 13.0211 13.6771C13.0464 13.738 13.0833 13.7933 13.13 13.84L14.335 15.04C14.3813 15.0872 14.4365 15.1248 14.4974 15.1505C14.5584 15.1763 14.6238 15.1897 14.69 15.19C14.8218 15.1881 14.9476 15.1342 15.04 15.04C15.1331 14.9463 15.1854 14.8195 15.1854 14.6875C15.1854 14.5554 15.1331 14.4286 15.04 14.335L13.84 13.13Z"
                                fill="#49B779" />
                            <path
                                d="M3.15483 9C3.15483 8.86739 3.10216 8.74021 3.00839 8.64645C2.91462 8.55268 2.78744 8.5 2.65483 8.5H0.954834C0.822226 8.5 0.695049 8.55268 0.601281 8.64645C0.507512 8.74021 0.454834 8.86739 0.454834 9C0.454834 9.13261 0.507512 9.25979 0.601281 9.35355C0.695049 9.44732 0.822226 9.5 0.954834 9.5H2.65483C2.78744 9.5 2.91462 9.44732 3.00839 9.35355C3.10216 9.25979 3.15483 9.13261 3.15483 9Z"
                                fill="#49B779" />
                            <path
                                d="M17.0451 8.5H15.3451C15.2125 8.5 15.0853 8.55268 14.9915 8.64645C14.8978 8.74021 14.8451 8.86739 14.8451 9C14.8451 9.13261 14.8978 9.25979 14.9915 9.35355C15.0853 9.44732 15.2125 9.5 15.3451 9.5H17.0451C17.1777 9.5 17.3049 9.44732 17.3986 9.35355C17.4924 9.25979 17.5451 9.13261 17.5451 9C17.5451 8.86739 17.4924 8.74021 17.3986 8.64645C17.3049 8.55268 17.1777 8.5 17.0451 8.5Z"
                                fill="#49B779" />
                            <path
                                d="M4.16004 13.13L2.96004 14.335C2.88983 14.4046 2.84184 14.4935 2.82215 14.5904C2.80246 14.6873 2.81194 14.7879 2.8494 14.8794C2.88687 14.9709 2.95062 15.0493 3.03262 15.1045C3.11461 15.1598 3.21115 15.1895 3.31004 15.19C3.37619 15.1897 3.44163 15.1763 3.50257 15.1505C3.56351 15.1248 3.61873 15.0872 3.66504 15.04L4.87004 13.84C4.96419 13.7458 5.01708 13.6181 5.01708 13.485C5.01708 13.3518 4.96419 13.2241 4.87004 13.13C4.77589 13.0358 4.64819 12.9829 4.51504 12.9829C4.38189 12.9829 4.25419 13.0358 4.16004 13.13Z"
                                fill="#49B779" />
                            <path
                                d="M13.4998 4.99971C13.5657 5.00009 13.6309 4.98748 13.6918 4.9626C13.7527 4.93772 13.8081 4.90105 13.8548 4.85471L15.0548 3.64971C15.148 3.55603 15.2002 3.42931 15.2002 3.29721C15.2002 3.16512 15.148 3.03839 15.0548 2.94471C14.9612 2.85159 14.8344 2.79932 14.7023 2.79932C14.5703 2.79932 14.4435 2.85159 14.3498 2.94471L13.1448 4.14471C13.098 4.19119 13.0608 4.24649 13.0354 4.30742C13.01 4.36835 12.9969 4.43371 12.9969 4.49971C12.9969 4.56572 13.01 4.63107 13.0354 4.692C13.0608 4.75293 13.098 4.80823 13.1448 4.85471C13.1916 4.90105 13.247 4.93772 13.3079 4.9626C13.3688 4.98748 13.434 5.00009 13.4998 4.99971Z"
                                fill="#49B779" />
                            <path
                                d="M9.06518 3.87493C8.06075 3.86204 7.07517 4.1481 6.23373 4.69676C5.39229 5.24541 4.73299 6.03188 4.33965 6.95617C3.9463 7.88047 3.83668 8.90086 4.02471 9.88761C4.21274 10.8744 4.68994 11.7829 5.39563 12.4978C6.10133 13.2127 7.00365 13.7016 7.9879 13.9023C8.97215 14.1031 9.99386 14.0066 10.9232 13.6253C11.8525 13.2439 12.6474 12.5948 13.2069 11.7605C13.7663 10.9262 14.0651 9.94444 14.0652 8.93993C14.0718 7.60581 13.5493 6.32349 12.612 5.37404C11.6747 4.4246 10.3993 3.8855 9.06518 3.87493ZM9.06518 12.9999C8.25835 13.0128 7.46592 12.7853 6.78883 12.3463C6.11174 11.9074 5.58062 11.2768 5.2631 10.535C4.94558 9.79311 4.85604 8.97355 5.00588 8.18064C5.15572 7.38773 5.53815 6.65736 6.10448 6.08254C6.67081 5.50771 7.39541 5.11445 8.18599 4.95282C8.97658 4.7912 9.79739 4.86853 10.5439 5.17496C11.2904 5.4814 11.9288 6.00308 12.3778 6.67356C12.8268 7.34404 13.0661 8.13299 13.0652 8.93993C13.0705 10.008 12.6527 11.0347 11.9031 11.7955C11.1535 12.5563 10.1332 12.9894 9.06518 12.9999Z"
                                fill="#49B779" />
                        </svg>
                    </i>
                    <span class="text-[12px]">گلت توی چه دمایی زندگی میکنه؟</span>
                </div>
                <div class="flex gap-[5px] items-center w-full">
                    <select ref="tempSelect" id="tempButton" class="w-full p-[5px] border border-[#49b779] rounded bg-white outline-none transition-all duration-200"
                        @input="setTemp">
                        <option selected disabled>انتخاب کنید</option>
                        <option value="1">معتدل</option>
                        <option value="2">گرم</option>
                        <option value="3">سرد</option>
                        <option value="4">{{ !isNaN(temprature) ? temprature != null ? temprature + " درجه" : "درجه" : "درجه" }}</option>
                    </select>
                    <div ref="tempRange" class="w-2/3 gap-[5px] items-center text-[16px] hidden">
                        <input @input="setTempRange" type="range" min="20" max="45" dir="ltr" value="22">
                        <span>{{ Temp }}</span>
                    </div>
                </div>
            </div>

            <!-- soil -->
            <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                <div class="flex gap-[5px] items-center mg-[10px] mb-[5px]">
                    <i>
                        
                    </i>
                    <span class="text-[12px]">خاک گلدونت چه شکلیه؟ (چند انتخابی)</span>

                </div>
                <div class='grid grid-cols-3 gap-1 justify-center items-center'>

                    <button id="soilButton" @click="setSoil(1)"
                        class="relative border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <span class="w-full text-[12px]">گلم آبزیه</span>
                    </button>

                    <button id="soilButton" @click="setSoil(2)"
                        class="relative flex-col col-span-2 border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <span class="w-full text-[12px]">خاکش سبکه</span>
                        <span class="w-full text-[12px]">(آب سریع به کف گلدون میرسه)</span>
                    </button>

                    <button id="soilButton" @click="setSoil(3)"
                        class="relative flex-col col-span-2 border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <span class="w-full text-[12px]">خاکش سنگینه</span>
                        <span class="w-full text-[12px]">(آب دیر به کف گلدون میرسه)</span>
                    </button>

                    <button id="soilButton" @click="setSoil(4)"
                        class="relative border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <span class="w-full text-[12px]">خاکش سفته</span>
                    </button>

                    <button id="soilButton" @click="setSoil(5)"
                        class="relative border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <span class="w-full text-[12px]">روی خاکش کپک زده</span>
                    </button>

                    <button id="soilButton" @click="setSoil(6)"
                        class="relative border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <span class="w-full text-[12px]">روی خاکش شوره زده</span>
                    </button>

                    <button id="soilButton" @click="setSoil(7)"
                        class="relative border border-transparent flex  items-center justify-center h-[60px] p-[10px] bg-[#f6fbf8] rounded-md">
                        <span class="w-full text-[12px]">خاکش حشره داره</span>
                    </button>
                
                </div>
            </div>

        </div>
    </div>
</template>
