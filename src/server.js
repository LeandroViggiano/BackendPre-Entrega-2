import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get('/', (req, res)=>{
  res.render('home')
})

app.get('/realtimeproducts', (req, res)=>{
  res.render('realTimeProducts')
})

const products = [
  { name: 'Juguete', price: 1000 },
  { name: 'Vaso', price: 2000 },
  { name: 'Plato', price: 3000 }
];

const httpServer = app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
  console.log(`Usuario conectado: ${socket.id}`);

  socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

  socket.on('respuestaDesdeFront', (message)=>{
    console.log(message);
  })

  socket.on('newProduct', (product)=>{
    products.push(product);
    socketServer.emit('products', products);
  })

  socket.on('modifyProduct', (modifiedProduct)=>{
    const product = products.find(prod => prod.name === modifiedProduct.name);
    if (product) {
      product.price = modifiedProduct.price;
      socketServer.emit('products', products);
    }
  })

  socket.emit('products', products);

  app.post('/', (req,res)=>{
    const { message } = req.body;
    socketServer.emit('message', message);
    res.send('se envió mensaje al socket del cliente')
  })

})
