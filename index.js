const http = require("http");
const url = require("url");

// Paso 1
const { insertar } = require("./consultas");
const { consultar } = require("./consultas");
const { editar } = require("./consultas");
const { eliminar } = require("./consultas");
// Paso 2
const fs = require("fs");
http
    .createServer(async (req, res) => {
        if (req.url == "/" && req.method === "GET") {
            // Paso 3
            res.setHeader("content-type", "text/html");
            // Paso 4
            const html = fs.readFileSync("index.html", "utf8");
            res.end(html);
        }

        if ((req.url == "/cancion" && req.method == "POST")) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                const datos = Object.values(JSON.parse(body));
                const respuesta = await insertar(datos);
                res.statusCode = 201
                res.end(JSON.stringify(respuesta));
                });
        }

        if (req.url == "/canciones" && req.method === "GET") {
            // Paso 2
            const registros = await consultar();
            // Paso 3
            res.end(JSON.stringify(registros, null, 1));
        }

        if (req.url == "/cancion" && req.method == "PUT") {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                const datos = Object.values(JSON.parse(body));
                // Paso 2
                const respuesta = await editar(datos);
                res.end(JSON.stringify(respuesta));
            });
        }

        // Paso 2
        if (req.url.startsWith("/cancion") && req.method == "DELETE") {
            // Paso 3
            const { id } = url.parse(req.url, true).query;
            // Paso 4
            const respuesta = await eliminar(id);
            res.end(JSON.stringify(respuesta));
        }

    })
    .listen(3000,()=>console.log('SERVER ON'))