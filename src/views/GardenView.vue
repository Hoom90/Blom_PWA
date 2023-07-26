<script setup>
import { RouterLink } from 'vue-router'
import { onMounted , ref } from 'vue';
import serverURL from '../router/serverAddress'
import AuthService from "../services/auth.service";
// import jMoment from 'jalaali-moment'


const API_URL = serverURL + "/api/";

const userData =  ref(null)
const counter = ref(0)

onMounted(() => {
    getData()
})

async function getData() {
//   loading.value = true
    await fetch(serverURL + "/api/flowers")
    .then((res)=>res.json())
    .then((data) => {/*console.log(data);*/ userData.value = data;})
//   loading.value = false
}


const checkStatus = (status) =>{
    if(status === "checking"){
        return "border-blue-500"
    }
    if(status === "lost"){
        return "border-red-500"
    }
    if(status === "done"){
        return "border-black"
    }
    if(status === "under_care"){
        return "border-orange-500"
    }
    else{
        return ""
    }
}
const checkStatusValue = (status) =>{
    if(status === "checking"){
        return "در حال بررسی"
    }
    if(status === "lost"){
        return "از بین رفته"
    }
    if(status === "done"){
        return "تحویل داده"
    }
    if(status === "under_care"){
        return "در حال درمان"
    }
    else{
        return "نامعلوم"
    }
}

const deletePlant = async (id) => {
    await AuthService.generateNewToken()
    const token = localStorage.getItem('token')
    await fetch(serverURL + "/api/flowers/" + id, {
        method: "DELETE",
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
    .then((data) => {if(data.message === "Deleted FLower"){
        userData.value = userData.value.filter(s => s._id !== id);
    }});
}

</script>

<template>
    <div class="overflow-y-auto h-[92svh] bg-[#49B77914] relative">

        <!-- fixed -->
        <div class="fixed p-[20px] max-w-[400px] w-full h-[90svh]">
            <div class="flex flex-col gap-5 h-full">
                <span class="text-[20px] font-bold">گلخونه من</span>

                <!-- 4 latest plant for prescription -->
                <div class="max-w-[360px] flex flex-wrap justify-around gap-2.5" v-if="userData != ''">
                    <RouterLink v-if="userData" class="relative" :to="'/garden/plant/'+flower._id" v-for="(flower,index) in userData.slice().reverse()" :key="flower._id">
                        <img v-if="index < 4" :src="flower.fileName" class="object-cover aspect-square w-[150px] h-[150px] overflow-hidden rounded-full p-[1px] bg-white shadow-md" alt="picture" />
                        <div v-if="index < 4" class="border-[2px] bg-white w-fit rounded-full p-1 absolute bottom-1 right-7" :class="checkStatus(flower.status)"></div>
                    </RouterLink>
                </div>

                <div v-else class="flex flex-col justify-center items-center h-[90svh]">
                    <i>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="114px" height="114px" viewBox="0 0 114 114" enable-background="new 0 0 114 114" xml:space="preserve">  <image id="image0" width="114" height="114" x="0" y="0"
                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAA
                        CXBIWXMAAAsTAAALEwEAmpwYAAAb5klEQVR42u19e5RU1Z3u99v71KOfvEHeBhUVNVEhxpCMgtCP
                        6m5J0AFnMrkz0YxkJmswOiPdDeauqawoNOq9ztLMTHTmxmSSm8zYiYamu6q7gUtHUTGCDxRipGnk
                        KQIC/azX2ft3/6iuU6e6q5tWqDoF47dWr9XnnP3+ar9+j70JOYA5z/ndlxZE52jBXyDWUwGWmqmL
                        BB/SSr8/v7Jwj5/8erg0fIGVxTHkzZGCZhGLGcRwa6BLSHxgRuXuTbc/vNfpemYS5HQBFrxw/2iv
                        y/sNECYOFYbBJ7R2taYjY+7TK1wTp49dqMHXE1N+2vjEmgivNZfXtYKIna5zJuAokVUN/nxT9v01
                        IMaOJLxW/NqocEdr/fJ6BQCLNq8eZ0R4KQHTRhTfEC+3lq3d5GSdMwVHiSxrrF1MhK8mnhk4zAbe
                        NEgoDsdGsaBrQCK1pwp+r31v3wuXX1EwGZruALjY9pW14D8K0D5imKapJghDXkeMIgAg0jEtjJ+0
                        lK/90Ml6ZwKGUxnP3fG0iz/quJn6f0sMOtBSue5Ze5hlzy3b1lvwuRu0EAuhUQAA0HTV7Mvy72Sm
                        KQwutAKzPkTFsqH1lroT9jSqNj60OyZj9xALySxcrMxrAVx0RAqnMh51qH2GAFk/JEFq0JBXv7xe
                        BSof3SEV/p0J3Yn3GjSbOUmigH65vSP0i+At604MTKPx9keOCIiXrRdMX3CqzpmEY0R6PIY1rzGj
                        +0u/zz86VNimqrrTqof/nQknB9eAfh+oeHRz+31PRYaKT0yHk8GpcNlz3y3ERQbHiFQyPm8BAEk6
                        4/cPv73YvHx9J4T3l8T8MRBfiTJjW7jc0wrCsCtRJpy2P3cVjy7CRQbH5kiYJgAJACDmEW0JWsr9
                        pwA8VdlYO6Y3Py/UttAfHkm8kOlhr0wGjfSa0rF6ZwiO9UhJsi/5xAV+v3/EZWmqqjs9UhIBwOtC
                        ylAqSYacqnem4ByRwvVx4n9mjHpjcV9BxiqpI5Nsj5HNS9eecqreGaujUxkrfWZ/8omM2Ame+OlT
                        O0teUs+0HpiO0kUo3XFsjgz6nuwuD9R2AVQMAFqKawHsSxuYmRYEqiflkXGlID1dKSpWxEpAnhYk
                        94Yi3fvblv7TmXRR5+542sXH91+RkHyQMD9wqs6ZRNYlOxVND800EZsNpstJYAIxCQBg4o6WivX/
                        MTB81cYHpirpXsREn4NOX15mjjLx6x2zp73YfsV9KduQZZtqRnVH6YHEs2bESPAhAXoH8OwLVvyg
                        a+6OFa4xp8dM9kTI0IK6gxWD96MDcfmTKz1XX+mZ0hczyC08J4MVP+jKdlvakTUiS3/799OFYZSC
                        xPS0ARRvbl6yfpv9VVlzzTXQfAexGNEqkzQfCRVG6tsWpvROKm2s+RtBNGlQBEFhgA+Q0rOYhCvx
                        mgknIfilL2/Pe2fgtqi05aHpEuoWNnGFLbwiQns4HA4ONTJkGhkncsFWv5EXCpVo4IuJ3jcIrHYb
                        urOpcckz1kq2PFh9JSD+zN4LiRDSjHZi7tGkXQJyvCZMFQxXMgx/FMrLe9a+qi1rvn8yTPddRGL0
                        J2oc4o96esSvX1q+7oRv70oP/7GwDMQ3Dh2Dw+Fo5MdOkJlRIv1+v3h5XugbkujylOoS94HlB2zo
                        fa4YOpqq6lI27KUtDxaQMv4mIexmYk2G2HFi7Mebds57JpYa1j9RqnAVM2ZYldK8M3j7+o0pZWG/
                        eGVDbKrwmDOh6XKWejqpZE9nYg0Ag39supfI/bwW5kJSqVqWIeJ80FxZ99NMtms6ZJRIX6C2lBnz
                        bRWPaojf7W/v2TGcSK2subacFG62mhIUbK1c99qQ+ex90sPtR/8cGpf256NRKP+t5Zb0Wo74KBH+
                        Hvf/UCBwnFg3xFxju12xM7OY8GVou35UMyCSbSXQCxOvx/LoHeNUmKkofxG0usaqp4w82VL+RFa3
                        OBlbtVZtfGiqySpJIvi0gPfZlrMsCvx+v3hFheYltSK8p7Wy7rXh4gSvuC+yeFPNCyJGfycYLmIS
                        ukdfjSG0HIU9sUmmSIoIDWlsaix9OCGPfdMXWLlHobBEgOfFXyVJ1MQfyzHenwVvTtajtOXBALH8
                        XEKxTeyeA2AbsoiM7SNjLnOeVXnWsWL3mJ+OZGXXdl3fFLtWRLnzto8kv80l6ztZYY9VMa2vGiqs
                        qXlc8kmzeq/zoP17sOKpSGvlukaW/Kb9vSb+2Bvjn9pJBIDWssd7SbMl4BAa45BlZG4fqeLDHABI
                        QbvqS2o7RxKtsMAzzlTxaZAIMdPA8ZFmKTl2GHB9AQBYYBwYlE6gTi4tLemuEAje91Q0XXoRT16T
                        Nxw+ylpfJQ0cK+qMbatf/kRa8R4TomT9n1wBZwsZI5KEyIOOt1YMxln3ZQnEYtqTWDowI9pddFSN
                        NK4UFEoEJhZy7s4Vxk6kLo4AIKZ12EhkokHLtvoL6hf6ewaGa1voNwG83v83LJhRRJTIGyOWA58v
                        ZIxIrXSnIPICgAtqJoARDZFSmKHEjoMY7qnh0d6dQGwkcWMuWSzM+P/MHN057xkzXTj2jj7O0U6d
                        WG129YQuA/D24ICgZfXfLejLL3ZJpc0NS9b3pBPvfX3r/aNDIRqf6PtKmUPqVjOFjM2RLOX71v+E
                        q6o2PjB1JPGoOKkEZoJLn+ZLRponmXxZsmL6GDB4WGVmkl2nJJDsNSyTWxcgvuAqa675Qlmg9tud
                        +cXfU4TvRVz0gC+wZqWv4cHb5jznd9vDd5/Om5iyBXELtey5ZVlVlWWMSEGhN5l1fD7RIFO4717Y
                        XHPN2eI1/UndaQZb+0pTGLeNpFGqNj48lYBZieeYFO/bv/sCT3pKmlZd72tes1J4jO/aTSeFZmtO
                        K/2PBwu23xT+a1K0lIBpguLChjhRPJalccvMwr4HFjYk6+IpTDXDJEVLuwtmrfIFaksXbPWPzlQb
                        p7R3phJuKX/iFLvoJVv1DI+iZb5A7V2LNqyZNFxcEtiZfOLJPYVXlA4XfvGmmlEx6lpmbRMEhc1w
                        5N3E9wVb7x9N4ujdEvLr0JxieqmhWRDtBQDf9n8spvHiXjCmDJcfs8jzGrhzcUPNDAAocLnbAR4w
                        L5KXGfO94fC9vsD3L0OGkXER3UCTRxs6wXqfdhkd0VL3e23kt+azZc/53T2F4RXMGG+FFrQ/FkLj
                        ljvWfWxPZNkrD4ztOeW6l0nkWUFBwUC/AGHR5tXjXBG+B0CKvpOJNWl9DF7X9ubFa3cBQHmwdhk0
                        bKMGnWKttrPb9SGgC0SM5oG0TUrFXeHjef/Sdrc/vGjDmklur17MJmYA8AyqrTCfb/Y9vitT7ZwV
                        oXlV86obo0pU2PeHKY3K+kxXX+zpV21Le99zqyfoQr6HGBZBTDgZydv+47aFbRbppQ0P3iakcYst
                        sfeK+jrq65fXK7/fL169KfRtYppqTwOCtx7q6ti7Z3m9te0oaa2eImO4N9GribjjQE/ef+5Z7k/Z
                        mpQ1r/4TUrwo8ayZW1ur1r+SzJ7pa5t+MDmqwrdC40orHCHWpzv/ZVvVv6aII88XsqJYbix/7A1J
                        Ux9jYDvAg1aSRGJ0cbHnVvu74PJ1JyR7fwag19ZIhd1Fs1N/fB7PXiYd33Uw7WquXP9fCUv01+eZ
                        V6aQCLzTUlH3o5by9bvtJAIARenSBInMHC0cHa0fSCIAtJSve4lBB5ItKFLMK4mIG0r9R5t9db+C
                        EM8n5LGC4SowiucjQ8iahUCw4r5IS2Vdc1FvxzoB+iWRfkuzbVuh9OSBcQKV/mPhfO8TzNjGwGEX
                        84aBQvPWskcO8Un9vw3l/VFz5doX7AKAiDStuZgFnzg56XMNQ5WPiKz8SfKR+vlPDGnXIyHescJC
                        jxkqXLNv7S5NlAyrkj30fCPrFgL9veV9AO+Xbqy5FpRYn4gj6cL3b8o3D5dm618+3gugF/CnvHcL
                        7dI6/lslyM6d874z5H5UEIyEtEdoGnbfairdk9Sb0LArahnjE5DxOmrAjQzBMZudktbqKUIk58yY
                        ye+d7zxMSJtMVF9W1nz/5KFDsxWWJQ3rVGR4yFKOs+Yhe+6CZ7/lZcGWzJkkf3S+65iAY0S6Yi5r
                        iU+EmFmUN2KZ6kiherva41YAADRImJ6/KBtiL0uMpCBCYVxly5pr04VbsNXvVUp90Ypn4GC6cIs2
                        rx7nuWTSt+3KbK2MN5EhOGZ8paDGJ1YtmvnMJ7FTHSm23PHPH5e2fP/3Qpu3AAATFZLCsrLG6hIh
                        3LtiZqx9TLjjSP3yelXQ27Gnu2BWJUBeAGQqvbRsY41srqrblRDLlTXfPxm9fXcRicQQyUzGq4n8
                        qrb+w/ho1DVTaLoWEb4UiXkDcU+zWL773U9Q/E8Ex9zqyoPVS6DFjQBAjIPBqrqfjCReVcOKfBbj
                        ZwmX6G0o/eEHIzFtLA3U+ATTl9J9Y4nDfNz8VetfPt5b2rLmWmHqO+3twuATgiikmfOYaXRC0gMA
                        RPRWsGLdb+N5VH+dgOvS2hcJ+vBE7OOf77SZspxvODa0ak4uKFiMbGRYvOl/XmfKMfcp0n8aM82/
                        KgvW/p0v8I/FZ4tnsB5ySCOFaRgvbwGA1rK17xrC+F3Kd9AEZswg0AQ7iQwcPtDjCQCAb8v3LxMs
                        rh9IomYdg0BbuNzzfzJJIuAgkW4SZ6zG0ly8YKvfO1z4xQ01Mwwzmhj64oVnGqc5dOdAIfZgeCfY
                        nzRhr9bJ/axd7troe7hNG+LXdnlvSlxoZlZbTk469bPEPlP3Rkaltip/SESborH8f2721bXZpVaZ
                        gmNzZKyPPiBvfFRkokJPJDwNQHu6sBVNq65XhFJoGkQ2QcycXhS6d+IL9//foazXFKJXJ01HcCya
                        5/2NNxy6Hzpefwan6Etby9a+y8y7KwMPziD2zNKCColjYXLjMMWmdQQrU21n2eTD9k0IhfXm4NL1
                        6Y2tMwTHiGy5c+2HJU01XbLf0lyY7FuyrfqnDV991HJoXfbcA3k9hd5KU/OVAva5Ca+w1pcn3NJJ
                        0wSv23OPL1C7NZS3/R27CK88uObzzOaV4P5pTxrt7mjXBGi39aNwa2NQo/fPvQf6/4bFqNmFZ7oP
                        hCyrefbK6RjKaj5DcPYMgY3VN5EQFYlnJo4SoUNo0cPEEzV42kDzRGHw/wuU1r3ka3/KjY4j97A5
                        wPBYUFgz75eK+5jERBAnDaI1esNm+N8KjaKZpogtjb/SHK3If2So4W/ujhWuGQfHFYe9k3uCFfcN
                        aflX0bT6bg2eCaQugrIFx+ZIAGgJ7d/JxB2JZ2JyQ9NVGjyPGTPsJMYXDuL5QNn6F0HEwSvui7gK
                        xv4Cgt5ISVSzVzCuZkFzU0iEZhiipW3pP51RMmalSwQ9FImlzz84cfzJ8d8NeXil1kfvr2h6MO3K
                        FwC00HZpUNZHOkeJxPJ6NXPirF9p0I6hgmjNJhG9JYV8ptm3NkUN1PDVmu5m37oGlvjFwHkuJQ3m
                        HiLRkIhPTJYgnljIJRuqB3kwVzX8w3jhkd8kFZelEiFPkVxUHqwZrJJjJiYabT0SMrpCTQfnPJb7
                        8Uxc/tnoC1S/ZULMMcCXQJKhlO4igYN9LPZuq1h3BhjavbylvK7d7/d3bP9SeAaEXgTT8i/pFZBb
                        jUtO7Gmcl1z+u/M9x/t6w7HEdiIqaT6Alv7PVL5hzXWmVBX2FTLQP2IQFpW01ubHXN4XE0IMX7B6
                        FrO0dKdaxQ4iy3D85KvzjdIN1SXCEF8BAGLuOdCX92Q6dVRpYNVdguXVAMCkFWnaL8joVlCTCUix
                        EyLCQcV6urBbmwOdDHFEKI4qF64SmhOkR4p6vf+rPk2emYSzQ2sGoKSwVotMVHhJQXdaQbmEy7IY
                        IBYSRJdrqBsGksgS249PPPVzIYwXBuhSRxH0HJZ8vY1EENGL2SYRyIGh9Wz41la/98NI5IvEPF4K
                        HMzv3PdWQnGcDmP79h3ozL/MGjY9Sk7GgC1EeXD1l1nrGcPly+DTirl1c/mjf+h/taus2X9Y6GgV
                        s56VLoqQeC1Qvu5lOIBcH1qpomn1txLLeiDewBrGy7HXX36rzd+WdrVZ1lT9PwgibvAk8Hazr+6F
                        xLe4SC/yt9xvQsLg0y6BnYpppgZLAXlCSfHe4U7jSLohGQzyBaunKojZEphMTEKBT0CKt508Gi2n
                        e2TJxlWX20kEAAKNkVBVNO/mG5dsmL+h4WtrB+n4BNFJZlwGAEQY0HvCtzJTwg6ISbiaG30P/xEj
                        dbohcBCPHgaSaq9cQE7PkdLgvKG+CcKUqKHuLtmw+isDv2nhtlaNrFCUOOlqSWv1FGZYNjZk0NvN
                        cRItLNjqN8qaV93oa6i9LWHueCEgp4k0JhS2U8LIuR9MsD2TVxpc4gvU3D53x9OWCC/P030kYfQE
                        AF3F42YCQFSJr6Dfko8JoVDEY/XCOe/63SWBVV/x9Ia/R0ouYYlbpIFvljWvGsZDOXeQ00Q2zvP3
                        SYOaUwvMeyD4VfsKkpnmTjj2we0Lti4wAOAMRvdAc9L6TscmVTStugSaLeMnIv2HtiX+kwBw25aH
                        pk4/EPkLybKEyHa0GpObTLrO6XYYCXJmjlyxY4XrwMmxi4SmqzSjE9L4fUv5D/c0lq9/uzRQe5Vg
                        XA0AGriBhfoxkbEvflBEvwqK+PPe8E3w+xf81r/Qb5YHaz6CjpMiiApNxrykXS2HTYN+BwClLbVz
                        KaLLCJxWFUaCMmYwdT6RMz3ywLFxN5PCzcw8msAzScWWlTVVf7OqwT8e0twKETfJJyYhlfxSS3ld
                        u0Dfs8z6jJWIFp9/dV70VgDQOvleaJ4iEN/8A4AUYs/mkvWd5cHaBcJEFTEPQ1aqD0muIme2H3bt
                        QSrYNAXaJGEcKbqh/2XEPWrMjxq+WtNd2Vg7RhHfnVAhAYA2xK9dMXOCInHrwNQ0NGtFzxouzICm
                        xdZ7wSZY7yXQbEvTz3SouWrdTwDk/ElZOdMjtaAh5JNkGJoWQ0mPbQHjCXWd/DwQP2BQFxr1bFsU
                        CVOXxIjSCg0kiUMGaJKdRCYo1rpREIUSJDJpRaKoARcAiUAOEXmwe+9LKcPkABD0HLtaS7Cw7EVb
                        b33kkCZssQUfBUFpzRkV9CktYHl3MemQNtR/slvst29NwGJPsGLNiD2tnUbOELlneX3Uxe4my48D
                        gCQcHeyuFgeBxpS0+i3b2E2Vj+7QBOs6CaHTXz9BENfZjagku7ZsKn1srxFKDqnMrM0ItTndJp8E
                        OUMkADRWPdwubA4yptZFAuJ5Zk4rhKZo6FL78yjX6EYIGvbkEGIkjf0JLwYqH9kBv1/AwA3WeykP
                        DnTfy3XkFJEgMLGwzhogEkU6ylGSslGn8eIC+Ar7U31JbSdJY+fZM4obXIU+8r4CAAu+2DuRkXRx
                        J9ZvjySNXEJuEQkgULnufbsfhnDTtc2+tbsE856BYUnQJF/gyRSn0gNn5KtE1HOWbJgNsaXt7rhi
                        uFC7LbMSIo6G8rx/wAWGnCMSABjK0ilqwVcDoHBBfsNAW1Niyqe8QylubXuW+6MK/MZw6WuN91rL
                        1llOQ8rmfqcVf5gJ94VMIyeJdBmupCBbo2DR86vHti30myTolYFhzV7X+IHvtIt3DjWvAoAw9Fsp
                        4SGsYVUwMuJRnGnkJJFGX+iYXZYqDUwAgIPd3rchkh7MAADiQWehby5Z30mS9qdLm4mPBMvXp0hr
                        iPS45HeZMde3TCIniXR9fX43ICxjKclxdVZc0Uu7UwKb2pMuDSFl2msGicS7dsefqoYV+XYLdn2B
                        9sisieh8geppQhtXaEEjvAVHzUlo8SH0IWLXcQDQzEUEPTsRijWOCSkHeTtrVm4CBmkuGLRP2PxO
                        BoYTkt9nbXTjnGBCkqu7xxt5r23hY8ey0b5ZIbKsufomUsKXrfxyCabizZsHHPGdCWR8aK1o8l8C
                        iDL8NyQRAKRBC6saVuSfe0rDI+P6SKFjM3T/3UnMrEG0m8TFd++GHayZQHwNMQliSC3HXQfgtXNO
                        eBhknEgldV5CfyCE6ApWrPtNpvPMBZQFqqcDcTcCJnjPMbmzIuNDKyv+bzmkZhs5uf34DJ8cnxF5
                        keAzIi8SfEbkRYLPiLxI8BmRFwk+I/IiQeYlO4J14voHZoiy36yZjOy72GcdxDaNioY+l7RGgswT
                        aYjj2kxI5LiYvPwdZF7QkVPQbplxDUjGh9aeo54PIMgxB1CnQYSTm0oebj/3lIZHxolsu9sfdheN
                        /iURd9hd3S52MLGG4HZX8Zifpbuf63wjq3LQZc/53V0F4dsTilwmfVK56OfZLEOmICL4hnX9L2N3
                        Ud++54c76+B8I6tudfXL/VFfYPUxZo5r5LUo2FxSN6Jb7HIZvsBKj0ZecaJfCKKD2SQRcGD7oaS0
                        LgAjgvfsR3TmPqLhwkKyXSBjGvK8H+t9NmSdSKk67Te50axxsQmfOrEcgSJOOQIt6h75NYvnC47o
                        CsubamoTx4MxcJgELujhlUmNIiWnAXFL9WDF+rXZLoMjrueauStxtyQB06BTbxO/0EBJvyAoCEfM
                        KR0R0RkkLkgj4BHVjTnr8yPgUI9komNIrFwBaNJ7L1SDLAlAK0ra2RJlxY51IJwZWgV/ZHcMd5v5
                        LzQu8V+QAtgFW/1eb1+4Nvkm8+K4dHBkaC2WqYfkRrhvtBPlOB9wxfpSrl+K9cROOlEOR4g8YeT1
                        wnbIgvDQBbsFcYEtF3cNzZuW1XWdS3qfFo4Q2bbQbzJpa8sh9PBX4eYymEXyukLQyZHcDJQJOKdY
                        ZsMSDDDxxHNJykmwtpddOnYKiHNXKlHyCj5iMT5xjtwFBQaxQtJjWsYcU9c5RiRJWERqcAHOXD9C
                        d7scAoFJ4h0gfuiSkiJjl2GfDY4R2RtWlk8jMQlPXn7euaTnFJp9j27RhvnYyYmn6jaXrHdM1OgY
                        kS9/7dFu+x3LxLhgV66tZY/3Drz7Odtw1IpOENk9gy9YInMBjhLJIGvzzJov2C1ILsDRlSKTPkaM
                        uJyS9ORzTC7rWLKtukidcU87NXbsB6/O//vQuaf46eFoj9QubS3XiSl/4ClWOQ2/X0Q76V5F5l3F
                        nR/dc/mTKx0tu7NDa3eqSYSSB0d92rSyjapbMTZx2C9pGj9tunR01e0okWNne1KOQSGWF8yCR6mI
                        JdFhohBGv3W28+8yCkeJrL/WH2ViS30l9IBLPXMYHFI2GSufsd8i6wQcd+KRzLZ5UlxyLmllEywM
                        60dHGHCsmgNwnEjFwiJSEU/0+/2Ol+ls8Pv9AmQm1VcCjpuuON5oLk4qmYl14Rs39BWcS3rZwKZ4
                        GS0TSDaFI1YBdjhOZCgmbJeFkSG9Oudlrp5CV7F1pQQA5e11/BB7x4ncsnTtKfuB9H0RynnTSK9i
                        2+pas9r2tuPnn+fEYUblwdXfgeb+VSCHoWm7EMkTHHMJJlSxgJgPxG9x1UQftVas+1eny5UTylxh
                        GK+oWHRp/Fxx8kJgQRacfD9dWUFIudMlHHvJ6TLFy5UDCCz+4bsCeN3pcnxSKFKvtN7x+LtOlwPI
                        kaE1gcVNNde5CDcw81RA5KTcVQs2JdN+pc23Wysf2w2HjK0G4v8DO2zcharkxr8AAAAldEVYdGRh
                        dGU6Y3JlYXRlADIwMjMtMDctMjRUMDk6MDg6MzMrMDI6MDD++wNQAAAAJXRFWHRkYXRlOm1vZGlm
                        eQAyMDIzLTA3LTI0VDA5OjA4OjMzKzAyOjAwj6a77AAAAABJRU5ErkJggg==" />
                        </svg>                        
                    </i>
                    <span class="font-semibold">هیچ گیاهی در گلخانه شما وجود ندارد</span>
                    <span class="text-[12px]">اولین گیاه خود را برای شروع درمان از آن اضافه کنید</span>
                </div>

            </div>
        </div>

        <!-- flex -->
        <div class="mt-[108%] relative max-w-[400px]" v-if="userData != ''">

            <!-- nav buttons -->
            <div class="absolute -mt-[80px] left-20">
                <div class="fixed">
                    <div class="flex gap-[5px] justify-end p-[20px]">
                        <!-- <RouterLink to="/garden/plants" class="p-2 px-3 rounded-lg bg-[#49B779] text-white">همه گل ها
                        </RouterLink> -->
                        <RouterLink to="/garden/plantLibrary" class="w-[40px] h-[40px] bg-[#49B779] rounded-full text-white flex justify-center items-center">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 7V17M7 12H17" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="w-full p-[20px] bg-white rounded-t-[20px] relative">
                <!-- arrow -->
                <div class="absolute left-[40%] top-1 bg-[#adadad] w-[100px] h-[2px]"></div>
                <!-- header -->
                <div class="flex justify-between items-center mb-[10px]" id="plantheadercontainer">
                    <span id="pageTag" class="text-center font-bold">همه گلها</span>
                    <button class="text-[#0000006f]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 3L6 21M6 3L10 7M6 3L2 7" stroke="currentcolor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18 21L18 3M18 21L22 17M18 21L14 17" stroke="currentcolor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <!-- content -->
                <div class="flex flex-col gap-[10px] mb-[10px]">

                    <div class="flex flex-col gap-[10px]" v-for="flower in userData">
                        <div class="flex justify-between items-center gap-[5px] shadow-[0_0_4px_0_#c9c9c9] px-[10px] p-1 rounded-md">
                            <RouterLink  :to="'/garden/plant/'+flower._id" class="flex gap-[5px] w-1/2">
                                <img :src="flower.fileName" class="aspect-square object-cover w-[50px] h-[50px] rounded-full" alt="" />
                                <div class="flex flex-col">
                                    <span>{{ flower.name }}</span>
                                    <span class="text-[12px]">{{ flower.createdAt.split("T")[0] }}</span>
                                </div>
                            </RouterLink>
                            <div class="flex justify-between items-center w-1/2">
                                <div class="flex items-center gap-[5px]">
                                    <div class="w-[10px] h-[10px] rounded-full border-[2px]" :class="checkStatus(flower.status)"></div>
                                    <span>{{ checkStatusValue(flower.status) }}</span>
                                </div>
                                <button @click="deletePlant(flower._id)">
                                    <i class="text-[#adadad]">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19.9394L19.1153 20.1871C19.0164 21.7682 17.7053 23 16.1211 23H7.8789C6.29471 23 4.98356 21.7682 4.88474 20.1871L4.06055 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7V4ZM9 5H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V5ZM6.06445 7L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1191 20.0624L17.9355 7H6.06445Z" fill="currentcolor"/>
                                        </svg>                                    
                                    </i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        
        <!-- plus button -->
        <RouterLink v-if="userData === ''" to="/garden/plantLibrary" class="absolute bottom-[30px] left-[20px] w-[50px] h-[50px] bg-[#49B779] rounded-full text-white flex justify-center items-center">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 7V17M7 12H17" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </RouterLink>
    </div>
</template>