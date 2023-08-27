<script setup>
import { defineProps, ref, watch, getCurrentInstance } from 'vue';
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
});

const handleButton = () => {
    const buttons = document.querySelectorAll("#stepButton")
    if (level.value === 1) {
        buttons[2].classList.replace("bg-[#f6f6f6]", "bg-[#49b779]")
        buttons[1].classList.replace("bg-[#49b779]", "bg-[#f6f6f6]")
        buttons[0].classList.replace("bg-[#49b779]", "bg-[#f6f6f6]")

        buttons[2].classList.replace("text-[#adadad]", "text-white")
        buttons[1].classList.replace("text-white", "text-[#adadad]")
        buttons[0].classList.replace("text-white", "text-[#adadad]")
    }
    if (level.value === 2) {
        buttons[1].classList.replace("bg-[#f6f6f6]", "bg-[#49b779]")
        buttons[2].classList.replace("bg-[#f6f6f6]", "bg-[#49b779]")
        buttons[0].classList.replace("bg-[#49b779]", "bg-[#f6f6f6]")

        buttons[1].classList.replace("text-[#adadad]", "text-white")
        buttons[0].classList.replace("text-white", "text-[#adadad]")
        buttons[2].classList.replace("text-[#adadad]", "text-white")
    }
    if (level.value === 3) {
        buttons[0].classList.replace("bg-[#f6f6f6]", "bg-[#49b779]")
        buttons[1].classList.replace("bg-[#f6f6f6]", "bg-[#49b779]")
        buttons[2].classList.replace("bg-[#f6f6f6]", "bg-[#49b779]")

        buttons[0].classList.replace("text-[#adadad]", "text-white")
        buttons[1].classList.replace("text-[#adadad]", "text-white")
        buttons[2].classList.replace("text-[#adadad]", "text-white")
    }
}

const handleButtonClick = (number) => {
    level.value = number
}

const level = ref(props.level);
const { emit } = getCurrentInstance();
watch(level, (newValue) => {
    // ارسال مقدار جدید به کامپوننت بالایی
    emit('update:level', newValue);
});

</script>
<template>
    <div @click="handleButton"
        class="absolute left-[50%] top-[100px] -translate-x-[50%] -translate-y-[50%] flex justify-center items-center">
        <button id="stepButton" @click="handleButtonClick(3)"
            class="w-[25px] h-[25px] flex items-center justify-center bg-[#f6f6f6] rounded-full text-[#adadad]">3</button>
        <div class="w-[30px] h-[1px] bg-[#adadad]"></div>
        <button id="stepButton" @click="handleButtonClick(2)"
            class='w-[25px] h-[25px] flex items-center justify-center bg-[#f6f6f6] rounded-full text-[#adadad]'>2</button>
        <div class="w-[30px] h-[1px] bg-[#adadad]"></div>
        <button id="stepButton" @click="handleButtonClick(1)"
            class="w-[25px] h-[25px] flex items-center justify-center bg-[#49b779] rounded-full text-white">1
        </button>
    </div>
</template>