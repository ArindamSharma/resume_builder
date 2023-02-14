// Global Variables
userData={}

function flogger(){
    console.log("[form.js]",...arguments)
}

//Elements Generators
function generateInput(categoryname,sectionindex,structureindex,value="",mindex=undefined){
    let struct=formStencil[categoryname][STRUCTURE][structureindex];
    let uid=categoryname+"_"+sectionindex+"_"+structureindex+(struct.minput==1?("_"+mindex):"");

    flogger("Generating Input :",{
        "value":value,
        "structure":struct,
        "id":uid
    });

    if(struct.minput==1){
        userData[categoryname][sectionindex][structureindex][CONTENT][mindex]={"id":uid,"value":value};
        userData[categoryname][sectionindex][structureindex][COUNT]+=1;
    }
    else{
        userData[categoryname][sectionindex][structureindex]={"id":uid,"value":value};
    }

    let inputelement=document.createElement(struct.tag);
    for (let key in struct.attributes) {
        inputelement.setAttribute(key,struct.attributes[key]);
    }
    if(struct.extra["sugession"]!=undefined && struct.extra["sugession"].length!=0){
        inputelement.setAttribute("list",categoryname+"_"+structureindex+"_datalist");
    }

    inputelement.classList.add("form-field-input");
    inputelement.value=value;
    // inputelement.setAttribute("categoryname",categoryname);
    // inputelement.setAttribute("structureindex",structureindex);
    // inputelement.setAttribute("sectionindex",sectionindex);
    inputelement.id=uid;

    return inputelement;
}
function generateMInput(categoryname,sectionindex,structureindex,value="",mindex=undefined){
    let fieldinput=document.createElement("div");
    fieldinput.classList.add("form-field-minputbox");

    let inputelement=generateInput(categoryname,sectionindex,structureindex,value,mindex);
    
    let removebutton=document.createElement("button");
    removebutton.classList.add("form-removebutton","form-button");
    removebutton.setAttribute("onclick","removeInput(this)");
    removebutton.setAttribute("categoryname",categoryname);
    removebutton.setAttribute("sectionindex",sectionindex);
    removebutton.setAttribute("structureindex",structureindex);
    removebutton.setAttribute("mindex",mindex);
    removebutton.textContent="X";

    fieldinput.appendChild(inputelement);
    fieldinput.appendChild(removebutton);
    return fieldinput;
}
function generateEntryField(categoryname,sectionindex,structureindex,data={}){
    flogger("Generating EntryField :",formStencil[categoryname][STRUCTURE][structureindex].text);
    // console.log(formStencil[categoryname][STRUCTURE][structureindex],data);

    let field=document.createElement("div");
    field.classList.add("form-field");

    let title=document.createElement("label");
    title.classList.add("form-field-label");
    title.textContent=formStencil[categoryname][STRUCTURE][structureindex].text;

    let entry=document.createElement("div");
    entry.classList.add("form-field-inputbox");
    entry.setAttribute("inputboxcount",0);

    if(formStencil[categoryname][STRUCTURE][structureindex].minput==1){
        
        userData[categoryname][sectionindex][structureindex]={"count":0,"content":{}};

        for(let i=0;i<data[COUNT];i++){
            let fieldinput=generateMInput(categoryname,sectionindex,structureindex,
                data[CONTENT][i]["value"]==undefined?"":data[CONTENT][i]["value"],
                parseInt(entry.getAttribute("inputboxcount"))
            );
            entry.appendChild(fieldinput);
            entry.setAttribute("inputboxcount",parseInt(entry.getAttribute("inputboxcount"))+1);
        }

        let addentry=document.createElement("button");
        addentry.classList.add("form-addbutton","form-button");
        addentry.setAttribute("onclick","addInput(this)");
        addentry.setAttribute("categoryname",categoryname);
        addentry.setAttribute("structureindex",structureindex);
        addentry.setAttribute("sectionindex",sectionindex);
        addentry.textContent="+ADD";
        entry.appendChild(addentry);
    }
    else{
        let inputelement=generateInput(categoryname,sectionindex,structureindex,data["value"]==undefined?"":data["value"]);
        entry.appendChild(inputelement);
    }

    field.appendChild(title);
    field.appendChild(entry);

    return field;
}
function generateSection(categoryname,sectionindex,data={},addablesection=true){
    flogger("Generating Section :",sectionindex);
    
    userData[categoryname][sectionindex]={};
    
    let section=document.createElement("div");
    section.classList.add("form-section");
    section.setAttribute("category",categoryname);
    section.setAttribute("sectionindex",sectionindex);

    let sectioncontent=document.createElement("div");
    sectioncontent.classList.add("form-sectioncontent");

    for(let i=0;i<formStencil[categoryname][STRUCTURE].length;i++){
        sectioncontent.appendChild(generateEntryField(categoryname,sectionindex,i,data[i]));
    }

    if(addablesection){
        let titlecontainer=document.createElement("div");
        titlecontainer.classList.add("form-sectiontitlecontainer");
        
        let removesectionbutton=document.createElement("button");
        removesectionbutton.setAttribute("onclick","removeSection(this)");
        removesectionbutton.setAttribute("categoryname",categoryname);
        removesectionbutton.setAttribute("sectionindex",sectionindex);
        removesectionbutton.classList.add("form-button","form-removebutton");
        removesectionbutton.textContent="Delete";
        // removesectionbutton.classList.add("form-button","form-button-icon");
        // let removesectionbuttonimg=document.createElement("img");
        // removesectionbuttonimg.classList.add("form-delete-icon");
        // removesectionbuttonimg.src="../assets/img/delete-white.png";
        // removesectionbuttonimg.alt="Delete";
        // removesectionbuttonimg.title="Delete";
        // removesectionbutton.appendChild(removesectionbuttonimg);
        
        let sectiontitle=document.createElement("label");
        sectiontitle.classList.add("form-sectiontitle");
        sectiontitle.textContent=categoryname+" "+(sectionindex+1);
        
        titlecontainer.appendChild(sectiontitle);
        titlecontainer.appendChild(removesectionbutton);

        section.appendChild(titlecontainer);
    }
    section.appendChild(sectioncontent);
    return section;
}
function generateCategory(categoryname,data={},addablesection=true){
    flogger("Generating Category :",categoryname);
    
    userData[categoryname]={};
    
    let category=document.createElement("div");
    category.classList.add("form-category");
    category.setAttribute("sectioncount",0);

    let categortitle=document.createElement("label");
    categortitle.classList.add("form-categorylabel");
    categortitle.textContent=formStencil[categoryname][LABEL];
    // categortitle.textContent=categoryname+"asdasd";
    category.appendChild(categortitle);

    // common data list for inputs for this category
    for(let i=0;i<formStencil[categoryname][STRUCTURE].length;i++){
        if(formStencil[categoryname][STRUCTURE][i].extra["sugession"]!=undefined && formStencil[categoryname][STRUCTURE][i].extra["sugession"].length!=0){
            let datalist=document.createElement("datalist");
            datalist.id=categoryname+"_"+i+"_datalist";
            formStencil[categoryname][STRUCTURE][i].extra["sugession"].forEach(sugession => {
                let option=document.createElement("option");
                option.value=sugession;
                datalist.appendChild(option);
            });
            category.appendChild(datalist);
        }
    }; 

    // console.log(data);
    let c=0;
    let flag=0;
    for(let key in data){
        // console.log("here",key,data[key]);
        category.appendChild(generateSection(categoryname,c,data[key]));
        c++;
        flag=1;
    }

    if(addablesection){
        let addsectionbutton=document.createElement("button");
        addsectionbutton.classList.add("form-addbutton","form-button");
        addsectionbutton.setAttribute("onclick","addSection(this,'"+categoryname+"')");
        addsectionbutton.textContent="+ADD";
        addsectionbutton.type="button";
        category.appendChild(addsectionbutton);
    }
    else{
        flag==0?category.appendChild(generateSection(categoryname,0,{},false)):"";
    }
    return category;
}
function generateForm(data={}){
    flogger("Generating Form");

    let container=document.createElement("div");
    container.classList.add("form-container");

    let close=document.createElement("button");
    close.classList.add("form-button","form-removebutton","form-closebutton");
    close.textContent=" X ";
    close.setAttribute("onclick","closeForm()");
    container.appendChild(close);

    let label=document.createElement("label");
    label.classList.add("form-heading");
    label.textContent="Resume Detail Form";
    container.appendChild(label);
    
    let body=document.createElement("div");
    body.classList.add("form-body");

    body.appendChild(generateCategory(INTRO,data[INTRO],false));
    

    ORDER.forEach(category => {
        body.appendChild(generateCategory(category,data[category]));
    });
    container.appendChild(body);

    let save=document.createElement("button");
    save.classList.add("form-button","form-savebutton");
    save.setAttribute("onclick","saveForm(this)");
    save.textContent="Generate Form Data";
    container.appendChild(save);

    return container;
}

// Form Actions
function addSection(element,categoryname){
    flogger("Button Pressed : AddSection");
    
    let newindex=parseInt(element.parentNode.getAttribute("sectioncount"));
    element.parentNode.setAttribute("sectioncount",newindex+1);

    element.parentNode.insertBefore(generateSection(categoryname,newindex),element);

    //reset the title count
    let sections=element.parentNode.getElementsByClassName("form-section");
    for(let i=0;i<sections.length;i++){
        sections[i].firstChild.firstChild.textContent=sections[i].getAttribute("category")+" "+(i+1);
    }
}
function removeSection(element){
    flogger("Button Pressed : RemoveSection");
    
    let categoryname=element.getAttribute("categoryname");
    let parent=element.parentNode.parentNode.parentNode;
    
    // removing user data
    delete userData[categoryname][element.getAttribute("sectionindex")];
    
    // removing node
    element.parentNode.parentNode.remove();
    
    // reseting labels
    let sections=parent.getElementsByClassName("form-section");
    for(let i=0;i<sections.length;i++){
        sections[i].firstChild.firstChild.textContent=sections[i].getAttribute("category")+" "+(i+1);
    }
}
function addInput(element){
    flogger("Button Pressed : AddInput");
    
    let categoryname=element.getAttribute("categoryname");
    let structureindex=element.getAttribute("structureindex");
    let sectionindex=element.getAttribute("sectionindex");
    let mindex=parseInt(element.parentNode.getAttribute("inputboxcount"));
    
    let fieldinput=generateMInput(categoryname,sectionindex,structureindex,"",mindex);

    element.parentNode.setAttribute("inputboxcount",mindex+1);
    element.parentNode.insertBefore(fieldinput,element);
}
function removeInput(element){
    flogger("Button Pressed : RemoveInput");
    let categoryname=element.getAttribute("categoryname");
    let sectionindex=element.getAttribute("sectionindex");
    let structureindex=element.getAttribute("structureindex");
    let mindex=element.getAttribute("mindex");
    
    //removing userdata 
    delete userData[categoryname][sectionindex][structureindex][CONTENT][mindex];
    userData[categoryname][sectionindex][structureindex][COUNT]--;
    
    //removing element
    element.parentNode.remove();
}

// Main Function Calls
function openForm(data={}){
    flogger("Opening Form")
    flogger("Data :",data);
    raiseFrame("form");
    document.getElementById("form").appendChild(generateForm(data));
}
function closeForm(){
    flogger("Closing Form")
    console.log(document.getElementById("form").firstChild);
    document.getElementById("form").removeChild(document.getElementById("form").firstElementChild);
    raiseFrame("main");
}
function extractUserInputsFromForm(data){
    if(typeof(data)!='object' || data==null){
        return;
    }
    if("id" in data){
        data["value"]=document.getElementById(data["id"]).value;
        // flogger(data["value"]);
    }
    else{
        for(let x in data){
            extractUserInputsFromForm(data[x]);
        }
    }
}
function saveForm(element){
    flogger("Saving Form");
    extractUserInputsFromForm(userData);
    flogger("Generating File userData.json");
    
    //create a download from jsondata
    let a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(userData)], {type:"text/json;charset=utf-8"}));
    a.setAttribute("download", 'userData.json');
    a.click();
}