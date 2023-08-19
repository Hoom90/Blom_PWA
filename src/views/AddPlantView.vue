<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter,RouterLink } from 'vue-router';
import flowers from '../flowerLibrary.json'
import AuthService from "../services/auth.service";
import serverURL from '../router/serverAddress'
import plantStatuses from '../status.json'
import store from '../store';
import router from '../router';
import leftSvg from '../components/leftSvg.vue'
import rightSvg from '../components/rightSvg.vue'

const route = useRouter()
const {id} = route.currentRoute.value.params
const LIBRARY_URL = serverURL + "/library/images/";
const API_URL = serverURL + "/api/";

const userData = ref('')

const stage = ref(1)

const flower = ref(null)
const tempRange = ref(null)
const tempSelect = ref(null)
const directLight = ref(null)
const semiLight = ref(null)
const shadow = ref(null)

const directLightCheck = ref(false)
const semiLightCheck = ref(false)
const shadowCheck = ref(false)

const halfGlass = ref(null)
const oneGlass = ref(null)
const twoGlass = ref(null)

const drain = ref(null)
const non_drain = ref(null)

const sickNumberType = ref(1)
const sickNumberTypeName = ref("هفته")
const sickNumber = ref(1)
const dusting = ref(1)

const compeleteInfo = ref(false)
const finishProcess = ref(false)

const stageTwoError = ref(false)

onBeforeMount(() => {
    flower.value =  flowers.find(f => f.id === parseInt(id))
})

// file input
const openFileInput0 = () =>{
    const imageInput = document.querySelector('input[name=fileInput0]')
    imageInput.click()
}
const openFileInput1 = () =>{
    const imageInput = document.querySelector('input[name=fileInput1]')
    imageInput.click()
}
const openFileInput2 = () =>{
    const imageInput = document.querySelector('input[name=fileInput2]')
    imageInput.click()
}

const userImages = ref([])
const filename = ref([])
const file = ref([])
const ImageError = ref (false)
// set image data
const setNewImage = (e) => {
    if (userImages.value.length >= 3) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        userImages.value.push(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    // Get file name and file itself to send to the database
    const selectedFile = e.target.files[0];
    file.value.push(selectedFile);
    // save old file name
    filename.value.push(selectedFile.name);

    // Prompt the user to enter a new file name
    // const newFileName = "user_"+ localStorage.getItem('userId') +"_"+ Date.now();
    // if (newFileName) {
    //     // Change the file name of the selected file
    //     e.target.files[0].name  = newFileName;
    //     filename.value.push(newFileName);
    // }

    if (file.value.length > 2) {
        ImageError.value = false;
    }
};
const light = ref(null)
const LightError = ref (false)
// set light data
const setLight = (number) => {
    if(number === 1){
        directLight.value.classList.add('border-[#49b779]')
        directLightCheck.value = true
        
        semiLight.value.classList.remove('border-[#49b779]')
        semiLightCheck.value = false

        shadow.value.classList.remove('border-[#49b779]')
        shadowCheck.value = false

        light.value = directLight.value.textContent
        LightError.value = false
    }
    if(number === 2){
        directLight.value.classList.remove('border-[#49b779]')
        directLightCheck.value = false
        
        semiLight.value.classList.add('border-[#49b779]')
        semiLightCheck.value = true

        shadow.value.classList.remove('border-[#49b779]')
        shadowCheck.value = false

        light.value = semiLight.value.textContent
        LightError.value = false
    }
    if(number === 3){
        directLight.value.classList.remove('border-[#49b779]')
        directLightCheck.value = false
        
        semiLight.value.classList.remove('border-[#49b779]')
        semiLightCheck.value = false

        shadow.value.classList.add('border-[#49b779]')
        shadowCheck.value = true

        light.value = shadow.value.textContent
        LightError.value = false
    }
};

const Temp = ref(null)
const TempError = ref (false)
// set temprature data
const setTemp = (e) =>{
  if(e.target.value == 4){
    tempRange.value.classList.replace('hidden','flex')
    tempSelect.value.classList.replace('w-full','w-1/3')
    Temp.value = 22
  }else{
    tempRange.value.classList.replace('flex','hidden')
    tempSelect.value.classList.replace('w-1/3','w-full')
    if(e.target.value == 1){
        Temp.value = "معتدل"
    }
    if(e.target.value == 2){
        Temp.value = "گرم"
    }
    if(e.target.value == 3){
        Temp.value = "سرد"
    }
    TempError.value=false
  }
}
const setTempRange = (e) =>{
  Temp.value = e.target.value
}

const soil = ref(null)
const SoilError = ref (false)
// set soil  data
const setSoil = (number) =>{
    if(number === 1){
        soil.value = "خشک"
    }
    if(number === 2){
        soil.value = "نیمه خشک"
    }
    if(number === 3){
        soil.value = "مرطوب"
    }
    if(number === 4){
        soil.value = "خیس"
    }
    SoilError.value = false
    userData.value+={'soil':soil.value}
}

const symptoms = ref([])
const symptomsError = ref(false)
const selected = ref(
    [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ])
// set symptoms  data
const setSymptoms = (number) =>{
    const button = document.querySelector('button[name=symptoms'+number+']')
    if (number === 0) {
        if (selected.value[0]) {
            symptoms.value = symptoms.value.filter(item => item !== "عدم رشد گیاه")
            selected.value[0] = false;
            button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        } else {
            symptoms.value.push("عدم رشد گیاه");
            selected.value[0] = true;
            button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");

        }
    }
    if(number === 1){
        if(selected.value[1]){
            symptoms.value = symptoms.value.filter(item => item !== "شوره در سطح خاک")
            selected.value[1] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("شوره در سطح خاک")
            selected.value[1] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");

        }
    }
    if(number === 2){
        if(selected.value[2]){
            symptoms.value = symptoms.value.filter(item => item !== "سفتی خاک")
            selected.value[2] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("سفتی خاک")
            selected.value[2] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");

        }
    }
    if(number === 3){
        if(selected.value[3]){
            symptoms.value = symptoms.value.filter(item => item !== "پوسیدگی ساقه")
            selected.value[3] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("پوسیدگی ساقه")
            selected.value[3] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");
        }
    }
    if(number === 4){
        if(selected.value[4]){
            symptoms.value = symptoms.value.filter(item => item !== "پوسیدگی ریشه")
            selected.value[4] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("پوسیدگی ریشه")
            selected.value[4] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");
        }
    }
    if(number === 5){
        if(selected.value[5]){
            symptoms.value = symptoms.value.filter(item => item !== "ریزش برگ ها")
            selected.value[5] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("ریزش برگ ها")
            selected.value[5] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");
        }
    }
    if(number === 6){
        if(selected.value[6]){
            symptoms.value = symptoms.value.filter(item => item !== "قهوه ای شدن برگ ها")
            selected.value[6] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("قهوه ای شدن برگ ها")
            selected.value[6] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");
        }
    }
    if(number === 7){
        if(selected.value[7]){
            symptoms.value = symptoms.value.filter(item => item !== "زرد شدن برگ ها")
            selected.value[7] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("زرد شدن برگ ها")
            selected.value[7] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");
        }
    }
    if(number === 8){
        if(selected.value[8]){
            symptoms.value = symptoms.value.filter(item => item !== "سوختگی برگ ها")
            selected.value[8] = false
                        button.classList.remove("border-[#49b779]");
            button.classList.remove("bg-[#49b77933]");
            button.classList.replace("text-[#49b779]","text-[#adadad]");
        }
        else{
            symptoms.value.push("سوختگی برگ ها")
            selected.value[8] = true
           button.classList.add("border-[#49b779]");
            button.classList.add("bg-[#49b77933]");
            button.classList.replace("text-[#adadad]","text-[#49b779]");
        }
    }
    symptomsError.value = false
}

const description = ref(null)
// set description data
const setDescription = () =>{
    userData.value+={'description':description.value}
}

const setWaterGlass = (number) =>{
    if(number === 1){
        halfGlass.value.classList.add('border-[#49b779]')
        oneGlass.value.classList.remove('border-[#49b779]')
        twoGlass.value.classList.remove('border-[#49b779]')
    }
    if(number === 2){
        oneGlass.value.classList.add('border-[#49b779]')
        halfGlass.value.classList.remove('border-[#49b779]')
        twoGlass.value.classList.remove('border-[#49b779]')
    }
    if(number === 4){
        twoGlass.value.classList.add('border-[#49b779]')
        halfGlass.value.classList.remove('border-[#49b779]')
        oneGlass.value.classList.remove('border-[#49b779]')
    }
}

const setDrainage = (enable) =>{
    if(enable){
        drain.value.classList.add('border-[#49b779]')
        non_drain.value.classList.remove('border-[#49b779]')
    }
    else{
        drain.value.classList.remove('border-[#49b779]')
        non_drain.value.classList.add('border-[#49b779]')
    }
}

const incrementSickNumber = () =>{
    if(sickNumber.value < 31){
        sickNumber.value++
    }
}

const decrementSickNumber =() =>{
    if(sickNumber.value > 1){
        sickNumber.value--
    }
}

const incrementSickNumberType  = () =>{
    if(sickNumberType.value < 2){
        sickNumberType.value++
        if(sickNumberType.value === 0){
            sickNumberTypeName.value = "روز"
        }
        if(sickNumberType.value === 1){
            sickNumberTypeName.value = "هفته"
        }
        if(sickNumberType.value === 2){
            sickNumberTypeName.value = "سال"
        }
    }
}

const decrementSickNumberType  =() =>{
    if(sickNumberType.value > 0){
        sickNumberType.value--
        if(sickNumberType.value === 0){
            sickNumberTypeName.value = "روز"
        }
        if(sickNumberType.value === 1){
            sickNumberTypeName.value = "هفته"
        }
        if(sickNumberType.value === 2){
            sickNumberTypeName.value = "سال"
        }
    }
}

const incrementDusting  = () =>{
    if(dusting.value < 20){
        dusting.value++
    }
}

const decrementDusting  =() =>{
    if(dusting.value > 1){
        dusting.value--
    }
}

const setInformation = () =>{
    compeleteInfo.value = true
}

const saveForm = () =>{
    if(stage.value == 1){
        if(userImages.value === []){
            ImageError.value = true
            return
        }
        if(userImages.value.length < 2){
            ImageError.value = true
            return
        }
        ImageError.value = false
    }
    if(stage.value == 2){
        if(light.value == null){
            LightError.value = true
            stageTwoError.value = true
        }
        if(Temp.value == null){
            TempError.value = true
            stageTwoError.value = true
        }
        if(soil.value == null){
            SoilError.value = true
            stageTwoError.value = true
        }
        if(symptoms.value.length < 1){
            symptoms.value = true
            stageTwoError.value = true
        }
        if(!symptomsError.value && !SoilError.value && !LightError.value && !TempError.value){
            stageTwoError.value = false
        }
        if(stageTwoError.value)return
    }
    stage.value++
    if(stage.value > 3){
        savePlantData()
        finishProcess.value = true;
    }
}

const logout = () =>{
  store.dispatch('auth/logout')
  router.push('/login');
}

async function savePlantData() {
  await AuthService.generateNewToken()
  const token = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('userId', localStorage.getItem('userId'))
  formData.append('name', flower.value.name)
  formData.append('light',  light.value)
  formData.append('temp',  Temp.value)
  formData.append('soil',  soil.value)
  formData.append('symptom',  symptoms.value)
  formData.append('description',  description.value)
  formData.append('fileName',filename.value)
  formData.append('files',file.value[0])
  formData.append('files',file.value[1])
  formData.append('files',file.value[2])
//   for (let [key, value] of formData) {
//   console.log(key, value);
//     }
    console.log(...formData)
  await fetch(API_URL + "flowers", {
    method: "POST",
    body: formData,
    headers: {
      'Authorization': 'Bearer '+ token,
  }})
    .then((res) => {
      if (!res.ok) {
        alert('sth 404')
      }
      return res.json();
    })
    .then((data) => data);
}


</script>

<template>
    <div class="max-w-[400px] w-full relative">
        <leftSvg class="absolute -top-10 transform -scale-x-100 opacity-40"></leftSvg>
        <rightSvg class="absolute top-0 left-0 transform -scale-x-100 opacity-40"></rightSvg>
    </div>
    <div class="h-[100svh] w-full relative overflow-y-auto">
        <div class="flex flex-col justify-center max-w-[400px] w-full mb-[50px]">
    
            <!-- navigation -->
            <div class="flex flex-col items-center justify-center mt-[30px]">
                <div class="flex justify-center text-center items-center mb-[60px]">
                    <div v-if="stage < 3" class="w-[25px] h-[25px] flex items-center justify-center bg-[#f6f6f6] rounded-full text-[#adadad]">3</div>
                    <div v-if="stage >= 3" class="w-[25px] h-[25px] flex items-center justify-center bg-[#49b779] rounded-full text-white">3</div>
                    <div class="w-[30px] h-[1px] bg-[#adadad]"></div>
                    <div v-if="stage < 2" class='w-[25px] h-[25px] flex items-center justify-center bg-[#f6f6f6] rounded-full text-[#adadad]'>2</div>
                    <div v-if="stage >= 2" class='w-[25px] h-[25px] flex items-center justify-center bg-[#49b779] rounded-full text-white'>2</div>
                    <div class="w-[30px] h-[1px] bg-[#adadad]"></div>
                    <div class="w-[25px] h-[25px] flex items-center justify-center bg-[#49b779] rounded-full text-white">1</div>
                </div>
                <div v-if="stage == 1" class="text-[20px] mx-auto text-center">تصویر گیاه <br/>{{ flower.name }}<br/> خود را آپلود کنید! </div>
                <span v-if="stage == 2" class="text-[20px]">سوالات زیر را تکمیل کنید </span>
            </div>

            <!-- stage 1 -->
            <div v-if="stage == 1" class="max-w-[400px] w-full flex flex-col gap-2 p-[20px]">
    
                <div class='flex gap-3 mx-auto'>
                    <div class="max-w-[100px]" @click="openFileInput0">
                        <div class="relative flex justify-center p-[5px] items-center shadow-md cursor-pointer rounded">
                            <img v-if="userImages[0]" :src="userImages[0]" class="object-cover aspect-square w-[200px] rounded bg-white">
                            <div v-else class="aspect-square w-[200px] rounded bg-white flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2965 2.61541L14.2107 6.14941M1 14.5427H4.9143L15.1893 5.26591C15.7084 4.79727 16 4.16167 16 3.49891C16 2.83616 15.7084 2.20055 15.1893 1.73191C14.6703 1.26328 13.9662 1 13.2322 1C12.4981 1 11.7941 1.26328 11.275 1.73191L1 11.0087V14.5427Z" stroke="#49B779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <!-- <i v-if="userImages[0]" class="absolute -bottom-2 -right-2 w-[30px] h-[30px] flex justify-center items-center rounded-full shadow-md bg-white">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2965 2.61541L14.2107 6.14941M1 14.5427H4.9143L15.1893 5.26591C15.7084 4.79727 16 4.16167 16 3.49891C16 2.83616 15.7084 2.20055 15.1893 1.73191C14.6703 1.26328 13.9662 1 13.2322 1C12.4981 1 11.7941 1.26328 11.275 1.73191L1 11.0087V14.5427Z" stroke="#49B779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i> -->
                        </div>
                        <div class="hidden">
                            <input ref="fileInput" name="fileInput0" type="file" @input="setNewImage"/>
                        </div>
                    </div>

                    <div class="max-w-[100px]" @click="openFileInput1">
                        <div class="relative flex justify-center p-[5px] items-center shadow-md cursor-pointer rounded">
                            <img v-if="userImages[1]" :src="userImages[1]" class="object-cover aspect-square w-[200px] rounded bg-white">
                            <div v-else class="aspect-square w-[200px] rounded bg-white flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2965 2.61541L14.2107 6.14941M1 14.5427H4.9143L15.1893 5.26591C15.7084 4.79727 16 4.16167 16 3.49891C16 2.83616 15.7084 2.20055 15.1893 1.73191C14.6703 1.26328 13.9662 1 13.2322 1C12.4981 1 11.7941 1.26328 11.275 1.73191L1 11.0087V14.5427Z" stroke="#49B779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <!-- <i v-if="userImages[1]" class="absolute -bottom-2 -right-2 w-[30px] h-[30px] flex justify-center items-center rounded-full shadow-md bg-white">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2965 2.61541L14.2107 6.14941M1 14.5427H4.9143L15.1893 5.26591C15.7084 4.79727 16 4.16167 16 3.49891C16 2.83616 15.7084 2.20055 15.1893 1.73191C14.6703 1.26328 13.9662 1 13.2322 1C12.4981 1 11.7941 1.26328 11.275 1.73191L1 11.0087V14.5427Z" stroke="#49B779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i> -->
                        </div>
                        <div class="hidden">
                            <input ref="fileInput" name="fileInput1" type="file" @input="setNewImage"/>
                        </div>
                    </div>

                    <div class="max-w-[100px]" @click="openFileInput2">
                        <div class="relative flex justify-center p-[5px] items-center shadow-md cursor-pointer rounded">
                            <img v-if="userImages[2]" :src="userImages[2]" class="object-cover aspect-square w-[200px] rounded bg-white">
                            <div v-else class="aspect-square w-[200px] rounded bg-white flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2965 2.61541L14.2107 6.14941M1 14.5427H4.9143L15.1893 5.26591C15.7084 4.79727 16 4.16167 16 3.49891C16 2.83616 15.7084 2.20055 15.1893 1.73191C14.6703 1.26328 13.9662 1 13.2322 1C12.4981 1 11.7941 1.26328 11.275 1.73191L1 11.0087V14.5427Z" stroke="#49B779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <!-- <i v-if="userImages[2]" class="absolute -bottom-2 -right-2 w-[30px] h-[30px] flex justify-center items-center rounded-full shadow-md bg-white">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2965 2.61541L14.2107 6.14941M1 14.5427H4.9143L15.1893 5.26591C15.7084 4.79727 16 4.16167 16 3.49891C16 2.83616 15.7084 2.20055 15.1893 1.73191C14.6703 1.26328 13.9662 1 13.2322 1C12.4981 1 11.7941 1.26328 11.275 1.73191L1 11.0087V14.5427Z" stroke="#49B779" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i> -->
                        </div>
                        <div class="hidden">
                            <input ref="fileInput" name="fileInput2" type="file" @input="setNewImage"/>
                        </div>
                    </div>
                </div>
                <div class="flex mt-[10px] gap-1 text-[#AC0202]" v-if="ImageError">
                    <i fill="currentcolor">
                        <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                            fill="currentcolor" />
                        </svg>
                    </i>
                    <span class="text-[12px]">وارد کردن عکس گیاه الزامی است</span>
                </div>
            </div>
    
            <!-- stage 2 -->
            <div v-if="stage == 2" class="max-w-[400px] w-full flex flex-col gap-2 p-[20px]">
                
                <div class="flex flex-col justify-center items-center gap-[10px]">
                    <!-- light -->
                    <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full  p-[15px] bg-white">
                        <div class="flex gap-[5px] items-center mb-[10px]">
                            <i>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 3.15508C9.13261 3.15508 9.25979 3.1024 9.35355 3.00863C9.44732 2.91486 9.5 2.78769 9.5 2.65508V0.955078C9.5 0.82247 9.44732 0.695293 9.35355 0.601525C9.25979 0.507757 9.13261 0.455078 9 0.455078C8.86739 0.455078 8.74021 0.507757 8.64645 0.601525C8.55268 0.695293 8.5 0.82247 8.5 0.955078V2.65508C8.5 2.78769 8.55268 2.91486 8.64645 3.00863C8.74021 3.1024 8.86739 3.15508 9 3.15508Z" fill="#49B779"/>
                                <path d="M9 14.8452C8.86739 14.8452 8.74021 14.8979 8.64645 14.9917C8.55268 15.0854 8.5 15.2126 8.5 15.3452V17.0452C8.5 17.1778 8.55268 17.305 8.64645 17.3988C8.74021 17.4925 8.86739 17.5452 9 17.5452C9.13261 17.5452 9.25979 17.4925 9.35355 17.3988C9.44732 17.305 9.5 17.1778 9.5 17.0452V15.3452C9.5 15.2126 9.44732 15.0854 9.35355 14.9917C9.25979 14.8979 9.13261 14.8452 9 14.8452Z" fill="#49B779"/>
                                <path d="M4.15983 4.87007C4.2528 4.95459 4.37419 5.001 4.49983 5.00007C4.56563 5.00045 4.63086 4.98784 4.69178 4.96296C4.7527 4.93808 4.80811 4.90141 4.85483 4.85507C4.90169 4.80859 4.93889 4.75329 4.96427 4.69236C4.98966 4.63143 5.00273 4.56608 5.00273 4.50007C5.00273 4.43407 4.98966 4.36871 4.96427 4.30778C4.93889 4.24685 4.90169 4.19155 4.85483 4.14507L3.66483 2.96007C3.56918 2.87816 3.44614 2.83536 3.3203 2.84022C3.19446 2.84508 3.07509 2.89724 2.98605 2.98629C2.897 3.07534 2.84483 3.19471 2.83997 3.32055C2.83511 3.44638 2.87791 3.56942 2.95983 3.66507L4.15983 4.87007Z" fill="#49B779"/>
                                <path d="M13.84 13.13C13.7933 13.0833 13.738 13.0464 13.6771 13.0211C13.6162 12.9959 13.5509 12.9829 13.485 12.9829C13.419 12.9829 13.3537 12.9959 13.2928 13.0211C13.2319 13.0464 13.1766 13.0833 13.13 13.13C13.0833 13.1766 13.0464 13.2319 13.0211 13.2928C12.9959 13.3537 12.9829 13.419 12.9829 13.485C12.9829 13.5509 12.9959 13.6162 13.0211 13.6771C13.0464 13.738 13.0833 13.7933 13.13 13.84L14.335 15.04C14.3813 15.0872 14.4365 15.1248 14.4974 15.1505C14.5584 15.1763 14.6238 15.1897 14.69 15.19C14.8218 15.1881 14.9476 15.1342 15.04 15.04C15.1331 14.9463 15.1854 14.8195 15.1854 14.6875C15.1854 14.5554 15.1331 14.4286 15.04 14.335L13.84 13.13Z" fill="#49B779"/>
                                <path d="M3.15483 9C3.15483 8.86739 3.10216 8.74021 3.00839 8.64645C2.91462 8.55268 2.78744 8.5 2.65483 8.5H0.954834C0.822226 8.5 0.695049 8.55268 0.601281 8.64645C0.507512 8.74021 0.454834 8.86739 0.454834 9C0.454834 9.13261 0.507512 9.25979 0.601281 9.35355C0.695049 9.44732 0.822226 9.5 0.954834 9.5H2.65483C2.78744 9.5 2.91462 9.44732 3.00839 9.35355C3.10216 9.25979 3.15483 9.13261 3.15483 9Z" fill="#49B779"/>
                                <path d="M17.0451 8.5H15.3451C15.2125 8.5 15.0853 8.55268 14.9915 8.64645C14.8978 8.74021 14.8451 8.86739 14.8451 9C14.8451 9.13261 14.8978 9.25979 14.9915 9.35355C15.0853 9.44732 15.2125 9.5 15.3451 9.5H17.0451C17.1777 9.5 17.3049 9.44732 17.3986 9.35355C17.4924 9.25979 17.5451 9.13261 17.5451 9C17.5451 8.86739 17.4924 8.74021 17.3986 8.64645C17.3049 8.55268 17.1777 8.5 17.0451 8.5Z" fill="#49B779"/>
                                <path d="M4.16004 13.13L2.96004 14.335C2.88983 14.4046 2.84184 14.4935 2.82215 14.5904C2.80246 14.6873 2.81194 14.7879 2.8494 14.8794C2.88687 14.9709 2.95062 15.0493 3.03262 15.1045C3.11461 15.1598 3.21115 15.1895 3.31004 15.19C3.37619 15.1897 3.44163 15.1763 3.50257 15.1505C3.56351 15.1248 3.61873 15.0872 3.66504 15.04L4.87004 13.84C4.96419 13.7458 5.01708 13.6181 5.01708 13.485C5.01708 13.3518 4.96419 13.2241 4.87004 13.13C4.77589 13.0358 4.64819 12.9829 4.51504 12.9829C4.38189 12.9829 4.25419 13.0358 4.16004 13.13Z" fill="#49B779"/>
                                <path d="M13.4998 4.99971C13.5657 5.00009 13.6309 4.98748 13.6918 4.9626C13.7527 4.93772 13.8081 4.90105 13.8548 4.85471L15.0548 3.64971C15.148 3.55603 15.2002 3.42931 15.2002 3.29721C15.2002 3.16512 15.148 3.03839 15.0548 2.94471C14.9612 2.85159 14.8344 2.79932 14.7023 2.79932C14.5703 2.79932 14.4435 2.85159 14.3498 2.94471L13.1448 4.14471C13.098 4.19119 13.0608 4.24649 13.0354 4.30742C13.01 4.36835 12.9969 4.43371 12.9969 4.49971C12.9969 4.56572 13.01 4.63107 13.0354 4.692C13.0608 4.75293 13.098 4.80823 13.1448 4.85471C13.1916 4.90105 13.247 4.93772 13.3079 4.9626C13.3688 4.98748 13.434 5.00009 13.4998 4.99971Z" fill="#49B779"/>
                                <path d="M9.06518 3.87493C8.06075 3.86204 7.07517 4.1481 6.23373 4.69676C5.39229 5.24541 4.73299 6.03188 4.33965 6.95617C3.9463 7.88047 3.83668 8.90086 4.02471 9.88761C4.21274 10.8744 4.68994 11.7829 5.39563 12.4978C6.10133 13.2127 7.00365 13.7016 7.9879 13.9023C8.97215 14.1031 9.99386 14.0066 10.9232 13.6253C11.8525 13.2439 12.6474 12.5948 13.2069 11.7605C13.7663 10.9262 14.0651 9.94444 14.0652 8.93993C14.0718 7.60581 13.5493 6.32349 12.612 5.37404C11.6747 4.4246 10.3993 3.8855 9.06518 3.87493ZM9.06518 12.9999C8.25835 13.0128 7.46592 12.7853 6.78883 12.3463C6.11174 11.9074 5.58062 11.2768 5.2631 10.535C4.94558 9.79311 4.85604 8.97355 5.00588 8.18064C5.15572 7.38773 5.53815 6.65736 6.10448 6.08254C6.67081 5.50771 7.39541 5.11445 8.18599 4.95282C8.97658 4.7912 9.79739 4.86853 10.5439 5.17496C11.2904 5.4814 11.9288 6.00308 12.3778 6.67356C12.8268 7.34404 13.0661 8.13299 13.0652 8.93993C13.0705 10.008 12.6527 11.0347 11.9031 11.7955C11.1535 12.5563 10.1332 12.9894 9.06518 12.9999Z" fill="#49B779"/>
                                </svg>
                            </i>
                            <span>نور دریافتی</span>
                        </div>
                        <div class="flex justify-center items-center gap-[10px]" id="lightData" @click="setLight">
                            
                            <button @click="setLight(1)" ref="directLight" class="relative w-1/3 border flex items-center justify-center h-[60px] p-[10px] text-[#adadad] bg-[#f6f6f6] rounded-md">
                                <div class="flex flex-col items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.75" d="M11.5 17.25C13.025 17.25 14.4875 16.6442 15.5659 15.5659C16.6442 14.4875 17.25 13.025 17.25 11.5C17.25 9.97501 16.6442 8.51247 15.5659 7.43414C14.4875 6.3558 13.025 5.75 11.5 5.75C9.97501 5.75 8.51247 6.3558 7.43414 7.43414C6.3558 8.51247 5.75 9.97501 5.75 11.5C5.75 13.025 6.3558 14.4875 7.43414 15.5659C8.51247 16.6442 9.97501 17.25 11.5 17.25ZM11.5 0C11.6906 0 11.8734 0.0757252 12.0082 0.210517C12.143 0.345309 12.2188 0.528126 12.2188 0.71875V3.59375C12.2188 3.78437 12.143 3.96719 12.0082 4.10198C11.8734 4.23677 11.6906 4.3125 11.5 4.3125C11.3094 4.3125 11.1266 4.23677 10.9918 4.10198C10.857 3.96719 10.7812 3.78437 10.7812 3.59375V0.71875C10.7812 0.528126 10.857 0.345309 10.9918 0.210517C11.1266 0.0757252 11.3094 0 11.5 0ZM11.5 18.6875C11.6906 18.6875 11.8734 18.7632 12.0082 18.898C12.143 19.0328 12.2188 19.2156 12.2188 19.4062V22.2812C12.2188 22.4719 12.143 22.6547 12.0082 22.7895C11.8734 22.9243 11.6906 23 11.5 23C11.3094 23 11.1266 22.9243 10.9918 22.7895C10.857 22.6547 10.7812 22.4719 10.7812 22.2812V19.4062C10.7812 19.2156 10.857 19.0328 10.9918 18.898C11.1266 18.7632 11.3094 18.6875 11.5 18.6875ZM23 11.5C23 11.6906 22.9243 11.8734 22.7895 12.0082C22.6547 12.143 22.4719 12.2188 22.2812 12.2188H19.4062C19.2156 12.2188 19.0328 12.143 18.898 12.0082C18.7632 11.8734 18.6875 11.6906 18.6875 11.5C18.6875 11.3094 18.7632 11.1266 18.898 10.9918C19.0328 10.857 19.2156 10.7812 19.4062 10.7812H22.2812C22.4719 10.7812 22.6547 10.857 22.7895 10.9918C22.9243 11.1266 23 11.3094 23 11.5ZM4.3125 11.5C4.3125 11.6906 4.23677 11.8734 4.10198 12.0082C3.96719 12.143 3.78437 12.2188 3.59375 12.2188H0.71875C0.528126 12.2188 0.345309 12.143 0.210517 12.0082C0.0757252 11.8734 0 11.6906 0 11.5C0 11.3094 0.0757252 11.1266 0.210517 10.9918C0.345309 10.857 0.528126 10.7812 0.71875 10.7812H3.59375C3.78437 10.7812 3.96719 10.857 4.10198 10.9918C4.23677 11.1266 4.3125 11.3094 4.3125 11.5ZM19.6319 3.36806C19.7667 3.50285 19.8424 3.68563 19.8424 3.87622C19.8424 4.06681 19.7667 4.24959 19.6319 4.38437L17.5993 6.41844C17.5325 6.48517 17.4532 6.53809 17.3659 6.57416C17.2786 6.61024 17.1851 6.62878 17.0906 6.62871C16.8999 6.62858 16.7171 6.55268 16.5823 6.41772C16.5155 6.35089 16.4626 6.27158 16.4266 6.1843C16.3905 6.09702 16.3719 6.00349 16.372 5.90905C16.3721 5.71832 16.448 5.53546 16.583 5.40069L18.6156 3.36806C18.7504 3.23332 18.9332 3.15762 19.1238 3.15762C19.3144 3.15762 19.4972 3.23332 19.6319 3.36806ZM6.417 16.583C6.55175 16.7178 6.62744 16.9006 6.62744 17.0912C6.62744 17.2817 6.55175 17.4645 6.417 17.5993L4.38437 19.6319C4.24882 19.7629 4.06726 19.8353 3.87881 19.8337C3.69035 19.832 3.51008 19.7564 3.37682 19.6232C3.24356 19.4899 3.16797 19.3096 3.16633 19.1212C3.16469 18.9327 3.23714 18.7512 3.36806 18.6156L5.40069 16.583C5.53547 16.4483 5.71826 16.3726 5.90884 16.3726C6.09943 16.3726 6.28221 16.4483 6.417 16.583ZM19.6319 19.6319C19.4972 19.7667 19.3144 19.8424 19.1238 19.8424C18.9332 19.8424 18.7504 19.7667 18.6156 19.6319L16.583 17.5993C16.4521 17.4638 16.3796 17.2822 16.3813 17.0937C16.3829 16.9053 16.4585 16.725 16.5918 16.5918C16.725 16.4585 16.9053 16.3829 17.0937 16.3813C17.2822 16.3796 17.4638 16.4521 17.5993 16.583L19.6319 18.6156C19.7667 18.7504 19.8424 18.9332 19.8424 19.1238C19.8424 19.3144 19.7667 19.4972 19.6319 19.6319ZM6.417 6.41844C6.28221 6.55318 6.09943 6.62888 5.90884 6.62888C5.71826 6.62888 5.53547 6.55318 5.40069 6.41844L3.36806 4.38437C3.29941 4.31807 3.24466 4.23876 3.20699 4.15107C3.16932 4.06338 3.14949 3.96907 3.14866 3.87363C3.14783 3.7782 3.16602 3.68355 3.20216 3.59522C3.2383 3.50689 3.29167 3.42664 3.35915 3.35915C3.42664 3.29167 3.50689 3.2383 3.59522 3.20216C3.68355 3.16602 3.7782 3.14783 3.87363 3.14866C3.96907 3.14949 4.06338 3.16932 4.15107 3.20699C4.23876 3.24466 4.31807 3.29941 4.38437 3.36806L6.417 5.40069C6.48393 5.46745 6.53704 5.54677 6.57327 5.63409C6.60951 5.72141 6.62816 5.81502 6.62816 5.90956C6.62816 6.0041 6.60951 6.09771 6.57327 6.18504C6.53704 6.27236 6.48393 6.35167 6.417 6.41844Z" fill="#49B779"/>
                                    </svg>
                                    <div class="w-full">مستقیم</div>
                                </div>
                                <div v-if="directLightCheck" class="absolute -bottom-2 -right-2 bg-[#49b779] rounded-full p-[2px] justify-center items-center text-white">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6097 5.20743C21.0475 5.54416 21.1294 6.17201 20.7926 6.60976L10.7926 19.6098C10.6172 19.8378 10.352 19.9793 10.0648 19.9979C9.77765 20.0166 9.49637 19.9106 9.29289 19.7072L4.29289 14.7072C3.90237 14.3166 3.90237 13.6835 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9.90178 17.4876L19.2074 5.39034C19.5441 4.95258 20.172 4.87069 20.6097 5.20743Z" fill="currentcolor"/>
                                    </svg>
                                </div>
                            </button>

                            <button @click="setLight(2)" ref="semiLight" class="relative w-1/3 border flex items-center justify-center h-[60px] p-[10px] text-[#adadad] bg-[#f6f6f6] rounded-md">
                                <div class="flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.1" viewBox="0 0 96 96">
                                    <path fill="#49b779" d="
                                        M 47.06 0.00
                                        L 49.06 0.00
                                        C 52.48 1.80 51.30 13.11 51.21 14.49
                                        Q 50.94 18.53 47.41 17.97
                                        Q 44.89 17.58 44.82 15.03
                                        C 44.73 11.55 43.46 1.69 47.06 0.00
                                        Z"
                                    />
                                    <rect fill="#49b779" x="-3.09" y="-9.17" transform="translate(20.42,20.42) rotate(-45.0)" width="6.18" height="18.34" rx="3.01"/>
                                    <rect fill="#49b779" x="-3.09" y="-9.16" transform="translate(75.58,20.42) rotate(45.0)" width="6.18" height="18.32" rx="3.01"/>
                                    <path fill="#49b779" d="
                                        M 24.01 47.31
                                        C 23.66 35.05 34.46 25.18 45.24 24.18
                                        C 59.83 22.83 70.13 32.04 72.15 46.45
                                        A 1.36 1.36 0.0 0 1 70.80 48.00
                                        L 24.71 48.00
                                        A 0.71 0.70 89.2 0 1 24.01 47.31
                                        Z"
                                    />
                                    <path fill="#49b779" d="
                                        M 0.00 47.69
                                        L 0.00 46.69
                                        Q 1.40 44.85 3.06 44.81
                                        C 7.99 44.68 17.53 43.54 17.86 47.34
                                        A 0.50 0.50 0.0 0 1 17.39 47.88
                                        Q 8.62 48.33 0.00 47.69
                                        Z"
                                    />
                                    <path fill="#49b779" d="
                                        M 96.08 46.56
                                        L 96.00 47.81
                                        L 78.83 47.90
                                        A 0.79 0.78 -83.6 0 1 78.06 46.93
                                        Q 78.52 45.05 81.04 44.65
                                        Q 89.00 43.41 96.08 46.56
                                        Z"
                                    />
                                    </svg>
                                    <div class="w-full text-[12px]">غیر مستقیم</div>
                                </div>
                                <div v-if="semiLightCheck" class="absolute -bottom-2 -right-2 bg-[#49b779] rounded-full p-[2px] justify-center items-center text-white">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6097 5.20743C21.0475 5.54416 21.1294 6.17201 20.7926 6.60976L10.7926 19.6098C10.6172 19.8378 10.352 19.9793 10.0648 19.9979C9.77765 20.0166 9.49637 19.9106 9.29289 19.7072L4.29289 14.7072C3.90237 14.3166 3.90237 13.6835 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9.90178 17.4876L19.2074 5.39034C19.5441 4.95258 20.172 4.87069 20.6097 5.20743Z" fill="currentcolor"/>
                                    </svg>
                                </div>
                            </button>

                            <button @click="setLight(3)" ref="shadow" class="relative w-1/3 border flex items-center justify-center h-[60px] p-[10px] text-[#adadad] bg-[#f6f6f6] rounded-md">
                                <div class="flex flex-col items-center justify-center">
                                    <svg width="22" height="15" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 0C18.2539 0 20.9501 2.97311 21.3416 6.562H21.4611C24.5199 6.562 27 8.89856 27 11.781C27 14.6634 24.5199 17 21.4611 17H5.53886C2.48014 17 0 14.6634 0 11.781C0 8.89856 2.48014 6.562 5.53886 6.562H5.65843C6.05379 2.94856 8.74607 0 13.5 0Z" fill="#49B779"/>
                                    </svg>
                                    <div class="w-full">بدون نور</div>
                                </div>
                                <div v-if="shadowCheck" class="absolute -bottom-2 -right-2 bg-[#49b779] rounded-full p-[2px] justify-center items-center text-white">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6097 5.20743C21.0475 5.54416 21.1294 6.17201 20.7926 6.60976L10.7926 19.6098C10.6172 19.8378 10.352 19.9793 10.0648 19.9979C9.77765 20.0166 9.49637 19.9106 9.29289 19.7072L4.29289 14.7072C3.90237 14.3166 3.90237 13.6835 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L9.90178 17.4876L19.2074 5.39034C19.5441 4.95258 20.172 4.87069 20.6097 5.20743Z" fill="currentcolor"/>
                                    </svg>
                                </div>
                            </button>

                        </div>

                        <div class="flex mt-[10px] gap-1 text-[#AC0202]" v-if="LightError">
                            <i fill="currentcolor">
                                <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                                    fill="currentcolor" />
                                </svg>
                            </i>
                            <span class="text-[12px]">وارد کردن نور الزامی است</span>
                        </div>
                    </div>

                    <!-- temp -->
                    <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                        <div class="flex gap-[5px] items-center mb-[10px]">
                            <i>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 3.15508C9.13261 3.15508 9.25979 3.1024 9.35355 3.00863C9.44732 2.91486 9.5 2.78769 9.5 2.65508V0.955078C9.5 0.82247 9.44732 0.695293 9.35355 0.601525C9.25979 0.507757 9.13261 0.455078 9 0.455078C8.86739 0.455078 8.74021 0.507757 8.64645 0.601525C8.55268 0.695293 8.5 0.82247 8.5 0.955078V2.65508C8.5 2.78769 8.55268 2.91486 8.64645 3.00863C8.74021 3.1024 8.86739 3.15508 9 3.15508Z" fill="#49B779"/>
                                <path d="M9 14.8452C8.86739 14.8452 8.74021 14.8979 8.64645 14.9917C8.55268 15.0854 8.5 15.2126 8.5 15.3452V17.0452C8.5 17.1778 8.55268 17.305 8.64645 17.3988C8.74021 17.4925 8.86739 17.5452 9 17.5452C9.13261 17.5452 9.25979 17.4925 9.35355 17.3988C9.44732 17.305 9.5 17.1778 9.5 17.0452V15.3452C9.5 15.2126 9.44732 15.0854 9.35355 14.9917C9.25979 14.8979 9.13261 14.8452 9 14.8452Z" fill="#49B779"/>
                                <path d="M4.15983 4.87007C4.2528 4.95459 4.37419 5.001 4.49983 5.00007C4.56563 5.00045 4.63086 4.98784 4.69178 4.96296C4.7527 4.93808 4.80811 4.90141 4.85483 4.85507C4.90169 4.80859 4.93889 4.75329 4.96427 4.69236C4.98966 4.63143 5.00273 4.56608 5.00273 4.50007C5.00273 4.43407 4.98966 4.36871 4.96427 4.30778C4.93889 4.24685 4.90169 4.19155 4.85483 4.14507L3.66483 2.96007C3.56918 2.87816 3.44614 2.83536 3.3203 2.84022C3.19446 2.84508 3.07509 2.89724 2.98605 2.98629C2.897 3.07534 2.84483 3.19471 2.83997 3.32055C2.83511 3.44638 2.87791 3.56942 2.95983 3.66507L4.15983 4.87007Z" fill="#49B779"/>
                                <path d="M13.84 13.13C13.7933 13.0833 13.738 13.0464 13.6771 13.0211C13.6162 12.9959 13.5509 12.9829 13.485 12.9829C13.419 12.9829 13.3537 12.9959 13.2928 13.0211C13.2319 13.0464 13.1766 13.0833 13.13 13.13C13.0833 13.1766 13.0464 13.2319 13.0211 13.2928C12.9959 13.3537 12.9829 13.419 12.9829 13.485C12.9829 13.5509 12.9959 13.6162 13.0211 13.6771C13.0464 13.738 13.0833 13.7933 13.13 13.84L14.335 15.04C14.3813 15.0872 14.4365 15.1248 14.4974 15.1505C14.5584 15.1763 14.6238 15.1897 14.69 15.19C14.8218 15.1881 14.9476 15.1342 15.04 15.04C15.1331 14.9463 15.1854 14.8195 15.1854 14.6875C15.1854 14.5554 15.1331 14.4286 15.04 14.335L13.84 13.13Z" fill="#49B779"/>
                                <path d="M3.15483 9C3.15483 8.86739 3.10216 8.74021 3.00839 8.64645C2.91462 8.55268 2.78744 8.5 2.65483 8.5H0.954834C0.822226 8.5 0.695049 8.55268 0.601281 8.64645C0.507512 8.74021 0.454834 8.86739 0.454834 9C0.454834 9.13261 0.507512 9.25979 0.601281 9.35355C0.695049 9.44732 0.822226 9.5 0.954834 9.5H2.65483C2.78744 9.5 2.91462 9.44732 3.00839 9.35355C3.10216 9.25979 3.15483 9.13261 3.15483 9Z" fill="#49B779"/>
                                <path d="M17.0451 8.5H15.3451C15.2125 8.5 15.0853 8.55268 14.9915 8.64645C14.8978 8.74021 14.8451 8.86739 14.8451 9C14.8451 9.13261 14.8978 9.25979 14.9915 9.35355C15.0853 9.44732 15.2125 9.5 15.3451 9.5H17.0451C17.1777 9.5 17.3049 9.44732 17.3986 9.35355C17.4924 9.25979 17.5451 9.13261 17.5451 9C17.5451 8.86739 17.4924 8.74021 17.3986 8.64645C17.3049 8.55268 17.1777 8.5 17.0451 8.5Z" fill="#49B779"/>
                                <path d="M4.16004 13.13L2.96004 14.335C2.88983 14.4046 2.84184 14.4935 2.82215 14.5904C2.80246 14.6873 2.81194 14.7879 2.8494 14.8794C2.88687 14.9709 2.95062 15.0493 3.03262 15.1045C3.11461 15.1598 3.21115 15.1895 3.31004 15.19C3.37619 15.1897 3.44163 15.1763 3.50257 15.1505C3.56351 15.1248 3.61873 15.0872 3.66504 15.04L4.87004 13.84C4.96419 13.7458 5.01708 13.6181 5.01708 13.485C5.01708 13.3518 4.96419 13.2241 4.87004 13.13C4.77589 13.0358 4.64819 12.9829 4.51504 12.9829C4.38189 12.9829 4.25419 13.0358 4.16004 13.13Z" fill="#49B779"/>
                                <path d="M13.4998 4.99971C13.5657 5.00009 13.6309 4.98748 13.6918 4.9626C13.7527 4.93772 13.8081 4.90105 13.8548 4.85471L15.0548 3.64971C15.148 3.55603 15.2002 3.42931 15.2002 3.29721C15.2002 3.16512 15.148 3.03839 15.0548 2.94471C14.9612 2.85159 14.8344 2.79932 14.7023 2.79932C14.5703 2.79932 14.4435 2.85159 14.3498 2.94471L13.1448 4.14471C13.098 4.19119 13.0608 4.24649 13.0354 4.30742C13.01 4.36835 12.9969 4.43371 12.9969 4.49971C12.9969 4.56572 13.01 4.63107 13.0354 4.692C13.0608 4.75293 13.098 4.80823 13.1448 4.85471C13.1916 4.90105 13.247 4.93772 13.3079 4.9626C13.3688 4.98748 13.434 5.00009 13.4998 4.99971Z" fill="#49B779"/>
                                <path d="M9.06518 3.87493C8.06075 3.86204 7.07517 4.1481 6.23373 4.69676C5.39229 5.24541 4.73299 6.03188 4.33965 6.95617C3.9463 7.88047 3.83668 8.90086 4.02471 9.88761C4.21274 10.8744 4.68994 11.7829 5.39563 12.4978C6.10133 13.2127 7.00365 13.7016 7.9879 13.9023C8.97215 14.1031 9.99386 14.0066 10.9232 13.6253C11.8525 13.2439 12.6474 12.5948 13.2069 11.7605C13.7663 10.9262 14.0651 9.94444 14.0652 8.93993C14.0718 7.60581 13.5493 6.32349 12.612 5.37404C11.6747 4.4246 10.3993 3.8855 9.06518 3.87493ZM9.06518 12.9999C8.25835 13.0128 7.46592 12.7853 6.78883 12.3463C6.11174 11.9074 5.58062 11.2768 5.2631 10.535C4.94558 9.79311 4.85604 8.97355 5.00588 8.18064C5.15572 7.38773 5.53815 6.65736 6.10448 6.08254C6.67081 5.50771 7.39541 5.11445 8.18599 4.95282C8.97658 4.7912 9.79739 4.86853 10.5439 5.17496C11.2904 5.4814 11.9288 6.00308 12.3778 6.67356C12.8268 7.34404 13.0661 8.13299 13.0652 8.93993C13.0705 10.008 12.6527 11.0347 11.9031 11.7955C11.1535 12.5563 10.1332 12.9894 9.06518 12.9999Z" fill="#49B779"/>
                                </svg>
                            </i>
                            <span>دما محیط نگهداری</span>
                        </div>
                        <div class="flex gap-[5px] items-center w-full">
                            <select ref="tempSelect" class="w-full p-[5px] border outline-none transition-all duration-200" @input="setTemp">
                                <option disabled selected>انتخاب کنید</option>
                                <option value="1">معتدل</option>
                                <option value="2">گرم</option>
                                <option value="3">سرد</option>
                                <option value="4">درجه</option>
                            </select>
                            <div ref="tempRange" class="w-2/3 gap-[5px] items-center text-[16px] hidden">
                                <input @input="setTempRange"  type="range" min="20" max="45" dir="ltr" value="22">
                                <span>{{ Temp }}</span>
                            </div>
                        </div>

                        <div class="flex mt-[10px] gap-1 text-[#AC0202]" v-if="TempError">
                            <i fill="currentcolor">
                                <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                                    fill="currentcolor" />
                                </svg>
                            </i>
                            <span class="text-[12px]">وارد کردن دما الزامی است</span>
                        </div>
                    </div>

                    <!-- soil -->
                    <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                        <div class="flex gap-[5px] items-center mg-[10px] mb-[5px]">
                            <i class="text-[#695843]">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        version="1.1" id="Capa_1" viewBox="0 0 465 465" xml:space="preserve" width="15"
                                        height="15" fill="currentcolor">
    
                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
    
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
    
                                        <g id="SVGRepo_iconCarrier">
                                            <g>
                                                <rect x="37.5" y="42.83" style="fill:none;" width="390" height="62" />
                                                <path style="fill:none;"
                                                    d="M151.18,269.78c13.13,13.14,30.38,19.22,46.31,17.89c1.32-15.93-4.75-33.17-17.89-46.31 s-30.38-19.21-46.32-17.89C131.96,239.4,138.04,256.64,151.18,269.78z M427.45,382.02c-194.95,0-194.95-53-389.9-53H7.5V104.83h30 h390h30v277.19H427.45z M232.55,253.11c14.53-12.31,23.93-31.94,23.93-54.07c0-22.12-9.4-41.76-23.93-54.06 c-14.53,12.3-23.93,31.94-23.93,54.06C208.62,221.17,218.02,240.8,232.55,253.11z M267.61,287.67 c15.93,1.33,33.17-4.75,46.31-17.89c13.14-13.14,19.22-30.38,17.89-46.31c-15.93-1.32-33.17,4.75-46.31,17.89 S266.29,271.74,267.61,287.67z" />
                                                <path style="fill:none;"
                                                    d="M457.5,382.02v40.15H7.5v-93.15h30.05c194.95,0,194.95,53,389.9,53H457.5z" />
                                                <path style="fill:none;"
                                                    d="M179.6,241.36c13.14,13.14,19.21,30.38,17.89,46.31c-15.93,1.33-33.18-4.75-46.31-17.89 c-13.14-13.14-19.22-30.38-17.9-46.31C149.22,222.15,166.46,228.22,179.6,241.36z" />
                                                <path style="fill:none;"
                                                    d="M232.55,144.98c14.53,12.3,23.93,31.94,23.93,54.06c0,22.13-9.4,41.76-23.93,54.07 c-14.53-12.31-23.93-31.94-23.93-54.07C208.62,176.92,218.02,157.28,232.55,144.98z" />
                                                <path style="fill:none;"
                                                    d="M331.81,223.47c1.33,15.93-4.75,33.17-17.89,46.31c-13.14,13.14-30.38,19.22-46.31,17.89 c-1.32-15.93,4.75-33.17,17.89-46.31S315.88,222.15,331.81,223.47z" />
                                                <path fill="curretncolor"
                                                    d="M240.049,349.8v-23.604c0.077-0.184,0.142-0.371,0.204-0.559l30.313-30.313 c0.448,0.01,0.897,0.028,1.344,0.028c17.189,0,34.436-7.387,47.315-20.267c14.316-14.317,21.629-33.356,20.063-52.236 c-0.303-3.652-3.202-6.552-6.854-6.854c-1.624-0.135-3.28-0.202-4.925-0.202c-17.188,0-34.434,7.387-47.312,20.266 c-13.417,13.415-20.681,30.979-20.254,48.673l-19.895,19.896v-48.168c15.251-14.286,23.933-35,23.933-57.417 c0-23.688-9.689-45.48-26.585-59.789c-2.797-2.369-6.897-2.367-9.694,0c-16.895,14.309-26.585,36.101-26.585,59.789 c0,22.417,8.682,43.131,23.932,57.417v47.956l-19.896-20.173c0.282-17.527-6.96-34.891-20.251-48.182 c-12.879-12.879-30.124-20.266-47.312-20.266c-1.644,0-3.301,0.067-4.924,0.202c-3.653,0.304-6.552,3.202-6.854,6.854 c-1.566,18.88,5.747,37.92,20.063,52.237c12.879,12.879,30.125,20.266,47.314,20.266c0.605,0,1.212-0.019,1.819-0.038 l30.042,30.461v19.956c-45.651-12.308-95.388-24.213-187.5-24.213c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5 c96.474,0,145.536,13.34,192.983,26.241c48.396,13.159,98.441,26.767,196.918,26.767c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5 C334.752,374.525,285.827,362.209,240.049,349.8z M156.48,264.479c-9.283-9.284-14.917-21.454-15.761-33.581 c12.197,0.831,24.283,6.474,33.575,15.767c9.283,9.282,14.917,21.452,15.76,33.579C177.858,279.413,165.772,273.771,156.48,264.479 z M290.805,246.664c9.292-9.292,21.377-14.935,33.574-15.766c-0.844,12.127-6.477,24.297-15.761,33.58 c-9.292,9.293-21.378,14.935-33.574,15.767C275.888,268.117,281.521,255.947,290.805,246.664z M216.117,199.041 c0-16.557,6.049-32.417,16.432-43.688c10.383,11.271,16.432,27.132,16.432,43.688s-6.049,32.416-16.432,43.687 C222.166,231.457,216.117,215.597,216.117,199.041z" />
                                                <path fill="currentcolor"
                                                    d="M457.5,97.328H435V42.827c0-4.143-3.357-7.5-7.5-7.5h-390c-4.142,0-7.5,3.357-7.5,7.5v54.501H7.5 c-4.142,0-7.5,3.357-7.5,7.5v317.345c0,4.143,3.358,7.5,7.5,7.5h450c4.143,0,7.5-3.357,7.5-7.5V104.828 C465,100.686,461.643,97.328,457.5,97.328z M45,50.327h375v47.001H45V50.327z M450,414.673H15V112.328h435V414.673z" />
                                            </g>
                                        </g>
    
                                    </svg>
                            </i>
                            <span>وضعیت سطح خاک هنگام آبیاری</span>
                        </div>
                        <div class="flex justify-between text-[12px]">
                            <div><input type='radio' name="soilStatus" @click="setSoil(1)"/>خشک</div>
                            <div><input type='radio' name="soilStatus" @click="setSoil(2)"/>نیمه خشک</div>
                            <div><input type='radio' name="soilStatus" @click="setSoil(3)"/>مرطوب</div>
                            <div><input type='radio' name="soilStatus" @click="setSoil(4)"/>خیس</div>
                        </div>
                        <div class="flex mt-[10px] gap-1 text-[#AC0202]" v-if="SoilError">
                            <i fill="currentcolor">
                                <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                                    fill="currentcolor" />
                                </svg>
                            </i>
                            <span class="text-[12px]">وارد کردن وضعیت سطح خاک هنگام آبیاری الزامی است</span>
                        </div>
                    </div>

                    <!-- symptom -->
                    <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                        <div class="flex gap-[5px] items-center mg-[10px] mb-[5px]">
                            <i class="text-[#63B89D]">
                                <svg fill="currentcolor" width="15" height="15" viewBox="-1.82 0 15.99 15.99"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="Layer_2" data-name="Layer 2">
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <path
                                                d="M11.08,6.06,6.58.19a.52.52,0,0,0-.8,0L1.28,6.06a6.18,6.18,0,1,0,10.44,6.49A6.13,6.13,0,0,0,11.08,6.06Zm-.26,6A5.07,5.07,0,0,1,6.18,15,5.08,5.08,0,0,1,1.54,12.1a5.08,5.08,0,0,1,.53-5.43L6.18,1.31l4.11,5.36A5.08,5.08,0,0,1,10.82,12.1ZM10.18,10a4,4,0,0,1-4,4,.5.5,0,0,1,0-1,3,3,0,0,0,3-3,.5.5,0,0,1,1,0Z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                            </i>
                            <span>علائم بیماری - <span class="text-[12px]">میتوانید چند مورد را انتخاب نمایید</span></span>
                        </div>
                        <div class='grid grid-cols-3 gap-1 justify-center items-center'>
                            <button v-for="(plantStatus,index) in plantStatuses" @click="setSymptoms(index)" :name="'symptoms'+index" class="col-1 border h-[40px] flex items-center justify-center p-[5px] text-[12px] text-[#adadad] bg-[#f6f6f6] rounded-md">{{plantStatus}}
                            </button>
                        </div>
                        <div class="flex mt-[10px] gap-1 text-[#AC0202]" v-if="plantStatusError">
                            <i fill="currentcolor">
                                <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                                    fill="currentcolor" />
                                </svg>
                            </i>
                            <span class="text-[12px]">انتخاب حداقل یک مورد از علائم بیماری الزامی است</span>
                        </div>
                    </div>

                    <!-- description -->
                    <div class="shadow-[0_4px_10px_0_#c9c9c9] rounded-md w-full p-[15px] bg-white">
                        <div class="flex gap-[5px] items-center mg-[10px] mb-[5px]">
                            <i class="text-[#63B89D]">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1875 7.5C15.1875 7.64918 15.2468 7.79226 15.3523 7.89775C15.4577 8.00324 15.6008 8.0625 15.75 8.0625C15.8992 8.0625 16.0423 8.00324 16.1477 7.89775C16.2532 7.79226 16.3125 7.64918 16.3125 7.5H15.1875ZM6.75 17.0625C6.89918 17.0625 7.04226 17.0032 7.14775 16.8977C7.25324 16.7923 7.3125 16.6492 7.3125 16.5C7.3125 16.3508 7.25324 16.2077 7.14775 16.1023C7.04226 15.9968 6.89918 15.9375 6.75 15.9375V17.0625ZM9 16.5L8.45925 16.3455L8.18175 17.3205L9.15675 17.043L9 16.5ZM6.5625 1.5C6.5625 1.35082 6.50324 1.20774 6.39775 1.10225C6.29226 0.996763 6.14918 0.9375 6 0.9375C5.85082 0.9375 5.70774 0.996763 5.60225 1.10225C5.49676 1.20774 5.4375 1.35082 5.4375 1.5H6.5625ZM5.4375 3.75C5.4375 3.89918 5.49676 4.04226 5.60225 4.14775C5.70774 4.25324 5.85082 4.3125 6 4.3125C6.14918 4.3125 6.29226 4.25324 6.39775 4.14775C6.50324 4.04226 6.5625 3.89918 6.5625 3.75H5.4375ZM12.5625 1.5C12.5625 1.35082 12.5032 1.20774 12.3977 1.10225C12.2923 0.996763 12.1492 0.9375 12 0.9375C11.8508 0.9375 11.7077 0.996763 11.6023 1.10225C11.4968 1.20774 11.4375 1.35082 11.4375 1.5H12.5625ZM11.4375 3.75C11.4375 3.89918 11.4968 4.04226 11.6023 4.14775C11.7077 4.25324 11.8508 4.3125 12 4.3125C12.1492 4.3125 12.2923 4.25324 12.3977 4.14775C12.5032 4.04226 12.5625 3.89918 12.5625 3.75H11.4375ZM7.8975 10.1475C7.99686 10.0409 8.05095 9.89983 8.04838 9.75411C8.04581 9.60838 7.98678 9.46934 7.88372 9.36628C7.78066 9.26322 7.64162 9.20419 7.49589 9.20162C7.35017 9.19905 7.20913 9.25314 7.1025 9.3525L7.8975 10.1475ZM6.3525 10.1025C6.25314 10.2091 6.19905 10.3502 6.20162 10.4959C6.20419 10.6416 6.26322 10.7807 6.36628 10.8837C6.46934 10.9868 6.60838 11.0458 6.75411 11.0484C6.89983 11.051 7.04087 10.9969 7.1475 10.8975L6.3525 10.1025ZM5.25 3.1875H12.75V2.0625H5.25V3.1875ZM2.8125 13.5V5.625H1.6875V13.5H2.8125ZM15.1875 5.625V7.5H16.3125V5.625H15.1875ZM6.75 15.9375H5.25V17.0625H6.75V15.9375ZM1.6875 13.5C1.6875 14.4448 2.06283 15.351 2.73093 16.0191C3.39903 16.6872 4.30517 17.0625 5.25 17.0625V15.9375C4.60353 15.9375 3.98355 15.6807 3.52643 15.2236C3.06931 14.7665 2.8125 14.1465 2.8125 13.5H1.6875ZM12.75 3.1875C13.3965 3.1875 14.0165 3.44431 14.4736 3.90143C14.9307 4.35855 15.1875 4.97853 15.1875 5.625H16.3125C16.3125 4.68017 15.9372 3.77403 15.2691 3.10593C14.601 2.43783 13.6948 2.0625 12.75 2.0625V3.1875ZM5.25 2.0625C4.30517 2.0625 3.39903 2.43783 2.73093 3.10593C2.06283 3.77403 1.6875 4.68017 1.6875 5.625H2.8125C2.8125 4.97853 3.06931 4.35855 3.52643 3.90143C3.98355 3.44431 4.60353 3.1875 5.25 3.1875V2.0625ZM14.9843 11.4952L11.223 15.2565L12.0187 16.0522L15.78 12.291L14.9843 11.4952ZM10.2435 14.2762L14.0048 10.515L13.209 9.72L9.44775 13.4813L10.2435 14.2762ZM11.1435 15.3045L8.84775 15.9585L9.156 17.0408L11.4517 16.386L11.1435 15.3045ZM9.543 16.6545L10.1978 14.3588L9.1125 14.0505L8.45775 16.3463L9.543 16.6545ZM9.45 13.4813C9.29189 13.6395 9.17676 13.8354 9.1155 14.0505L10.197 14.3588C10.2057 14.3276 10.2222 14.2992 10.245 14.2762L9.45 13.4813ZM11.2253 15.2565C11.2025 15.2792 11.1744 15.2957 11.1435 15.3045L11.4517 16.386C11.6669 16.3247 11.8628 16.2096 12.021 16.0515L11.2253 15.2565ZM14.9865 10.5157C15.1163 10.6457 15.1892 10.8218 15.1892 11.0055C15.1892 11.1892 15.1163 11.3653 14.9865 11.4952L15.7822 12.291C16.1232 11.9501 16.3147 11.4877 16.3147 11.0055C16.3147 10.5233 16.1232 10.0609 15.7822 9.72L14.9865 10.5157ZM15.78 9.72C15.4391 9.37907 14.9767 9.18754 14.4945 9.18754C14.0123 9.18754 13.5499 9.37907 13.209 9.72L14.0048 10.515C14.1347 10.3852 14.3108 10.3131 14.4945 10.3131C14.6782 10.3131 14.8543 10.386 14.9843 10.5157L15.78 9.72ZM5.4375 1.5V3.75H6.5625V1.5H5.4375ZM11.4375 1.5V3.75H12.5625V1.5H11.4375ZM6.5625 8.25C6.5625 8.89647 6.81931 9.51645 7.27643 9.97357C7.73355 10.4307 8.35353 10.6875 9 10.6875V9.5625C8.6519 9.5625 8.31806 9.42422 8.07192 9.17808C7.82578 8.93194 7.6875 8.5981 7.6875 8.25H6.5625ZM9 10.6875C9.64647 10.6875 10.2665 10.4307 10.7236 9.97357C11.1807 9.51645 11.4375 8.89647 11.4375 8.25H10.3125C10.3125 8.5981 10.1742 8.93194 9.92808 9.17808C9.68194 9.42422 9.3481 9.5625 9 9.5625V10.6875ZM11.4375 8.25C11.4375 7.60353 11.1807 6.98355 10.7236 6.52643C10.2665 6.06931 9.64647 5.8125 9 5.8125V6.9375C9.3481 6.9375 9.68194 7.07578 9.92808 7.32192C10.1742 7.56806 10.3125 7.9019 10.3125 8.25H11.4375ZM9 5.8125C8.35353 5.8125 7.73355 6.06931 7.27643 6.52643C6.81931 6.98355 6.5625 7.60353 6.5625 8.25H7.6875C7.6875 7.9019 7.82578 7.56806 8.07192 7.32192C8.31806 7.07578 8.6519 6.9375 9 6.9375V5.8125ZM7.1025 9.3525L6.3525 10.1025L7.1475 10.8975L7.8975 10.1475L7.1025 9.3525Z" fill="#49B779"/>
                                </svg>
                            </i>
                            <span>توضیحات</span>
                        </div>
                        <div class='flex justify-center items-center'>
                            <textarea @input="setDescription" v-model='description' cols="30" rows="3" class="outline-none input resize-none" placeholder="علائم بیماری را کامل بنویسید"></textarea>
                        </div>
                    </div>

                </div>

                <!-- error -->
                <div class="flex mt-[10px] gap-1 text-[#AC0202]" v-if="stageTwoError">
                    <i fill="currentcolor">
                        <svg width="10" height="10" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.1235 0C4.53531 0 0 4.48 0 10C0 15.52 4.53531 20 10.1235 20C15.7116 20 20.2469 15.52 20.2469 10C20.2469 4.48 15.7116 0 10.1235 0ZM11.1358 15H9.11111V9H11.1358V15ZM11.1358 7H9.11111V5H11.1358V7Z"
                            fill="currentcolor" />
                        </svg>
                    </i>
                    <span class="text-[12px]">فیلد های خالی باید پر شوند</span>
                </div>
            </div>

            <!-- stage 3 -->
            <div v-if="stage == 3" class="max-w-[400px] w-full flex flex-col gap-2 p-[20px]">

                <div class="relative bg-[#f6f6f6] rounded-md mx-auto flex flex-col justify-center items-center w-[200px] h-[200px]">
                    <i class="absolute -top-2 -right-2">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 25.6668C16.3074 25.6668 18.5631 24.9826 20.4816 23.7006C22.4002 22.4187 23.8956 20.5966 24.7786 18.4648C25.6616 16.333 25.8927 13.9872 25.4425 11.7241C24.9923 9.461 23.8812 7.3822 22.2496 5.75059C20.618 4.11898 18.5392 3.00783 16.276 2.55767C14.0129 2.10751 11.6672 2.33855 9.53535 3.22157C7.40355 4.1046 5.58147 5.59994 4.29952 7.51852C3.01757 9.43709 2.33333 11.6927 2.33333 14.0002C2.33333 17.0944 3.56249 20.0618 5.75042 22.2497C7.93834 24.4377 10.9058 25.6668 14 25.6668ZM19.3573 11.0368C19.4279 10.9461 19.4799 10.8424 19.5104 10.7316C19.5408 10.6208 19.5492 10.5051 19.5349 10.3911C19.5207 10.2771 19.4841 10.167 19.4273 10.0671C19.3705 9.9672 19.2946 9.87947 19.2039 9.80892C19.1132 9.73836 19.0095 9.68637 18.8987 9.65589C18.7879 9.62542 18.6722 9.61707 18.5582 9.63132C18.4442 9.64556 18.3341 9.68213 18.2342 9.73892C18.1343 9.79572 18.0465 9.87163 17.976 9.96233L13.3 15.973C13.2754 16.0047 13.2445 16.0309 13.2092 16.0501C13.174 16.0693 13.1352 16.081 13.0952 16.0845C13.0553 16.088 13.015 16.0832 12.977 16.0705C12.9389 16.0577 12.9039 16.0372 12.8742 16.0103L9.91666 13.3503C9.74214 13.2103 9.52061 13.1425 9.2976 13.1607C9.0746 13.179 8.86707 13.282 8.71767 13.4486C8.56828 13.6152 8.48838 13.8326 8.49439 14.0563C8.5004 14.28 8.59187 14.4929 8.74999 14.6512L11.7075 17.3123C11.9159 17.5 12.1608 17.6426 12.4268 17.7315C12.6928 17.8203 12.9742 17.8534 13.2536 17.8286C13.5329 17.8039 13.8042 17.7219 14.0504 17.5877C14.2967 17.4535 14.5126 17.27 14.6848 17.0487L19.3573 11.0368Z" fill="black"/>
                        </svg>
                    </i>
                    <div class='flex flex-col justify-center items-center text-[#49b779] font-semibold'>
                        <i>
                            <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M51.4687 25.4168C51.4687 25.9224 51.6696 26.4073 52.0271 26.7647C52.3846 27.1222 52.8694 27.3231 53.375 27.3231C53.8806 27.3231 54.3654 27.1222 54.7229 26.7647C55.0804 26.4073 55.2812 25.9224 55.2812 25.4168H51.4687ZM22.875 57.8231C23.3806 57.8231 23.8654 57.6222 24.2229 57.2648C24.5804 56.9073 24.7812 56.4224 24.7812 55.9168C24.7812 55.4113 24.5804 54.9264 24.2229 54.5689C23.8654 54.2114 23.3806 54.0106 22.875 54.0106V57.8231ZM30.5 55.9168L28.6675 55.3932C28.5742 55.72 28.57 56.0658 28.6553 56.3948C28.7406 56.7237 28.9123 57.0239 29.1526 57.2642C29.3929 57.5045 29.6931 57.6762 30.0221 57.7615C30.351 57.8468 30.6968 57.8426 31.0236 57.7494L30.5 55.9168ZM22.2396 5.0835C22.2396 4.57793 22.0387 4.09306 21.6813 3.73557C21.3238 3.37808 20.8389 3.17725 20.3333 3.17725C19.8278 3.17725 19.3429 3.37808 18.9854 3.73557C18.6279 4.09306 18.4271 4.57793 18.4271 5.0835H22.2396ZM18.4271 12.7085C18.4271 13.2141 18.6279 13.6989 18.9854 14.0564C19.3429 14.4139 19.8278 14.6147 20.3333 14.6147C20.8389 14.6147 21.3238 14.4139 21.6813 14.0564C22.0387 13.6989 22.2396 13.2141 22.2396 12.7085H18.4271ZM42.5729 5.0835C42.5729 4.57793 42.3721 4.09306 42.0146 3.73557C41.6571 3.37808 41.1722 3.17725 40.6667 3.17725C40.1611 3.17725 39.6762 3.37808 39.3187 3.73557C38.9613 4.09306 38.7604 4.57793 38.7604 5.0835H42.5729ZM38.7604 12.7085C38.7604 13.2141 38.9613 13.6989 39.3187 14.0564C39.6762 14.4139 40.1611 14.6147 40.6667 14.6147C41.1722 14.6147 41.6571 14.4139 42.0146 14.0564C42.3721 13.6989 42.5729 13.2141 42.5729 12.7085H38.7604ZM30.5 22.7201L29.1529 24.0672C29.3299 24.2443 29.5401 24.3849 29.7715 24.4807C30.0029 24.5766 30.2508 24.626 30.5013 24.626C30.7517 24.626 30.9997 24.5766 31.231 24.4807C31.4624 24.3849 31.6726 24.2443 31.8496 24.0672L30.5 22.7201ZM17.7917 10.8022H43.2083V6.98975H17.7917V10.8022ZM9.53125 45.7502V19.0627H5.71875V45.7502H9.53125ZM51.4687 19.0627V25.4168H55.2812V19.0627H51.4687ZM22.875 54.0106H17.7917V57.8231H22.875V54.0106ZM5.71875 45.7502C5.71875 48.9521 6.99071 52.0229 9.25483 54.287C11.5189 56.5511 14.5897 57.8231 17.7917 57.8231V54.0106C15.6009 54.0106 13.4998 53.1403 11.9507 51.5912C10.4015 50.042 9.53125 47.941 9.53125 45.7502H5.71875ZM43.2083 10.8022C45.3991 10.8022 47.5002 11.6725 49.0493 13.2217C50.5985 14.7708 51.4687 16.8719 51.4687 19.0627H55.2812C55.2812 15.8607 54.0093 12.7899 51.7452 10.5258C49.4811 8.26171 46.4103 6.98975 43.2083 6.98975V10.8022ZM17.7917 6.98975C14.5897 6.98975 11.5189 8.26171 9.25483 10.5258C6.99071 12.7899 5.71875 15.8607 5.71875 19.0627H9.53125C9.53125 16.8719 10.4015 14.7708 11.9507 13.2217C13.4998 11.6725 15.6009 10.8022 17.7917 10.8022V6.98975ZM50.78 38.9563L38.0335 51.7027L40.7302 54.3995L53.4767 41.653L50.78 38.9563ZM34.7141 48.3808L47.4605 35.6343L44.7638 32.9402L32.0174 45.6866L34.7141 48.3808ZM37.7641 51.8654L29.984 54.0817L31.0287 57.7494L38.8087 55.5305L37.7641 51.8654ZM32.3402 56.4404L34.559 48.6604L30.8812 47.6157L28.6624 55.3958L32.3402 56.4404ZM32.025 45.6866C31.4892 46.2228 31.099 46.8867 30.8914 47.6157L34.5565 48.6604C34.586 48.5548 34.642 48.4586 34.7192 48.3808L32.025 45.6866ZM38.0411 51.7027C37.964 51.7795 37.8687 51.8355 37.7641 51.8654L38.8087 55.5305C39.5377 55.3229 40.2017 54.9327 40.7378 54.3969L38.0411 51.7027ZM50.7876 35.6369C51.2274 36.0772 51.4745 36.6742 51.4745 37.2966C51.4745 37.919 51.2274 38.5159 50.7876 38.9563L53.4843 41.653C54.6397 40.4976 55.2887 38.9305 55.2887 37.2966C55.2887 35.6626 54.6397 34.0956 53.4843 32.9402L50.7876 35.6369ZM53.4767 32.9402C52.3213 31.7848 50.7542 31.1357 49.1202 31.1357C47.4863 31.1357 45.9192 31.7848 44.7638 32.9402L47.4605 35.6343C47.9009 35.1945 48.4978 34.9499 49.1202 34.9499C49.7427 34.9499 50.3396 35.197 50.78 35.6369L53.4767 32.9402ZM18.4271 5.0835V12.7085H22.2396V5.0835H18.4271ZM38.7604 5.0835V12.7085H42.5729V5.0835H38.7604ZM31.8471 24.0697L32.5206 23.3937L29.8265 20.6995L29.1529 21.373L31.8471 24.0697ZM28.4768 23.3962L29.1504 24.0697L31.8471 21.373L31.1735 20.6995L28.4768 23.3962ZM21.7312 30.1342L26.4486 34.8515L29.1529 32.1522L24.433 27.44L21.7312 30.1342ZM34.5362 34.8515L39.2687 30.1342L36.5644 27.44L31.8471 32.1522L34.5362 34.8515ZM36.5695 23.3937C36.835 23.6592 37.0456 23.9744 37.1893 24.3213C37.333 24.6682 37.407 25.0401 37.407 25.4156C37.407 25.7911 37.333 26.1629 37.1893 26.5098C37.0456 26.8567 36.835 27.1719 36.5695 27.4375L39.2687 30.1342C40.5197 28.883 41.2225 27.1861 41.2225 25.4168C41.2225 23.6475 40.5197 21.9507 39.2687 20.6995L36.5695 23.3937ZM39.2687 20.6995C38.0176 19.4485 36.3207 18.7457 34.5514 18.7457C32.7821 18.7457 31.0853 19.4485 29.8341 20.6995L32.5308 23.3962C32.7963 23.1307 33.1115 22.9201 33.4584 22.7764C33.8054 22.6327 34.1772 22.5587 34.5527 22.5587C34.9282 22.5587 35.3 22.6327 35.6469 22.7764C35.9938 22.9201 36.3091 23.1307 36.5746 23.3962L39.2687 20.6995ZM24.433 23.3962C24.6986 23.1307 25.0138 22.9201 25.3607 22.7764C25.7076 22.6327 26.0794 22.5587 26.4549 22.5587C26.8304 22.5587 27.2023 22.6327 27.5492 22.7764C27.8961 22.9201 28.2113 23.1307 28.4768 23.3962L31.1735 20.6995C29.9224 19.4485 28.2255 18.7457 26.4562 18.7457C24.6869 18.7457 22.9901 19.4485 21.7389 20.6995L24.433 23.3962ZM26.4664 34.854C26.9974 35.3851 27.6278 35.8063 28.3217 36.0937C29.0155 36.3811 29.7592 36.529 30.5102 36.529C31.2612 36.529 32.0048 36.3811 32.6987 36.0937C33.3925 35.8063 34.0229 35.3851 34.554 34.854L31.8471 32.1522C31.6701 32.3294 31.4599 32.4699 31.2285 32.5658C30.9971 32.6617 30.7492 32.711 30.4987 32.711C30.2483 32.711 30.0003 32.6617 29.769 32.5658C29.5376 32.4699 29.3274 32.3294 29.1504 32.1522L26.4664 34.854ZM21.7312 20.6995C20.4803 21.9507 19.7775 23.6475 19.7775 25.4168C19.7775 27.1861 20.4803 28.883 21.7312 30.1342L24.433 27.44C24.1675 27.1745 23.9569 26.8567 23.8132 26.5098C23.6695 26.1629 23.5955 25.7911 23.5955 25.4156C23.5955 25.0401 23.6695 24.6682 23.8132 24.3213C23.9569 23.9744 24.1675 23.6617 24.433 23.3962L21.7312 20.6995Z" fill="#81E7AD"/>
                            </svg>
                        </i>
                        <span>نسخه درمان</span>
                        <span>گیاه زاموفیلیا فعال شد</span>
                    </div>
                </div>

                <div class="flex flex-col gap-[10px] text-[12px] justify-center items-center">
                    <span class='font-semibold'>اطلاعات دریافتی با دقت<span class='text-[#49b779]'> 80٪</span>راه درمان را ارائه می دهد</span>
                    <!-- <span class="text-[10px]">برای دریافت نسخه درمان  ۱۰۰٪ میتوانیداطلاعات گیاه خود راتکمیل کنید</span> -->
                </div>

                <div v-if="compeleteInfo" class="shadow-[0_0_5px_0_#c9c9c9] p-[10px] rounded-md flex flex-col gap-[10px] bg-white">

                    <!-- header -->
                    <div class='flex items-center gap-[5px] text-[12px]'>
                        <i>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.36083 2.72564C8.5032 2.41015 8.73359 2.14245 9.02435 1.95466C9.3151 1.76688 9.65387 1.66699 10 1.66699C10.3461 1.66699 10.6849 1.76688 10.9757 1.95466C11.2664 2.14245 11.4968 2.41015 11.6392 2.72564L12.7983 5.16647C12.9247 5.43964 13.1164 5.67749 13.3565 5.85901C13.5966 6.04054 13.8777 6.16016 14.175 6.20731L16.7667 6.59897C17.11 6.66291 17.4294 6.81919 17.6906 7.05103C17.9517 7.28287 18.1448 7.58149 18.249 7.91482C18.3532 8.24814 18.3646 8.60355 18.282 8.94286C18.1993 9.28217 18.0258 9.59255 17.78 9.84064L15.905 11.7415C15.6913 11.9608 15.5323 12.2275 15.4409 12.5199C15.3496 12.8122 15.3284 13.1219 15.3792 13.424L15.8217 16.1073C15.8894 16.4476 15.8599 16.8 15.7363 17.1242C15.6128 17.4484 15.4003 17.7312 15.1233 17.94C14.8463 18.1489 14.516 18.2754 14.1703 18.305C13.8246 18.3346 13.4776 18.2661 13.1692 18.1073L10.8517 16.8406C10.591 16.6974 10.2983 16.6223 10.0008 16.6223C9.70336 16.6223 9.4107 16.6974 9.15 16.8406L6.83333 18.1106C6.52486 18.2694 6.17785 18.3379 5.83219 18.3083C5.48652 18.2787 5.15621 18.1522 4.8792 17.9434C4.60219 17.7345 4.38972 17.4517 4.26618 17.1275C4.14265 16.8033 4.11307 16.4509 4.18083 16.1106L4.62333 13.4273C4.6741 13.1253 4.65294 12.8155 4.56158 12.5232C4.47022 12.2309 4.31122 11.9642 4.0975 11.7448L2.22083 9.84064C1.97505 9.59255 1.80151 9.28217 1.71888 8.94286C1.63624 8.60355 1.64764 8.24814 1.75183 7.91482C1.85603 7.58149 2.04908 7.28287 2.31026 7.05103C2.57143 6.81919 2.89084 6.66291 3.23417 6.59897L5.82583 6.20731C6.12296 6.16003 6.40389 6.04035 6.64383 5.85883C6.88377 5.67732 7.07535 5.43954 7.20167 5.16647L8.36083 2.72564Z" fill="#49B779"/>
                            </svg>
                        </i>
                        <span>تکمیل اطلاعات جهت دریافت نسخه درمان 100٪</span>
                    </div>

                    <!-- water -->
                    <div class='flex flex-col gap-[5px] shadow-[0_0_5px_0_#c9c9c9] p-[10px] rounded-md bg-white'>
                        <div class="flex items-center gap-[5px]">
                            <i>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABiVBMVEUAAACZzMxbvIdIt3hh
                                wY1Ar3BLtnpRuX5Nt3xOuHxLt3tQuX1iv45Qt3hNt3tYvYRIt3hPuH1RuYBVuoFTvoKq/6pQuH5d
                                uYtVuoBNuHxQtXplwo5It3hUt4BVvIJTuYBTuYBSuoFMs3xNuHtPt3xNt3pNtXhKt3pJtnai6LlP
                                uHxQuX5XvIRZvIJRuX5Zv4BNtXpPt3tQuX1PunxPun5Pt35Qu31OtHlMuH1Mt3xRuH1MtnpVu4Fl
                                wIxPt3xQt4BMtXpKuHpNuHxMuHtNt3tNuHtMt3tMuHtNt3tPt35OuX1QuH5eu4dJtnlhvopMtXxV
                                uoN4w5Z4w6Vov4tMt3pPuX5Qt3xIr3hRuIBKtnlNuXxcuIhLt3tNuHxTuYFRuX5VuoJVuIGZzLJc
                                vohLtnpNtntixIlMtnxOt3xZt4ROuX5lv4pMtntSun5Kt3xMt3q//79Qt35luopMt3xSuoBUuYJf
                                uoZhvYhfuopXuoNOuXxduYBQtnxTuoBTun9TuH9SuYBNuXT///9gDsDXAAAAgnRSTlMABTVAHRCC
                                2pyav8A0IM5RIL5uwysDwjdg0DA/n0CvYs24QKiSYGBgUAvP+Go51hRgn2ZnZ2dmj5e/fpDDXdEg
                                gM+/v7+/v8+mx3ymMcA/gE4REUDAjnkg3N9CL6aeX8E/Swov848ayL08wDCofXGnBMswp4V8Ozo7
                                Z6QWkJ+fn5ghKlUH9wAAAAFiS0dEgouz/0QAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfn
                                BxYOLiVKWqWoAAAA3ElEQVQY02NgIAswMjGzoAmxsrFzcHJx8yCL8fLxgygBQSEkQWERCC0qJs7A
                                ICEpBWJLy8BkZeUY5BUUlUBMZRVVNVU1dVUNTQYtBm0dXT19BgYDQyNjIxMjUzNzCwZLBitrG1s7
                                ewYHRydnF1cXN1d3DwZPoEYvbx9fP/+AwKBAEAj2EAgBGRcaFh4RGQW1JjomNg7MiE9gSEyCCian
                                pEIYaen2cOcmZ8BYmVlwwewcODM3D64yHy5YUMgKZRUVI3xeUlpWXgGEZZVVCMHqmtq62tr62vqG
                                RhyBDQAbbyjoslNLlwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNy0yMlQxMjo0NjozNyswMjow
                                MI3zU0MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDctMjJUMTI6NDY6MzcrMDI6MDD8ruv/AAAA
                                AElFTkSuQmCC" />
                                </svg>
                            </i>
                            <span>مقدارآبیاری</span>
                        </div>
                        <div class="flex flex-wrap justify-center gap-[5px] text-[14px]">
                            <button @click="setWaterGlass(1)" ref="halfGlass" class='flex flex-col justify-center items-center p-2 bg-[#f6f6f6] rounded-md border'>
                                <i>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="32px" viewBox="0 0 24 32" enable-background="new 0 0 24 32" xml:space="preserve">  <image id="image0" width="24" height="32" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAMAAAA/gEgKAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABvFBMVEUAAABJt3lJt3lIt3hJ
                                t3lJtnlJuHlJtnlJt3hJuHpJt3pItnhAtnZItnlJt3pItnlJuXgA//////9DvIZJtnpItXlItXhA
                                v4AAAABIs3hItXhHtXlJtnkAgIBKuHtJtnhIt3tJtXhKuHpJtnhKtXVJtnlHtnhIt3hIt3lJt3mA
                                gIBKuXhLtHZJt3kA/wAAgABJtnhJtnlAv4BVqlVIt3pMu3cAgEAzzGZJtpIzmZlJt3pItXdJu31K
                                tXZJtnlJtnhKt3lKuHtJuHlJt3lJtnlJt3lIt3lJtnlJtnhJtnhJuHpHtXhJuXhItHZItXhKuXlI
                                t3hKtXdIt3lKtXZFtXtGsHtJunlIt3dJtnlIt3hJtnlLtHhKt3lJt3hAgEBIuHlIt3xItnlJt3lK
                                t3lJt3lMsmZKtnlKuHlJt3lIt3lKtXtJtnhKt3lJtnhKtnpItXhGuXtJuHlKtXtEu4BJuHlHuHlK
                                t3lHuHlIt3hIt3lIt3hIt3gqqoBIt3lJtndHs3dIt3hIunlIt3lIt3hJuHhJtnlJtnxItHhKtXZM
                                s3tJt3pHtnlIt3xJtnlJt3lIt4BKtnlLuXpJt3n///+5BErAAAAAknRSTlMA3+P+v+7hz/7a7aAc
                                +82LQgEBE65uYAgBQI5ddAJPezyQb1sYoIRA+9UCoynnAQLEywQDpx4EBQcFx5gxNIGCh4mJi4+S
                                kpOQV7poV1KAN5stTkU0HT94VCCoIsnjBKknzOzC+QrM1/KiH3ec+MGROv5PHrNdlD1gboCVBkp+
                                L4png4aEcCNqYRuugUDk0iDhLI6cQIgAAAABYktHRBJ7vGwAAAAACXBIWXMAAAsTAAALEwEAmpwY
                                AAAAB3RJTUUH5wcWDjUcvGnmOgAAAV5JREFUKM910gVTw0AQBeBHi3vR4u5Q3F2Lu7u7u7s77xdz
                                SZkhV8LOZGbnfZdL9hLgv3KgbhlAo6NOOREGZ719HAkXVz1wc4cHPXXAyxs+9AVMfnLuzwAEMggI
                                1oRmcYUwFGEMByLsdopkFKIZY1ulrVjGIZ4Jf3IkMglITrGPU5HGdHEmGVJqMWWakEXRZTNHvsGc
                                C4OyOI/5sFjMyoMyCwoKi4pFxxIBpSwrr6isqq6prauvb7BarY1N8WwW0MLWNvnI2zvYKaCVUV0y
                                dPcoQ6OXpX0y9A9wUMAQhyHDiI8yH3I4ijEJxic4qbx3hgOmtPm0+H5FCszMznloYR4Li+qkS1xe
                                0cKqZW1dhQ1udm1pYHuHuyqEcw+Vv/k+DmhV4ZBHwLHxJz85xRnPVbjgpTLO1fXNze3dvWgf+KjC
                                E5/lc3/hq60xvrVL9c4PG3za/9GuqTYYSrKrLxF+A2nxscWGqGsaAAAAJXRFWHRkYXRlOmNyZWF0
                                ZQAyMDIzLTA3LTIyVDEyOjUzOjI4KzAyOjAwkLY3sAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0w
                                Ny0yMlQxMjo1MzoyOCswMjowMOHrjwwAAAAASUVORK5CYII=" />
                                </svg>
                                </i>
                                <span>نصف لیوان</span>
                            </button>
                            <button @click="setWaterGlass(2)" ref="oneGlass" class='flex flex-col justify-center items-center p-2 bg-[#f6f6f6] rounded-md border'>
                                <i>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="32px" viewBox="0 0 24 32" enable-background="new 0 0 24 32" xml:space="preserve">  <image id="image0" width="24" height="32" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAMAAAA/gEgKAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABqlBMVEUAAABJt3lJt3lIt3hJ
                                t3lJtnlJuHlJtnlJt3hJuHpJt3pItnhAtnZItnlJt3pItnlJuXhJrXZIr3hDvIZJtnpItXlItXhJ
                                tnlItHZIs3hItXhHtXlJtnlHuHZKtXdKuHtJtnhIt3tJtXhIt3hIt3hKuHpJtnhKtXVJtnlVqoBJ
                                tnlGuXlHtnhIt3lJt3lKt3k5xnFKuXhLtHZJt3lIt3hJtnhJtnlAv4BItXhKtnpIt3pKtXtItnlJ
                                tnlJt3pItXdKtXtIt3pIt3pJuHpHtXhJuXhItXhKuXlIt3hKtXdIt3lKtXZFtXtGsHtJunlIt3dJ
                                tnlJtnlLtHhKt3lJt3hAgEBIuHlIt3xItnlJt3lJtpJKt3lJt3lMsmZKtnlKuHlJt3lIt3lJtnhK
                                t3kA/wBJtnhItXhGuXtJuHlKtXtEu4BJuHlHuHlJtnhKt3lHuHlJtnlIt3hIt3lIt3hIt3gqqoBI
                                t3lJtndHs3dIt3hIunlIt3lIt3hJuHhJtnlJtnxItHhKtXZMs3tJt3pHtnlIt3xJtnlJt3lIt4BK
                                tnmAgIBLuXpJt3n////l3XFbAAAAjHRSTlMA3+P+v+7hz/7a7aAc+82LQhwgE65uYD9SQI5ddDZW
                                T3s8kCBAb1sYoAb1KIT71f0JoynnxcTLBKLBpx+StceYNHWVumhXgDebLU5FNB0/eFSoIsnjBKkn
                                zOwHwvkKzNfyonecAfiROv5PHrNdgpQ9k2BugJUGSn4vimeDhoRwI2phG66BQOTSIOECLK8z13AA
                                AAABYktHRI0bDOLVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wcWDjYV7pgNXQAAAUxJ
                                REFUKM910mdTAjEQBuCliCgqYkVFRUGxN1REVGxg77333nvD3vX90eYOZ7xkzvfTzj4zmWyyRP9F
                                A9VoCTq9SiJAWoPaOXpQpFENoqLJhBgViI0jM+LJksDFQolIomSkpIpXsqYhnTJgyxQhKxt2ykGu
                                QwRnHvLJhYLCIgGKS+AkKi0Tpy+vqEQVexM3VfNgoBqwK9fCU8eDl7RuBvXwNfDQSGhi4EdzCw+t
                                LrQxaEfAykOwA50MArB38dDdAxuDXvj7eOgfwCADB4aIh2GzNB95MEKjHIyNY0J6e7eGJpX9KfZ/
                                0xLMzM6ZlDBPC4vyby3Bt6yEldU1rwzr2OjaVMDWNnZksGGX9v76+3SAQxmOcEx0ovvtn57ROS5k
                                uMSVNM71TSh0e3fPygc8yvCEZ353XvAaLnRvQS7v+AjDp7gMxq8wOJxCvlnzB6Lc740z/llOAAAA
                                JXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA3LTIyVDEyOjU0OjIxKzAyOjAw5/JpGgAAACV0RVh0ZGF0
                                ZTptb2RpZnkAMjAyMy0wNy0yMlQxMjo1NDoyMSswMjowMJav0aYAAAAASUVORK5CYII=" />
                                </svg>

                                </i>
                                <span>یک لیوان</span>
                            </button>
                            <button @click="setWaterGlass(4)" ref="twoGlass" class='flex flex-col justify-center items-center p-2 bg-[#f6f6f6] rounded-md border'>
                                <i>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="32px" viewBox="0 0 50 32" enable-background="new 0 0 50 32" xml:space="preserve">  <image id="image0" width="50" height="32" x="0" y="0"
                                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAgCAMAAABn/9sTAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                    AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABqlBMVEUAAABJt3lJt3lIt3hJ
                                    t3lJtnlJuHlJtnlJt3hJuHpJt3pItnhAtnZItnlJt3pItnlJuXhJrXZIr3hDvIZJtnpItXlItXhJ
                                    tnlItHZIs3hItXhHtXlJtnlHuHZKtXdKuHtJtnhIt3tJtXhIt3hIt3hKuHpJtnhKtXVJtnlVqoBJ
                                    tnlGuXlHtnhIt3lJt3lKt3k5xnFKuXhLtHZJt3lIt3hJtnhJtnlAv4BItXhKtnpIt3pKtXtItnlJ
                                    tnlJt3pItXdKtXtIt3pIt3pJuHpHtXhJuXhItXhKuXlIt3hKtXdIt3lKtXZFtXtGsHtJunlIt3dJ
                                    tnlJtnlLtHhKt3lJt3hAgEBIuHlIt3xItnlJt3lJtpJKt3lJt3lMsmZKtnlKuHlJt3lIt3lJtnhK
                                    t3kA/wBJtnhItXhGuXtJuHlKtXtEu4BJuHlHuHlJtnhKt3lHuHlJtnlIt3hIt3lIt3hIt3gqqoBI
                                    t3lJtndHs3dIt3hIunlIt3lIt3hJuHhJtnlJtnxItHhKtXZMs3tJt3pHtnlIt3xJtnlJt3lIt4BK
                                    tnmAgIBLuXpJt3n////l3XFbAAAAjHRSTlMA3+P+v+7hz/7a7aAc+82LQhwgE65uYD9SQI5ddDZW
                                    T3s8kCBAb1sYoAb1KIT71f0JoynnxcTLBKLBpx+StceYNHWVumhXgDebLU5FNB0/eFSoIsnjBKkn
                                    zOwHwvkKzNfyonecAfiROv5PHrNdgpQ9k2BugJUGSn4vimeDhoRwI2phG66BQOTSIOECLK8z13AA
                                    AAABYktHRI0bDOLVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wcWDjInQiOZ2QAAAXdJ
                                    REFUOMuV1GdTk0EUBeCTBELohC4EDCTSpElECAGCShEQUKpKr4qASG+hiqJyfjRBdMy+8+7NcD7t
                                    3Gd2dmfv7gL3j4WmsQpCW4xJYgm9WO1ma8eEp2glzmEG8QnQSyKTTCA5BXpJZRqc6UqcyGAm9JLF
                                    7BzjoeQ+YB70kk9XgREKH9INvRSx2GME7yOWQC+lLCuvMMDjSnohSFW1sc81tU9YB0EsPjxVwY56
                                    /rlLOnnGhkYV/LD6IEkTA80qtICtkCTItucqvCjlS0jSzo5cFTq7+AqSdNDdrUJPL12Q5DWDfSr0
                                    D/ANJPHwLVQYTL3tlyANHMKwAiOjHIMoPgveRdbfh1/eB4gyPjGZGAlTmJ65e05amWVgLhLmFxb9
                                    kGWJH7s/RcDyZ65AFhdXsfa//gXr/ApZNrgJbNn+1rd3sMs9yLLPg9smHB6FQscnp+HhGc8hywW/
                                    qf/OJb8jith+dCq54k9EkV80xPEbUcTjNeT630ZM5QaP4N8o/1bdUQAAACV0RVh0ZGF0ZTpjcmVh
                                    dGUAMjAyMy0wNy0yMlQxMjo1MDozOSswMjowMBFch5kAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMt
                                    MDctMjJUMTI6NTA6MzkrMDI6MDBgAT8lAAAAAElFTkSuQmCC" />
                                    </svg>
                                </i>
                                <span>دو لیوان لیوان</span>
                            </button>
                        </div>
                    </div>

                    <!-- vase -->
                    <div class='flex flex-col gap-[5px] shadow-[0_0_5px_0_#c9c9c9] p-[10px] rounded-md bg-white'>
                        <div class="flex items-center gap-[5px]">
                            <i>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83333 9.93317C5.91903 8.6316 6.39091 7.38516 7.18866 6.35317C7.87856 5.38597 8.67216 4.49713 9.55533 3.7025L8.88333 2.96317C7.94393 3.80814 7.1 4.75357 6.36666 5.7825C5.45159 6.98137 4.91743 8.42731 4.83333 9.93317H5.83333ZM10.444 3.70317C11.3271 4.49757 12.1208 5.38619 12.8107 6.35317C13.6087 7.38508 14.0808 8.63153 14.1667 9.93317H15.1667C15.0826 8.42731 14.5484 6.98137 13.6333 5.7825C12.9 4.75357 12.0561 3.80814 11.1167 2.96317L10.444 3.70317ZM14.1667 9.93317C14.1755 10.4859 14.0743 11.0349 13.8688 11.5482C13.6634 12.0614 13.3579 12.5286 12.9701 12.9226C12.5823 13.3166 12.12 13.6295 11.6101 13.8431C11.1001 14.0566 10.5528 14.1666 10 14.1665V15.1665C10.6841 15.1666 11.3615 15.0307 11.9927 14.7669C12.624 14.5031 13.1965 14.1166 13.6772 13.6297C14.1578 13.1429 14.537 12.5654 14.7927 11.9308C15.0484 11.2963 15.1755 10.6173 15.1667 9.93317H14.1667ZM10 14.1665C9.44717 14.1666 8.89985 14.0566 8.38993 13.8431C7.88002 13.6295 7.41769 13.3166 7.0299 12.9226C6.6421 12.5286 6.33659 12.0614 6.13116 11.5482C5.92573 11.0349 5.82449 10.4859 5.83333 9.93317H4.83333C4.8245 10.6173 4.95163 11.2963 5.20732 11.9308C5.46301 12.5654 5.84219 13.1429 6.32284 13.6297C6.80349 14.1166 7.37605 14.5031 8.00728 14.7669C8.63851 15.0307 9.31586 15.1666 10 15.1665V14.1665ZM9.556 3.69983C9.67634 3.58706 9.83508 3.52431 10 3.52431C10.1649 3.52431 10.3237 3.58706 10.444 3.69983L11.1167 2.96317C10.8122 2.68291 10.4135 2.52734 9.99966 2.52734C9.58584 2.52734 9.18781 2.68291 8.88333 2.96317L9.556 3.69983Z" fill="#49B779"/>
                                <path d="M8.12933 4.40873L8.49466 4.75006L8.76133 4.46206L8.54399 4.13339L8.12933 4.40873ZM5.78933 11.9754L5.84399 12.4727L6.53599 12.3967L6.24333 11.7654L5.78933 11.9754ZM1.83333 7.79273C1.89788 6.69286 2.27409 5.63407 2.91799 4.74006C3.48677 3.89252 4.14695 3.11005 4.88666 2.40673L4.19266 1.68673C3.39873 2.44242 2.69046 3.28327 2.08066 4.19406C1.32971 5.24986 0.896861 6.49866 0.833326 7.79273H1.83333ZM5.33333 11.5001C4.85914 11.4895 4.39177 11.3849 3.95834 11.1922C3.52492 10.9996 3.13406 10.7228 2.80846 10.3779C2.48286 10.033 2.22899 9.62691 2.0616 9.18313C1.8942 8.73935 1.81661 8.26674 1.83333 7.79273H0.833326C0.816579 8.39809 0.920019 9.00076 1.13766 9.5659C1.35531 10.131 1.68284 10.6474 2.10131 11.0852C2.51978 11.5229 3.02089 11.8734 3.57565 12.1162C4.13041 12.3591 4.72782 12.4895 5.33333 12.5001V11.5001ZM5.77999 2.40473C6.50387 3.09364 7.152 3.85798 7.71333 4.68473L8.54733 4.13273C7.94553 3.24571 7.25045 2.4257 6.47399 1.68673L5.77999 2.40473ZM5.83333 9.93339C5.87372 8.95205 6.16499 7.99745 6.67933 7.16073C7.18974 6.29004 7.79887 5.48114 8.49466 4.75006L7.76666 4.06739C7.01732 4.85587 6.36164 5.72833 5.81266 6.66739C5.21141 7.65401 4.87416 8.77873 4.83333 9.93339H5.83333ZM5.73466 11.4787C5.60181 11.4931 5.46828 11.5002 5.33466 11.5001V12.5001C5.50503 12.5003 5.67528 12.4911 5.84466 12.4727L5.73466 11.4787ZM6.24333 11.7654C5.97603 11.1915 5.83571 10.5665 5.83333 9.93339H4.83333C4.83565 10.7118 5.00693 11.4804 5.33533 12.1861L6.24333 11.7654ZM4.88666 2.40473C5.00525 2.2865 5.16587 2.22012 5.33333 2.22012C5.50078 2.22012 5.6614 2.2865 5.77999 2.40473L6.47399 1.68673C6.169 1.3889 5.75961 1.22217 5.33333 1.22217C4.90704 1.22217 4.49765 1.3889 4.19266 1.68673L4.88666 2.40473Z" fill="#49B779"/>
                                <path d="M13.1547 10.7753C13.1815 10.6466 13.1565 10.5126 13.0853 10.4022C13.014 10.2918 12.9021 10.2139 12.7738 10.1853C12.6456 10.1567 12.5112 10.1798 12.3998 10.2496C12.2885 10.3193 12.209 10.4301 12.1787 10.5579L13.1547 10.7753ZM10.572 12.1759C10.4418 12.2011 10.3269 12.2769 10.2525 12.3867C10.1782 12.4965 10.1506 12.6314 10.1757 12.7616C10.2008 12.8918 10.2766 13.0067 10.3864 13.0811C10.4963 13.1554 10.6311 13.1831 10.7613 13.1579L10.572 12.1759ZM12.1787 10.5579C12.0991 10.9555 11.9044 11.3209 11.6187 11.6086C11.333 11.8963 10.969 12.0936 10.572 12.1759L10.7613 13.1579C11.3497 13.0386 11.8901 12.7493 12.3155 12.3257C12.741 11.9022 13.0327 11.3631 13.1547 10.7753L12.1787 10.5579Z" fill="#49B779"/>
                                </svg>
                            </i>
                            <span>زهکشی گلدان</span>
                        </div>
                        <div class="flex flex-wrap justify-center gap-[5px]">
                            <button @click="setDrainage(true)" ref="drain" class='flex flex-col justify-center items-center p-2 bg-[#f6f6f6] rounded-md border'>
                                <i>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="38px" viewBox="0 0 43 38" enable-background="new 0 0 43 38" xml:space="preserve">  <image id="image0" width="43" height="38" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAmCAMAAABqHZIsAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABtlBMVEUAAABIt3lKt3pIt3lJ
                                t3lKuHlIt3lJtnZJt3lJt3hJtnlJuXlJt3lJtnhGuXRAv4BJtnlIt3lV1IBJtnlVVVVJtm1Jt3g5
                                qnFEu3dJt3lIt3lEqndJt3lIt3hEu3dKtXdIt3lOsXZKuHlIt3lMsmZJt3lItXhJuHlIt3hJtnpK
                                uHpDsXpJtnlDrnlEu4hJtnlGuXRKt3lFtXVIs3RJtnlItnlIunpJtnhIt3lIt3hHtnhHtnhKuHhI
                                t3hJuHlJtnhJtnVJuHlIt3dMs3tJt3lJt3lJtnYA/wBJt3lJtn9Jt3lJt3hIt3pJt3lHtnhIt3hJ
                                tnlJuHlJuHhItHZKtnpIt3hGuXtJt3lJtnlLtHgzmWZVqoBJt3mAgIBIt3lIt3xHuHZJt3pIt3lJ
                                uHlJsnhHtHpVqmpIt3tKuXlKuHlJtnhIt3pIt3hKt3hKt3lJt3lJt3pItXlLt3hJt3lGuXlJt3hA
                                n4BIt3lAv4BIs3hJtnlKt3pJuHlJt3lKt3pIt3hJt3lQr4BJtnhAr3BItnhJuHlKtXtJtnlIt3hJ
                                tnlIt3hJt3n29vaq279qw5Hg7ufr8u////9QlBb/AAAAi3RSTlMASsn6+9BOVP7+/VDOggsIidAG
                                +QMH+AkP8PAP+HUeLXINu7wKqrvoQLpvF/ITD/YW1zA5y6dcV7GKfYhkn6ViP8jFG+fpHAHyDvbY
                                LstzarWahE7Bvx3m5CIFDPoC2yc20a16QkEMPHy3k7Sjjru9uG5V9CjpCN4EQHCf799/IL8QkBCg
                                rx9QYM+AAbTt7QAAAAFiS0dEkQ8NvpoAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnBxYQ
                                EhaQwTM7AAABnUlEQVQ4y43T+VcSURQH8FukglqaGZo0pRlGmooLGhZFLqlFe7mLS7hmjeXSBkGQ
                                65eyP7lhTrzz4DB35vvT9875nDP3vTlDRKdO22CWM0XFpKXEDkepWexAmWbLcfYcmaWiEueJqnCh
                                2pQSXXSihmpxyQIlqoNLs5cV5QrR1XqFjVOzDZljXiNqNL2L60SKuwk3iDxuJjbcdDfrq7TcQiu7
                                axvavdnegU7WdqFbdB96WNuL26L70cfaPtwR/S4CrL2H+6IH8YC1/QiKPoBB1g7hoejDI+yljeKR
                                ND1GiL2yJ9Lkw1PGPsNzafLjBWMDeClNr/CasW9QLE1jGGfsBCalacrpmDakFZiZlecw5gztPBZy
                                5kW8jeRnyUW0vBKJrGItx64X+hHeEW3o5X2ODX2AXc3L5keiT6q6BXU7dykvhgzW3YGXDG36fxgr
                                krXiQb7d/SzZ339O0n+FDX9hvtNX4Nv3KP+7ZhND4AcQjVugccCTeXfCgv2JRFJfNGUBJxO/NLkX
                                27ey8MEhcOSJWToc0TGie1bOpidVQP4DmUjE/vPfDcAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMt
                                MDctMjJUMTQ6MTg6MjIrMDI6MDDcGj9WAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA3LTIyVDE0
                                OjE4OjIyKzAyOjAwrUeH6gAAAABJRU5ErkJggg==" />
                                </svg>
                                </i>
                                <span>زهشکی</span>
                            </button>
                            <button @click="setDrainage(false)" ref="non_drain" class='flex flex-col justify-center items-center p-2 bg-[#f6f6f6] rounded-md border'>
                                <i>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="30px" viewBox="0 0 43 30" enable-background="new 0 0 43 30" xml:space="preserve">  <image id="image0" width="43" height="30" x="0" y="0"
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAeCAMAAACCNBfsAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABcVBMVEUAAABIt3lKt3pIt3lJ
                                t3lKuHlIt3lJtnZJt3lJt3hJtnlJuXlJt3lJtnhGuXRAv4BJtnlIt3lV1IBJtnlVVVVJtm1Jt3g5
                                qnFEu3dJt3lIt3lEqndJt3lIt3hEu3dKtXdIt3lOsXZKuHlIt3lMsmZJt3lItXhJuHlIt3hJtnpK
                                uHpDsXpJtnlDrnlEu4hJtnlGuXRKt3lFtXVIs3RJtnlItnlIunpJtnhIt3lIt3hHtnhHtnhKuHhI
                                t3hJuHlJtnhJtnVJuHlIt3dMs3tJt3lJt3lJtnYA/wBJt3lJtn9Jt3lJt3hIt3pJt3lHtnhIt3hJ
                                tnlJuHlJuHhItHZKtnpIt3hGuXtJt3lJtnlLtHgzmWZVqoBJt3mAgIBIt3lIt3xHuHZJt3pIt3lJ
                                uHlJsnhHtHpVqmpIt3tKuXlKuHlJtnhIt3pIt3hKt3hKt3lJt3lJt3pItXlLt3hJt3lGuXlJt3hA
                                n4BIt3lAv4BJt3n///8l9x8/AAAAeXRSTlMASsn6+9BOVP7+/VDOggsIidAG+QMH+AkP8PAP+HUe
                                LXINu7wKqrvoQLpvF/ITD/YW1zA5y6dcV7GKfYhkn6ViP8jFG+fpHAHyDvbYLstzarWahE7Bvx3m
                                5CIFDPoC2yc20a16QkEMPHy3k7Sjjru9uG5V9CjpCN4E/4Sj2QAAAAFiS0dEejjVhWoAAAAJcEhZ
                                cwAACxMAAAsTAQCanBgAAAAHdElNRQfnBxYQEikmpx4GAAABPUlEQVQ4y6XTZ0/CcBgE8FMc4MKJ
                                A+vGPXCggqI4cOLeCxfugVvv21uJNi2xT028V3fJ78XTf1IAKak2WiUtPQNqMu10ZFnFTmarNoe5
                                ebCKM58FQCGLii0pUOJiKcpY/gcKVNCt2kpFqQKqaxQxLtXWfn1mHVBv+RYNgOJpZBPQ7BFiY4un
                                NXFKWzs7xFs72eX96d3sEW0v+7TuY79oBziodT8Dog1wSOvDDIp2hKNaD3FMtOMMaX2Ck6INc0rr
                                0zPio81yTrfmGRGfbEG3fFwU7BKXdcvPFcEGuapba1wX7AYzdGuTW4Ld5o5u7boce6bUyf0D/Y7y
                                0NQe8diwT3gaS86ZGzi/iMUueWWw17/9CDfAbaLcGWzknvZ4Uh4egad4/JnxF+NRXoZNzn2lF/+x
                                5km2b++mNPrxbT4BCIiWWrZiXckAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDctMjJUMTQ6MTg6
                                NDErMDI6MDArnSxMAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA3LTIyVDE0OjE4OjQxKzAyOjAw
                                WsCU8AAAAABJRU5ErkJggg==" />
                                </svg>
                                </i>
                                <span>بدون زهشکی</span>
                            </button>
                        </div>
                    </div>

                    <!-- sickness -->
                    <div class='flex flex-col gap-[5px] shadow-[0_0_5px_0_#c9c9c9] p-[10px] rounded-md bg-white'>
                        <div class="flex items-center gap-[5px]">
                            <i>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.25 3.1875H12.75V2.0625H5.25V3.1875ZM15.1875 5.625V13.5H16.3125V5.625H15.1875ZM12.75 15.9375H5.25V17.0625H12.75V15.9375ZM2.8125 13.5V5.625H1.6875V13.5H2.8125ZM5.25 15.9375C4.60353 15.9375 3.98355 15.6807 3.52643 15.2236C3.06931 14.7665 2.8125 14.1465 2.8125 13.5H1.6875C1.6875 14.4448 2.06283 15.351 2.73093 16.0191C3.39903 16.6872 4.30517 17.0625 5.25 17.0625V15.9375ZM15.1875 13.5C15.1875 14.1465 14.9307 14.7665 14.4736 15.2236C14.0165 15.6807 13.3965 15.9375 12.75 15.9375V17.0625C13.6948 17.0625 14.601 16.6872 15.2691 16.0191C15.9372 15.351 16.3125 14.4448 16.3125 13.5H15.1875ZM12.75 3.1875C13.3965 3.1875 14.0165 3.44431 14.4736 3.90143C14.9307 4.35855 15.1875 4.97853 15.1875 5.625H16.3125C16.3125 4.68017 15.9372 3.77403 15.2691 3.10593C14.601 2.43783 13.6948 2.0625 12.75 2.0625V3.1875ZM5.25 2.0625C4.30517 2.0625 3.39903 2.43783 2.73093 3.10593C2.06283 3.77403 1.6875 4.68017 1.6875 5.625H2.8125C2.8125 4.97853 3.06931 4.35855 3.52643 3.90143C3.98355 3.44431 4.60353 3.1875 5.25 3.1875V2.0625Z" fill="#49B779"/>
                                <path d="M2.25 6.1875C2.10082 6.1875 1.95774 6.24676 1.85225 6.35225C1.74676 6.45774 1.6875 6.60082 1.6875 6.75C1.6875 6.89918 1.74676 7.04226 1.85225 7.14775C1.95774 7.25324 2.10082 7.3125 2.25 7.3125V6.1875ZM15.75 7.3125C15.8992 7.3125 16.0423 7.25324 16.1477 7.14775C16.2532 7.04226 16.3125 6.89918 16.3125 6.75C16.3125 6.60082 16.2532 6.45774 16.1477 6.35225C16.0423 6.24676 15.8992 6.1875 15.75 6.1875V7.3125ZM2.25 7.3125H15.75V6.1875H2.25V7.3125Z" fill="#49B779"/>
                                <path d="M6.5625 1.5C6.5625 1.35082 6.50324 1.20774 6.39775 1.10225C6.29226 0.996763 6.14918 0.9375 6 0.9375C5.85082 0.9375 5.70774 0.996763 5.60225 1.10225C5.49676 1.20774 5.4375 1.35082 5.4375 1.5H6.5625ZM5.4375 3.75C5.4375 3.89918 5.49676 4.04226 5.60225 4.14775C5.70774 4.25324 5.85082 4.3125 6 4.3125C6.14918 4.3125 6.29226 4.25324 6.39775 4.14775C6.50324 4.04226 6.5625 3.89918 6.5625 3.75H5.4375ZM5.4375 1.5V3.75H6.5625V1.5H5.4375Z" fill="#49B779"/>
                                <path d="M12.5625 1.5C12.5625 1.35082 12.5032 1.20774 12.3977 1.10225C12.2923 0.996763 12.1492 0.9375 12 0.9375C11.8508 0.9375 11.7077 0.996763 11.6023 1.10225C11.4968 1.20774 11.4375 1.35082 11.4375 1.5H12.5625ZM11.4375 3.75C11.4375 3.89918 11.4968 4.04226 11.6023 4.14775C11.7077 4.25324 11.8508 4.3125 12 4.3125C12.1492 4.3125 12.2923 4.25324 12.3977 4.14775C12.5032 4.04226 12.5625 3.89918 12.5625 3.75H11.4375ZM11.4375 1.5V3.75H12.5625V1.5H11.4375Z" fill="#49B779"/>
                                <path d="M9.75 11.25C9.75 11.3983 9.70601 11.5433 9.6236 11.6667C9.54119 11.79 9.42406 11.8861 9.28701 11.9429C9.14997 11.9997 8.99917 12.0145 8.85368 11.9856C8.7082 11.9567 8.57456 11.8852 8.46967 11.7803C8.36478 11.6754 8.29335 11.5418 8.26441 11.3963C8.23547 11.2508 8.25032 11.1 8.30709 10.963C8.36386 10.8259 8.45999 10.7088 8.58332 10.6264C8.70666 10.544 8.85166 10.5 9 10.5C9.19891 10.5 9.38968 10.579 9.53033 10.7197C9.67098 10.8603 9.75 11.0511 9.75 11.25Z" fill="#49B779"/>
                                <path d="M12.75 11.25C12.75 11.3983 12.706 11.5433 12.6236 11.6667C12.5412 11.79 12.4241 11.8861 12.287 11.9429C12.15 11.9997 11.9992 12.0145 11.8537 11.9856C11.7082 11.9567 11.5746 11.8852 11.4697 11.7803C11.3648 11.6754 11.2934 11.5418 11.2644 11.3963C11.2355 11.2508 11.2503 11.1 11.3071 10.963C11.3639 10.8259 11.46 10.7088 11.5833 10.6264C11.7067 10.544 11.8517 10.5 12 10.5C12.1989 10.5 12.3897 10.579 12.5303 10.7197C12.671 10.8603 12.75 11.0511 12.75 11.25Z" fill="#49B779"/>
                                <path d="M6.75 11.25C6.75 11.3983 6.70601 11.5433 6.6236 11.6667C6.54119 11.79 6.42406 11.8861 6.28701 11.9429C6.14997 11.9997 5.99917 12.0145 5.85368 11.9856C5.7082 11.9567 5.57456 11.8852 5.46967 11.7803C5.36478 11.6754 5.29335 11.5418 5.26441 11.3963C5.23547 11.2508 5.25032 11.1 5.30709 10.963C5.36386 10.8259 5.45999 10.7088 5.58332 10.6264C5.70666 10.544 5.85166 10.5 6 10.5C6.19891 10.5 6.38968 10.579 6.53033 10.7197C6.67098 10.8603 6.75 11.0511 6.75 11.25Z" fill="#49B779"/>
                                </svg>
                            </i>
                            <span>مدت زمان بیماری</span>
                        </div>
                        
                        <!-- <div ref="slider" class="number__slider-wrapper swiper-container">
                        <span class="number__slider-indicator"></span>
                        <div class="swiper-wrapper number__slider">
                            <div class="number__slider-item swiper-slide" v-for="number in 31">
                                <span>{{number}}</span>
                            </div>
                        </div>
                        </div> -->
                        <div class='flex gap-[10px] justify-center'>
                            <div class="w-1/3 flex flex-col justify-center items-center">
                                <button @click="incrementSickNumber" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
                                    <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m.153 1393.854 92.168 92.299 867.767-867.636 867.636 867.636 92.429-92.299L960.088 433.92z" fill-rule="evenodd"/>
                                    </svg>        
                                </button>
                                <input type="text" id="sickNumber" class="w-full bg-transparent text-center" v-model="sickNumber" disabled/>
                                <button @click="decrementSickNumber" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
                                    <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m.153 526.146 92.168-92.299 867.767 867.636 867.636-867.636 92.429 92.299-960.065 959.935z" fill-rule="evenodd"/>
                                    </svg>        
                                </button>
                            </div>
                            <div class="w-1/3 flex flex-col justify-center items-center">
                                <button @click="incrementSickNumberType" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
                                    <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m.153 1393.854 92.168 92.299 867.767-867.636 867.636 867.636 92.429-92.299L960.088 433.92z" fill-rule="evenodd"/>
                                    </svg>        
                                </button>
                                <input type="text" id="sickNumberType" class="w-full bg-transparent text-center" v-model="sickNumberTypeName" disabled/>
                                <button @click="decrementSickNumberType" class="bg-[#49b779] text-white px-3 rounded w-[60px] justify-center flex">
                                    <svg fill="currentcolor" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m.153 526.146 92.168-92.299 867.767 867.636 867.636-867.636 92.429 92.299-960.065 959.935z" fill-rule="evenodd"/>
                                    </svg>        
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- dusting -->
                    <div class='flex gap-[5px] shadow-[0_0_5px_0_#c9c9c9] p-[10px] rounded-md bg-white'>
                        <div class="flex items-center gap-[5px]">
                            <i>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17px" height="21px" viewBox="0 0 17 21" enable-background="new 0 0 17 21" xml:space="preserve">  <image id="image0" width="17" height="21" x="0" y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAVCAMAAACXIvXeAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA7VBMVEUAAABGuXROuoBCs3tX
                            vYNDtXlGtHtKt3pLtnpOuX5Vu3dMuH1KtXlYu4JTv4RFunyAzaJZsoBJtnlGrnRQunpRuYBHuHZQ
                            vIBKt3pJtnpAr3BZvIVOtnyA1KpQtnyAgIBKuHlJtnlFtXVJtnlIt3hIt3hUvH1RuXxJuHtLuHxK
                            uXtKt3lOuXtGtnZZvodJtnhSuX5Qr4BMuHpIt3hMuH1KuHpVuIBbyH9HuHdLuX1KtXpOt3pKuHpH
                            uHdLuHxLt3hUu4FMtXtIt3hOunxPuX1JuXpPt3xJtnpVuI5LtnsAAABLuHlLuHqc2Lb///9bIXbM
                            AAAATXRSTlMACxobIyY6eXNFDy8mMTQlrRRlFjAWNlyAYhAuaQYjAl0qMHBAID1MgXd4cnxQU1dX
                            EJRgaGQkDlYzWlxaK0RVT3JVb2pJa0kShQGPiJVGKRYAAAABYktHRE4ZYXHfAAAACXBIWXMAAAsT
                            AAALEwEAmpwYAAAAB3RJTUUH5wcWEBEZK1N9aQAAAKRJREFUGNNjYGBkYmZAB0wsrGzsHCDACeJy
                            cfPw8vH7CoDlBIUgaoRFRMXEJSQZGKSkZUB8WTlReSCloKjEoKyiijBLTV1DU0tbB9l4VRVdPX0D
                            ZBFDI2NjYxMUN5gCsRmygLkFiLREErHiApHWCAEbWxBpZw8XcIA4xNEJLuLMgC7iAqFcESJuEMod
                            Q4QRScTDGAw80dUwwNR4MXhzQIAPAxYAALXFEJm8ShAcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIz
                            LTA3LTIyVDE0OjE3OjI1KzAyOjAw6LZaVQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNy0yMlQx
                            NDoxNzoyNSswMjowMJnr4ukAAAAASUVORK5CYII=" />
                            </svg>
                            </i>
                            <span class='text-[14px]'>تعداد غبارپاشی در طول هفته</span>
                        </div>
                        <div class='flex gap-[5px]'>
                            <button @click="incrementDusting">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.625 5C10.625 4.83424 10.5592 4.67527 10.4419 4.55806C10.3247 4.44085 10.1658 4.375 10 4.375C9.83424 4.375 9.67527 4.44085 9.55806 4.55806C9.44085 4.67527 9.375 4.83424 9.375 5H10.625ZM9.375 15C9.375 15.1658 9.44085 15.3247 9.55806 15.4419C9.67527 15.5592 9.83424 15.625 10 15.625C10.1658 15.625 10.3247 15.5592 10.4419 15.4419C10.5592 15.3247 10.625 15.1658 10.625 15H9.375ZM15 10.625C15.1658 10.625 15.3247 10.5592 15.4419 10.4419C15.5592 10.3247 15.625 10.1658 15.625 10C15.625 9.83424 15.5592 9.67527 15.4419 9.55806C15.3247 9.44085 15.1658 9.375 15 9.375V10.625ZM5 9.375C4.83424 9.375 4.67527 9.44085 4.55806 9.55806C4.44085 9.67527 4.375 9.83424 4.375 10C4.375 10.1658 4.44085 10.3247 4.55806 10.4419C4.67527 10.5592 4.83424 10.625 5 10.625V9.375ZM9.375 5V15H10.625V5H9.375ZM15 9.375H5V10.625H15V9.375Z" fill="#49B779"/>
                                </svg>
                            </button>
                            <div class="bg-[#49b779] text-white w-[30px] h-[30px] rounded-md text-center my-auto">{{ dusting }}</div>
                            <button @click="decrementDusting">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 10.625C15.1658 10.625 15.3247 10.5592 15.4419 10.4419C15.5592 10.3247 15.625 10.1658 15.625 10C15.625 9.83424 15.5592 9.67527 15.4419 9.55806C15.3247 9.44085 15.1658 9.375 15 9.375V10.625ZM5 9.375C4.83424 9.375 4.67527 9.44085 4.55806 9.55806C4.44085 9.67527 4.375 9.83424 4.375 10C4.375 10.1658 4.44085 10.3247 4.55806 10.4419C4.67527 10.5592 4.83424 10.625 5 10.625V9.375ZM15 9.375H5V10.625H15V9.375Z" fill="#49B779"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- poison fertilizer -->
                    <div class='flex flex-col gap-[5px] shadow-[0_0_5px_0_#c9c9c9] p-[10px] rounded-md bg-white'>
                        <div class="flex items-center gap-[5px]">
                            <i>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="18px" viewBox="0 0 14 18" enable-background="new 0 0 14 18" xml:space="preserve">  <image id="image0" width="14" height="18" x="0" y="0"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAMAAABcgh8DAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEUAAABIt3hPuX5LuHpR
                            un9LuHtMt3xKt3pKtXVIs3hJtnlQuX5Jt3lLuHpIt3hOvHpJuHlJt3lLt3lIt3hKt3lItnlAr3BM
                            uHtMuXxKuHlMuXw5xnFmzJlNt3tAv3BKt3lKtXhLuHtItXhJuHlRuYBIt3lKtXtKt3lJtnlKt3tm
                            zMxRtYBIt3hLuHlJuHlJt3pJt3pNunpMsoBOuXtJuHpKuHpOun1MuH1NtnxVu4BOuH1MtnxIt3hI
                            tXhJtHdIt3lKtXlIr3hIunlJunlGtnpIt3hJt3n///+vcTasAAAARnRSTlMAIJLPo7+kxxhAdmm/
                            c0AXr9+kv6niEJ6KiZoJCpkQokiBYIFCUh+cuoMFJrTl+MOZYApfnVo7ZEI8bEaKdYU5ZyBnO0lg
                            GwW5AQAAAAFiS0dER2C9yXsAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnBxYQEThnOm03
                            AAAAk0lEQVQY02XO1w7CMAxAUYeyR6GM0LDKKnuvQMoe+f9PosSqUon7diTLNsBfJGJEY0Y8kUSm
                            0jKTlTlpIvMFq1iyyhWCpFWbMWbX6kqNZgtXOMrtThfr9X90TYKZruIAhqPxxJ8OOJ3NF0tNgNV6
                            E+J2tw8NHzjnR82TEMLTpP4ZGvB8wa6Kt/sDe77Us+8P5gF8Ab6nFOojX4/EAAAAJXRFWHRkYXRl
                            OmNyZWF0ZQAyMDIzLTA3LTIyVDE0OjE3OjU2KzAyOjAw05tJ0QAAACV0RVh0ZGF0ZTptb2RpZnkA
                            MjAyMy0wNy0yMlQxNDoxNzo1NiswMjowMKLG8W0AAAAASUVORK5CYII=" />
                            </svg>

                            </i>
                            <span>نوع کود ـ سم و نحوه مصرف</span>
                        </div>
                        <div class='flex gap-[5px]'>
                            <textarea  cols="30" rows="10"  class="outline-none input resize-none" placeholder='نوع کود یا سم های در حال استفاده و نحوه مصرف را کامل توضیح دهید'></textarea>
                        </div>
                    </div>

                </div>

            </div>
            
            <!-- buttons -->
            <div class="flex justify-center items-center">
                <button v-if="stage == 1" @click="saveForm" class="text-white bg-[#49B779] font-semibold rounded-md max-w-[200px] w-full px-2 p-1 shadow-[0_4px_4px_0_#c9c9c9]">
                    مرحله بعدی
                </button>
                <button v-if="stage == 2" @click="saveForm" class="text-white bg-[#49B779] font-semibold rounded-md max-w-[200px] w-full px-2 p-1 shadow-[0_4px_4px_0_#c9c9c9]">
                    ثبت اطلاعات
                </button>
                <div v-if="stage == 3" class="flex gap-[10px]">
                    <button @click="saveForm" class="text-white bg-[#49B779] font-semibold rounded-md p-1 px-3 shadow-[0_4px_4px_0_#c9c9c9]">
                        دریافت نسخه
                    </button>
                    <!-- <button @click="stage == 1" to="/garden" class="text-white bg-[#49B779] font-semibold rounded-md p-1 px-3 shadow-[0_4px_4px_0_#c9c9c9]">
                        دریافت نسخه
                    </button> -->
                    <!-- <button v-if="!compeleteInfo" @click="setInformation" class="text-[#49b779] p-1 px-3 semibold">
                        تکمیل اطلاعات
                    </button> -->
                </div>
            </div>
    
        </div>
    </div>

    <div class="max-w-[400px] w-full relative"> 
        <img :src="LIBRARY_URL+'bottom.avif'" class="absolute bottom-0 left-0 max-w-[100px] -z-10 opacity-40">
    </div>

    <div v-if="finishProcess" class="absolute top-0 left-0 w-full bg-[#fffe]">
        <div class="h-[90vh] flex flex-col gap-[10px] text-[#49b779] items-center justify-center px-[20px]">
        <span class="text-[20px] font-bold">
            نسخه شما پس از بررسی اطلاعات به شما ارسال میگردد
        </span>
        <a href="https://blom.land/" class="bg-gray-300 rounded text-white text-center w-[100px] px-2 p-1" disabled>دیدن وضعیت نسخه های من</a>
        <a href="/garden/plantlibrary" class="bg-[#49b779] rounded text-white text-center w-[100px] px-2 p-1">گیاه دیگر</a>
        </div>
    </div>

</template>

<style>
.swiper-slide-active {
  z-index: 3;
}

.number {
    padding: 12% 0;

    &__slider-wrapper {
        position: relative;
        width: 100%;
        max-width: 480px;
      margin: 0 auto;
        height: 100vh;
      
      &:before, 
      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        width: 100%;
        height: 33%;
        z-index: 2;
      }
      
      &:before {
        top: 0;
        background: linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0), 10%,rgba(255,255,255,1) 100%);
      }
      
      &:after {
        bottom: 0;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0), 10%,rgba(255,255,255,1) 100%);
      }
    }

    &__slider {
        height: 100vh;
    }
  
  &__slider-indicator {
    position: absolute;
    left: 0;
    width: 100%;
    height: 20%;
    top: 50%;
    transform: translateY(-50%);
    border-top: 2px solid #054487;
    border-bottom: 2px solid #054487;
    pointer-events: none;
  }

    &__slider-item {
        position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      
      &.swiper-slide-active {
        span {
          font-size: 24px;
        }
      }
      
      span {
        display: block;
        width: 100%;
        transition: all 0.3s ease-out;
      }
    }
}
</style>