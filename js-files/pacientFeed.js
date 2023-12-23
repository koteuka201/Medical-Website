import { profileURL, patientList } from "/js-files/RequestURL.js";
import { fetchPatientsList } from "/js-files/fetchFunctions.js";

const Posts=document.getElementById('Posts')
const searchBtn=document.getElementById('searchBtn')

const sizeCount=document.getElementById('sizeCount')

const nextPageBtn=document.getElementById('nextPageBtn')
const prevPageBtn=document.getElementById('prevPageBtn')

nextPageBtn.style.display='block'
prevPageBtn.style.display='block'

const token=localStorage.getItem('token')
const sizeNum=sizeCount.value
let page=1
let size;
searchBtn.addEventListener('click', async function(event){
    ShowPost(page,size)
})
async function ShowPost(page, size){
    size=parseInt(sizeCount.value)
    console.log(size)
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
        console.log(sortBy)
        query.append('sorting',sortBy)
    }
    if(scheduledVisits!==undefined){
        query.append('scheduledVisits',scheduledVisits)
    }
    if(onlyMine!== undefined){
        query.append('onlyMine',onlyMine)
    }
    
    if (page !== undefined) {
        query.append('page', page);
    }

    if(size!==undefined){
        query.append('size', size);
    }
    //console.log(query.toString())
    const Url = `${urlToFetch}?${query.toString()}`;

    const Token=localStorage.getItem('token');

    Posts.innerHTML = '';
    console.log(Url)
    const responsePatients=await fetchPatientsList(Token, Url)
    
    console.log(responsePatients)
}
async function AddPosts(response){


    response.patients.forEach(patient=>{
        const patientElement = document.createElement('div');

        const inputDate = patient.createTime.substring(0, 10);
        const [year, month, day] = inputDate.split('-');
        const createDate=`${day}.${month}.${year}`;

        const createtime = patient.createTime.substring(11, 16);

        patientElement.innerHTML = `
            
        `;

        Posts.appendChild(patientElement);
    });
}


