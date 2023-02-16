templates['template1']=Template1;

function Template1(){
    
    let container=document.createElement("div");
    container.classList.add("temp1-container");

    // Generate Page1
    let page1=document.createElement("div");
    page1.classList.add("page1");

    container.appendChild(page1);
    return container;
}
