import { logoutURL } from "/js-files/RequestURL.js";

let response;
let responseT;
let contentCard;

const token=localStorage.getItem('token')

const pathName=window.location.pathname;

switch(pathName){
    case '/login':
        response = await fetch('/html-files/Login.html');
        responseT= await response.text()
        contentCard = document.getElementById('ContentCard');
        contentCard.innerHTML = responseT;
        contentCard.querySelectorAll('script').forEach(script => {
            const newScript = document.createElement("script")
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value)
            })
            newScript.appendChild(document.createTextNode(script.innerHTML))
            script.parentNode.replaceChild(newScript, script)
        });
        break
    case '/Profile':
        response = await fetch('/html-files/Profile.html');
        responseT=await response.text()
        contentCard = document.getElementById('ContentCard');
        contentCard.innerHTML = responseT;

        contentCard.querySelectorAll('script').forEach(script => {
            const newScript = document.createElement("script")
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value)
            })
            newScript.appendChild(document.createTextNode(script.innerHTML))
            script.parentNode.replaceChild(newScript, script)
        })
        break
    case '/Register':
        response = await fetch('/html-files/Registration.html');
        responseT=await response.text()
        contentCard = document.getElementById('ContentCard');
        contentCard.innerHTML = responseT;

        contentCard.querySelectorAll('script').forEach(script => {
            const newScript = document.createElement("script")
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value)
            })
            newScript.appendChild(document.createTextNode(script.innerHTML))
            script.parentNode.replaceChild(newScript, script)
        })
        break
    case '/logout':
        await GetLogout(token)
        localStorage.clear()
        window.location.href='/login'
        break
    default:
        const url = /^\/ConcretePost\?id=([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i
        if(pathName=='/ConcretePost'){
            response = await fetch('/ConcretePost.html');
            responseT=await response.text()
            contentCard = document.getElementById('ContentCard');
            contentCard.innerHTML = responseT;

            contentCard.querySelectorAll('script').forEach(script => {
                const newScript = document.createElement("script")
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value)
                })
                newScript.appendChild(document.createTextNode(script.innerHTML))
                script.parentNode.replaceChild(newScript, script)
            })
        }

    break
}
async function GetLogout(token){
    const response= await fetch(logoutURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,          
            'Content-Type': 'application/json',
        },
    });
    return response.status
}
