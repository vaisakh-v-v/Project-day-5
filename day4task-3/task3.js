// Fetch posts from https://jsonplaceholder.typicode.com/posts. Log the response status and
// headers.
// 401. Write fetchJSON(url, options) - wrapper that throws HttpError (custom class) if response.ok is
// false
// 402. POST a new post with correct Content-Type header. Log the created resource.
// 403. Add timeout with AbortController: abort after 5 seconds, show a friendly timeout message
const url = "https://jsonplaceholder.typicode.com/posts"
async function  getdata() {
    const url = "https://jsonplaceholder.typicode.com/posts"
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    }catch(error){
        console.error(error.message);
    }
}
getdata();

async function fetchJson(url,options){
    try {
        const response = await fetch(url,options);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        return response.json();
    }catch(error){
        console.log("Time exceeded")
    }
}
console.log(await fetchJson("https://jsonplaceholder.typicode.com/posts", {
    method:"POST",
    headers:{
        "Content-type":"application/JSON",
    },
    body:JSON.stringify({hello: "hi"}),
}),
);
console.log(await fetchJson(url, { signal: AbortSignal.timeout(4000) }));