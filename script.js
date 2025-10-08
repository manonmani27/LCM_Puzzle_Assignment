const introSlide = document.getElementById('introSlide');
const gameSlide = document.getElementById('gameSlide');
const completionSlide = document.getElementById('completionSlide');

const startBtn = document.getElementById('startBtn');
const generateBtn = document.getElementById('generateBtn');
const randomBtn = document.getElementById('randomBtn');
const continueBtn = document.getElementById('continueBtn');
const quitBtn = document.getElementById('quitBtn');

const rod1 = document.getElementById('rod1');
const rod2 = document.getElementById('rod2');
const rod3 = document.getElementById('rod3');
const message = document.getElementById('message');

const colors = ["#ff6b6b","#6bcfff","#ffd93d","#7dd87d","#c77dff"];
let multiples1=[], multiples2=[], commonMultiples=[], selectedCount=0;

// Start game
startBtn.addEventListener('click', ()=> {
  introSlide.style.display='none';
  gameSlide.style.display='flex';
});

// Continue → new random puzzle
continueBtn.addEventListener('click', ()=>{
  completionSlide.style.display='none';
  gameSlide.style.display='flex';
  rod1.innerHTML=rod2.innerHTML=rod3.innerHTML='';
  message.textContent='';
  selectedCount=0;
  randomBtn.click();
});

// Quit → back to intro
quitBtn.addEventListener('click', ()=>{
  completionSlide.style.display='none';
  introSlide.style.display='flex';
  rod1.innerHTML=rod2.innerHTML=rod3.innerHTML='';
  message.textContent='';
  selectedCount=0;
});

// Helper functions
function gcd(a,b){return b?gcd(b,a%b):a;}
function lcm(a,b){return (a*b)/gcd(a,b);}

// Generate rods
function generateRods(a,b){
  rod1.innerHTML=rod2.innerHTML=rod3.innerHTML='';
  message.textContent='';
  selectedCount=0;

  let L = lcm(a,b);
  multiples1=[]; multiples2=[]; commonMultiples=[];

  for(let i=a;i<=L;i+=a) multiples1.push(i);
  for(let j=b;j<=L;j+=b) multiples2.push(j);
  commonMultiples = multiples1.filter(x=>multiples2.includes(x));

  // Rod1
  multiples1.forEach((num,i)=>{
    let div=document.createElement('div');
    div.className='block';
    div.style.background=colors[i%colors.length];
    div.textContent=num;
    div.draggable=true;
    div.addEventListener('dragstart', dragStart);
    rod1.appendChild(div);
  });

  // Rod2
  multiples2.forEach((num,i)=>{
    let div=document.createElement('div');
    div.className='block';
    div.style.background=colors[(i+1)%colors.length];
    div.textContent=num;
    div.draggable=true;
    div.addEventListener('dragstart', dragStart);
    rod2.appendChild(div);
  });

  // Rod3 slots
  commonMultiples.forEach(_=>{
    let slot=document.createElement('div');
    slot.className='block empty-slot';
    slot.textContent='';
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', dropBlock);
    slot.addEventListener('dragenter', ()=>slot.classList.add('hovered'));
    slot.addEventListener('dragleave', ()=>slot.classList.remove('hovered'));
    rod3.appendChild(slot);
  });
}

// Drag & Drop
let draggedNumber = null;
function dragStart(e){ draggedNumber = parseInt(e.target.textContent); }
function dragOver(e){ e.preventDefault(); }
function dropBlock(e){
  e.preventDefault();
  e.target.classList.remove('hovered');
  if(commonMultiples.includes(draggedNumber) && e.target.textContent===''){
    e.target.textContent=draggedNumber;
    e.target.style.background=colors[Math.floor(Math.random()*colors.length)];
    e.target.classList.remove('empty-slot');
    selectedCount++;
    playSound('correct');
    message.textContent='';
    if(selectedCount===commonMultiples.length){
      celebrate();
      gameSlide.style.display='none';
      completionSlide.style.display='flex';
    }
  } else {
    playSound('wrong');
    message.textContent='❌ Not correct, try again!';
  }
}

// Buttons
generateBtn.addEventListener('click', ()=>{
  const a=parseInt(document.getElementById('num1').value);
  const b=parseInt(document.getElementById('num2').value);
  if(!a || !b || a<=0 || b<=0){
    message.textContent='Please enter valid positive numbers!';
    return;
  }
  generateRods(a,b);
});

randomBtn.addEventListener('click', ()=>{
  let a=Math.floor(Math.random()*8)+2;
  let b=Math.floor(Math.random()*8)+2;
  document.getElementById('num1').value=a;
  document.getElementById('num2').value=b;
  generateRods(a,b);
});

// Confetti
const confettiCanvas=document.querySelector(".confetti");
const ctx=confettiCanvas.getContext("2d");
let particles=[];
function resizeCanvas(){confettiCanvas.width=window.innerWidth; confettiCanvas.height=window.innerHeight;}
window.addEventListener("resize",resizeCanvas);
resizeCanvas();
function createConfetti(){
  for(let i=0;i<150;i++){
    particles.push({
      x:Math.random()*confettiCanvas.width,
      y:Math.random()*confettiCanvas.height,
      r:Math.random()*4+1,
      d:Math.random()*4,
      color:colors[Math.floor(Math.random()*colors.length)]
    });
  }
}
function drawConfetti(){
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2,false);
    ctx.fillStyle=p.color;
    ctx.fill();
    p.y+=Math.cos(p.d)+1+p.r/2;
    p.x+=Math.sin(p.d);
    if(p.y>confettiCanvas.height){p.x=Math.random()*confettiCanvas.width;p.y=-10;}
  });
  if(particles.length>0) requestAnimationFrame(drawConfetti);
}
function celebrate(){ createConfetti(); setTimeout(()=>{particles=[];ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);},3000); drawConfetti(); }

// Sounds
const correctSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
const wrongSound = new Audio("https://actions.google.com/sounds/v1/cartoon/boing.ogg");
function playSound(type){ if(type==='correct') correctSound.play(); else wrongSound.play(); }
