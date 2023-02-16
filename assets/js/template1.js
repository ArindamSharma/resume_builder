templates['template1']=Template1;

function temp1head(){
    let container=document.createElement("div");
    container.classList.add("temp1-head");

    let name=document.createElement("label");
    name.classList.add("temp1-head-name");
    name.textContent=userData[INTRO][0][0]["value"]+" "+userData[INTRO][0][1]["value"];
    container.appendChild(name);
    
    let title=document.createElement("label");
    title.classList.add("temp1-head-title");
    title.textContent=userData[INTRO][0][2]["value"];
    container.appendChild(title);

    return container;
}
function generateTemp1Section(data){
    
}
function generateTemp1Category(categoryname,data){

}
function temp1left(){
    let container=document.createElement("div");
    container.classList.add("temp1-leftsection");
    return container;
}
function temp1right(){
    let container=document.createElement("div");
    container.classList.add("temp1-rightsection");
    return container;
}
function temp1body(){
    let container=document.createElement("div");
    container.classList.add("temp1-body");
    container.appendChild(temp1left());
    container.appendChild(temp1right());
    return container;
}
function Template1(){
    
    let container=document.createElement("div");
    container.classList.add("temp1-container");

    container.appendChild(temp1head());
    container.appendChild(temp1body());

    // container.appendChild(temp1);
    return container;
}
