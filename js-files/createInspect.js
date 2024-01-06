import { specialsURL, profileURL, patientList,diagsListUrl } from "/js-files/RequestURL.js";
import { fetchCreatePatient,fetchSpecials, fetchInspectsOfPatient,fetchRegPatient, fetchPatientCard, fetchDiagnosIcd} from "/js-files/fetchFunctions.js";

const token=localStorage.getItem('token')

const url=window.location.href
const sign = url.indexOf('?')
const id=url.substring(sign + 1)

const urlToPat=patientList+id
const urlTOreq=patientList+'/'+id+'/inspections?grouped=false&page=1&size=5'



document.getElementById('numOfInsp1').addEventListener('click',async function(e){
    if(document.getElementById('numOfInsp1').checked==true){
        document.getElementById('prevInspForm').style.display='block'
    }
    else{
        document.getElementById('prevInspForm').style.display='none'

    }
})
document.getElementById('needConsl').addEventListener('click',async function(e){
    if(document.getElementById('needConsl').checked==true){
        document.getElementById('comm').style.display='block'
        document.getElementById('Special').style.display='block'
    }
    else{
        document.getElementById('comm').style.display='none'
        document.getElementById('Special').style.display='none'

    }
})
async function GetDiags(){

    let diagList=document.getElementById('prevInsp')

    const data=await fetchInspectsOfPatient(token, urlTOreq)
    
    $(diagList).select2({
        ajax:{
            url: `${urlTOreq}`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: function (params){
                return {
                    name: params.term,
                    page:1,
                    size: 5
                    
                };
            },
            processResults: function (data) {
                // data.unshift({text: 'Не выбрано', id: ""});
                return {
                    results: data.inspections.map(  item => ({
                        text: 'осмотр от ' + refactorDate(item.date.substring(0,10)) +' '+(item.date.substring(11,16)),
                        id: item.id,
                        date: item.createTime
                    }))
                };
            },
            cache: true
        },
        
        placeholder:'выберите объект',
    })
    
    $(diagList).on('change', function(){
        const selectedObj=$(this).select2('data')[0]
    })
}
$(document).ready(function(){
    $('#prevInsp').select2({
    });
})
async function GetDiagList(){

    let diagList=document.getElementById('diagnosy')

    const data=await fetchDiagnosIcd(token, diagsListUrl)
    $(diagList).select2({
        ajax: {
            url: `${diagsListUrl}`,
            type: 'GET',
            dataType: 'json',
            data: function (params) {
                return {
                    request: params.term,
                    page: 1,
                    size: 5
                };
            },
            processResults: function (data) {
                data.records.unshift({text: 'Не выбрано', id: ""});
                return {
                    results: data.records.map(item => ({
                        text: item.name,
                        id: item.id,
                    }))
                };
            },
            cache: true
        },
        placeholder: 'Выберите объект'
    });
    $(diagList).on('change', function () {
        const selectedData = $(this).select2('data')[0];
    });
}

$(document).ready(function(){
    $('#diagnosy').select2({
    });
})

async function Getspecials(){

    let Special=document.getElementById('Special');

    const data= await fetchSpecials(specialsURL)
    $(Special).select2({
        ajax:{
            url: `${specialsURL}`,
            type: 'GET',
            dataType: 'json',
            data: function (params){
                return {
                    name: params.term,
                    page:1,
                    size: 5
                };
            },
            processResults: function(data){
                data.specialties.unshift({text:'ек выбрано',id: ''})
                return{
                    results: data.specialties.map(item=>({
                        text: item.name,
                        id: item.id,
                    }))
                }
            },
            cache: true
        },
        placeholder:'выберите объект'
    })
    $(Special).on('change', function () {
        const selectedData = $(this).select2('data')[0];
    });
}

$(document).ready(function(){
    $('#Special').select2({
    });
})
await Getspecials()
await GetDiagList()
await GetDiags()
let diagnoses=[]
let type;
document.getElementById('addDiagnosisBtn').addEventListener('click',async function(e){
    const radioButtons = document.querySelectorAll('input[name="grouping"]:checked');
    let selectedValue = '';
    radioButtons.forEach(button => {
        if (button.checked) {
            selectedValue = button.id;
        }
    });
    type=selectedValue
    const icdDiagnosisId=document.getElementById('diagnosy').value
    const description=document.getElementById('descriptionDiag').value
    if(type!='' && description!='' && icdDiagnosisId!=''){
        //document.getElementById('addIzmError').style.display='none'
        const newDiag={
            icdDiagnosisId,
            description,
            type
        }
        diagnoses.push(newDiag);

    }
})
if(document.getElementById('conclusions').value==''){
    document.getElementById('cunsulNext').style.display='none'
    document.getElementById('concDeath').style.display='none'
    document.getElementById('conclusDate').style.display='none'
    
}
document.getElementById('conclusions').addEventListener('change', async function(e){
    if(document.getElementById('conclusions').value=='Death'){
        document.getElementById('cunsulNext').style.display='none'
        document.getElementById('concDeath').style.display='block'
        document.getElementById('conclusDate').style.display='block'
    }
    if(document.getElementById('conclusions').value=='Recovery'){
        document.getElementById('cunsulNext').style.display='none'
        document.getElementById('concDeath').style.display='none'
        document.getElementById('conclusDate').style.display='none'
    }
    if(document.getElementById('conclusions').value=='Disease'){
        document.getElementById('concDeath').style.display='none'
        document.getElementById('cunsulNext').style.display='block'
        document.getElementById('conclusDate').style.display='block'

    }
})
let consultations=[]
document.getElementById('addConsulBtn').addEventListener('click',async function(e){
    const specialityId= document.getElementById('Special').value
    const content=document.getElementById('complaints').value
    if(specialityId!=''){
        const data={
            specialityId,
            comment: {
                content: content
            },
        }
        consultations.push(data)
    }
})
document.getElementById('saveIzm').addEventListener('click',async function(e){
    const date=document.getElementById('inspectionDate').value
    const anamnesis=document.getElementById('Anamnez').value
    const complaints=document.getElementById('complaints').value
    const treatment=document.getElementById('recomendation').value
    const conclusion=document.getElementById('conclusions').value
    let nextVisitDate=document.getElementById('conclusDate').value
    let deathDate=document.getElementById('conclusDate').value
    const previousInspectionId=document.getElementById('prevInsp').value
    if (conclusion=='Recovery' || conclusion=='Disease'){
        deathDate=undefined
    }
    if (date !== '' && anamnesis !== '' && complaints !== '' && treatment !== '' && conclusion !== ''){
        const data = {
            date,
            anamnesis,
            complaints,
            treatment,
            conclusion,
            nextVisitDate,
            deathDate,
            previousInspectionId,
            diagnoses,
            consultations
        };
        const urlTOcrete=patientList+'/'+id+'/inspections'
        const response=await fetchCreatePatient(token,urlTOcrete,data)
        console.log(response)
        //window.location.href='/patient'+`?${id}`
    }
})
document.getElementById('cancel').addEventListener('click',async function(e){
    window.location.href='/patient'+`?${id}`
})
function refactorDate(inputDate){
    const [year, month, day] = inputDate.split('-')
    const Date=`${day}.${month}.${year}`
    
    return Date
}