// console.log(Skills)
// console.log(Experiences)
// console.log(Projects)
// console.log(Achievements)
const INTRO="introduction"
const EDU="educations"
const EXP="experiences"
const PROJ ="projects"
const SKILL ="skills"
const POR ="por"
const ACHIEVE ="achievements"
const STRUCT="structure"
const COUNT="count"
const CONTENT="content"
const EXTRAINFO="extrainfo"
// struct fromat=[
//     0: labeltext : string ,
//     1: tag : string (input,textarea),
//     2: tag-type : string (text,number,month,checkbox,email),
// ]
var jsondata={}
jsondata[INTRO]={}
jsondata[INTRO][COUNT]=0;
jsondata[INTRO][STRUCT]=[
    ["First Name","input","text",[],0],
    ["Last Name","input","text",[],0],
    ["Title","input","text",[],0],
    ["Introduction/Summary","textarea","30-4",[],0],
    ["Email","input","email",[],1],
    ["Address","input","text",[],1],
    ["Phone Number","input","number",[],1],
];
jsondata[EDU]={}
jsondata[EDU][COUNT]=0;
jsondata[EDU][STRUCT]=[
    //format: [label-text ,input-tag ,tag ,type|(col-row),sugession,add:bool]
    ["School/University","input","text",[],0],
    ["School Location","input","text",[],0],
    ["School Type","input","text",[
        "Higher Secondary School",
        "Senior Secondary School",
        "Under-Graduation",
        "Post-Graduation",
    ],0],
    ["Degree Type","input","text",[
        "None",
        "B.Tech",
        "M.Tech",
        "Dual Degree(B.Tech+M.Tech)",
    ],0],
    ["Degree","input","text",[
        "None",
        "Computer Science",
        "Computer Science and Engineering"
    ],0],
    ["CGPA/Percentage","input","number",[],0],
    ["To","input","month",[],0],
    ["From","input","month",[],0],
    ["Description","textarea","30-3",[]],
]
jsondata[EXP]={}
jsondata[EXP][COUNT]=0;
jsondata[EXP][STRUCT]=[
    //format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
    ["Position","input","text",[],0],
    ["Company","input","text",[],0],
    ["Location","input","text",[],0],
    ["Description","textarea","30-3",[],0],
    ["I am currently working here.","input","checkbox",[],0],
    ["To","input","month",[],0],
    ["From","input","month",[]],
]
jsondata[PROJ]={}
jsondata[PROJ][COUNT]=0;
jsondata[PROJ][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
    ["Title","input","text",[],0],
    ["Description","textarea","30-5",[],0],
    ["Skills (seperate with comma)","input","text",[],1],
    ["Link","input","text",[],1],
    ["I am currently working.","input","checkbox",[],0],
    ["To","input","month",[],0],
    ["From","input","month",[],0],
]
jsondata[SKILL]={}
jsondata[SKILL][COUNT]=0;
jsondata[SKILL][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
    ["Category","input","text",[],0],
    ["Skills","input","text",[],1],
]
jsondata[POR]={}
jsondata[POR][COUNT]=0;
jsondata[POR][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
    ["Title","input","text",[],0],
    ["Organization","input","text",[],0],
    ["To","input","month",[],0],
    ["From","input","month",[],0],
]
jsondata[ACHIEVE]={}
jsondata[ACHIEVE][COUNT]=0;
jsondata[ACHIEVE][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
    ["Title","input","text",[],0],
    ["Organization","input","text",[],0],
    ["Achieved","input","text",[],0],
    ["Link","input","text",[],1],
    ["To","input","month",[],0],
    ["From","input","month",[],0],
]

function OnLoad(){
    GenerateIntro()
    // document.getElementsByClassName("intro")[0].children[0]
    // AddSubSection(document.getElementsByClassName("intro")[0].children[0],INTRO)
}

function EmptyFormOpen(){
    FormOpen([])
}
function FormOpen(data){
    document.getElementsByClassName("modal")[0].classList.add("modal-show")
    document.body.setAttribute('scroll',"no")
    document.body.setAttribute('style',"overflow: hidden;")
}
function FormClose(){
    document.getElementsByClassName("modal")[0].classList.remove("modal-show")
    document.body.removeAttribute('scroll',"no")
    document.body.removeAttribute('style',"overflow: hidden;")
}
function ModalSave(){
    console.log(jsondata)
    console.log("Save the Data to File")
}
function checkboxFunction1(element){
    console.log("Check box clicked",element)
}
function createInputElement(fieldentrydata,uid){
    let inputbox=[];
    if(fieldentrydata[1]=="input"){
        // input 
        let input=document.createElement("input")
        input.classList.add("input")
        input.setAttribute("name",uid)
        input.setAttribute("id",uid)
        input.setAttribute("type",fieldentrydata[2])
        
        //input types
        if(fieldentrydata[2]=="checkbox"){
            // label.textContent=""
            let checkboxfield=document.createElement("div")
            checkboxfield.classList.add("checkbox-field")
            input.setAttribute("onclick",'checkboxFunction1(this)')
            checkboxfield.appendChild(input)
            
            let tmplabel=document.createElement("label")
            tmplabel.classList.add("label")
            tmplabel.setAttribute("for",uid)
            tmplabel.textContent=fieldentrydata[0]
            checkboxfield.appendChild(tmplabel)
            inputbox.push(checkboxfield)
        }
        else if(fieldentrydata[2]=="month"){
            input.classList.add("date-input")
            inputbox.push(input)
        }
        else{//type : text,number,email
            inputbox.push(input)
        }
        // Add Sugession (datalist)
        if(fieldentrydata[3].length!=0){
            input.setAttribute("list",uid+"_datalist")
            let datalist=document.createElement("datalist")
            datalist.id=uid+"_datalist"
            fieldentrydata[3].forEach(sugession => {
                let option=document.createElement("option")
                option.value=sugession
                datalist.appendChild(option)
            });
            inputbox.push(datalist)
        }
    }
    if(fieldentrydata[1]=="textarea"){
        // textarea 
        let textarea=document.createElement("textarea")
        textarea.classList.add("input")
        textarea.setAttribute("name",uid)
        textarea.setAttribute("id",uid)
        textarea.setAttribute("cols",fieldentrydata[2].split("-")[0])
        textarea.setAttribute("rows",fieldentrydata[2].split("-")[1])

        inputbox.push(textarea)
    }
    return inputbox
}
function AddEntry(element){
    // console.log(element)
    let uid=element.getAttribute(EXTRAINFO).split("_")
    console.log(uid)
    let name=uid[0]
    let index=uid[1]
    let fieldentrydata=jsondata[name][STRUCT][uid[2]]
    let currentcount=jsondata[name][index][fieldentrydata[0]][COUNT]
    // console.log(jsondata[name][index][fieldentrydata[0]][CONTENT])
    // console.log(fieldentrydata)

    let minputfield=document.createElement("div")
    minputfield.classList.add("minput-field",currentcount)

    createInputElement(fieldentrydata,index+"_"+uid[2]+"_"+currentcount).forEach(input => {
        minputfield.appendChild(input)
    });
    jsondata[name][index][fieldentrydata[0]][CONTENT][currentcount]={
        "id":index+"_"+uid[2]+"_"+currentcount,
        "value":null
    }

    let removebutton=document.createElement("button")
    removebutton.classList.add("minput-button")
    removebutton.textContent="X"
    removebutton.setAttribute("onclick","RemoveEntry(this)")
    removebutton.setAttribute(EXTRAINFO,element.getAttribute(EXTRAINFO)+"_"+currentcount)
    minputfield.appendChild(removebutton)

    jsondata[name][index][fieldentrydata[0]][COUNT]+=1
    element.parentNode.insertBefore(minputfield,element.parentNode.children[element.parentNode.children.length-1])
    // console.log(minputfield)
}
function RemoveEntry(element){
    let uid=element.getAttribute(EXTRAINFO).split("_")
    delete jsondata[uid[0]][uid[1]][jsondata[uid[0]][STRUCT][uid[2]][0]][CONTENT][uid[3]]
    console.log(element,uid)
    element.parentNode.remove()
}

function createDivFieldEntryElement(data,fieldentrydata,uid){
    // root field entry
    let fieldentry=document.createElement("div")
    fieldentry.classList.add("field-entry")
    //label 
    let label=document.createElement("label")
    label.classList.add("label")
    label.setAttribute("for",uid)
    
    
    label.textContent=fieldentrydata[0]
    if(fieldentrydata[2]=="checkbox"){//exception
        label.textContent=""
    }
    fieldentry.appendChild(label)

    if(fieldentrydata[4]==1){
        data[fieldentrydata[0]]={}
        data[fieldentrydata[0]][COUNT]=0
        data[fieldentrydata[0]][CONTENT]={}
        // data[fieldentrydata[0]]["id"]=uid.slice(uid.search("_")+1)

        // data[uid.slice(uid.search("_")+1)]={
        //     COUNT:0,
        //     "label":fieldentrydata[0],
        //     "content":{}
        // }
        let minput=document.createElement("div")
        minput.classList.add("minput")

        let addbutton=document.createElement("button")
        addbutton.classList.add("minput-button")
        addbutton.setAttribute("onclick","AddEntry(this)")
        addbutton.setAttribute(EXTRAINFO,uid)
        addbutton.textContent="+ Add"
        minput.appendChild(addbutton)
        fieldentry.appendChild(minput)
    }
    else{//fieldentrydata[4]==0
        data[fieldentrydata[0]]={
            "id":uid.slice(uid.search("_")+1),
            "value":null
        }
        // data[uid.slice(uid.search("_")+1)]={
        //     "label":fieldentrydata[0],
        //     "value":null
        // }
        createInputElement(fieldentrydata,uid).forEach(input => {
            fieldentry.appendChild(input)
        });
    }
    return fieldentry
}
// Introduction ==================
function GenerateIntro(){
    let introsection =document.getElementsByClassName("intro")[0]
    let index=0
    jsondata[INTRO][jsondata[INTRO][COUNT]]={}
    jsondata[INTRO][STRUCT].forEach(fieldentrydata => {
        let uid=INTRO.toLowerCase()+"_"+jsondata[INTRO][COUNT]+"_"+index;
        // console.log(fieldentrydata,projectcount)
        introsection.appendChild(createDivFieldEntryElement(jsondata[INTRO][jsondata[INTRO][COUNT]],fieldentrydata,uid))
        index+=1;
    });
}

function AddSubSection(element,name){
      let elementParent=element.parentNode;
    elementParent.removeChild(element)
    // tmpbutton
    let addbutton=document.createElement("button")
    addbutton.classList.add("add-subsection","theme-button-2")
    addbutton.setAttribute("onclick","AddSubSection(this,'"+name+"')")
    addbutton.textContent="+ Add"

    let modalsubsection=document.createElement("div")
    console.log(name,jsondata[name])
    modalsubsection.classList.add("modal-subsection",jsondata[name][COUNT])
    // add button
    let removebutton=document.createElement("button")
    removebutton.classList.add("remove-subsection","theme-button-2","remove-button")
    removebutton.setAttribute("onclick","RemoveSubSection(this,'"+name+"')")
    removebutton.innerHTML="Remove"
    modalsubsection.appendChild(removebutton,removebutton.classList,typeof(removebutton.classList))
    // add field
    let index=0
    // console.log(data)
    jsondata[name][jsondata[name][COUNT]]={}
    jsondata[name][STRUCT].forEach(fieldentrydata => {
        let uid=name.toLowerCase()+"_"+jsondata[name][COUNT]+"_"+index;
        // console.log(fieldentrydata,educount)
        modalsubsection.appendChild(createDivFieldEntryElement(jsondata[name][jsondata[name][COUNT]],fieldentrydata,uid))
        index+=1;
    });
    jsondata[name][COUNT]+=1;
    console.log(modalsubsection)
    elementParent.appendChild(modalsubsection)
    elementParent.appendChild(addbutton) 
}
function RemoveSubSection(element,name){
    let x=element.parentNode.classList
    console.log(x[x.length-1])
    delete jsondata[name][x[x.length-1]]
    console.log(element.parentNode.remove())
}