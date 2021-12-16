const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    port: 5432,
    // Paso 1
    database: "repertorio",
});
// Paso 2
const insertar = async (datos) => {
    // Paso 3
    const consulta = {
        text: "INSERT INTO repertorio (cancion,artista,tono) VALUES ($1, $2, $3) RETURNING *",
        values: datos,
        //rowMode: "array"
    };
    try {
        const result = await pool.query(consulta);
        console.log(`Registro agregado con éxito.`);
        //console.log(result.rows[0])
        return result;
    } catch (error) {
        // Paso 4
        console.log(error.code);
        return error;
    }
};

// definiendo funcion consultar
const consultar = async () => {
    // Paso 2
    try {
        const result = await pool.query("SELECT * FROM repertorio");
        //console.log(result);
        return result;
    } catch (error) {
        // Paso 3
        console.log(error.code);
        return error;
    }
};

// definiendo funcion editar
const editar = async (datos) => {

    const consulta = {
        text:`UPDATE repertorio SET
        cancion = $2,
        artista = $3,
        tono = $4
        WHERE id = $1 RETURNING *;`,
        values: datos,
    };

    try {
        const result = await pool.query(consulta);
        console.log(`Registro actualizado con éxito.`);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// definiendo funcion eliminar
const eliminar = async (id) => {
    // Paso 2
    try {
        const result = await pool.query(
            `DELETE FROM repertorio WHERE id ='${id}'`
        );
        //return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

module.exports = { insertar, consultar, editar, eliminar };