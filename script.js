const input=document.getElementById("searchInput");
const suggestionsList=document.getElementById("suggestions");
input.addEventListener("input",async()=>{
    const query=input.value.trim();
    suggestionsList.innerHtML="";
    if(query.length==0)return;
    try{
     const response=await fetch('http://localhost:5000/suggest?q=${query}');
     const data=await response.json();
     if(data.suggestions){
        data.suggestions.forEach(word=>{
            const li=document.createElement("li");
            li.textContent=word;
            li.addEventListener("click",()=>{
                input.value=word;
                suggestionsList.innerHTML="";
        });
     suggestionsList.appendChild(li);
});
}   
    }catch(err){
        console.log("Error fetching suggestions:",err);

    }
});