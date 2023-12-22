import { profileURL } from "/js-files/RequestURL.js";
import { fetchGetProfile, fetchEditProfile } from "/js-files/fetchFunctions.js";

const token=localStorage.getItem('token');
if(!token){
    window.location.href='/login'
}
const profileData=await fetchGetProfile(token,profileURL);
if(profileData===401){
    window.location.href='/login'
}
console.log(profileData);
document.getElementById('email').value = profileData.email;
document.getElementById('name').value = profileData.name;
document.getElementById('phone').value = await refactorPhone(profileData.phone);
document.getElementById('gender').value = profileData.gender.toLowerCase();
document.getElementById('datebirth').value = (profileData.birthday).substring(0, 10);

const saveBtn=document.getElementById('saveProfileBtn');

saveBtn.addEventListener('click', async function(event){
    
    const email=document.getElementById('email').value;
    const phone=document.getElementById('phone').value;
    const name=document.getElementById('name').value;
    const gender=document.getElementById('gender').value;
    const birthday=document.getElementById('datebirth').value;

    const emailError=document.getElementById('mailError');
    const phoneError=document.getElementById('phoneError');
    const dateError=document.getElementById('dateError');

    const emailCheck=await IsValidEmail(email);
    const phoneCheck=await IsValidPhone(phone);
    const dateCheck=await IsValidDate(birthday);

    const profileDataEdit={
        email,
        name,
        birthday,
        gender,
        phone,
    }

    if(!emailCheck){
        emailError.style.display='block'
    }
    else{
        emailError.style.display='none'
    }
    if(!dateCheck || birthday==''){
        dateError.style.display='block'
    }
    else{
        dateError.style.display='none'
    }
    if(!phoneCheck){
        phoneError.style.display='block'
    }
    else{
        phoneError.style.display='none'
    }
    if (name!='' && emailCheck && dateCheck && birthday!='' && emailCheck && phoneCheck){
        const response=fetchEditProfile(profileDataEdit,token,profileURL);
        if (response===401){
            window.location.href='/login'
        }
        //location.reload()

        console.log('log', profileDataEdit)
    }
    
})
async function IsValidEmail(email){
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
async function IsValidPhone(phone){

    const Mask = /^\+7\d{10}$/.test(phone);
  
    if (Mask) {
      return true;
    }
  
    return false;
}
async function IsValidDate(date){
    const compDate = new Date('2009-01-01');
    const selDate= new Date(date);
    if (selDate>compDate){
        return false;
    }
    else{
        return true;
    }
}

async function refactorPhone(phone){
    const cleanNumber = phone.replace(/\D/g, '');
    const outputPhone='+'+cleanNumber;
    return outputPhone;
}
