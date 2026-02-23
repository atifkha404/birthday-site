const STORED_HASH="ZmFjZWJvb2s="; // "facebook" in base64

const pinInput=document.getElementById("pinInput");
const unlockBtn=document.getElementById("unlockBtn");
const errorMsg=document.getElementById("errorMsg");
const hintBtn=document.getElementById("hintBtn");
const hintBox=document.getElementById("hintBox");

let attempts=0;

function encodePin(pin){
  try{return btoa(pin)}catch{return""}
}

function showError(msg){
  errorMsg.textContent=msg;
  errorMsg.classList.add("visible");
}

function handleLogin(){

  if(!pinInput.value){
    showError("Hey! Pehle Password to dal Moti 😄");
    return;
  }

  if(encodePin(pinInput.value)===STORED_HASH){

    showError("🎉 YAY! You did it!");

    // 👇 music autoplay signal
    localStorage.setItem("playMusic","yes");

    // 👇 redirect (only once!)
    setTimeout(()=>{
      window.location.href="main.html";
    },900);

  }else{
    attempts++;
    showError("Nice try 😏 but acche se soch.");
    pinInput.value="";
    pinInput.focus();

    if(attempts>=3){
      hintBox.classList.add("show");
    }
  }
}

unlockBtn.addEventListener("click",handleLogin);

pinInput.addEventListener("keypress",e=>{
  if(e.key==="Enter") handleLogin();
});

hintBtn.addEventListener("click",e=>{
  e.stopPropagation();
  hintBox.classList.toggle("show");
});

document.addEventListener("click",e=>{
  if(!hintBox.contains(e.target)&&e.target!==hintBtn){
    hintBox.classList.remove("show");
  }
});