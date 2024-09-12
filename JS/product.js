let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
search.classList.toggle('active');
cart.classList.remove('active');
navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
navbar.classList.toggle('active');
cart.classList.remove('active');
search.classList.remove('active');
}

let user = document.querySelector('body');

document.querySelector('#user-icon').onclick = () => {
  user.classList.toggle('active');
  
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white';
  user.classList.remove('active');
}







const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const  closeCart = document.querySelector('#cart-close');





cartIcon.addEventListener('click', () => {
  cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
  });


  if(document.readyState == "loading"){
     document.addEventListener('DOMContentLoaded', start);
  }else{
    start();
  }


  function start(){
    addEvents();
  }


  function update(){

    addEvents();
    updateTotal();

  }


  function addEvents(){
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
      btn.addEventListener('click', handle_removeCartItem);
    });

    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach((input) => {
      input.addEventListener('change', handle_changeItemQuantity);
    });

    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach((btn) => {
        btn.addEventListener('click', handle_addCartItem);
  });

  const buy_btn = document.querySelector('.btn-buy');
  buy_btn.addEventListener('click', handle_buyOrder);

}

   let itemsAdded = []

  function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgsrc = product.querySelector('.product-img').src;
    console.log(title, price, imgsrc);

    let newToAdd = {
      title,
      price,
      imgsrc,
    };


     if(itemsAdded.find(el => el.title == newToAdd.title))
     {
      alert("This Item Is Already Added");
      return;
     }else{
      itemsAdded.push(newToAdd);
     }

    let cartBoxElement = cartBoxComponent(title, price, imgsrc);
    let newNode = document.createElement('div');
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(newNode);

    update();
    
  }


  function handle_removeCartItem(){
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter(el=> el.title != this.parentElement.querySelector('.cart-product-title').innerHTML );

    update();
  }

  function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
  
    }
    this.value = Math.floor(this.value)
    update();
  }

  function handle_buyOrder(){
    if(itemsAdded.length <= 0) {
      alert("No Items To Buy \n please make an order first.");
      return;
    }
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = "";
    alert('Your order has been placed successfully :)')
    
    itemsAdded = [];
    update();
  }

  function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach((cartBox) => {
     let priceElement = cartBox.querySelector('.cart-price');
     let price = parseFloat(priceElement.innerHTML.replace("$",""));
     let quantity = cartBox.querySelector('.cart-quantity').value;
     total += price * quantity;
    });

    total = total.toFixed(2);

    totalElement.innerHTML = "$" + total;
  }



function cartBoxComponent(title, price, imgsrc){
  return ` 
  <div class="cart-box">
      <img src=${imgsrc} alt="" class="cart-img">
      <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="fa-solid fa-trash cart-remove" ></i>
  </div> `;
}
