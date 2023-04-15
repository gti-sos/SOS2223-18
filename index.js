import express from "express";
import cors from "cors";

import { loadBackend_njo } from "./routes/index-njo.js";
var app = express();
app.use(cors());

import { handler } from "./frontend/build/handler.js";

var port = process.env.PORT || 3000;


//var routeALA = require("./routes/index-ala");
//var routeARM = require("./routes/index-arm");

app.use(express.json())
app.use("/", express.static("./public"));






//Rutas

    
loadBackend_njo(app);

    
    //routeALA(app);
    //routeARM(app);
app.use(handler);
    
    app.listen(port, () => {
    console.log(`Server ready in  port ${port}`);

});