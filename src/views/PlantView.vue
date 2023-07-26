<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter,RouterLink } from 'vue-router';
import flowers from '../flowerLibrary.json'
import serverURL from '../router/serverAddress'

const LIBRARY_URL = serverURL + "/library/images/";
const API_URL = serverURL + "/api/";

const userData =  ref(null)
const route = useRouter()
const {id} = route.currentRoute.value.params
const flower = ref(null)
const user = ref(null)

onBeforeMount(() => {
    getData()
    // user.value =  userData.value.find(f => f.id === parseInt(id))
    // flower.value = flowers.find(f => f.name === user.value.name)
    // flower.value.user = user.value
})

async function getData() {
    //   loading.value = true
    const res = await fetch(API_URL + "flowers");
    const data = await res.json();
    userData.value = data;
    user.value =  userData.value.find(f => f._id === id)
    flower.value = flowers.find(f => f.name === user.value.name)
    flower.value.user = user.value
    //   loading.value = false
}

const isScrolled = ref(false)
const image = ref('')
const headerNav = ref('')
const plantHeader = ref('')

const scrolling = (e) => {
    const scrollTop = e.target.scrollTop
    if (scrollTop > 0) {
        isScrolled.value = true
        image.value.classList.remove('rounded-[20px]')
        image.value.classList.add('brightness-50')
        plantHeader.value.classList.remove('px-[20px]')
        headerNav.value.classList.remove('flex')
        headerNav.value.classList.remove('pb-[20px]')
        headerNav.value.classList.add('absolute')
        headerNav.value.classList.add('px-[20px]')
        headerNav.value.classList.add('top-3')
        headerNav.value.classList.add('text-white')
    } else {
        isScrolled.value = false
        image.value.classList.add('rounded-[20px]')
        image.value.classList.remove('brightness-50')
        plantHeader.value.classList.add('px-[20px]')
        headerNav.value.classList.add('flex')
        headerNav.value.classList.add('pb-[20px]')
        headerNav.value.classList.remove('absolute')
        headerNav.value.classList.remove('px-[20px]')
        headerNav.value.classList.remove('top-3')
        headerNav.value.classList.remove('text-white')
    }
}

const checkStatus = (status) =>{
    if(status === "cure"){
        return true
    }
    else{
        return false
    }
}
</script>

<template>
    <div class="overflow-y-auto max-h-[90vh] max-w-[400px] w-full flex justify-center bg-[#49b7792c]" @scroll="scrolling">

        <div ref="plantHeader" class="fixed px-[20px] max-w-[400px] transition-all duration-200 bg-transparent">
            <div class="flex flex-col items-center justify-center text-black text-center text-[20px] font-bold">
                <div ref="headerNav" class="flex justify-between items-center w-full py-[20px] transition-all duration-200">
                    <div class="flex justify-between w-full items-center transition-all duration-200">
                        <span v-if="!isScrolled">گل من</span>
                        <span v-if="isScrolled" class="w-full z-10">{{ flower.name }}</span>
                        <RouterLink to="/garden" fill="currentcolor" class="z-10">
                            <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="m1394.006 0 92.299 92.168-867.636 867.767 867.636 867.636-92.299 92.429-959.935-960.065z"
                                    fill-rule="evenodd" />
                            </svg>
                        </RouterLink>
                    </div>
                </div>
                <img ref="image" :src="LIBRARY_URL+flower.image" alt="plant" class="rounded-[20px] max-w-[400px] w-full transition-all duration-200" :id="'عکس '+flower.name">
            </div>
        </div>

        <div class="bg-white relative  w-full mt-[110%] h-fit flex flex-col gap-[20px] py-[20px] px-[20px] rounded-[20px]">
            
            <div class="absolute -mt-[100px]">
                <div v-if="checkStatus(flower.status)">
                    <div class="flex gap-[5px] justify-end p-[20px]">
                        <!-- <RouterLink to="/garden/plants" class="p-2 px-3 rounded-lg bg-[#49B779] text-white">همه گل ها
                        </RouterLink> -->
                        <RouterLink :to="'/prescription/'+flower._id" class=" h-[40px] bg-white rounded-md px-3 shadow-md flex justify-center items-center">
                            مشاهده نسخه
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="absolute top-2 left-[38%] h-[1px] w-[100px] bg-black"></div>
            <div class="flex justify-between relative">
                <div class="flex flex-col gap-[5px]">
                    <span class="text-bold">{{ flower.name }}</span>
                    <span class="text-[#9D9D9D]">{{ flower.latinName }}</span>
                </div>
                <div class="flex gap-1 items-center" id="plantCategory">
                    <span class="bg-[#49b7792c] text-[#49b779] rounded-md p-1 px-2" v-for="item in flower.category">{{ item }}</span>
                </div>
            </div>
            <!-- <div class="flex justify-between">
                    <div
                        class="rounded-[10px] shadow-[0_4px_4px_#0000002c] bg-white p-2 px-3 text-[10px] flex flex-col justify-center items-center">
                        <i id="tempratureIcon" class="text-[#63B89D]">
                            <svg fill="currentcolor" width="30" height="30" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">

                                <g id="Temp_High" data-name="Temp High">
                                    <g>
                                        <path
                                            d="M14.863,13.4V4.939a2.929,2.929,0,0,0-.84-2.03,2.859,2.859,0,0,0-2.23-.82,2.948,2.948,0,0,0-2.66,3l.01,8.28a4.755,4.755,0,0,0,1.9,8.46,5.093,5.093,0,0,0,.95.09,4.759,4.759,0,0,0,4.76-4.75A4.684,4.684,0,0,0,14.863,13.4Zm-.48,6.66a3.783,3.783,0,0,1-3.15.78,3.7,3.7,0,0,1-2.92-2.98,3.745,3.745,0,0,1,1.43-3.69.962.962,0,0,0,.39-.77V5.089a1.968,1.968,0,0,1,1.73-2,.66.66,0,0,1,.14-.01,1.878,1.878,0,0,1,1.86,1.86V13.4a.962.962,0,0,0,.39.77,3.742,3.742,0,0,1,.13,5.89Z" />
                                        <path
                                            d="M13.893,17.169a1.89,1.89,0,0,1-3.78,0,1.858,1.858,0,0,1,1.39-1.81V5.4a.5.5,0,0,1,1,0v9.96A1.869,1.869,0,0,1,13.893,17.169Z" />
                                    </g>
                                </g>
                            </svg>
                        </i>
                        <span>
                            <span>دما:</span>
                            <span>C°</span>
                            <span>{{ flower.user.temprature }}</span>
                        </span>
                    </div>
                    <div
                        class="rounded-[10px] shadow-[0_4px_4px_#0000002c] bg-white p-2 px-3 text-[10px] flex flex-col justify-center items-center">
                        <i id="tempratureIcon" class="text-[#63B89D]">
                            <svg fill="currentcolor" width="30" height="30" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">

                                <g id="Temp_High" data-name="Temp High">
                                    <g>
                                        <path
                                            d="M14.863,13.4V4.939a2.929,2.929,0,0,0-.84-2.03,2.859,2.859,0,0,0-2.23-.82,2.948,2.948,0,0,0-2.66,3l.01,8.28a4.755,4.755,0,0,0,1.9,8.46,5.093,5.093,0,0,0,.95.09,4.759,4.759,0,0,0,4.76-4.75A4.684,4.684,0,0,0,14.863,13.4Zm-.48,6.66a3.783,3.783,0,0,1-3.15.78,3.7,3.7,0,0,1-2.92-2.98,3.745,3.745,0,0,1,1.43-3.69.962.962,0,0,0,.39-.77V5.089a1.968,1.968,0,0,1,1.73-2,.66.66,0,0,1,.14-.01,1.878,1.878,0,0,1,1.86,1.86V13.4a.962.962,0,0,0,.39.77,3.742,3.742,0,0,1,.13,5.89Z" />
                                        <path
                                            d="M13.893,17.169a1.89,1.89,0,0,1-3.78,0,1.858,1.858,0,0,1,1.39-1.81V5.4a.5.5,0,0,1,1,0v9.96A1.869,1.869,0,0,1,13.893,17.169Z" />
                                    </g>
                                </g>
                            </svg>
                        </i>
                        <span>
                            <span>آبیاری:</span>
                            <span>{{ flower.user.water }}</span>
                        </span>
                    </div>
                    <div
                        class="rounded-[10px] shadow-[0_4px_4px_#0000002c] bg-white p-2 px-3 text-[10px] flex flex-col justify-center items-center">
                        <i id="tempratureIcon" class="text-[#63B89D]">
                            <svg fill="currentcolor" width="30" height="30" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">

                                <g id="Temp_High" data-name="Temp High">
                                    <g>
                                        <path
                                            d="M14.863,13.4V4.939a2.929,2.929,0,0,0-.84-2.03,2.859,2.859,0,0,0-2.23-.82,2.948,2.948,0,0,0-2.66,3l.01,8.28a4.755,4.755,0,0,0,1.9,8.46,5.093,5.093,0,0,0,.95.09,4.759,4.759,0,0,0,4.76-4.75A4.684,4.684,0,0,0,14.863,13.4Zm-.48,6.66a3.783,3.783,0,0,1-3.15.78,3.7,3.7,0,0,1-2.92-2.98,3.745,3.745,0,0,1,1.43-3.69.962.962,0,0,0,.39-.77V5.089a1.968,1.968,0,0,1,1.73-2,.66.66,0,0,1,.14-.01,1.878,1.878,0,0,1,1.86,1.86V13.4a.962.962,0,0,0,.39.77,3.742,3.742,0,0,1,.13,5.89Z" />
                                        <path
                                            d="M13.893,17.169a1.89,1.89,0,0,1-3.78,0,1.858,1.858,0,0,1,1.39-1.81V5.4a.5.5,0,0,1,1,0v9.96A1.869,1.869,0,0,1,13.893,17.169Z" />
                                    </g>
                                </g>
                            </svg>
                        </i>
                        <span>
                            <span>خاک:</span>
                            <span>{{ flower.user.soil }}</span>
                        </span>
                    </div>
                    <div
                        class="rounded-[10px] shadow-[0_4px_4px_#0000002c] bg-white p-2 px-3 text-[10px] flex flex-col justify-center items-center">
                        <i id="tempratureIcon" class="text-[#63B89D]">
                            <svg fill="currentcolor" width="30" height="30" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">

                                <g id="Temp_High" data-name="Temp High">
                                    <g>
                                        <path
                                            d="M14.863,13.4V4.939a2.929,2.929,0,0,0-.84-2.03,2.859,2.859,0,0,0-2.23-.82,2.948,2.948,0,0,0-2.66,3l.01,8.28a4.755,4.755,0,0,0,1.9,8.46,5.093,5.093,0,0,0,.95.09,4.759,4.759,0,0,0,4.76-4.75A4.684,4.684,0,0,0,14.863,13.4Zm-.48,6.66a3.783,3.783,0,0,1-3.15.78,3.7,3.7,0,0,1-2.92-2.98,3.745,3.745,0,0,1,1.43-3.69.962.962,0,0,0,.39-.77V5.089a1.968,1.968,0,0,1,1.73-2,.66.66,0,0,1,.14-.01,1.878,1.878,0,0,1,1.86,1.86V13.4a.962.962,0,0,0,.39.77,3.742,3.742,0,0,1,.13,5.89Z" />
                                        <path
                                        d="M13.893,17.169a1.89,1.89,0,0,1-3.78,0,1.858,1.858,0,0,1,1.39-1.81V5.4a.5.5,0,0,1,1,0v9.96A1.869,1.869,0,0,1,13.893,17.169Z" />
                                </g>
                            </g>
                        </svg>
                        </i>
                    <span>
                        <span>نور:</span>
                        <span>{{ flower.user.light }}</span>
                    </span>
                </div>
            </div> -->
            <div class="flex flex-col gap-[10px] min-h-[52vh]" id="extraDetail">
                <span class="text-bold">اطلاعات بیشتر</span>
                <div class="text-[#adadad]">{{ flower.describtion }}</div>
            </div>
        </div>
    </div>
</template>