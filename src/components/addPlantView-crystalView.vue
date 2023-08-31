<script setup>
import { defineProps,ref, onBeforeMount } from 'vue';
import serverURL from '../router/serverAddress'

const props = defineProps({
    name:{
        required:true,
    },
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
    },
    filename:{
        required: true
    },
    symptoms:{
        required: true,
    }
});

const timer = ref(300)
const timerCounter = () =>{
  setInterval(() => {
    if(timer.value === 0){
        return
    }
    timer.value--
    if(timer.value === 0){
      clearInterval()
    }
  }, 1000)
}

timerCounter()
</script>
<template>
    <div class="max-w-[400px] w-full flex flex-col gap-2 p-[20px] mb-[80px]">

        <div class="flex flex-col gap-3">
            <video :src="serverURL + '/library/video/cup.mp4'" alt="" autoplay loop/>
            <div class="flex flex-col justify-center items-center gap-1 -mt-[30px]">
                <span>تا یه لیوان <strong>چایی خوش عطر ایرانی</strong> بخوری</span>
                <span>نسخه ات آمادست</span>
            </div>
            <div class="flex justify-center items-center">
                <div class="bg-[#e9e9e9] rounded-full p-1 px-2" v-if="timer != 0">
                    {{ Math.floor(timer/60) }}:{{ timer%60 < 10 ? '0' + timer%60 : timer%60 }}
                </div>
                <div class="bg-[#e9e9e9] rounded-full p-1 px-2" v-else>
                   مثل اینکه کارت بیشتر طول کشید! 
                </div>
            </div>
            <div class="flex gap-1 justify-center items-center text-[12px]">
                <i class="text-yellow-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888Z"
                        fill="currentcolor" />
                </svg>
                </i>
                <span>لینک نسخه ات از طریق <strong>پیامک</strong>برات ارسال میشه</span>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-1">
            
            <div class="col-span-2 flex items-center justify-center border rounded-lg p-2">
                مرور اطلاعاتی که وارد کردی
            </div>
            
            <div class="col-span-1 flex flex-col justify-center items-center gap-1 rounded-lg bg-[#49b7792c] p-2">
                <span class="text-[12px]">دقت نسخه:</span>
                <span class="text-[#49b779] text-[20px] font-bold">%{{ props.score }}</span>
            </div>
            
            <div class="col-span-1 border rounded-lg">
                <img v-if="props.filename.length != 0" :src="serverURL + '/flower/images/' + props.filename[0]" class="object-cover w-full rounded-lg" :alt="props.filename[0]">
                <div v-else class="flex justify-center items-center w-full h-full rounded-lg text-[12px] text-[#49b779]">
                    عکسی نداری
                </div>
            </div>

            <div class="col-span-2 bg-[#49b7792c] rounded-lg p-2 text-[12px]">
                <span v-if="props.name == 'پیدا نکردم' || props.name == 'نمیشناسم'">
                    <span class="text-[#49b779] ml-1">اسم گل:</span>
                    <span>نامعلوم</span>
                </span>
                <span v-else>گلت <strong>{{ props.name }}</strong> بود</span>
                <div class="flex gap-1" v-if="props.light">
                    <span class="text-[#49b779]">نور:</span>
                    <span>{{ props.light }}</span>
                </div>
                <div class="flex gap-1" v-if="props.water">
                    <span class="text-[#49b779]">وضعیت خاک هنگام آبیاری:</span>
                    <span>{{ props.water}}</span>
                </div>
                <div class="flex gap-1" v-if="props.temprature">
                    <span class="text-[#49b779]">دمای محیط:</span>
                    <span>{{ props.temprature }}</span>
                </div>
                <div class="flex flex-col gap-1" v-if="props.soil.length != 0">
                    <span class="text-[#49b779]">نوع خاک:</span>
                    <span class="flex gap-1 truncate text-[10px]" v-for="item in props.soil">{{ item }}</span>
                </div>
            </div>

            <div class="col-span-3 bg-[#49b7792c] rounded-lg p-2 text-[12px]" v-if="props.symptoms.length != 0">
                <div class="flex flex-col gap-1">
                    <!-- <span class="text-[#49b779]">علائم برگ:</span> -->
                    <span class="text-[#49b779]">علائم :</span>
                    <span v-for="item in props.symptoms">{{ item }}</span>
                </div>
                <!-- <div class="flex flex-col gap-1">
                    <span class="text-[#49b779]">علائم ساقه:</span>
                    <span v-for="item in props.symptoms">{{ item }}</span>
                </div> -->
                <!-- <div class="flex flex-col gap-1">
                    <span class="text-[#49b779]">علائم ریشه:</span>
                    <span v-for="item in props.symptoms">{{ item }}</span>
                </div> -->
            </div>
        </div>

    </div>
</template>
