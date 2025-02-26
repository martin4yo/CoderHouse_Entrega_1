const db = require('./db')

class Products {

    constructor(){
        this.filename = "../Entrega_1/src/db/products.json" 
        this.table = db.initTable(this.filename)
    }

    //Recupera los productos
    getProducts(){
        return db.initTable(this.filename)
    }
    
    //Guarda los productos
    saveProducts(data){
        return db.refreshTable(this.filename, data)
    }
    
}

module.exports = { Products }