const db = require('./db')

class Carts {

    constructor(){
        this.filename = "../db/carts.json" 
        this.table = db.initTable(this.filename)
    }

    //Recupera los carritos
    getCarts(){
        return db.initTable(this.filename)
    }
  
    //Guarda los carritos
    saveCarts(data){
        return db.refreshTable(this.filename, data)
    }
    
}

module.exports = { Carts }