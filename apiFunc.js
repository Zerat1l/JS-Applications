const baseUrl = 'http://localhost:3030'

async function apiRequest(method, url, data) {

    const options = {
        method,
        headers: {}
    }
    if(data != undefined) {
        options.headers['Content-type'] = 'Applicaton/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(baseUrl + url, options)

        if(response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }
        if(response.status == 204) {
            return response;
        }else {
            return response.json();
        }

    }catch(error) {
        alert(error.message);
        throw error;
    }
}
export const get = apiRequest.bind(null,'get')
export const post = apiRequest.bind(null,'post')
export const put = apiRequest.bind(null,'put')
export const del = apiRequest.bind(null,'delete')

window.del = del;
window.get = get;
window.apiRequest = apiRequest;

const getContacts = () => {
    return fetch('http://localhost:3030/jsonstore/phonebook')
    .then(res => res.json())
    .then(data => Object.values(data)); 
}

const asd = await getContacts();   

asd.forEach(x => console.log(x.person))

window.asd = asd;
window.getContacts = getContacts;

