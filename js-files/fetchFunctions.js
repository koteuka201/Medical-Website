export async function fetchLogin(loginUrl, LoginData){
    const response= await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(LoginData)
    })
    if (response.ok){
            return await response.json();
    }
    else{
            return response.status;
    }
}
export async function fetchRegistration(regDocUrl,registrationData){
    const response= await fetch(regDocUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    if (response.ok){
        return await response.json();
    } 
    else{
        return response.status;
    }
}
export async function fetchSpecials(specialsURL){
    const response=await fetch(specialsURL,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })
    return response.json()
}
export async function fetchGetProfile(token, profileURL){
    const response= await fetch(profileURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){
        return await response.json();
    }
    else{
        response.status;
    }
}
export async function fetchEditProfile(EditData, token, profileURL){
    const response= await fetch(profileURL, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(EditData)
    });
    return response.status;
}
export async function fetchLogout(token, logoutURL){
    const response= await fetch(logoutURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
    });
    return response.status
}
export async function fetchPatientsList(token, patientURL){
    const response= await fetch(patientURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}
export async function fetchRegPatient(token, patientURL,regPacData){
    const response= await fetch(patientURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(regPacData)
    });
    return response.status
}
export async function fetchPatientCard(token, patientURL){
    const response= await fetch(patientURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}
export async function fetchPatientInspect(token, patientURL){
    const response= await fetch(patientURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}
export async function fetchDiagnosis(diagUrl){
    const response= await fetch(diagUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}
export async function fetchConcreteInspect(token, inspectUrl){
    const response= await fetch(inspectUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}
export async function fetchConcreteConsult(token, consultUrl){
    const response= await fetch(consultUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}
export async function fetchAddComment(token, commentUrl, data){
    const response= await fetch(commentUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json()
}
export async function fetchEditComment(token, commentUrl, data){
    const response= await fetch(commentUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.status
}
export async function fetchDiagnosIcd(token, diagsListUrl){
    const response=await fetch(diagsListUrl,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })
    return response.json()
}
export async function fetchEditConsult(token, consultUrl,data){
    const response= await fetch(consultUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json()
}
export async function fetchIcd(icdUrl){
    const response= await fetch(icdUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json()
}
export async function fetchInspects(token, consultUrl){
    const response= await fetch(consultUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
    });
    return response.json()
}