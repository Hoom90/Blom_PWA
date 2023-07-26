<template>
    <div class="flex">
      <div class="w-1/3 flex flex-col justify-center items-center">
        <button @click="incrementDay" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
            <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="m.153 1393.854 92.168 92.299 867.767-867.636 867.636 867.636 92.429-92.299L960.088 433.92z" fill-rule="evenodd"/>
            </svg>        
        </button>
        <input type="number" id="day" class="w-full bg-transparent text-center" v-model="day" disabled/>
        <button @click="decrementDay" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
            <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="m.153 526.146 92.168-92.299 867.767 867.636 867.636-867.636 92.429 92.299-960.065 959.935z" fill-rule="evenodd"/>
            </svg>        
        </button>
      </div>
      <div class="w-1/3 flex flex-col justify-center items-center">
        <button @click="incrementMonth" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
            <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="m.153 1393.854 92.168 92.299 867.767-867.636 867.636 867.636 92.429-92.299L960.088 433.92z" fill-rule="evenodd"/>
            </svg>        
        </button>
        <input type="number" id="month" class="w-full bg-transparent text-center" v-model="month" disabled/>
        <button @click="decrementMonth" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
            <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="m.153 526.146 92.168-92.299 867.767 867.636 867.636-867.636 92.429 92.299-960.065 959.935z" fill-rule="evenodd"/>
            </svg>  
        </button>
      </div>
      <div class="w-1/3 flex flex-col justify-center items-center">
        <button @click="incrementYear" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
            <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="m.153 1393.854 92.168 92.299 867.767-867.636 867.636 867.636 92.429-92.299L960.088 433.92z" fill-rule="evenodd"/>
            </svg>        
        </button>
        <input type="number" id="year" class="w-full bg-transparent text-center" v-model="year" disabled/>
        <button @click="decrementYear" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
            <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="m.153 526.146 92.168-92.299 867.767 867.636 867.636-867.636 92.429 92.299-960.065 959.935z" fill-rule="evenodd"/>
            </svg>  
        </button>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
const day = ref(1)
const month= ref(1)
const year = ref(2020)


const incrementDay = () =>{
    if(day.value < 31){
        day.value++
    }
}

const decrementDay = () =>{
    if(day.value > 1){
        day.value--
    }
}

const incrementMonth = () =>{
    if(month.value < 12){
        month.value++
    }
}

const decrementMonth = ()=>{
    if(month.value > 1){
        month.value--
    }
}

const incrementYear = () =>{
    const currentYear = new Date().getFullYear();
    if(this.year < currentYear){
        this.year++
    }
}

const decrementYear =() =>{
    if(this.value > 0){
        this.year--
    }
}
</script>