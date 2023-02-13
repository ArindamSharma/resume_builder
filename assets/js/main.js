function mlogger(){
    console.log("[main.js]",...arguments);
}
async function OpenFormWithFileUpload(element){
    
    // let p= await FileUploaded(element);
    // mlogger("here",p);
    
}
// function updateJsonDataFromParsedJsonData(data){
//     mlogger(data);
//     jsondata=data// future modification needed
// }

// async function FileUploaded(element){
//     mlogger("File to Read : ",element.value)
//     // const file=element.parentNode.querySelector('input').files[0];
//     const file=element.files[0];
//     let jd;
//     let reader= new FileReader()
//     reader.onload =(e)=>{
//         mlogger("File loaded")
//         const file=e.target.result;
//         const lines=file.split(/\r\n|\n/);
//         jd=lines.join("\n")
//     };
//     reader.onerror=(e)=> alert(e.target.error.name);
//     reader.readAsText(file);
    
//     //update the jsondata extracted from the uploaded file
//     reader.onloadend=(e)=>{
//         mlogger(JSON.parse(jd));
//     }
// }
function resetInput(element){
    element.value="";
}
function FileUploaded(element,openform=false){
    mlogger("File to Read : ",element.value)
    mlogger(element.files[0]);
    if(element.files[0]==undefined){return;}
    let reader= new FileReader();
    reader.readAsText(element.files[0]);
    reader.onload=function(){
        // console.log(JSON.parse(reader.result));
    };
    reader.onerror=function(){
        alert(reader.error);
    };
    reader.onloadend=function(){
        if(openform){
            openForm(JSON.parse(reader.result));
        }
        else{
            userData=JSON.parse(reader.result);
        }; 
    };
}