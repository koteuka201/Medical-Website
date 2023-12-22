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
