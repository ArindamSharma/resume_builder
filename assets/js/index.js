
function raiseFrame(id){
    let slides = document.getElementsByClassName("frame");
    for (let i = 0; i < slides.length; i++) {
        slides.item(i).style.zIndex=1;
        slides.item(i).style.display="none";
    }
    document.getElementById(id).style.zIndex=2;
    document.getElementById(id).style.display="flex";
}

function OnLoad(){
    raiseFrame("main")
    // raiseFrame("form")
}