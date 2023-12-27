import { patientList, diagList,inspectionUrl } from "/js-files/RequestURL.js";
import { fetchPatientCard, fetchPatientInspect, fetchDiagnosis, fetchConcreteInspect } from "/js-files/fetchFunctions.js";


const token=localStorage.getItem('token')
if(token==''){
    window.location.href='/login'
}

const url=window.location.href
const sign = url.indexOf('?')
const id=url.substring(sign + 1)

const urlTOreq=inspectionUrl+'/'+id

const response=await fetchConcreteInspect(token, urlTOreq)
const gender=(response.patient.gender==="Male"? "Мужской" : "Женский")

const inputDate =await refactorDate(response.patient.birthday.substring(0, 10))
const inputTime =await refactorDate(response.createTime.substring(0, 10))
const dateNextInsp=await refactorDate(response.nextVisitDate.substring(0, 10))

const time=response.createTime.substring(12,16)
const netxVisTime=response.nextVisitDate.substring(12,16)
const conclus=response.conclusion
let conclusVal

switch (conclus){
    case 'Disease':
        conclusVal='Болезнь'
    case 'Death':
        conclusVal='Смерть'
    case 'Recovery':
        conclusVal='Выздоровление'
}

document.getElementById('pacientName').innerHTML+=response.patient.name
document.getElementById('gender').innerHTML+=gender
document.getElementById('birthDate').innerHTML+=inputDate
document.getElementById('doctor').innerHTML+=response.doctor.name
document.getElementById('inspectTitle').innerHTML+=inputTime+' - '+time
document.getElementById('complaint').innerHTML+=response.complaints
document.getElementById('anamnez').innerHTML+=response.anamnesis
document.getElementById('recomend').innerHTML+=response.treatment
document.getElementById('conclus').innerHTML+=conclusVal
document.getElementById('nextVisit').innerHTML+=dateNextInsp+' '+netxVisTime

async function refactorDate(inputDate){
    const [year, month, day] = inputDate.split('-')
    const Date=`${day}.${month}.${year}`
    
    return Date
}

const Diags=document.getElementById('Diags')
const rootComment=response.consultations.rootComment
for(let i=0; i<response.diagnoses.length;i++){
    const diagnos=response.diagnoses[i]
    const diagCard= await fetch ('/html-files/diagCard.html')
    const diagToElement=await diagCard.text()
    let typeDiag
    const type=diagnos.type
    switch (type){
        case 'Main':
            typeDiag='Основной'
        case 'Concomitant':
            typeDiag='Сопутствующий'
        case 'Complication':
            typeDiag='Осложнение'
    }

    const diagElement=document.createElement('div')
    diagElement.innerHTML=diagToElement
    diagElement.querySelector('#mkbDiag').innerHTML+=diagnos.name
    diagElement.querySelector('#typeDiag').innerHTML+=typeDiag
    diagElement.querySelector('#typeInsp')
    diagElement.querySelector('#decriptionDiag').innerHTML+=diagnos.description

    Diags.appendChild(diagElement)
}
