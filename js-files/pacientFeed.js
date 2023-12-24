import { profileURL, patientList } from "/js-files/RequestURL.js";
import { fetchPatientsList,fetchRegPatient } from "/js-files/fetchFunctions.js";

const Posts=document.getElementById('Posts')
const searchBtn=document.getElementById('searchBtn')

const sizeCount=document.getElementById('sizeCount')

const nextPageBtn=document.getElementById('nextPageBtn')
const prevPageBtn=document.getElementById('prevPageBtn')

const nameRegError=document.getElementById('nameRegError')
const dateRegError=document.getElementById('dateRegError')


const regNewPacBtn=document.getElementById('regNewPacBtn')
let flagName=false
let flagbirth=false


nextPageBtn.style.display='block'
prevPageBtn.style.display='block'

const token=localStorage.getItem('token')
const sizeNum=sizeCount.value
let page=1
let size;

const urlParams = new URLSearchParams(window.location.search)
page=parseInt(urlParams.get('page')) || 1

sizeCount.value=urlParams.get('size') || '5'

let totalPages=1

document.getElementById('patientName').value = urlParams.get('name') || '';
document.getElementById('conclusions').value = urlParams.get('conclusions') || '';
document.getElementById('sortBy').value = urlParams.get('sorting') || '';

const scheduledVisits = urlParams.get('scheduledVisits');
document.getElementById('scheduledVisits').checked = scheduledVisits === 'true';
const onlyMine = urlParams.get('onlyMine');
document.getElementById('onlyMine').checked = onlyMine === 'true';

let flag=false
size=parseInt(sizeCount.value)
await ShowPost(page,size)

regNewPacBtn.addEventListener('click', async function(event){
    const token=localStorage.getItem('token')
    const name=document.getElementById('patientRegName').value
    const gender=document.getElementById('genderSelect').value
    const birthday=document.getElementById('dateOfBirth').value

    const currentDate = new Date();

    if(name==''){
        nameRegError.style.display='block'
        flagName=true
    }
    else{
        flagName=false
        nameRegError.style.display='none'

    }

    if(birthday=='' || new Date(birthday) > currentDate){
        dateRegError.style.display='block'
        flagbirth=true
    }
    else{
        flagbirth=false
        dateRegError.style.display='none'

    }

    const regPacData={
        name,
        gender,
        birthday
    }
    if(!flagbirth && !flagName){
        const responseReg=await fetchRegPatient(token, patientList, regPacData)
        console.log(responseReg)
        if(responseReg==200){
            location.reload()
        }
    }
    
})

nextPageBtn.addEventListener('click', async function(event){
    if(page<totalPages){
        page+=1
        await ShowPost(page,size)
    }
    
})
prevPageBtn.addEventListener('click', async function(event){
    if(page>1){
        page-=1
        await ShowPost(page,size)
    }
    
})

searchBtn.addEventListener('click', async function(event){
    await ShowPost(page,size)
})
async function ShowPost(page, size){
    size=parseInt(sizeCount.value)
    const patientName=document.getElementById('patientName').value
    const conclusions=document.getElementById('conclusions').value
    const scheduledVisits=document.getElementById('scheduledVisits').checked
    const sortBy=document.getElementById('sortBy').value
    const onlyMine=document.getElementById('onlyMine').checked

    const urlToFetch=patientList
    const query = new URLSearchParams()
    

    if(patientName.trim()!==""){
        query.append('name',patientName)
    }
    if(conclusions.trim()!==""){
        query.append('conclusions',conclusions)
    }
    if(sortBy!==""){
        query.append('sorting',sortBy)
    }
    if(scheduledVisits!==undefined){
        query.append('scheduledVisits',scheduledVisits)
    }
    if(onlyMine!== undefined){
        query.append('onlyMine',onlyMine)
    }
    
    if (page !== undefined) {
        const countPage=localStorage.getItem('countPage')
        if (page>countPage && countPage!==null){
            query.append('page', countPage)
            console.log('page>totalPages')
        }
        else{
            query.append('page', page)
        }

    }
    if(size!==undefined){
        query.append('size', size);
    }
    const Url = `${urlToFetch}?${query.toString()}`;

    const Token=localStorage.getItem('token');

    Posts.innerHTML = '';
    const responsePatients=await fetchPatientsList(Token, Url)
    if(window.location.href!=('http://localhost/patients'+`?${query.toString()}`)){
        window.location.href='/patients'+`?${query.toString()}`
    }
    else{
        totalPages=responsePatients.pagination.count
        localStorage.setItem('countPage',totalPages)
        await AddPosts(responsePatients);

    }
}
async function AddPosts(response){
    

    for(let i=0; i<response.patients.length;i++){
        const patient=response.patients[i]
        const responsePatient=await fetch('/html-files/pacientCard.html')
        const patientToElement=await responsePatient.text()

        const patientElement = document.createElement('div');

        const inputDate = patient.birthday.substring(0, 10);
        const [year, month, day] = inputDate.split('-');
        const birthDate=`${day}.${month}.${year}`;

        const gender=(patient.gender==="Male"? "Мужской" : "Женский")


        patientElement.innerHTML=patientToElement

        patientElement.querySelector('#name').textContent+=''+patient.name
        patientElement.querySelector('#gender').textContent+=''+gender
        patientElement.querySelector('#birthDate').textContent+=''+birthDate


        Posts.appendChild(patientElement);
    }
}


