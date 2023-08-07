<script setup>
import { RouterLink } from 'vue-router';
import {ref} from 'vue'
import flowers from '../flowerLibrary.json'
import serverURL from '../router/serverAddress'

const LIBRARY_URL = serverURL + "/library/images/";

const searchInput = ref(false)
const searchBox = ref(null)
const searchBoxEffect = (e) =>{
    if(e.target.value){
        searchBoxEffect.value = e.target.value
        searchInput.value = true
    }
    else{
        searchInput.value =false
    }
}

const setInputEmpty = () =>{
    searchBox.value.value = null
    searchInput.value =false
}

</script>

<template>
    <div class="overflow-y-auto h-[90svh] bg-white relative">
        <div id="plantheader" class="max-w-[400px] fixed flex justify-between items-center w-full p-[20px] py-[30px] z-10 bg-white">
            <div class="flex gap-[5px]">
                <button class="bg-white border rounded-md p-2 h-[40px] flex items-center text-[#9c9c9c]" disabled>
                    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Icons">
                        <g>
                            <rect width="48" height="48" fill="none"/>
                            <path fill="currentcolor" d="M34,2a12.2,12.2,0,0,0-8.9,4H5A2.9,2.9,0,0,0,2,9v6.4a3.2,3.2,0,0,0,1,2.2L15,28.5v13a3,3,0,0,0,2.4,2.9l7,1.5H25a2.8,2.8,0,0,0,1.9-.7A2.8,2.8,0,0,0,28,43V28.4l3.3-2.7A12.4,12.4,0,0,0,34,26,12,12,0,0,0,34,2ZM25.1,25.7A2.8,2.8,0,0,0,24,28V41.8l-5-1.1V28a3.2,3.2,0,0,0-1-2.2L6,14.9V10H22.7a13.4,13.4,0,0,0-.7,4,12.2,12.2,0,0,0,5.2,9.9ZM34,22a8,8,0,1,1,8-8A8,8,0,0,1,34,22Zm6-8a2,2,0,0,1-2,2H36v2a2,2,0,0,1-4,0V16H30a2,2,0,0,1,0-4h2V10a2,2,0,0,1,4,0v2h2A2,2,0,0,1,40,14Z"/>
                        </g>
                        </g>
                    </g>
                    </svg>
                </button>
                <div class="bg-[#EDEDED] rounded-md flex gap-1 justify-between p-2 w-11/12 h-[40px]">
                    <i class="text-[#9c9c9c] flex items-center" disabled>
                        <svg width="20" height="20" fill="currentcolor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z" /></svg>
                    </i>
                    <input ref="searchBox" type="text" class="bg-transparent w-full outline-none text-[#9c9c9c] placeholder-[#9c9c9c]" @input="searchBoxEffect" placeholder="اسم گیاه یا گل ...">
                    <button @click="setInputEmpty" v-if="searchInput" class="flex items-center border rounded-full">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
                        </svg>
                    </button>
                </div>
            </div>
            <RouterLink to="/garden" fill="currentcolor" class="z-10">
                <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="m1394.006 0 92.299 92.168-867.636 867.767 867.636 867.636-92.299 92.429-959.935-960.065z"
                        fill-rule="evenodd" />
                </svg>
            </RouterLink>
        </div>
        
        <div id="plantcontent" class="mt-[100px] px-[20px] mb-[30px]">

            <RouterLink :to="'/garden/addplant/'+flower.id" class="flex flex-col gap-[5px]" v-for="flower in flowers">
                <div class="flex items-center gap-[5px] py-2 border-b-[1px]">
                    <img :src="LIBRARY_URL+flower.image" class="aspect-square object-cover w-[50px] h-[50px] rounded-full" :alt="flower.name"/>
                    <span>{{ flower.name }}</span>
                    <!-- <div class="flex flex-col">
                        <span>{{ flower.name }}</span>
                        <span class="text-[#9D9D9D] text-[12px]">لورم ایپسوم متن ساختگی</span>
                    </div> -->
                </div>
            </RouterLink>

        </div>
    </div>
</template>