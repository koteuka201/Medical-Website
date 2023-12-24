import { patientList } from "/js-files/RequestURL.js";
import { fetchPatientCard } from "/js-files/fetchFunctions.js";

const url=window.location.href
const sign = url.indexOf('?')
const patientId=url.substring(sign + 1)

const urlToRequest=patientList+'/'+patientId

const name=document.getElementById('name')
const birthDate=document.getElementById('birthDate')

const token=localStorage.getItem('token')

const response=await fetchPatientCard(token,urlToRequest)

const inputDate = response.birthday.substring(0, 10);
const [year, month, day] = inputDate.split('-');
const Date=`${day}.${month}.${year}`;

const icon = document.createElement('i');
const nameText = document.createTextNode(response.name);

if(response.gender==="Male"){
    icon.className = 'ms-1 bi bi-gender-male';
}
else{
    icon.className = 'ms-1 bi bi-gender-female';
}

name.appendChild(nameText);
name.appendChild(icon);
birthDate.textContent='Дата рождения: '+Date
