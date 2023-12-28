import { consultUrl,inspectionUrl,profileURL } from "/js-files/RequestURL.js";
import { fetchGetProfile,fetchConcreteInspect,fetchConcreteConsult,fetchAddComment,fetchEditComment } from "/js-files/fetchFunctions.js";


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

document.getElementById('complaints').value=response.complaints
document.getElementById('Anamnez').value=response.anamnesis
document.getElementById('recomendationCure').value=response.treatment
document.getElementById('conclusions2').value=response.conclusion
document.getElementById('conclusDate').value=response.nextVisitDate.slice(0, 16);





const Diags=document.getElementById('Diags')
const rootComment=response.consultations.rootComment
const consultList=document.getElementById('consultList')
for(let i=0; i<response.consultations.length;i++){
    const consult=response.consultations[i]
    const consultCard= await fetch('/html-files/consultCard.html')
    const consultToElement=await consultCard.text()

    const consultId=consult.id

    const consultElement=document.createElement('div')
    consultElement.innerHTML=consultToElement
    consultElement.querySelector('#consulName').innerHTML+=consult.speciality.name

    const comments=consultElement.querySelector('#comments')
    const subComment=consultElement.querySelector('#subComments')

    const urlToconsult=consultUrl+'/'+`${consult.id}`
    
    const responseConsult=await fetchConcreteConsult(token, urlToconsult)

    for(let i=0; i<responseConsult.comments.length;i++){
        const comment=responseConsult.comments[i]

        const commentCard= await fetch('/html-files/commentCard.html')
        const commentToElement=await commentCard.text() 
        
        const commentElement=document.createElement('div')
        commentElement.innerHTML=commentToElement
        const parentId=comment.id

        const createTime=comment.createTime.substring(11,19)
        const createDate=await refactorDate(comment.createTime.substring(0, 10))

        const UrlPostComm=consultUrl+'/'+consultId+'/comment'
        const UrlEditComm=consultUrl+'/'+'comment/'+parentId

        const responseProfile=await fetchGetProfile(token, profileURL)
        const modTime=comment.modifiedDate.substring(11,19)
        const modData=await refactorDate(comment.modifiedDate.substring(0, 10))
        const fullDate=modData+' '+modTime

        commentElement.querySelector('#authorComment').innerHTML+=comment.author
        commentElement.querySelector('#comContent').innerHTML+=comment.content
        commentElement.querySelector('#date').innerHTML+=createDate+' '+createTime


        if(comment.modifiedDate!=comment.createTime){
            const changed=commentElement.querySelector('#changed')
            changed.style.display='block'
            changed.addEventListener('mouseover', async function(e){
                this.textContent = `Последнее изменение: ${fullDate}`
            })
            changed.addEventListener('mouseout', async function(e){
                this.textContent = '(изменено)'
            })
        }
        
        if(responseProfile.id!=comment.authorId){
            commentElement.querySelector('#editCommentBtn').style.display='none'
        }

        

        commentElement.querySelector('#request').addEventListener('click', async function(e){
            
            commentElement.querySelector('#requestForm').style.display='block'
            commentElement.querySelector('#requestFormEdit').style.display='none'
        })

        commentElement.querySelector('#editCommentBtn').addEventListener('click', async function(e){
            commentElement.querySelector('#commentInputEdit').value=comment.content
            commentElement.querySelector('#requestFormEdit').style.display='block'
            commentElement.querySelector('#requestForm').style.display='none'
        })

        commentElement.querySelector('#openSubs').addEventListener('click', async function(e){
            subComment.style.display='block'
            commentElement.querySelector('#openSubs').style.display='none'
            commentElement.querySelector('#closeSubs').style.display='block'            

        })

        commentElement.querySelector('#closeSubs').addEventListener('click', async function(e){
            subComment.style.display='none'
            commentElement.querySelector('#openSubs').style.display='block'
            commentElement.querySelector('#closeSubs').style.display='none'

        })

        commentElement.querySelector('#childCreateCommentBtn').addEventListener('click', async function(e){
            const token=localStorage.getItem('token')
            if(token){
                const content=commentElement.querySelector('#commentInput').value
                if(content!=''){
                    const data={
                        content,
                        parentId
                    }
                    const GUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                    
    
                    const response=await fetchAddComment(token, UrlPostComm, data)
                    if(GUIDPattern.test(response)){
                        location.reload()
                    }
                }
                else{
                    commentElement.querySelector('#childCommentError').style.display='block'
                }
            }
            
        })

        commentElement.querySelector('#childCreateCommentBtnEdit').addEventListener('click', async function(e){
            const token=localStorage.getItem('token')
            if(token){
                const content=commentElement.querySelector('#commentInputEdit').value
                if(content!=''){
                    const data={
                        content
                    }
    
                    const response=await fetchEditComment(token, UrlEditComm, data)
                    if(response=='200'){
                        location.reload()
                    }
                }
                else{
                    commentElement.querySelector('#childEditCommentError').style.display='block'
                }
                
            }
        })
        if(comment.parentId!=null){
            subComment.appendChild(commentElement)
        }
        else{
            comments.appendChild(commentElement)
        }
    }


    consultList.appendChild(consultElement)
}
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
async function refactorDate(inputDate){
    const [year, month, day] = inputDate.split('-')
    const Date=`${day}.${month}.${year}`
    
    return Date
}