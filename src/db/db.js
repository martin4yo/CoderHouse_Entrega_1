const { error } = require("console");
const fs = require("fs");

function initTable(filename){

    let data = []
    // Si el archivo para guardar los productos no existe lo crea
    if (fs.existsSync(filename)) {
                try {
                    let data_file 
                    data_file = fs.readFileSync(filename, "utf8")
                    data = JSON.parse(data_file) // Contenido del archivo leído en formato objeto    
                } catch (err) {
                    return console.error("Error al leer el archivo de productos :", err);
                }
            }
        else {
            try {
                fs.writeFileSync(filename, '[]')
            } catch (err) {
                return console.error("Error al crear el archivo de productos :", err);
            }

        }

    return data;

}

function refreshTable(filename, data){
    // Se borra el archivo
    fs.unlinkSync(filename, (err) => {
        if (err) {
            console.error('Error al eliminar el archivo:', err);
        } else {
            console.log('Archivo eliminado correctamente.');
        }
    });

    // Se guarda todo el JSON de nuevo
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), (err)=>{
        if (err) {
            console.error('Error al escribir el archivo:', err);
        } else {
            console.log('Archivo guardado correctamente.');
        }
    })

}

module.exports = { initTable, refreshTable }