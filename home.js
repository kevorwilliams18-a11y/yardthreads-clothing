const motion=document.querySelector('.motion');let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function setMotion(){document.body.classList.toggle('paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Resume animations':'Pause animations');motion.querySelector('span').textContent=paused?'OFF':'ON';}
motion.addEventListener('click',()=>{paused=!paused;setMotion();});setMotion();document.querySelector('#year').textContent=new Date().getFullYear();
try{const saved=JSON.parse(localStorage.getItem('yardthreads-cart-v1')||'[]');if(Array.isArray(saved)){document.querySelector('#home-cart-count').textContent=saved.reduce((n,row)=>n+(Number.isInteger(row?.quantity)&&row.quantity>0&&row.quantity<=99?row.quantity:0),0);}}catch{}
if(location.hash==='#collection')location.replace('collection.html');
