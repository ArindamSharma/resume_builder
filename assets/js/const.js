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
const LABEL="label"
const CONTENT="content"
const EXTRAINFO="extrainfo"
const ORDER=[EDUCATION,EXPERIENCE,PROJECT,SKILL,CERTIFICATE,ACHIEVEMENT,POR,EXTRA]

function struct(text,tag,tagdata,minput=0,extra={}){
    return {
        text:text,
        tag:tag,
        attributes:tagdata,
        extra:extra,
        minput
    }
}

var formStencil={}
formStencil[INTRO]={}
formStencil[INTRO][COUNT]=0;
formStencil[INTRO][LABEL]="Introduction";
formStencil[INTRO][STRUCTURE]=[
    struct("First Name","input",{type:"text"}),
    struct("Last Name","input",{type:"text"}),
    struct("Title","input",{type:"text"}),
    struct("Introduction/Summary","textarea",{cols:30,rows:4,style:"resize: vertical;"}),
    struct("Email","input",{type:"email"},1),
    struct("Address","input",{type:"text"},1),
    struct("Phone Number","input",{type:"number"},1),
    struct("Linkedin Profile","input",{type:"text"}),
    struct("OtherLinks","input",{type:"text"},1),
];
formStencil[EDUCATION]={}
formStencil[EDUCATION][COUNT]=0;
formStencil[EDUCATION][LABEL]="Education";
formStencil[EDUCATION][STRUCTURE]=[
    //format: [label-text ,input-tag ,tag ,type|(col-row),sugession,add:bool]
   struct("School/University","input",{type:"text"},0),
   struct("School Location","input",{type:"text"},0),
   struct("School Type","input",{type:"text"},0,{sugession:["Higher Secondary School","Senior Secondary School","Under-Graduation","Post-Graduation",]}),
   struct("Degree Type","input",{type:"text"},0,{sugession:["None","B.Tech","M.Tech","Dual Degree(B.Tech+M.Tech)",]}),
   struct("Degree","input",{type:"text"},0,{sugession:["None","Computer Science","Computer Science and Engineering"]}),
   struct("CGPA/Percentage","input",{type:"number"},0),
   struct("I am currently studying here.","input",{type:"checkbox",target_index:"8"},0),
   struct("To","input",{type:"month"},0),
   struct("From","input",{type:"month"},0),
   struct("Description","textarea",{cols:30,rows:3,style:"resize: vertical;"},0),
]
formStencil[EXPERIENCE]={}
formStencil[EXPERIENCE][COUNT]=0;
formStencil[EXPERIENCE][LABEL]="Experiences";
formStencil[EXPERIENCE][STRUCTURE]=[
    //format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Position","input",{type:"text"},0),
   struct("Company","input",{type:"text"},0),
   struct("Location","input",{type:"text"},0),
   struct("Description","textarea",{cols:30,rows:3,style:"resize: vertical;"},0),
   struct("I am currently working here.","input",{type:"checkbox",target_index:"6"},0),
   struct("To","input",{type:"month"},0),
   struct("From","input",{type:"month"},0),
]
formStencil[PROJECT]={}
formStencil[PROJECT][COUNT]=0;
formStencil[PROJECT][LABEL]="Projects";
formStencil[PROJECT][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text"},0),
   struct("Description","textarea",{cols:30,rows:5,style:"resize: vertical;"},0),
   struct("Skills (seperate with comma)","input",{type:"text"},1),
   struct("Link","input",{type:"text"},1),
   struct("I am currently working.","input",{type:"checkbox",target_index:"6"},0),
   struct("To","input",{type:"month"},0),
   struct("From","input",{type:"month"},0),
]
formStencil[SKILL]={}
formStencil[SKILL][COUNT]=0;
formStencil[SKILL][LABEL]="Skills";
formStencil[SKILL][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Category","input",{type:"text",placeholder:"programminglanguage/Webtools/Frameworks/...etc"},0),
   struct("Skills","input",{type:"text"},1),
]
formStencil[POR]={}
formStencil[POR][COUNT]=0;
formStencil[POR][LABEL]="Position Of Responsiblity";
formStencil[POR][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text"},0),
   struct("Organization","input",{type:"text"},0),
   struct("To","input",{type:"month"},0),
   struct("From","input",{type:"month"},0),
]
formStencil[ACHIEVEMENT]={}
formStencil[ACHIEVEMENT][COUNT]=0;
formStencil[ACHIEVEMENT][LABEL]="Achievements";
formStencil[ACHIEVEMENT][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text"},0),
   struct("Organization","input",{type:"text"},0),
   struct("Link","input",{type:"text"},1),
   struct("To","input",{type:"month"},0),
   struct("From","input",{type:"month"},0),
]
formStencil[CERTIFICATE]={}
formStencil[CERTIFICATE][COUNT]=0;
formStencil[CERTIFICATE][LABEL]="Certifications";
formStencil[CERTIFICATE][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Title","input",{type:"text"},0),
   struct("Issued Organization","input",{type:"text"},0),
   struct("Issued Date","input",{type:"month"},0),
   struct("This credential does not expire","input",{type:"checkbox",target_index:"4"},0),
   struct("Expiration Date","input",{type:"month"},0),
   struct("Creadential ID","input",{type:"text"},0),
   struct("Creadential URL","input",{type:"url"},0),
]
formStencil[EXTRA]={}
formStencil[EXTRA][COUNT]=0;
formStencil[EXTRA][LABEL]="Extra/Miscellaneous";
formStencil[EXTRA][STRUCTURE]=[
    // format: [label-text ,input-tag ,type|(col-row),sugession,add:bool]
   struct("Label","input",{type:"text"},0),
   struct("Description","textarea",{cols:30,rows:5,style:"resize: vertical;"},1),
]