import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/productosdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db =>console.log('Conexion establecida a mongo: ', 27017)).catch(error => console.log(error));