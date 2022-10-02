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
const CERT ="certifications"
const EXTRAS ="extras"
const STRUCT="structure"
const COUNT="count"
const CONTENT="content"
const EXTRAPARAM="extrainfo"


function struct(text,tag,tagdata,minput=0){
    return {text,minput,tag:tag,tagdata:tagdata}
}

var jsondata={}
jsondata[INTRO]={}
jsondata[INTRO][COUNT]=0;
jsondata[INTRO][STRUCT]=[
    struct("First Name","input",{type:"text",sugession:[]}),
    struct("Last Name","input",{type:"text",sugession:[]}),
    struct("Title","input",{type:"text",sugession:[]}),
    struct("Introduction/Summary","textarea",{cols:30,rows:4}),
    struct("Email","input",{type:"email",sugession:[]},1),
    struct("Address","input",{type:"text",sugession:[]},1),
    struct("Phone Number","input",{type:"number",sugession:[]},1),
];
jsondata[EDU]={}
jsondata[EDU][COUNT]=0;
jsondata[EDU][STRUCT]=[
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
jsondata[EXP]={}
jsondata[EXP][COUNT]=0;
jsondata[EXP][STRUCT]=[
    //format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Position","input",{type:"text",sugession:[]},0),
   struct("Company","input",{type:"text",sugession:[]},0),
   struct("Location","input",{type:"text",sugession:[]},0),
   struct("Description","textarea",{cols:30,rows:3,sugession:[]},0),
   struct("I am currently working here.","input",{type:"checkbox",related:"From",sugession:[]},0),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
]
jsondata[PROJ]={}
jsondata[PROJ][COUNT]=0;
jsondata[PROJ][STRUCT]=[
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
jsondata[SKILL][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Category","input",{type:"text",sugession:[],placeholder:"programminglanguage/Webtools/Frameworks/...etc"},0),
   struct("Skills","input",{type:"text",sugession:[]},1),
]
jsondata[POR]={}
jsondata[POR][COUNT]=0;
jsondata[POR][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text",sugession:[]},0),
   struct("Organization","input",{type:"text",sugession:[]},0),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
]
jsondata[ACHIEVE]={}
jsondata[ACHIEVE][COUNT]=0;
jsondata[ACHIEVE][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text",sugession:[]},0),
   struct("Organization","input",{type:"text",sugession:[]},0),
   struct("Link","input",{type:"text",sugession:[]},1),
   struct("To","input",{type:"month",sugession:[]},0),
   struct("From","input",{type:"month",sugession:[]},0),
]
jsondata[CERT]={}
jsondata[CERT][COUNT]=0;
jsondata[CERT][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text",sugession:[]},0),
   struct("Issued Organization","input",{type:"text",sugession:[]},0),
   struct("Issued Date","input",{type:"month",sugession:[]},0),
   struct("This credential does not expire","input",{type:"checkbox",sugession:[]},0),
   struct("Expiration Date","input",{type:"month",sugession:[]},0),
   struct("Creadential ID","input",{type:"month",sugession:[]},0),
   struct("Creadential URL","input",{type:"url",sugession:[]},0),
]
jsondata[EXTRAS]={}
jsondata[EXTRAS][COUNT]=0;
jsondata[EXTRAS][STRUCT]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Label","input",{type:"text",sugession:[]},0),
   struct("Description","textarea",{cols:30,rows:5,sugession:[]},1),
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
    // updates values 
    updateJsonDataFromForm(jsondata)

    //create a download from jsondata
    let a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(jsondata)], {type:"text/json;charset=utf-8"}));
    a.setAttribute("download", 'userdata.json');
    a.click();
}

async function OpenFormWithFileUpload(element){
    
    await FileUploaded(element)
    console.log(jsondata)
    // ljsondata={}
    // return ljsondata={}
    
    FormOpen(jsondata)
}
function updateJsonDataFromForm(data){
    // console.log(data)
    if(typeof(data)!='object' || data==null){
        return;
    }
    if('id' in data){
        data['value']=document.getElementById(data['id']).value;
    }
    else{
        for(let x in data){
            updateJsonDataFromForm(data[x])
        }
    }
}
function updateJsonDataFromParsedJsonData(data){
    jsondata=data// future modification needed
}

async function FileUploaded(element){
    console.log("File to Read : ",element.value)
    const file=element.parentNode.querySelector('input').files[0];
    let jd;
    let reader= new FileReader()
    reader.onload =(e)=>{
        console.log("File loaded")
        const file=e.target.result;
        const lines=file.split(/\r\n|\n/);
        jd=lines.join("\n")
    }
    reader.onerror=(e)=> alert(e.target.error.name);
    reader.readAsText(file);
    
    //update the jsondata extracted from the uploaded file
    reader.onloadend=(e)=>{
        updateJsonDataFromParsedJsonData(JSON.parse(jd))
    }
}
function checkboxFor(element,related){
    let rawdata=element.name.split("_")
    let name=rawdata[0]
    let index=rawdata[1]
    console.log("Check box clicked",element.checked)
    if(related!="null" && related!="undefined"){
        if(element.checked==true){
            document.getElementById(jsondata[name][index][related]["id"]).disabled=true
        }
        else{
            document.getElementById(jsondata[name][index][related]["id"]).disabled=false
        }
    }
}
function createInputElement(fieldentrydata,uid){
    let inputbox=[];
    if(fieldentrydata["tag"]=="input"){
        // input 
        let input=document.createElement("input")
        input.classList.add("input")
        input.setAttribute("name",uid)
        input.setAttribute("id",uid)
        input.setAttribute("type",fieldentrydata["tagdata"]["type"])
        
        //input types
        if(fieldentrydata["tagdata"]["type"]=="checkbox"){
            // label.textContent=""
            let checkboxfield=document.createElement("div")
            checkboxfield.classList.add("checkbox-field")
            input.setAttribute("onclick",'checkboxFor(this,"'+fieldentrydata["tagdata"]["related"]+'")')
            checkboxfield.appendChild(input)
            
            let tmplabel=document.createElement("label")
            tmplabel.classList.add("label")
            tmplabel.setAttribute("for",uid)
            tmplabel.textContent=fieldentrydata["text"]
            checkboxfield.appendChild(tmplabel)
            inputbox.push(checkboxfield)
        }
        else if(fieldentrydata["tagdata"]["type"]=="month"){
            input.classList.add("date-input")
            inputbox.push(input)
        }
        else{//type : text,number,email
            if(fieldentrydata["tagdata"]["placeholder"]!=undefined){
                input.setAttribute("placeholder",fieldentrydata["tagdata"]["placeholder"])
            }
            inputbox.push(input)
        }
        // Add Sugession (datalist)
        if(fieldentrydata["tagdata"]["sugession"].length!=0){
            input.setAttribute("list",uid+"_datalist")
            let datalist=document.createElement("datalist")
            datalist.id=uid+"_datalist"
            fieldentrydata["tagdata"]["sugession"].forEach(sugession => {
                let option=document.createElement("option")
                option.value=sugession
                datalist.appendChild(option)
            });
            inputbox.push(datalist)
        }
    }
    if(fieldentrydata["tag"]=="textarea"){
        // textarea 
        let textarea=document.createElement("textarea")
        textarea.classList.add("input")
        textarea.setAttribute("name",uid)
        textarea.setAttribute("id",uid)
        textarea.setAttribute("cols",fieldentrydata["tagdata"]["cols"])
        textarea.setAttribute("rows",fieldentrydata["tagdata"]["rows"])

        inputbox.push(textarea)
    }
    return inputbox
}
function AddEntry(element){
    // console.log(element)
    let uid=element.getAttribute(EXTRAPARAM).split("_")
    console.log(uid)
    let name=uid[0]
    let index=uid[1]
    let fieldentrydata=jsondata[name][STRUCT][uid[2]]
    let currentcount=jsondata[name][index][fieldentrydata["text"]][COUNT]
    // console.log(jsondata[name][index][fieldentrydata[0]][CONTENT])
    // console.log(fieldentrydata)

    let minputfield=document.createElement("div")
    minputfield.classList.add("minput-field",currentcount)

    createInputElement(fieldentrydata,name+"_"+index+"_"+uid[2]+"_"+currentcount).forEach(input => {
        minputfield.appendChild(input)
    });
    jsondata[name][index][fieldentrydata["text"]][CONTENT][currentcount]={
        "id":name+"_"+index+"_"+uid[2]+"_"+currentcount,
        "value":null
    }

    let removebutton=document.createElement("button")
    removebutton.classList.add("minput-button")
    removebutton.textContent="X"
    removebutton.setAttribute("onclick","RemoveEntry(this)")
    removebutton.setAttribute(EXTRAPARAM,element.getAttribute(EXTRAPARAM)+"_"+currentcount)
    minputfield.appendChild(removebutton)

    jsondata[name][index][fieldentrydata["text"]][COUNT]+=1
    element.parentNode.insertBefore(minputfield,element.parentNode.children[element.parentNode.children.length-1])
    // console.log(minputfield)
}
function RemoveEntry(element){
    let uid=element.getAttribute(EXTRAPARAM).split("_")
    delete jsondata[uid[0]][uid[1]][jsondata[uid[0]][STRUCT][uid[2]]["text"]][CONTENT][uid[3]]
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
    
    
    label.textContent=fieldentrydata["text"]
    if(fieldentrydata["tagdata"]["type"]=="checkbox"){//exception
        label.textContent=""
    }
    fieldentry.appendChild(label)

    if(fieldentrydata["minput"]==1){
        data[fieldentrydata["text"]]={}
        data[fieldentrydata["text"]][COUNT]=0
        data[fieldentrydata["text"]][CONTENT]={}
        
        let minput=document.createElement("div")
        minput.classList.add("minput")

        let addbutton=document.createElement("button")
        addbutton.classList.add("minput-button")
        addbutton.setAttribute("onclick","AddEntry(this)")
        addbutton.setAttribute(EXTRAPARAM,uid)
        addbutton.textContent="+ Add"
        minput.appendChild(addbutton)
        fieldentry.appendChild(minput)
    }
    else{//fieldentrydata[minput]==0
        data[fieldentrydata["text"]]={
            "id":uid,
            "value":null
        }
        
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
    // console.log(name,jsondata[name])
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