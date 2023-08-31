<script setup>
import { defineProps, ref, watch, getCurrentInstance } from 'vue';
const props = defineProps({
    level: {
        required: true,
    },
    saveData:{
        required: true,
    },
    accuracy:{
        required:true,
    }
});

watch(() => props.level, (newValue) => {
    level.value = newValue;
});

watch(() => props.accuracy, (newValue) => {
    accuracy.value = newValue;
});

const level = ref(props.level);
const saveData = ref(props.saveData);
const accuracy = ref(props.accuracy)
const { emit } = getCurrentInstance();
watch([level,saveData], ([newValue,newsaveData]) => {
    // ارسال مقدار جدید به کامپوننت بالایی
    emit('update:level', newValue);
    emit('update:saveData', newsaveData);
});

const increaseLevel = () => {
    if(level.value != 4){
        level.value = level.value + 1
    }
}
</script>
<template>
    <div v-if="level !== 4" class="flex justify-center items-center gap-1 max-w-[400px] w-full fixed bottom-0  py-[20px] px-[10px] bg-white">
        <button  @click="increaseLevel"
            class="text-white bg-[#49B779] rounded-md w-1/3 px-3 p-2 shadow-[0_4px_4px_0_#c9c9c9] text-[14px]">
            مرحله بعدی
        </button>
        <div class="w-2/3 flex flex-col gap-1">
            <div class="flex justify-between">
                <span class="text-[14px]">میزان دقت</span>
                <span class="text-[14px] text-[#49b779] font-bold">%{{accuracy}}</span>
            </div>
            <progress max="100" :value="accuracy" class="relative" dir="ltr">
            </progress>
        </div>
    </div>

    <div v-else class="grid grid-cols-2 gap-3 max-w-[400px] w-full fixed text-[12px] bottom-0 p-[20px] bg-white">
        <RouterLink to="/" class="text-white col-span-1 text-center bg-[#49B779] rounded-md px-3 p-2 shadow-[0_4px_4px_0_#c9c9c9]">گل بعدیتو وارد کن</RouterLink>
        <RouterLink to="/garden" class="col-span-1 text-center border p-2 px-3 rounded-md border-[#49b779]">لیست همه گل و گیاهام</RouterLink>
    </div>
</template>


<style scoped>
progress[value] {
	appearance: none;
    height: 5px;
    width: 100%;
    background-color: #c9c9c9;
    border-radius: 3px;	
	color: #49b779;
}

/*
Webkit browsers provide two pseudo classes that can be use to style HTML5 progress element.
-webkit-progress-bar -> To style the progress element container
-webkit-progress-value -> To style the progress element value.
*/

progress[value]::-webkit-progress-bar {
	background-color: #c9c9c9;
	border-radius: 3px;
}

progress[value]::-webkit-progress-value {
	position: relative;
	background-size: 35px 20px, 100% 100%, 100% 100%;
	border-radius:3px;
	
	/* Let's animate this */
	animation: animate-stripes 5s linear infinite;
}

@keyframes animate-stripes { 100% { background-position: -100px 0; } }

/* Let's spice up things little bit by using pseudo elements. */

progress[value]::-webkit-progress-value:after {
	/* Only webkit/blink browsers understand pseudo elements on pseudo classes. A rare phenomenon! */
	content: '';
	position: absolute;
	
	width:5px; height:5px;
	top:7px; right:7px;
	
	background-color: white;
	border-radius: 100%;
}

/* Firefox provides a single pseudo class to style the progress element value and not for container. -moz-progress-bar */

progress[value]::-moz-progress-bar {
	/* Gradient background with Stripes */
	background-image: -moz-linear-gradient( #49b779, #49b779);
	
	background-size: 35px 20px, 100% 100%, 100% 100%;
	border-radius:3px;
	
	/* Firefox doesn't support CSS3 keyframe animations on progress element. Hence, we did not include animate-stripes in this code block */
}
</style>