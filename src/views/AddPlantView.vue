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
    stage.value = value;
    emit('level', value);
}

const score = ref(0)
const updateScore = (value)=>{
    score.value = value
    emit('score-update', value);
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
        
            <Crystal v-if="stage == 4" :name="flower.name" :filename="filename" :light="light" :water="water" :temprature="Temp" :soil="soil" :score="score" :symptoms="symptoms"/>
            <!-- <Crystal v-if="true" :filename="filename" :light="light" :water="water" :temprature="Temp" :soil="soil" :score="score" :symptoms="symptoms"/> -->
        </div>
        <Footer :level="stage" :accuracy="score" :saveData="saveData"
         @update:level="updateLevel" @update:saveData="updateSaveData"/>
    </div>
    <!-- <div class="max-w-[400px] w-full relative">
        <img :src="serverURL + '/library/images/bottom.avif'" class="absolute bottom-0 left-0 transform opacity-40"/>
    </div> -->
</template>