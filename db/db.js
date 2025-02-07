const { error } = require("console");
const fs = require("fs");

function initTable(filename){

    let carts = []
    // Si el archivo para guardar los productos no existe lo crea
    if (fs.existsSync(filename)) {
                try {
                    let productos_file 
                    productos_file = fs.readFileSync(filename, "utf8")
                    productos = JSON.parse(productos_file) // Contenido del archivo leído en formato objeto    
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

    return productos;

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

/*

// 2. readFile
// Para obtener el contenido de un archivo usando un callback que recibe el error y el contenido del archivo:

fs.readFile('archivo.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
    } else {
        console.log('Contenido del archivo:');
        console.log(data);
    }
});

// 3. appendFile
// Para añadir contenido a un archivo sin sobreescribirlo:

const additionalContent = '\nEste es un texto adicional.';

fs.appendFile('archivo.txt', additionalContent, (err) => {
    if (err) {
        console.error('Error al añadir contenido al archivo:', err);
    } else {
        console.log('Contenido añadido al archivo correctamente.');
    }
});

// 4. unlink
// Para eliminar un archivo usando un callback que maneja errores:

*/