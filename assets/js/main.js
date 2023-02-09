
function FormClose(){
    FormReset()
    document.getElementsByClassName("modal")[0].classList.remove("modal-show")
    document.body.removeAttribute('scroll',"no")
    document.body.removeAttribute('style',"overflow: hidden;")
}
function FormReset(){
    document.getElementsByClassName("modal-sections")[0].scrollTo(0,0);
    
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
    
    // FormOpen(jsondata)
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
    console.log(data);
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