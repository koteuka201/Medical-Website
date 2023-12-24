import { patientList } from "/js-files/RequestURL.js";
import { fetchPatientCard, fetchPatientInspect } from "/js-files/fetchFunctions.js";

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

const urlToInsp=patientList+'/'+patientId+'/inspections?grouped=false&page=1&size=5'

const inspects=document.getElementById('inspects')

const Inspects=await fetchPatientInspect(token, urlToInsp)

for (let i=0; i<Inspects.inspections.length;i++){
    const inspect=Inspects.inspections[i]

    const responseInspect=await fetch('/html-files/inspectionCard.html')
    const inspectToElement=await responseInspect.text()
    
    const inspectElement = document.createElement('div');

    const inputDate = inspect.createTime.substring(0, 10);
    const [year, month, day] = inputDate.split('-');
    const createTime=`${day}.${month}.${year}`;

    inspectElement.innerHTML=inspectToElement
    
    let conclus;
    if(inspect.conclusion==='Recovery'){
        conclus='Выздоровление'
    }
    if(inspect.conclusion==='Disease'){
        conclus='Болезнь'
    }

    inspectElement.querySelector('#date').textContent+=''+createTime
    inspectElement.querySelector('#conclision').textContent+='Заключение: '+conclus
    inspectElement.querySelector('#mainDiag').textContent+='Основной диагноз: '+inspect.diagnosis.name
    inspectElement.querySelector('#medWork').textContent+='Медицинский работник: '+inspect.doctor

    inspects.appendChild(inspectElement)
}
