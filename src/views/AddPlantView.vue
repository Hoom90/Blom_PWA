<script setup>
import { ref, onBeforeMount , getCurrentInstance} from 'vue'
import { useRouter } from 'vue-router';
import flowers from '../flowerLibrary.json'
import AuthService from "../services/auth.service";
import serverURL from '../router/serverAddress'
import leftSvg from '../components/leftSvg.vue'
import rightSvg from '../components/rightSvg.vue'
import Navigation from '../components/addPlantView-Navigation.vue'
import Step1 from '../components/addPlantView-SetPicture.vue'
import Step2 from '../components/addPlantView-SetData.vue'
import Step3 from '../components/addPlantView-FinishData.vue'
import Footer from '../components/addPlantView-Footer.vue'
import Crystal from '../components/addPlantView-crystalView.vue'

const route = useRouter()
const { id } = route.currentRoute.value.params
const API_URL = serverURL + "/api/";
const { emit } = getCurrentInstance();
const flower = ref(null)

onBeforeMount(() => {
    flower.value = flowers.find(f => f.id === parseInt(id))
})

const stage = ref(1)
const updateLevel = (value) =>{
    if(value === 4){
        updateOpenAlert()
    }
    stage.value = value;
    emit('level', value);
    if(stage.value === 4){
        updateLoading()
    }
}

const score = ref(0)
const updateScore = (value)=>{
    score.value = value
    emit('score-update', value);
    if(score < 100){
        updateOpenAlert()
    }
}

const loading = ref(false)
const updateLoading = () =>{
    loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const openAlert = ref(false)
const updateOpenAlert = (state) =>{
    if(openAlert.value && state){
        updateLevel(1)
        openAlert.value = false
        return
    }
    if(openAlert.value && !state){
        updateSaveData(true)
        openAlert.value = false
        return
    }
    else{
        openAlert.value = true
        return
    }
}

const file = ref([])
const updateFile = (value) => {
    file.value = value;
};

const filename = ref([])
const updateFilename = (value) => {
    filename.value = value;
};

const light = ref(null)
const updateLight = (value) =>{
    light.value = value;
}

const water=ref(null)
const updateWater = (value) =>{
    water.value = value;
}

const Temp = ref(null)
const updateTemprature = (value) =>{
    Temp.value = value;
}

const soil = ref([])
const updateSoil = (value) =>{
    soil.value = value;
}

const symptoms = ref([])
const updateSymptoms = (value) =>{
    symptoms.value = value;
}

const description = ref(null)
const updateDescription = (value) => {
    description.value = value
}

const saveData = ref(false)
const updateSaveData = (value) =>{
    saveData.value = value
    if(saveData.value){
        savePlantData()
    }
}

async function savePlantData() {
    await AuthService.generateNewToken()
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('userId', localStorage.getItem('userId'))
    formData.append('name', flower.value.name)
    formData.append('light', light.value)
    formData.append('temp', Temp.value)
    formData.append('soil', soil.value)
    formData.append('symptom', symptoms.value)
    formData.append('description', description.value)
    formData.append('fileName', filename.value)
    formData.append('files', file.value[0])
    formData.append('files', file.value[1])
    formData.append('files', file.value[2])
    await fetch(API_URL + "flowers", {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then((res) => {
            if (!res.ok) {
                alert('sth 404')
            }
            return res.json();
        })
        .then((data) => data);
}

const handleNavigationHeight = (e) => {
    console.log('hi')
}
</script>

<template>
    <div class="max-w-[400px] w-full relative">
        <leftSvg class="absolute -top-10 transform -scale-x-100 opacity-40"></leftSvg>
        <rightSvg class="absolute top-0 left-0 transform -scale-x-100 opacity-40"></rightSvg>
        <leftSvg v-if="stage == 4" class="absolute -top-10 transform -scale-x-100 opacity-40 z-10"></leftSvg>
        <rightSvg v-if="stage == 4" class="absolute top-0 left-0 transform -scale-x-100 opacity-40 z-10"></rightSvg>
    </div>
    <div class="h-[100svh] max-w-[400px] w-full relative" @scroll="handleNavigationHeight">
        <Navigation v-if="stage != 4" :name="flower.name"  :level="stage"
        @update:level="updateLevel"/>
        <div class="flex flex-col items-center justify-center">
            <div v-if="stage == 1" class="mx-auto text-center mt-[150px]">به سه تا عکس از گلت نیاز داریم</div>
            <span v-if="stage == 2" class="mx-auto text-center mt-[150px]">واسه درمان گلت لازمه اینا رو بدونم</span>
            <span v-if="stage == 3" class="mx-auto text-center mt-[150px]">توی تشخیص بهتر کمکم کن</span>
        </div>

        <div class="flex flex-col justify-center max-w-[400px] w-full">

            <Step1 v-if="stage === 1" :score="score" :file="file" :filename="filename" @update:file="updateFile"
                @update:filename="updateFilename" @update:score="updateScore"/>

            <Step2 v-if="stage === 2" 
            :light="light" :water="water" :temprature="Temp" :soil="soil" :score="score"
            @update:light='updateLight' @update:water='updateWater' 
            @update:temprature='updateTemprature' @update:soil='updateSoil' @update:score="updateScore"/>

            <Step3 v-if="stage == 3"
            :symptoms="symptoms" :description="description" :score="score"
            @update:symptoms='updateSymptoms' @update:description='updateDescription' @update:score="updateScore"/>
        
            <Crystal v-if="stage == 4 && !loading && !openAlert" :name="flower.name" :filename="filename" :light="light" :water="water" :temprature="Temp" :soil="soil" :score="score" :symptoms="symptoms"/>
            
            <!-- loading -->
            <div v-if="loading" class="flex justify-center items-center h-[100svh] text-[20px] font-bold">
                <svg class="rotate" width="100" height="100" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                    <path d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
                    stroke="#49b779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36"
                    stroke="#ffc93d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>            
        </div>
        
        <Footer :level="stage" :accuracy="score" :saveData="saveData"
         @update:level="updateLevel" @update:saveData="updateSaveData"/>
    </div>
    
    <!-- score handle -->
    <div v-if="openAlert" class="absolute top-0 left-0 w-full h-[100svh] bg-[#fffe]">
        <div class="absolute top-[50%] left-[50%] w-[250px] h-[250px] bg-[#fff] shadow-md rounded-lg -translate-x-[50%] -translate-y-[50%]">
            <div class="flex flex-col items-center justify-center text-center h-full w-full px-[10px] pb-[20px]">
                <i class="text-yellow-500">
                    <svg width="100" height="100" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M10.8809 16.15C10.8809 16.0021 10.9101 15.8556 10.967 15.7191C11.024 15.5825 11.1073 15.4586 11.2124 15.3545C11.3175 15.2504 11.4422 15.1681 11.5792 15.1124C11.7163 15.0567 11.8629 15.0287 12.0109 15.03C12.2291 15.034 12.4413 15.1021 12.621 15.226C12.8006 15.3499 12.9399 15.5241 13.0211 15.7266C13.1024 15.9292 13.122 16.1512 13.0778 16.3649C13.0335 16.5786 12.9272 16.7745 12.7722 16.9282C12.6172 17.0818 12.4204 17.1863 12.2063 17.2287C11.9922 17.2711 11.7703 17.2494 11.5685 17.1663C11.3666 17.0833 11.1938 16.9426 11.0715 16.7618C10.9492 16.5811 10.8829 16.3683 10.8809 16.15ZM11.2408 13.42L11.1008 8.20001C11.0875 8.07453 11.1008 7.94766 11.1398 7.82764C11.1787 7.70761 11.2424 7.5971 11.3268 7.5033C11.4112 7.40949 11.5144 7.33449 11.6296 7.28314C11.7449 7.2318 11.8697 7.20526 11.9958 7.20526C12.122 7.20526 12.2468 7.2318 12.3621 7.28314C12.4773 7.33449 12.5805 7.40949 12.6649 7.5033C12.7493 7.5971 12.813 7.70761 12.8519 7.82764C12.8909 7.94766 12.9042 8.07453 12.8909 8.20001L12.7609 13.42C12.7609 13.6215 12.6809 13.8149 12.5383 13.9574C12.3958 14.0999 12.2024 14.18 12.0009 14.18C11.7993 14.18 11.606 14.0999 11.4635 13.9574C11.321 13.8149 11.2408 13.6215 11.2408 13.42Z"
                        fill="currentcolor" />
                        <path
                        d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z"
                        stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </i>
                <span class="text-[12px]">با اطلاعاتی که تا اینجا وارد کردی، میزان دقت نسخه ای که برات صادر میکنیم <span class="text-[#49b779] flex justify-center text-[16px]"><br/> {{score}} % درصده</span> با جواب دادن به همه سوال ها میتونی دقت نسخه رو ببری بالا</span>
                <div class="flex gap-1 mt-3">
                    <button class="text-white bg-[#49b779] p-2 rounded-md text-[12px]" @click="updateOpenAlert(true)">
                        باشه تکمیل میکنم
                    </button>
                    <button class="bg-[#49b7792c] p-2 rounded-md text-[12px]" @click="updateOpenAlert(false)">
                        رد کردن
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- <div class="max-w-[400px] w-full relative">
        <img :src="serverURL + '/library/images/bottom.avif'" class="absolute bottom-0 left-0 transform opacity-40"/>
    </div> -->
</template>