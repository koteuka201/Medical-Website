import { patientList, diagList } from "/js-files/RequestURL.js";
import { fetchPatientCard, fetchPatientInspect, fetchDiagnosis } from "/js-files/fetchFunctions.js";

const url=window.location.href
const sign = url.indexOf('?')
const guidLength = 39;
const patientId=url.substring(25,25+36)

const urlToRequest=patientList+'/'+patientId

const name=document.getElementById('name')
const birthDate=document.getElementById('birthDate')
const addInspBtn=document.getElementById('addInspBtn')
const visitsPerPage=document.getElementById('visitsPerPage')
const searchBtn=document.getElementById('searchBtn')
const mkbSelect=document.getElementById('mkbSelect')

const nextPageBtn=document.getElementById('nextPageBtn')
const prevPageBtn=document.getElementById('prevPageBtn')

nextPageBtn.style.display='block'
prevPageBtn.style.display='block'

const token=localStorage.getItem('token')

const response=await fetchPatientCard(token,urlToRequest)
const responseDiag=await fetchDiagnosis(diagList)

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

let page=1
let size
let totalPages=1


const urlToInsp=patientList+'/'+patientId+'/inspections?grouped=false&page=1&size=5'

const urlToCheck='http://localhost/patient'+`?${patientId}`
const inspects=document.getElementById('inspects')

const urlParams = new URLSearchParams(window.location.search)
const icdRoots = urlParams.get('icdRoots')

page=parseInt(urlParams.get('page')) || 1
visitsPerPage.value=urlParams.get('size') || '5'


const grouped = urlParams.get('grouped');
if(grouped=='true'){
    document.getElementById('groupBy').checked = true;

}
else{
    document.getElementById('showAll').checked = true;

}

size=parseInt(visitsPerPage.value)

mkbSelect.innerHTML=''

const chooseOption = document.createElement('option');
chooseOption.value = '';
chooseOption.text = 'Выбрать';
mkbSelect.appendChild(chooseOption);

responseDiag.forEach(diag => {
    const option=document.createElement('option')

    option.value=diag.id
    option.text=diag.name

    mkbSelect.appendChild(option)
});

document.getElementById('mkbSelect').value = icdRoots

showInsp(page,size)

addInspBtn.addEventListener('click', async function(event){
    window.location.href='/inspection/create'
})
nextPageBtn.addEventListener('click', async function(event){
    if(page<totalPages){
        page+=1
        await showInsp(page,size)
    }
    
})
prevPageBtn.addEventListener('click', async function(event){
    if(page>1){
        page-=1
        await showInsp(page,size)
    }
    
})

searchBtn.addEventListener('click', async function(event){
    showInsp(page,size)
})

async function showInsp(page, size){
    size=parseInt(visitsPerPage.value)
    const showAll=document.getElementById('showAll').checked
    const groupBy=document.getElementById('groupBy').checked
    const icdRoots=document.getElementById('mkbSelect').value

    const UrlToInsp=patientList+'/'+patientId+'/inspections'
    const query = new URLSearchParams()
    if(showAll=== true){
        query.append('grouped',false)
    }
    else{
        query.append('grouped',true)
    }
    if(icdRoots!==''){
        query.append('icdRoots', icdRoots)
    }
    if (page !== undefined) {
        query.append('page', page)
    }
    if(size!==undefined){
        query.append('size', size);
    }
    const url=`${UrlToInsp}?${query.toString()}`

    const token=localStorage.getItem('token')

    inspects.innerHTML=''

    const Inspects=await fetchPatientInspect(token, url)
    const wholeUrl=urlToCheck+'&inspections&'+`${query.toString()}`
    if(window.location.href!=(wholeUrl)){
        window.location.href='/patient'+`?${patientId}`+'&inspections&'+`${query.toString()}`
    }
    else{

        totalPages=Inspects.pagination.count
        await AddInsp(Inspects)

    }

}

async function AddInsp(Inspects){
    for (let i=0; i<Inspects.inspections.length;i++){
        const inspect=Inspects.inspections[i]
    
        const responseInspect=await fetch('/html-files/inspectionCard.html')
        const inspectToElement=await responseInspect.text()
        
        const inspectElement = document.createElement('div');
    
        const inputDate = inspect.createTime.substring(0, 10);
        const [year, month, day] = inputDate.split('-');
        const createTime=`${day}.${month}.${year}`;
    
        inspectElement.innerHTML=inspectToElement
    
        const inspCard = inspectElement.querySelector('#inspCard')
        const addInsp = inspectElement.querySelector('#addInsp')
        const details = inspectElement.querySelector('#details')
    
    
        let conclus;
        if(inspect.conclusion==='Recovery'){
            conclus='Выздоровление'
        }
        if(inspect.conclusion==='Disease'){
            conclus='Болезнь'
        }
        if(inspect.conclusion==='Death'){
            conclus='Смерть'
            inspCard.classList.add('bg-warning-subtle');
            addInsp.style.display='none'
            addInspBtn.style.display='none'
        }
        
        inspectElement.querySelector('#date').textContent+=''+createTime
        inspectElement.querySelector('#conclision').textContent+='Заключение: '+conclus
        inspectElement.querySelector('#mainDiag').textContent+='Основной диагноз: '+inspect.diagnosis.name
        inspectElement.querySelector('#medWork').textContent+='Медицинский работник: '+inspect.doctor
    
        inspects.appendChild(inspectElement)
    }
}

