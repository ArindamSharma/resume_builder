
function raiseFrame(id){
    let slides = document.getElementsByClassName("frame");
    for (let i = 0; i < slides.length; i++) {
        slides.item(i).style.zIndex=1;
    }
    document.getElementById(id).style.zIndex=2;
}

function OnLoad(){
    raiseFrame("main")
    // raiseFrame("form")
}