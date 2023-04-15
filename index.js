import express from "express";
import cors from "cors";

import { loadBackend_njo } from "./routes/index-njo.js";
import { loadBackend_ala } from "./routes/index-ala.js";
var app = express();
app.use(cors());

import { handler } from "./frontend/build/handler.js";

var port = process.env.PORT || 3000;



//var routeARM = require("./routes/index-arm");

app.use(express.json())
//app.use("/", express.static("./public"));






//Rutas

    
loadBackend_njo(app);
loadBackend_ala(app);
    
    //routeARM(app);
app.use(handler);
    
    app.listen(port, () => {
    console.log(`Server ready in  port ${port}`);

});