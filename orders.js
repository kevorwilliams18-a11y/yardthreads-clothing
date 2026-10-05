// Public EmailJS integration IDs. The Gmail connection stays in EmailJS.
const orderEmail={service:'service_6hsz56e',template:'template_gh2e6x7',publicKey:'9ALgMzLobpB_PJ3Vu'};
(()=>{
const checkout=document.querySelector('.checkout'),status=document.querySelector('#cart-status');
let sending=false,submitted=false;
function lockCart(locked){document.querySelectorAll('.cart-actions button,.continue-shopping,.cart-close,.cart-open').forEach(button=>{if(locked){button.dataset.orderDisabled=String(button.disabled);button.disabled=true;}else{button.disabled=button.dataset.orderDisabled==='true';delete button.dataset.orderDisabled;}});}
function available(){return cart.length>0&&cart.every(row=>availableSizes.includes(row.size)&&row.quantity<=(products[row.product]?.stock[row.color]?.[row.size]||0));}
function update(){checkout.disabled=sending||submitted||!available();checkout.textContent=sending?'Placing your order…':submitted?'Order sent':available()?'Place order':'Checkout unavailable — out of stock';}
const baseRender=renderCart;renderCart=function(){baseRender();update();};
checkout.addEventListener('click',async()=>{
if(sending||submitted||!available())return;
if(!window.yardthreadsDelivery.isComplete()){document.querySelector('#delivery-form').reportValidity();return;}
const method=document.querySelector('[name=payment-method]:checked');
if(!method){status.textContent='Choose Bank Transfer or Cash on Delivery.';return;}
const reference='YT-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomUUID().slice(0,6).toUpperCase();
const params={order_id:reference,order_date:new Date().toLocaleString('en-JM',{timeZone:'America/Jamaica'}),order_items:cart.map(row=>`${products[row.product].name} | Size: ${row.size} | Colour: ${names[row.color]} | Qty: ${row.quantity} | JMD $${products[row.product].price.toLocaleString('en-JM')} each | JMD $${(products[row.product].price*row.quantity).toLocaleString('en-JM')}`).join('\n'),order_total:cart.reduce((sum,row)=>sum+products[row.product].price*row.quantity,0).toLocaleString('en-JM'),payment_method:method.value==='bank-transfer'?'Bank Transfer':'Cash on Delivery',...window.yardthreadsDelivery.getDetails()};
sending=true;lockCart(true);update();status.textContent='Sending your order. Please keep this page open.';
const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),25000);
try{
const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service_id:orderEmail.service,template_id:orderEmail.template,user_id:orderEmail.publicKey,template_params:params}),signal:controller.signal});
if(!response.ok){if(response.status<500){status.textContent='Your order could not be sent. Please try again later or contact yardthreads@gmail.com.';return;}throw new Error('Uncertain delivery');}
submitted=true;cart=[];saveCart();renderCart();status.textContent=`Thank you! Order ${reference} has been placed. Check your email, including spam. We will confirm availability, delivery cost and payment instructions. Payment is pending.`;
document.querySelector('#delivery-form').reset();document.querySelector('#delivery-status').textContent='';
}catch{ // The service may have received it; avoid automatic duplicate submissions.
submitted=true;status.textContent=`We could not confirm whether order ${reference} was received. Contact yardthreads@gmail.com with this reference before placing it again.`;
}finally{clearTimeout(timeout);sending=false;lockCart(false);update();}
});update();
})();
