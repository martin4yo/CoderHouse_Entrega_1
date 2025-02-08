const db = require('./db')

class Carts {

    constructor(){
        this.filename = "../Entrega_1/db/carts.json" 
        this.table = db.initTable(this.filename)
    }

    getCarts(){
        return db.initTable(this.filename)
    }
  
    saveCarts(data){
        return db.refreshTable(this.filename, data)
    }
    
}

module.exports = { Carts }