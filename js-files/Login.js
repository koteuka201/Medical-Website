import { loginURL } from "/js-files/RequestURL.js";
import { fetchLogin } from "/js-files/fetchFunctions.js";

const token=localStorage.getItem('token')
if(token){
    window.location.href='/Profile'
}

const headListBtn=document.getElementById('dropdownMenuButton');

const EmptyLoginError = document.getElementById('EmptyLoginError');
const LoginError = document.getElementById('LoginError');

const submitBtn=document.getElementById('SubmitButton')
const loginBtn=document.getElementById('LoginButton')

submitBtn.addEventListener('click', async function(event){
    window.location.href='/Register'
})

loginBtn.addEventListener('click', async function(event){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const LoginData = {
        email,
        password
    };
    if (email !== '' && password !== '') {
        const response= await fetchLogin(loginURL,LoginData);
        if (response===400){
            LoginError.style.display='block';
        }
        else{
            const token=response.token;
            console.log('token', token)

            EmptyLoginError.style.display = 'none';
            LoginError.style.display='none';

            localStorage.setItem('token', token);

            //headListBtn.textContent = email
            window.location.href='/Profile'


        }
    }
    else {
        EmptyLoginError.style.display = 'block';
    }
})
