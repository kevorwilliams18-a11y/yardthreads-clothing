(()=>{
const form=document.querySelector('#delivery-form'),home=document.querySelector('#home-address'),alternate=document.querySelector('#alternate-delivery'),other=document.querySelector('#alternate-address'),phone=document.querySelector('#customer-phone');
function updateAddress(){document.querySelector('#alternate-fields').hidden=!alternate.checked;other.required=alternate.checked;home.required=!alternate.checked;home.setCustomValidity('');other.setCustomValidity('');}
function validate(){const field=alternate.checked?other:home;field.setCustomValidity(field.value.trim().length<8?'Enter the full street address or meeting place, including town and parish.':'');const digits=phone.value.replace(/\D/g,'');phone.setCustomValidity(digits.length<7||digits.length>15?'Enter a valid phone number with 7 to 15 digits, including the country code when needed.':'');return form.checkValidity();}
alternate.addEventListener('change',updateAddress);[home,other,phone].forEach(input=>input.addEventListener('input',()=>input.setCustomValidity('')));updateAddress();
form.addEventListener('submit',e=>e.preventDefault());
document.querySelector('#review-delivery').addEventListener('click',()=>{const status=document.querySelector('#delivery-status');status.textContent='';if(!validate()){form.reportValidity();return;}status.textContent='Contact and delivery details are filled in. Nothing has been submitted; ordering is paused while items are out of stock.';});
window.yardthreadsDelivery={isComplete:validate};
})();
