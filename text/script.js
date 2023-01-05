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
const ORDER=[INTRO,EXPERIENCE,PROJECT,SKILL,CERTIFICATE,ACHIEVEMENT,POR]

function struct(text,tag,tagdata,minput=0){
    return {text,minput,tag:tag,tagdata:tagdata}
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

function generateCateogrySection(categoryname,sectioncount,data={}){
    let section=document.createElement("div");
    let sectioncontent=document.createElement("div");
    
    let removesectionbutton=document.createElement("button");
    section.appendChild(sectioncontent);
    section.appendChild(removesectionbutton);
    return section;
}
function generateCategory(categoryname,data={}){
    console.log("Generating Category :",categoryname);
    let category=document.createElement("div");
    if(data[COUNT]!=0){
        console.log("Data Exist");
        for(let i=0;i<data[COUNT];i++){
            category.appendChild(generateCateogrySection(categoryname,i,data[i]));
        }
    }
    else{
        console.log("Empty Data");
        // category.appendChild(generateCateogrySection(categoryname,i));
    }
    let addsectionbutton=document.createElement("button");
    category.appendChild(addsectionbutton);
    return category;
}
function generateForm(element,data={}){
    console.log(jsondata);
    ORDER.forEach(category => {
        if(data[category]!=undefined){
            console.log("Passed Data ",category,data[category]);
            element.appendChild(generateCategory(category,data[category]));
        }
        else{
            console.log("Default Data ",category);
            element.appendChild(generateCategory(category));
        }
    });
}
document.body.onload=generateForm(document.getElementsByClassName("main")[0],{});