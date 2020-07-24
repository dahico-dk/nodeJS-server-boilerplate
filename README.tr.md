# NodeJS Rest Api Boilerplate (NodeApi)

NodeApi express ile oluşturulmuş bir rest api yaratmak için kullanılabilecek bir projedir. socket.io ve mongodb(mongoose) ile birlikte kullanılabilecek şekilde konfigüre edilmiştir. JWT paketi geliştirme zamanını azaltmak için projeye eklenmiştir.


### Running server 
Sunucuyu başlatacak kod package.json dosyasına işlenmiştir

```
//Sunucuyu başlatmak için
npm run server
```

_Projenin temel ayarları kök dizinde yer alan server-config.json dosyasında yapılabilir_
```

{
    "socket-server":true,   
    "mongo-db-connection":false,
    "mongo-db-connection-string":"mongodb://localhost/test",
    "cors-origin-uri":"CORS-ORİGİN-URI ",
    "use-cors":true,
    "socketio-url":"http://localhost:3000/"
}
```

* *socket-server* : Socket.io'yu açıp kapamak için
* *mongo-db-connection* :Basit MongoDB bağlantısını açıp kapamak için (mongoose)
* *mongo-db-connection-string* : MongoDB bağlantı cümlesi
* *cors-origin-uri* : Cors Origin Uri
* socketio-url : Server URL'i. Socket.IO'da aynı url üzerinde çalışır. Socket.IO'yu test etmek için. 

## Proje Yapısı

```

├───middleware
│   └───auth
│           checkAuth.js  //jwt token doğrulaması
│           secret.js //jwt sırrı
│           signAuth.js //jwt token yaratımı
│
├───MongoDB
│   │   mongooseBuilder.js //mongoose ayarları
│   │
│   └───Models
│           exampleSchema.js
│
├───SocketIO
│       socketserver.js  //socket.io konfigürasyonu
│       socketservertest.js  //socket.io'yu test etmek için
│
└───src
        app-dependencies.js  //bağımlı projeler ve custom middlewarelar
        app-setup.js  //App'in middleware eklenen kısmı
        app.js 


```

### app-dependencies.js dosyası

Projenin bütün bağımlı projeleri burada tanımlanır. Dağınıklığı önlemek amacıyla yaratılmıştır. 

```
//dep objesi app-dependencies.js dosyasını temsil eder.
const dep = require('./app-dependencies');
```
#### jwt token yaratmak

SignAuth metodu ile jwt token'ı yaratılır.
```
//AllowAnonymous
//dep objesi app-dependencies.js dosyasını temsil eder.
app.get("/jwtsign", (req, res, next) => {
  res.json({
    "token": dep.signAuth({ user: "testuser" }),
  })
})
```
#### jwt sırrı

*middleware/auth/secret.js* dosyasında jwt'nin sırrı olan metin bulunur.

#### checkAuth middleware'ı token'ı olmayan istekleri engeller.

```
//Token yoksa 401 dönecektir.
//Şifresi çözülmüş token req.decrypt nesnesinde yer alır.
//dep objesi app-dependencies.js dosyasını temsil eder. 
app.get("/jwtget", dep.checkAuth, (req, res, next) => {
  res.json({
    "decrypted-data": req.decrypt,
  })
})
```

### app-setup.js

ddos, bodyparser, cors gibi npm paketlerini eklemek ve mongodb bağlantısını oluşturmak için eklenmiş bir dosyadır. 

```
app.use(dep.ddos.express);
app.use(dep.bodyParser.json());
```


### Testing socket.io

socket.io'yu test etmek için socketio-client paketini kullanan bir metod projeye eklenmiştir. Bu metod socket.io'ya bağlanıp test için bir mesaj yollar. bu bağlantı için config dosyasında yer alan server adresini kullanır.

```
//socket.io'yu test etmek için
npm run testsocket
```

### MongoDB
mongoose paketi projeye eklenmiştir. MongoDB/mongooseBuilder.js dosyasında basic bir mongoDB bağlantısı için gerekli kod yer almaktır. Konfigurasyon dosyasındaki mongo-db-connection-string özelliğinde belirtilen adresi kullanır. Aynı klasörde bir örnek şema dosyası yer almaktadır.


##### Eklenmiş Paketler
* cors
* ddos
* mongoose
* socketio
* socketio-client
* express
* express
* body-parser
