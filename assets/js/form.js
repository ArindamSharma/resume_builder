formdata={}
function flogger(){
    console.log("[Info]",...arguments)
}
function generateUID(categoryname,sectionindex,structureindex,mindex=undefined){
    return categoryname+"_"+sectionindex+"_"+structureindex+(formStencil[categoryname][STRUCTURE][structureindex].minput==1?("_"+mindex):"");
}
function generateInput(categoryname,sectionindex,structureindex,value="",mindex=undefined){
    let struct=formStencil[categoryname][STRUCTURE][structureindex];
    let uid=generateUID(categoryname,sectionindex,structureindex,mindex);
    flogger("Generating Input :",{
        "value":value,
        STRUCTURE:struct,
        "id":uid
    });
    let inputelement=document.createElement(struct.tag);
    for (let key in struct.attributes) {
        inputelement.setAttribute(key,struct.attributes[key]);
    }
    if(struct.extra["sugession"]!=undefined && struct.extra["sugession"].length!=0){
        inputelement.setAttribute("list",categoryname+"_"+structureindex+"_datalist");
    }

    inputelement.classList.add("form-field-input");
    inputelement.value=value;
    inputelement.setAttribute("categoryname",categoryname);
    inputelement.setAttribute("structureindex",structureindex);
    inputelement.setAttribute("sectionindex",sectionindex);
    inputelement.id=uid;

    return inputelement;
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

    if(formStencil[categoryname][STRUCTURE][structureindex].minput==1){
        for(let i=0;i<data[COUNT];i++){
            let fieldinput=document.createElement("div");
            fieldinput.classList.add("form-field-minputbox");

            let inputelement=generateInput(categoryname,sectionindex,structureindex,data["content"][i]["value"]==undefined?"":data["content"][i]["value"]);
            
            let removebutton=document.createElement("button");
            removebutton.classList.add("form-removebutton","form-button");
            removebutton.setAttribute("onclick","removeInput(this)");
            removebutton.textContent="X";

            fieldinput.appendChild(inputelement);
            fieldinput.appendChild(removebutton);
            entry.appendChild(fieldinput);
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
    let section=document.createElement("div");
    section.classList.add("form-section");
    section.setAttribute("category",categoryname);
    section.setAttribute("sectionindex",sectionindex);

    let sectioncontent=document.createElement("div");
    sectioncontent.classList.add("form-sectioncontent");

    // console.log(formStencil[categoryname][STRUCTURE]);
    for(let i=0;i<formStencil[categoryname][STRUCTURE].length;i++){
        sectioncontent.appendChild(generateEntryField(categoryname,sectionindex,i,data[formStencil[categoryname][STRUCTURE][i].text]))
    }

    let titlecontainer=document.createElement("div");
    titlecontainer.classList.add("form-sectiontitlecontainer");
    
    let removesectionbutton=document.createElement("button");
    removesectionbutton.setAttribute("onclick","removeSection(this)");
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

    if(addablesection){
        section.appendChild(titlecontainer);
    }
    section.appendChild(sectioncontent);
    return section;
}
function generateCategory(categoryname,data={},addablesection=true){
    flogger("Generating Category :",categoryname);
    let category=document.createElement("div");
    category.classList.add("form-category");

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
    if(data[COUNT]==0 || data[COUNT]==undefined){
        flogger("PreFilled Data : Empty");
        // category.appendChild(generateSection(categoryname,));
    }
    else{
        flogger("PreFilled Data : Exist");
        for(let i=0;i<data[COUNT];i++){
            category.appendChild(generateSection(categoryname,i,data[i]));
        }
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
        category.appendChild(generateSection(categoryname,0,{},false));
    }
    return category;
}
function generateForm(element,data={}){
    flogger("Generating Form");

    let close=document.createElement("button");
    close.classList.add("form-button","form-removebutton","form-closebutton");
    close.textContent=" X ";
    close.setAttribute("onclick","closeForm()");
    element.appendChild(close);

    let label=document.createElement("label");
    label.classList.add("form-heading");
    label.textContent="Resume Detail Form";
    element.appendChild(label);
    
    let body=document.createElement("div");
    body.classList.add("form-body");

    body.appendChild(generateCategory(INTRO,data[INTRO],false));
    

    ORDER.forEach(category => {
        if(data[category]!=undefined){
            flogger("Existing Category ",category,data[category]);
            body.appendChild(generateCategory(category,data[category]));
        }
        else{
            flogger("Default Category ",category);
            body.appendChild(generateCategory(category));
        }
    });
    element.appendChild(body);

    let save=document.createElement("button");
    save.classList.add("form-button","form-savebutton");
    save.textContent="Generate Form Data";
    element.appendChild(save);
}
function addSection(element,categoryname){
    flogger("Button Pressed : AddSection");
    // let tmpelement=element;
    // console.log(element.parentNode);
    let newindex=element.parentNode.getElementsByClassName("form-section").length;
    // console.log(newindex);
    element.parentNode.insertBefore(generateSection(categoryname,newindex),element);
}
function removeSection(element){
    flogger("Button Pressed : RemoveSection");
    // console.log(element);
    let parent=element.parentNode.parentNode.parentNode;
    // removing node
    element.parentNode.parentNode.remove();
    // reseting labels
    let sections=parent.getElementsByClassName("form-section");
    // console.log(sections);
    for(let i=0;i<sections.length;i++){
        sections[i].setAttribute("sectionindex",i);
        sections[i].firstChild.firstChild.textContent=sections[i].getAttribute("category")+" "+(i+1);
    }
}
function addInput(element){
    flogger("Button Pressed : AddInput");
    // console.log(element.parentNode);
    let categoryname=element.getAttribute("categoryname");
    let structureindex=element.getAttribute("structureindex");
    let sectionindex=element.getAttribute("sectionindex");
    let mindex=element.parentNode.children.length-1;
    
    let fieldinput=document.createElement("div");
    fieldinput.classList.add("form-field-minputbox");

    let inputelement=generateInput(categoryname,sectionindex,structureindex,"",mindex);

    let removebutton=document.createElement("button");
    removebutton.classList.add("form-removebutton","form-button");
    removebutton.setAttribute("onclick","removeInput(this)");
    removebutton.textContent="X";

    fieldinput.appendChild(inputelement);
    fieldinput.appendChild(removebutton);
    element.parentNode.insertBefore(fieldinput,element);
}
function removeInput(element){
    flogger("Button Pressed : RemoveInput");
    let parent=element.parentNode.parentNode;
    // console.log(element.parentNode); 
    element.parentNode.remove();
    // flogger(parent);
    let minputs=parent.getElementsByClassName("form-field-minputbox");
    // flogger(minputs);
    for(let i=0;i<minputs.length;i++){
        let categoryname=minputs[i].firstChild.getAttribute("categoryname");
        let sectionindex=minputs[i].firstChild.getAttribute("sectionindex");
        let structureindex=minputs[i].firstChild.getAttribute("structureindex");
        minputs[i].firstChild.id=generateUID(categoryname,sectionindex,structureindex,i);
    }
}
function Testing(element){
    // element.appendChild(generateSection(EXPERIENCE,0,{}));
    // element.appendChild(generateSection(INTRO,0,{}));
    // element.appendChild(generateSection(EXPERIENCE,0,{}));
    // element.appendChild(generateSection(EXPERIENCE,0,{}));
    // element.appendChild(generateCategory(INTRO,{},false));
    // element.appendChild(generateCategory(EXPERIENCE,{}));

    element.appendChild(generateEntryField(formStencil[INTRO][STRUCTURE][0]));
    
    
    element.appendChild(generateEntryField(formStencil[INTRO][STRUCTURE][0],{
        "id": "introduction_0_3",
        "value": "sldkfnas a;sldkj fa dlak jsdlk a a;l skdj alsk al ksdj; "
    }));
    element.appendChild(generateEntryField(formStencil[INTRO][STRUCTURE][1],{}));
    element.appendChild(generateEntryField(formStencil[INTRO][STRUCTURE][5],{}));
    element.appendChild(generateEntryField(formStencil[INTRO][STRUCTURE][5],{
        "count": 2,
        "content": {
            "0": {
                "id": "introduction_0_4_0",
                "value": "asd fasd fas df as"
            },
            "1": {
                "id": "introduction_0_4_1",
                "value": "a sdf asd fasd fas df"
            }
        }
    }));
    element.appendChild(generateEntryField(formStencil[INTRO][STRUCTURE][2],{}));
}
function openForm(){
    flogger("Opening Form")
    raiseFrame("form");
    let container=document.createElement("div");
    container.classList.add("form-container");
    // console.log(container);
    generateForm(container);
    document.getElementById("form").appendChild(container);
}
function closeForm(){
    flogger("Closing Form")
    console.log(document.getElementById("form").firstChild);
    document.getElementById("form").removeChild(document.getElementById("form").firstElementChild);
    raiseFrame("main");
}