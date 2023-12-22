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
