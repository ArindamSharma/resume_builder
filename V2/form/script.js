const INTRO="introduction"
const EDUCATION="education"
const EXPERIENCE="experience"
const PROJECT ="project"
const SKILL ="skill"
const POR ="por"//Position Of Responsibility
const ACHIEVEMENT ="achievement"
const CERTIFICATE ="certification"
const EXTRA ="extra"
const STRUCTURE="structure"
const COUNT="count"
const CONTENT="content"
const EXTRAINFO="extrainfo"
const ORDER=[EXPERIENCE,PROJECT,SKILL,CERTIFICATE,ACHIEVEMENT,POR]

function struct(text,tag,tagdata,minput=0){
    return {text,tag:tag,tagdata:tagdata,minput}
}

var jsondata={}
jsondata[INTRO]={}
jsondata[INTRO][COUNT]=0;
jsondata[INTRO][STRUCTURE]=[
    struct("First Name","input",{type:"text",sugession:[]}),
    struct("Last Name","input",{type:"text",sugession:[]}),
    struct("Title","input",{type:"text",sugession:[]}),
    struct("Introduction/Summary","textarea",{cols:30,rows:4}),
    struct("Email","input",{type:"email",sugession:[]},1),
    struct("Address","input",{type:"text",sugession:[]},1),
    struct("Phone Number","input",{type:"number",sugession:[]},1),
];
jsondata[EDUCATION]={}
jsondata[EDUCATION][COUNT]=0;
jsondata[EDUCATION][STRUCTURE]=[
    //format: [label-text ,input-tag ,tag ,type|(col-row),sugession,add:bool]
   struct("School/University","input",{type:"text",sugession:[]},0),
   struct("School Location","input",{type:"text",sugession:[]},0),
   struct("School Type","input",{type:"text",sugession:["Higher Secondary School","Senior Secondary School","Under-Graduation","Post-Graduation",]},0),
   struct("Degree Type","input",{type:"text",sugession:["None","B.Tech","M.Tech","Dual Degree(B.Tech+M.Tech)",]},0),
   struct("Degree","input",{type:"text",sugession:["None","Computer Science","Computer Science and Engineering"]},0),
   struct("CGPA/Percentage","input",{type:"number",sugession:[]},0),
   struct("I am currently studying here.","input",{type:"checkbox",related:null,sugession:[]},0),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
   struct("Description","textarea",{cols:30,rows:3,sugession:[]},0),
]
jsondata[EXPERIENCE]={}
jsondata[EXPERIENCE][COUNT]=0;
jsondata[EXPERIENCE][STRUCTURE]=[
    //format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Position","input",{type:"text",sugession:[]},0),
   struct("Company","input",{type:"text",sugession:[]},0),
   struct("Location","input",{type:"text",sugession:[]},0),
   struct("Description","textarea",{cols:30,rows:3,sugession:[]},0),
   struct("I am currently working here.","input",{type:"checkbox",related:"From",sugession:[]},0),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
]
jsondata[PROJECT]={}
jsondata[PROJECT][COUNT]=0;
jsondata[PROJECT][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text",sugession:[]},0),
   struct("Description","textarea",{cols:30,rows:5,sugession:[]},0),
   struct("Skills (seperate with comma)","input",{type:"text",sugession:[]},1),
   struct("Link","input",{type:"text",sugession:[]},1),
   struct("I am currently working.","input",{type:"checkbox",sugession:[]},0),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
]
jsondata[SKILL]={}
jsondata[SKILL][COUNT]=0;
jsondata[SKILL][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Category","input",{type:"text",sugession:[],placeholder:"programminglanguage/Webtools/Frameworks/...etc"},0),
   struct("Skills","input",{type:"text",sugession:[]},1),
]
jsondata[POR]={}
jsondata[POR][COUNT]=0;
jsondata[POR][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text",sugession:[]},0),
   struct("Organization","input",{type:"text",sugession:[]},0),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
]
jsondata[ACHIEVEMENT]={}
jsondata[ACHIEVEMENT][COUNT]=0;
jsondata[ACHIEVEMENT][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text",sugession:[]},0),
   struct("Organization","input",{type:"text",sugession:[]},0),
   struct("Link","input",{type:"text",sugession:[]},1),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
]
jsondata[CERTIFICATE]={}
jsondata[CERTIFICATE][COUNT]=0;
jsondata[CERTIFICATE][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text",sugession:[]},0),
   struct("Issued Organization","input",{type:"text",sugession:[]},0),
   struct("Issued Date","input",{type:"month",sugession:[]},0),
   struct("This credential does not expire","input",{type:"checkbox",sugession:[]},0),
   struct("Expiration Date","input",{type:"month",sugession:[]},0),
   struct("Creadential ID","input",{type:"month",sugession:[]},0),
   struct("Creadential URL","input",{type:"url",sugession:[]},0),
]
jsondata[EXTRA]={}
jsondata[EXTRA][COUNT]=0;
jsondata[EXTRA][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Label","input",{type:"text",sugession:[]},0),
   struct("Description","textarea",{cols:30,rows:5,sugession:[]},1),
]
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
function generateSection(categoryname,sectionindex,data={}){
    let section=document.createElement("div");
    section.classList.add("form-section",categoryname);

    let sectioncontent=document.createElement("div");
    sectioncontent.classList.add("form-sectioncontent",sectionindex);

    console.log(jsondata[categoryname][STRUCTURE]);
    jsondata[categoryname][STRUCTURE].forEach(structelement => {
        sectioncontent.appendChild(generateEntryField(structelement,data[structelement.text]))
    });

    let removesectionbutton=document.createElement("button");
    removesectionbutton.classList.add("form-removebutton","form-button");
    removesectionbutton.setAttribute("onclick","removeSection(this)");
    removesectionbutton.textContent="Remove";

    section.appendChild(sectioncontent);
    section.appendChild(removesectionbutton);
    return section;
}
function generateCategory(categoryname,data={},addablesection=true){
    console.log("Generating Category :",categoryname);
    let category=document.createElement("div");
    category.classList.add("form-category");

    let categortitle=document.createElement("label");
    categortitle.classList.add("form-categorylabel");
    categortitle.textContent=categoryname;
    category.appendChild(categortitle);

    // console.log(data);
    if(data[COUNT]==0 || data[COUNT]==undefined){
        console.log("Empty Data");
        if(!addablesection){category.appendChild(generateSection(categoryname,0));}
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
    return category;
}
function generateForm(element,data={}){
    console.log(jsondata);

    let close=document.createElement("button");
    close.classList.add("form-button","form-removebutton","form-closebutton");
    close.textContent=" X ";
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
    console.log(element.parentNode);
    element.parentNode.insertBefore(generateSection(categoryname,0),element);
}
function removeSection(element){
    console.log(element);
    element.parentNode.remove();
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

    element.appendChild(generateEntryField(jsondata[INTRO][STRUCTURE][0]));
    
    
    element.appendChild(generateEntryField(jsondata[INTRO][STRUCTURE][0],{
        "id": "introduction_0_3",
        "value": "sldkfnas a;sldkj fa dlak jsdlk a a;l skdj alsk al ksdj; "
    }));
    element.appendChild(generateEntryField(jsondata[INTRO][STRUCTURE][1],{}));
    element.appendChild(generateEntryField(jsondata[INTRO][STRUCTURE][5],{}));
    element.appendChild(generateEntryField(jsondata[INTRO][STRUCTURE][5],{
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
    element.appendChild(generateEntryField(jsondata[INTRO][STRUCTURE][2],{}));
}
function Main(){
    let container=document.createElement("div");
    container.classList.add("form-container");
    console.log(container);

    generateForm(container);
    // Testing(container);
    
    document.getElementById("form").appendChild(container);
}
document.body.onload=Main();