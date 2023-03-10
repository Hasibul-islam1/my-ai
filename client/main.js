import bot from './assets/chatbot-icon.svg';
import user from './assets/man-and-woman-user-icon.svg';
const from =document.querySelector("form");
const chatContainer =document.querySelector("#chat_container");

let loadInterval;

function loder(element){
element.textContent =''

loadInterval = setInterval(()=>{
  element.textContent += '.';

  if(element.textContent === '....'){
    element.textContent = '';
  }

},300)
}

function typeText(element,text){
  let index = 0

  let interval = setInterval(()=>{
    if(index <text.length){
      element.innerHTML += text.chartAt(index);
      index++
    } else{
      clearInterval(interval);
    }
  },20)
}

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe (isAi,value,uniqueId){
 return(
  `
    <div class ="wrapper ${isAi && 'ai'}">
    <div class ="chat">
    <div className="profile">
    <img src ="${isAi? bot : user}"
    alt ="${isAi ?'bot ':' user'}
    />
    </div>
    <div class ="message" id=${uniqueId}>${value}</div>
    </div>
    </div>

  ` 
 )
}

const handleSubmit = async(e)=>{
  e.preventDefault();

  const data =new FormData(form);
  //user'chatstr
  chatContainer.innerHTML += chatStripe(false,data.get('prompt'));

  form.reset()

  //bot's chatstripe
  const uniqueId =generateUniqueId();
  chatContainer.innerHTML += chatStripe(true,"", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loder(messageDiv);
}


  from.addEventListener('submit',handleSubmit);
  from.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13){
      handleSubmit(e);
    }
  })