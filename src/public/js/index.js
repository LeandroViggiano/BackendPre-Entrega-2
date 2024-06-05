const socket = io();

socket.on('saludoDesdeBack', (message)=>{
    console.log(message);
    socket.emit('respuestaDesdeFront', 'Muchas gracias')
})

const form = document.getElementById('form')
const modifyForm = document.getElementById('modifyForm')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const modifyName = document.getElementById('modifyName')
const newPrice = document.getElementById('newPrice')
const productsList = document.getElementById('products')

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price
    };
    socket.emit('newProduct', product);
    inputName.value = '';
    inputPrice.value = '';
}

modifyForm.onsubmit = (e) => {
    e.preventDefault();
    const name = modifyName.value;
    const price = newPrice.value;
    const product = {
        name,
        price
    };
    socket.emit('modifyProduct', product);
    modifyName.value = '';
    newPrice.value = '';
}

socket.on('products', (products) =>{
    let infoProducts = '';
    products.forEach((prod)=>{
        infoProducts += `<li>${prod.name} - ${prod.price}</li>`;
    })
    productsList.innerHTML = infoProducts;
})

socket.on('message', (msg)=>{
    productsList.innerHTML = msg;
})
