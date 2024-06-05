//---------------CLASE 1------------------------------------

let j //Puede cambiar de valor
const i = 1 //Es constante, no puede cambira de valor

//Funciones
//const Nombre_de_la_función = (parametro1,parametero2) => Lo que va en el return
const saludar1 = () => { 'Hola ${nombre}' }
//Callback poner una función en el parámetro de una función

//El simbolo + puede ser reemplazado por el ${} Ej:

let msj = 'Mi nombre es :' + nombre
let msj2 = `Mi nombre es ${nombre}
Este mensaje se puede mostrar en varias lineas.`

//Closure: cuando en un función se utiliza una variable fuera de la función
//Clases
class Persona {
    constructor(nombre) { //Aquí se indican las propiedades de la clase

    }

    static variableEstatica = 0;

    obtenerNombre() {    //Método que se encarga de devolver el nombre del objeto
        return this.nombre;
    }
    getVariableEstatica() {
        return Persona.variableEstatica; //Devuelve la variableestatica de una persona
    }
}

const persona1 = new Persona('Juan'); //Creo a una persona
persona1.obtenerNombre(); //Llamo al método que devuelve el nombre de la persona
Persona.variableEstatica; //para llamar la variable estatica

//---------------CLASE 3------------------------------------
//Ejemplo de callback
const suma = (a, b) => a + b;

const operación = (a, b, callback) => callback(a, b)

console.log(operaciones(1, 2, suma))

/*
setTimeout(()=>{
Lo de aquí dentro tardará tres segundos en ejecutarse
},3000)
*/

//Promesa. En esta función se ejecutará reject cuando b===0 y sino se resolverá,
//pero esta función devuelve una promesa que hay que resolver
const division = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("No se puede dividir por 0");
        } else resolve(a / b);
    })
}
//Para resolver la promesa se utiliza then para un resultado deseado y catch para un resultado no deseado
division(1, 3)
    .then((result) => { console.log(result) })
    .catch((err) => { console.log(err) })
    .finally(() => console.log('Finalizó el proceso')) //Finally es opcional y   se ejecuta cuando se finaliza el proceso

//con fetch se llama a una api y se debe resolver la promesa de la api con muchos then y un catch

//async indica que la función se ejecuta de manera asincrorno, await sirve para esperar el resultado de la promesa

const division2 = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("No se puede dividir por 0");
        } else resolve(a / b);
    })
}

const division2Resolución = async (a, b) => {
    try { //funciona como then
        return await divisionPromesa(a, b);
    } catch (error) { //funciona como catch
        console.log(error)
    }
};

//---------------CLASE 4------------------------------------
const fs = require('fs'); //modulo para manejo de archivos
Sync //Método sincrónico, si no tiene Sync es asincrónico

const path = './file1' //ubicación del archivo

if (fs.existSync(path)) { //verificar si existe
    const info = fs.readFileSync(path, 'utf-8') //Leer en utf-8
    console, log(info);//muestra información del archivo
    fs.appendFileSync(path, 'Chau mundo') //Agregar información
} else {
    fs.writeFileSync(path, 'Hola mundo') //método de escritura en el archivo dentro de la variable path
}

//Lo anterior pero con promesas
const fs = require('fs');
const path2 = './file1'
if (fs.existsSync(path2)) { //si el archivo existe
    fs.promises.readFile(path2, 'utf-8') //Crea una promesa y lee el archivo//.promises indica que vamos a utilizar y crear una promesa, por lo tanto devuelve una promesa
        .then((info) => { //resolución de promesa
            console.log(info) //devolver información del archivo por consola
            return fs.promises.appendFile(path, ', chau mundo')//Crea una promesa y agrega texto
        }
        )
        .then(() => console.log('se adicionó la frase'))
        .catch((error) => console.log(error))
} else { //si el archivo no existe
    fs.promises.writeFile(path, 'hola mundo')
        .then(() => console.log('archivo creado con éxito'))
        .catch((error) => console.log(error))
}

/*------------------------*/
//Creación de array de objetos
const products = [
    {
        name: "prod1",
        price: 500,
        stock: 50,
    },
    {
        name: "prod2",
        price: 700,
        stock: 80,
    }
]

const pathJSON = './products.json' //ruta de archivo JSON
//Pasar estos objetos a texto plano del tipo JSON

fs.writeFileSync(pathJSON, JSON.stringify(products)) //JSON.Stringify pasa a formato JSON para gusardarla
const info = fs.readFileSync(pathJSON, 'utf-8') //leer el archivo
const infoJS = JSON.parse(info) //Leer la información en formato JSON
/*----------------------- */
class UserManager { //01:32:06 de video
    constructor(path) {
        this.path = path
    }

    async getUsers() {//Método asincrónico
        try {

        } catch (error) {
            console.log();
        }
    }
    async createUser(user) {
        try {

        } catch (error) {
            console.log();
        }
    }
}
//---------------CLASE 5------------------------------------
//El objetivo es guardar la contraseña del usuario hasheada
const fs = require('fs');
const crypto = require('crypto')

class UserManager {
    constructor(path) {
        this.path = path
    }
    async getUsers() {//Método asincrónico
        if (fs.existsSync(this.path)) { //Comprobar si existe el archivo
            const usersFile = await fs.promises.readFile(this.path, 'utf-8') //se utiliza en una función async para esperar a que una Promise se resuelva o rechace
            return JSON.parse(usersFile); //convertir una cadena de texto en formato JSON (almacenada en usersFile) en un objeto JavaScript.
        }
        return [] //Si el archivo no existe retorna un array vacio
    }
    async createUser(user) {
        const users = await this.getUsers();
        user.salt = crypto.randomBytes(128).toString() //Genera una contraseña random, este user.salt luego se utiliza para encriptar la contraseña que ingresa el usuario al iniciar sesión y así comparar las dos contraseñas encriptadas
        user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex') //sha256 es el método de encriptación, .update se le dice a que propiedad se aplica esta encriptación, .digest es el formato por el cual va a devolver la contraseña
        console.log(user.password)
        users.push(user);
        await fs.promises.writeFile(this.path, JSON.stringify(users))
    }

    async validateUser(username, password) { //Log in del usuario
        const users = await this.getUsers(); //Traer lista de usuarios
        const user = user.find((u) => u.username === username) //Comprobar que el usuario existe
        if (!user) return 'Error: Usuario incorrecto'; //Decir que el usuario es incorrecto si el usuario no existe
        //Ahora hay que encriptar esta contraseña que llega y comparar esta encriptación con la que tenemos guardada
        const newCrypto = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex')
        if (user.password === newCrypto) return 'Logueado'
        else return 'No logueado'

    }

}

const user = {
    firstname: 'Juan',
    lastname: 'perez',
    username: 'Jperez',
    password: '1234'
}

const manager = new UserManager('./users.json');
const test = async () => {
    // await manager.createUser(user) //Crear usuario
    // console.log(await manager.validateUser('Jperez','1234')) //Validar usuario

}

//En esta clase se muestra como instalar un libreria externa de npm

//---------------CLASE 6------------------------------------
//npm init -y para crear package JSON y editar "type=module" y luego crear archivo server-http.js
//Dentro del archivo server-https.js se escribe lop siguiente
import http from 'http'


const server = http.createServer((req, res) => {//Crear servidor, req es el request del cliente y response es la respuesta que se le dará
    res.end('Mi primer servidor con http') //Respuesta a request de cliente
})

server.listen(8080, () => console.log('server ok en puerto 8080'))//Usar entre 8000 y 9000 //PAra ver la respuesta en postman usar solicitud tipo GET y localhost:8080
/*En package.json editar 
"scripts" : {
    "start": "node server-http.js"
    "dev": "nodemon server-http.js" o "dev": "nodemon ." y en "main":"server-http.js"
}*/
//Endpoint es una url donde se solicita información y se da una respuesta
//Ver minuto 00:44:00 hasta 00:49:30

//npm i express para instalar express

/************************************* */
//Crear server con express, crear endpoint de tipo get, estos cambios se hacen en el archivo server-express.js
import express from 'express'
import { UserManager } from '/user.manager.js'
const app = express()

app.get('/products', (req, res) => {
    //res.send('Mi primer servidor con express')//Respuesta a localhost:8080/products
    //res.json({msg: 'hola'}) //Respuesta de tipo JSON
    //res.json(products); devolución de array de productos
    //res.status(404).json({msg: 'ruta inexistente'})
})

app.get('users', async (req, res) => { //async indica que es asincrono
    try {
        const users = await UserManager.getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ msg: 'server error' })
    }
})


const PORT = 8080
app.listen(PORT, () => console.log(`Server ok on port ${PORT}`))

//ver de 01:28:00 a 01:40:00 para entender req.query

//---------------CLASE 7------------------------------------
//Inicio en 00:23:00
//00:23:00 hasta 00:39:00 haciendo un CRUD

//en user.manager.js
import { v4 as uuidv4 } from "uuid";
export class UserManager {
    async create(obj) {
        try {
            const user = { //Creación de usuario
                id: uuidv4(),
                ...obj
            };
            const userFile = await this.getUsers();
            const userExist = usersFile.find((u) => u.username === user.username); //Buscar al usuario
            if (userExist) return 'User already exist'


            usersFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
        } catch (error) {
            console.log(error)
        }
    }

    async getUserById(id){
        try{
            const userFile = await this.getUsers();
            const userExist = userFile.find((u) => u.username === id);
            if(!userExist) return null;
            return userExist;
        }catch (error) {
            console.log(error)
        }
    }

    async updateUser(obje, id){

    }
}

//---------------CLASE 8------------------------------------
//La primer media hora consiste en el manejo de rutas
//Utilizar router para mejorar el manejo de las rutas
import { Router } from "express";
const router = express();
 //en todos los app que tengan una ruta, se debe reemplazar app por router
 app.use('/users', userRouter); //
 //En el archivo userT¿Router es donde están las rutas

 //00:30:00 se explica static y midleware
 //50:00 uso de archivos estáticos
 //01:10:00 Explicación de midleware
 //01:18:00 instalar multer

//---------------CLASE 9------------------------------------

//---------------CLASE 10------------------------------------
//00:32:00 finalizada la conecxión cliente servidor y luego configura la desconexión de usuario
//Se puede emitir mensajes al conectar con el cliente
//---------------CLASE 11------------------------------------
//La clase inicia en el minuto 00:11:00



