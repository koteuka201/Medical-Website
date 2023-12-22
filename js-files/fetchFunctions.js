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

