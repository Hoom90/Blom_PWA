<script setup>
import {  RouterLink } from 'vue-router'
import serverURL from '../router/serverAddress'
import { onMounted , ref } from 'vue';

const API_URL = serverURL + "/api/";

const userData =  ref(null)

onMounted(() => {
    getData()
})

async function getData() {
//   loading.value = true
  const res = await fetch(API_URL + "flowers");
  const data = await res.json();
  userData.value = data;
//   loading.value = false
}

</script>

<template>
    <div class="overflow-y-auto h-[90svh] bg-white relative">

        <!-- page header -->
        <div id="plantheader" class="fixed w-full max-w-[400px] bg-white p-[20px] py-[30px] z-10">
            <div class="flex justify-between items-center"
                id="headercontainer">
                <span id="pageTag" class="text-center text-[20px] font-bold">همه گل ها</span>
                <!-- <button class="text-[#adadad]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3L6 21M6 3L10 7M6 3L2 7" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 21L18 3M18 21L22 17M18 21L14 17" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button> -->
                <RouterLink to="/garden" fill="currentcolor" class="z-10">
                    <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m1394.006 0 92.299 92.168-867.636 867.767 867.636 867.636-92.299 92.429-959.935-960.065z"
                            fill-rule="evenodd" />
                    </svg>
                </RouterLink>
            </div>
        </div>

        <!-- plants list -->
        <div id="plantcontent" class="relative flex flex-col gap-[5px] p-[20px] mt-[70px] mb-[90px] h-[90svh]" v-if="userData">

            <RouterLink :to="'/garden/plant/' + plant._id" class="flex flex-col gap-[5px]" v-for="plant in userData" :key="plant._id">
                <div class="flex gap-3 w-full shadow-[0_3px_5px_#C9C9C9] p-[10px] rounded-md">
                    <img class="rounded-full object-cover aspect-square w-[50px] h-[50px]" :src="plant.fileName" :alt="'عکس ' + plant.title">
                    <div class="flex justify-between w-full">
                        <div class="flex flex-col gap-3 text-[#adadad]">
                            <div class="text-[#49B779]">
                                <span>{{ plant.name }}</span>
                            </div>
                            <!-- <div class="flex gap-5 text-[12px] ">
                                <div class='flex items-center'>
                                    <i class="text-[#51CAFF]">                                        
                                        <svg fill="currentcolor" width="15" height="15" viewBox="-1.82 0 15.99 15.99" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Layer_2" data-name="Layer 2">
                                        <g id="Layer_1-2" data-name="Layer 1">
                                        <path d="M11.08,6.06,6.58.19a.52.52,0,0,0-.8,0L1.28,6.06a6.18,6.18,0,1,0,10.44,6.49A6.13,6.13,0,0,0,11.08,6.06Zm-.26,6A5.07,5.07,0,0,1,6.18,15,5.08,5.08,0,0,1,1.54,12.1a5.08,5.08,0,0,1,.53-5.43L6.18,1.31l4.11,5.36A5.08,5.08,0,0,1,10.82,12.1ZM10.18,10a4,4,0,0,1-4,4,.5.5,0,0,1,0-1,3,3,0,0,0,3-3,.5.5,0,0,1,1,0Z"/>
                                        </g>
                                        </g>
                                        </svg>
                                    </i>
                                    <span>{{ plant.water }}</span></div>
                                <div class="flex items-center">
                                    <i class="text-[#FFC93D]">
                               
<svg fill="currentcolor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="15" height="15" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
<g>
    <path d="M36.564,14.645c-11.671,0-21.167,9.495-21.167,21.166c0,11.671,9.495,21.166,21.167,21.166
        c11.672,0,21.168-9.494,21.168-21.166C57.732,24.14,48.236,14.645,36.564,14.645z M36.564,52.979
        c-9.465,0-17.167-7.701-17.167-17.167c0-9.466,7.701-17.166,17.167-17.166c9.467,0,17.168,7.7,17.168,17.166
        C53.732,45.279,46.031,52.979,36.564,52.979z"/>
    <path d="M34.666,22.306c-4.054,0-7.859,2.167-9.929,5.655c-0.281,0.475-0.125,1.089,0.35,1.371c0.16,0.095,0.336,0.14,0.51,0.14
        c0.341,0,0.674-0.175,0.861-0.489c1.711-2.885,4.856-4.677,8.208-4.677c0.553,0,1-0.447,1-1
        C35.666,22.753,35.219,22.306,34.666,22.306z"/>
    <path d="M24.631,30.464c-0.529-0.123-1.076,0.207-1.202,0.745c-0.195,0.826-0.304,1.337-0.304,2.27c0,0.553,0.447,1,1,1
        s1-0.447,1-1c0-0.716,0.077-1.073,0.251-1.813C25.502,31.129,25.169,30.591,24.631,30.464z"/>
    <path d="M37.37,59.5c-1.104,0-2,0.895-2,2v6c0,1.104,0.896,2,2,2c1.104,0,2-0.896,2-2v-6C39.37,60.395,38.475,59.5,37.37,59.5z"/>
    <path d="M37.37,12.5c1.104,0,2-0.896,2-2v-6c0-1.104-0.896-2-2-2c-1.104,0-2,0.896-2,2v6C35.37,11.604,36.266,12.5,37.37,12.5z"/>
    <path d="M17.055,52.428l-4.242,4.242c-0.781,0.781-0.781,2.047,0,2.828c0.391,0.391,0.902,0.586,1.414,0.586
        c0.511,0,1.023-0.195,1.414-0.586l4.242-4.242c0.781-0.781,0.781-2.047,0-2.828C19.102,51.646,17.836,51.646,17.055,52.428z"/>
    <path d="M54.531,19.78c0.512,0,1.023-0.195,1.414-0.586l4.242-4.242c0.78-0.781,0.78-2.047,0-2.828
        c-0.781-0.781-2.047-0.781-2.828,0l-4.242,4.242c-0.781,0.781-0.781,2.047,0,2.828C53.508,19.585,54.02,19.78,54.531,19.78z"/>
    <path d="M17.055,19.194c0.391,0.391,0.902,0.586,1.414,0.586c0.511,0,1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828
        l-4.242-4.242c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828L17.055,19.194z"/>
    <path d="M55.945,52.428c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828l4.242,4.244c0.391,0.391,0.902,0.586,1.414,0.586
        s1.023-0.195,1.414-0.586c0.78-0.781,0.78-2.047,0-2.828L55.945,52.428z"/>
    <path d="M10.5,34.5h-6c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h6c1.104,0,2-0.896,2-2C12.5,35.396,11.604,34.5,10.5,34.5z"/>
    <path d="M67.5,34.5h-6c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h6c1.104,0,2-0.896,2-2C69.5,35.396,68.604,34.5,67.5,34.5z"/>
</g>
</svg>
                                    </i>
                                <span>{{ plant.light }}</span></div>
                            </div> -->
                            <div class="flex gap-[5px] items-center">
                                <div class="bg-blue-500 w-[10px] h-[10px] rounded-full"></div>
                                <span>در حال بررسی</span>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <i class="text-[#49B779]">
                                
<svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentcolor" class="bi bi-three-dots-vertical">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>
                            </i>
                        </div>
                    </div>
                </div>
            </RouterLink>

        </div>

        <!-- plus button -->
        <RouterLink to="/garden/plantLibrary" class="fixed bottom-20 left-[20px] w-[50px] h-[50px] bg-[#49B779] rounded-full text-white flex justify-center items-center">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 7V17M7 12H17" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </RouterLink>
    </div>
</template>