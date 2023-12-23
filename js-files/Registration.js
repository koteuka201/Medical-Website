import {registerDocURL, specialsURL} from "/js-files/RequestURL.js";
import {fetchRegistration, fetchSpecials} from "/js-files/fetchFunctions.js";

const submitButton=document.getElementById('submitButton');



async function getSpecial(){

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
    $(Special).on('change', function(){
        const selectedObj=$(this).select2('data')[0]
    })
}

$(document).ready(function(){
    $('#Special').select2()
})

await getSpecial();

submitButton.addEventListener('click', async function(event){
    const name = document.getElementById('fullName').value;
    const birthday = document.getElementById('davaToday').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phoneInput').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const speciality=document.getElementById('Special').value;

    console.log(speciality)
    const registrationData = { 
        name,
        password,
        email,
        birthday,
        gender,
        phone,
        speciality 
    };

    const submitError=document.getElementById('SubmitError');
    const serverError=document.getElementById('ServerError');

    serverError.style.display='none';
    submitError.style.display='none';

    const errorElements = document.querySelectorAll('.text-danger');
    const hasErrors = Array.from(errorElements).some(element => {
        return window.getComputedStyle(element).display !== 'none';
      });
    if (!hasErrors && name!='' && birthday!='' && gender!='Выберите пол' && phone!='' && phone!='+7 (' && email!='' && password!=''){
        submitError.style.display='none';
        const response= await fetchRegistration(registerDocURL,registrationData);
        if (response===400){
            serverError.style.display='block';
            console.log('not reg', registrationData)
            console.log(response)
        }
        else{
            console.log('ok', registrationData)

            serverError.style.display='none';

            const token=response.token;
            console.log('token',token);
            localStorage.setItem('token', token);

            window.location.href='/Profile'
        }

    }
    else{
        submitError.style.display='block';
    }
});

