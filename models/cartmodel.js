module.exports = function Cart(oldcart){ //console.log(oldcart);
  
    this.totalitems = oldcart.totalitems || {}
    this.totalQty   = oldcart.totalQty   || 0
    this.totalPrice = oldcart.totalPrice || 0

    this.add = function(item,id){   //console.log(item,id)
       
        var storedItem = this.totalitems[id];  // valid if item is already present in session
        if(storedItem == undefined){ 
            storedItem = this.totalitems[id] = { 
                                            item : item,
                                            qty : 0, 
                                            price : 0,
                                        }
        } 
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;

        this.totalQty++;
        this.totalPrice = this.totalPrice + storedItem.item.price
        // console.log(this)
    }

    this.generateArray = function(){
        var arr = [];        
        Object.keys(this.totalitems).forEach(function(element){ 
            arr.push(element)
        })
        return arr;
    }
}