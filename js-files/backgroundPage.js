import { profileURL } from "/js-files/RequestURL.js";
import { fetchGetProfile } from "/js-files/fetchFunctions.js";

const enterBtn=document.getElementById('enterBtn');
const headList=document.getElementById('headList');
const headListBtn=document.getElementById('dropdownMenuButton');

const token=localStorage.getItem('token');

if(token){
    headList.style.display='block'
    headListBtn.style.display='block'
    enterBtn.style.display='none'

    const profileDataName=await fetchGetProfile(token,profileURL);

    if (!profileDataName){
        localStorage.clear();
        window.location.href='/login'
    }
    else{
        headListBtn.textContent = profileDataName.name;
    }

}
else{
    headList.style.display='none'
    enterBtn.style.display='block'
}

