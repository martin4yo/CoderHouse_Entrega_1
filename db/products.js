const db = require('./db')

class Products {

    constructor(){
        this.filename = "../Entrega_1/db/products.json" 
        this.table = db.initTable(this.filename)
    }

    getProducts(){
        return db.initTable(this.filename)
    }
   
    saveProducts(data){
        return db.refreshTable(this.filename, data)
    }
    
}

module.exports = { Products }