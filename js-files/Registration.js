const submitButton=document.getElementById('submitButton');

submitButton.addEventListener('click', async function(event){
    const fullName = document.getElementById('fullName').value;
    const birthdate = document.getElementById('davaToday').value;
    const gender = document.getElementById('gender').value;
    const phoneNumber = document.getElementById('phoneInput').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const registrationData = { 
        fullName,
        password,
        email,
        birthdate,
        gender,
        phoneNumber 
    };

    const submitError=document.getElementById('SubmitError');
    const serverError=document.getElementById('ServerError');

    serverError.style.display='none';
    submitError.style.display='none';

    const errorElements = document.querySelectorAll('.text-danger');
    const hasErrors = Array.from(errorElements).some(element => {
        return window.getComputedStyle(element).display !== 'none';
      });
    if (!hasErrors && fullName!='' && birthdate!='' && gender!='Выберите пол' && phoneNumber!='' && phoneNumber!='+7 (' && email!='' && password!=''){
        submitError.style.display='none';
        const response= await GetRegistration(registrationData);
        if (response===400){
            serverError.style.display='block';
            console.log('not reg', registrationData)
        }
        else{
            console.log('ok', registrationData)

            serverError.style.display='none';

            const token=response.token;
            console.log('token',token);
            localStorage.setItem('token', token);

            window.location.href='/'
        }

    }
    else{
        submitError.style.display='block';
    }
});

