const enterBtn=document.getElementById('enterBtn');
const headList=document.getElementById('headList');
const headListBtn=document.getElementById('dropdownMenuButton');

const token=localStorage.getItem('token');

if(token){
    headList.style.display='block'
    headListBtn.style.display='block'
    enterBtn.style.display='none'

    // const profileDataEmail=await getProfile(token);

    // if (!profileDataEmail){
    //     localStorage.clear();
    //     window.location.href='/login'
    // }
    // else{
    //     headListBtn.textContent = profileDataEmail.email;
    // }

}
else{
    headList.style.display='none'
    enterBtn.style.display='block'
}

