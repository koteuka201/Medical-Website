import { logoutURL } from "/js-files/RequestURL.js";
import { fetchLogout } from "/js-files/fetchFunctions.js";
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
    case '/patients':
        response = await fetch('/html-files/pacientFeed.html');
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
    case '/patient':
        response = await fetch('/html-files/MedicalCard.html');
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
    case '/inspection/create':
        response = await fetch('/html-files/createInspect.html');
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
        await fetchLogout(token, logoutURL)
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

