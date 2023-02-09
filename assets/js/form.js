function generateEntryField(structure,data={}){
    console.log(structure,data);
    let field=document.createElement("div");
    field.classList.add("form-field");

    let title=document.createElement("label");
    title.classList.add("form-field-label");
    title.textContent=structure.text;

    let entry=document.createElement("div");
    entry.classList.add("form-field-inputbox");

    if(structure.minput==1){
        for(let i=0;i<data[COUNT];i++){
            let fieldinput=document.createElement("div");
            fieldinput.classList.add("form-field-minputbox");

            let inputelement=document.createElement(structure.tag);
            inputelement.classList.add("form-field-input");
            inputelement.value=data["content"][i]["value"]==undefined?"":data["content"][i]["value"];
            
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
        addentry.textContent="+ADD";
        entry.appendChild(addentry);
    }
    else{
        let inputelement=document.createElement(structure.tag);
        inputelement.classList.add("form-field-input");
        inputelement.value=data["value"]==undefined?"":data["value"];
        entry.appendChild(inputelement);
    }

    field.appendChild(title);
    field.appendChild(entry);

    return field;
}
function generateSection(categoryname,sectionindex,data={},addablesection=true){
    let section=document.createElement("div");
    section.classList.add("form-section");
    section.setAttribute("category",categoryname);
    section.setAttribute("sectionindex",sectionindex);

    let sectioncontent=document.createElement("div");
    sectioncontent.classList.add("form-sectioncontent");

    // console.log(formStencil[categoryname][STRUCTURE]);
    formStencil[categoryname][STRUCTURE].forEach(structelement => {
        sectioncontent.appendChild(generateEntryField(structelement,data[structelement.text]))
    });

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
    sectiontitle.textContent=categoryname+" "+sectionindex;
    
    titlecontainer.appendChild(sectiontitle);
    titlecontainer.appendChild(removesectionbutton);

    if(addablesection){
        section.appendChild(titlecontainer);
    }
    section.appendChild(sectioncontent);
    return section;
}
function generateCategory(categoryname,data={},addablesection=true){
    console.log("Generating Category :",categoryname);
    let category=document.createElement("div");
    category.classList.add("form-category");

    let categortitle=document.createElement("label");
    categortitle.classList.add("form-categorylabel");
    categortitle.textContent=formStencil[categoryname][LABEL];
    // categortitle.textContent=categoryname+"asdasd";
    category.appendChild(categortitle);

    // console.log(data);
    if(data[COUNT]==0 || data[COUNT]==undefined){
        console.log("Empty Data");
        // category.appendChild(generateSection(categoryname,));
    }
    else{
        console.log("Data Exist");
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
    // console.log(formStencil);

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
            console.log("Existing Category ",category,data[category]);
            body.appendChild(generateCategory(category,data[category]));
        }
        else{
            console.log("Default Category ",category);
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
    // let tmpelement=element;
    // console.log(element.parentNode);
    let newindex=element.parentNode.getElementsByClassName("form-section").length+1;
    // console.log(newindex);
    element.parentNode.insertBefore(generateSection(categoryname,newindex),element);
}
function removeSection(element){
    // console.log(element);
    let parent=element.parentNode.parentNode.parentNode;
    // removing node
    element.parentNode.parentNode.remove();
    // reseting labels
    let sections=parent.getElementsByClassName("form-section");
    // console.log(sections);
    for(let i=0;i<sections.length;i++){
        sections[i].setAttribute("sectionindex",i+1);
        sections[i].firstChild.firstChild.textContent=sections[i].getAttribute("category")+" "+(i+1);
    }
}
function addInput(element){
    console.log(element);
}
function removeInput(element){
    console.log(element);
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
    console.log("Opening Form")
    raiseFrame("form");
    let container=document.createElement("div");
    container.classList.add("form-container");
    // console.log(container);
    generateForm(container);
    document.getElementById("form").appendChild(container);
}
function closeForm(){
    console.log("Closing Form")
    console.log(document.getElementById("form").firstChild);
    document.getElementById("form").removeChild(document.getElementById("form").firstElementChild);
    raiseFrame("main");
}