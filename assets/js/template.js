templates={};

function tlogger(){
    console.log("[template]",...arguments);
}
function generateTemplate(element){
    tlogger("Generating Template");
    let container=document.createElement("div");
    container.classList.add("template");

    let close=document.createElement("button");
    close.classList.add("closetemplate");
    close.textContent="Back";
    close.setAttribute("onclick","closeTemplate(this)");

    let templatebody=document.createElement("div");
    templatebody.classList.add("templatebody");
    templatebody.appendChild(element);

    container.appendChild(templatebody);
    container.appendChild(close);
    return container;
}
function closeTemplate(element){
    element.parentNode.remove();
    raiseFrame("main");
}
function openTemplate(id){
    raiseFrame(id);
    document.getElementById(id).appendChild(generateTemplate(templates[id]()));
}