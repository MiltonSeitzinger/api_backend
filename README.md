# API BACKEND

## Como ejecutar 🚀

_Para poder probar se debe realizar peticiones a través de postman o insomnia a las siguiente url:_

### USERS

#### Obtener los usuarios registrados.

```
GET -> https://www.apibackend.website/api/users/
```

_Lista todos los email de los usuarios registrados, para realizar la petición se necesita token._
_El formato de respuesta es la siguiente:_

```
  {
    "error": false,
    "message": [
      {
        "email": "email1@gmail.com"
      },
      {
        "email": "email2@gmail.com"
      },
      {
        "email": "email3@gmail.com"
      },
      {
        "email": "email4@gmail.com"
      }
    ]
  }
```

#### Agregar un nuevo usuarios.

```
POST -> https://www.apibackend.website/api/users/add_user
```

_Se utiliza para poder registrar un nuevo usuario en el sistema, el formato del json a enviar es el siguiente:_

```
  {
    "user": {
      "email": "email7@gmail.com",
      "password": "pass123"
    }
  }
```

_El formato de respuesta es la siguiente:_

```
  {
    "error": false,
    "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsOEBnbWFpbC5jb20iLCJpYXQiOjE2NTc3NjI3MzUsImV4cCI6MTY1NzkzNTUzNX0.aPAxYZpZIdXhQEDiEPhB78-O2LaUJmwInPDGo7PvKJU"
  }
```

#### Login de un usuarios.

```
POST -> https://www.apibackend.website/api/users/login
```

_Se utiliza para el login de un usuario, comprobando email y contraseña, el formato del json a enviar es el siguiente:_

```
  {
    "user": {
      "email": "email7@gmail.com",
      "password": "pass123"
    }
  }
```

_Formato de respuesta:_

```
  {
    "error": false,
    "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsN0BnbWFpbC5jb20iLCJpYXQiOjE2NTc3NjI4NzIsImV4cCI6MTY1NzkzNTY3Mn0.tt-Su2V7aOv0vkS0nsCtQ7ctiY343Fu9gvK_7vHmocc"
  }
```

### POSTS

#### Obtener los posts de la API.

```
GET -> https://www.apibackend.website/api/posts/
```

_Te lista los posts de acuerdo a los parámetros que se pasan, para realizar la petición se necesita token._

_El formato del json para enviar es el siguiente:_

```
  {
    "limit":30,
    "offset":99
  }
```

_El formato de respuesta es la siguiente:_

```
  {
  "error": false,
  "message": [
    {
      "userId": 10,
      "id": 99,
      "title": "temporibus sit alias delectus eligendi possimus magni",
      "body": "quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis nihil\nitaque dolorem quia"
    },
    {
      "userId": 10,
      "id": 100,
      "title": "at nam consequatur ea labore ea harum",
      "body": "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
    }
  ]
```

### PHOTOS

#### Obtener las photos de la API.

```
GET -> https://www.apibackend.website/api/photos/
```

_Te lista las photos de acuerdo a los parámetros que se pasan, para realizar la petición se necesita token._

_El formato del json para enviar es el siguiente:_

```
  {
    "limit":10,
    "offset":30
  }
```

_El formato de respuesta es la siguiente:_

```
 {
  "error": false,
  "message": [
    {
      "albumId": 1,
      "id": 30,
      "title": "odio enim voluptatem quidem aut nihil illum",
      "url": "https://via.placeholder.com/600/372c93",
      "thumbnailUrl": "https://via.placeholder.com/150/372c93"
    },
    {
      "albumId": 1,
      "id": 31,
      "title": "voluptate voluptates sequi",
      "url": "https://via.placeholder.com/600/a7c272",
      "thumbnailUrl": "https://via.placeholder.com/150/a7c272"
    },
    {
      "albumId": 1,
      "id": 32,
      "title": "ad enim dignissimos voluptatem similique",
      "url": "https://via.placeholder.com/600/c70a4d",
      "thumbnailUrl": "https://via.placeholder.com/150/c70a4d"
    }]
  }
```

## Test ⚙️

_Los tests se realizan con supertest y should._

_Los test verifican las siguientes cosas:_

### PHOTOS

- _Test sin token en la petición._
- _Test con token en la petición por default (limit = 10 y offset = 0)._
- _Test con offset como parámetro y limit por default._
- _Test con limit como parámetro y offset por default._
- _Test con limit y offset como parámetro._

### POSTS

- _Test sin token en la petición._
- _Test con token en la petición por default (limit = 20 y offset = 0)._
- _Test con offset como parámetro y limit por default._
- _Test con limit como parámetro y offset por default._
- _Test con limit y offset como parámetro._

### USER

- _Test sin datos en agregar nuevo usuario._
- _Test sin email en agregar nuevo usuario._
- _Test sin password en agregar nuevo usuario._
- _Formato de email inválido en agregar nuevo usuario._
- _Registrar el email._
- _Email ya registrado._
- _Test sin datos de login._
- _Test sin email en el login._
- _Test sin password en el login._
- _Formato de email inválido en el login._
- _No está registrado el email._
- _Login correcto._
- _Login con password incorrecta._
- _No existe el endpoint._

_Además realiza la verificación de la sintaxis del código con "grunt-contrib-jshint", con versión 8 /* jshint esversion: 8 */_

_Para ejecutar los test se realiza con el comando: npm run test_

## Construido con 🛠️

_Las herramientas que se utilizó para crear este proyecto_

- [NodeJs](https://nodejs.org/en/) - Node. js es un entorno JavaScript que nos permite ejecutar en el servidor, de manera asíncrona, con una arquitectura orientada a eventos y basado en el motor V8 de Google.
- [MongoDB](https://www.mongodb.com/) - es un sistema de base de datos NoSQL orientado a documentos de código abierto, en lugar de guardar los datos en tablas lo hace en estructuras de datos BSON (similar a JSON) con un esquema dinámico.
- [Grunt] (https://gruntjs.com/) - Grunt es un ejecutador de tareas, se utiliza para la automatización de tests.

### Consideraciones 📄

_La arquitectura utilizada es basada en componentes. Ésta arquitectura permite una gran escalabilidad, y nos permite crecer de manera eficiente agregando o sacando componentes sin afectar el resto del sistema._

_Para poder correr se necesita tener instalado mongoDB y tener un archivo de configuracion .env,con las siguientes variables de entorno:_

```
URLDB = Url de la base de mongo
PORT_API = Puerto donde corre la app de node
TOKEN_SECRET = Token para codificar y decodificar el jwt.
```

_Se utilizó Gruntfile para poder automatizar los diferentes test unitarios, y validación de sintaxis del código._

_Se utiliza axios para poder realizar las peticiones a las api de post y photos._

_Se utiliza bcrypt para poder hashear las contraseñas y no guardarlas como texto plano._

_El proyecto se encuentra alojado en AWS con una máquina con sistema operativo linux._

_El dominio es https://apibackend.website, el cual se obtuvo el certificado ssl con certbot._
