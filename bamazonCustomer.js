var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify');

//establish connection with mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connection id:" + connection.threadId);
    runRelics(); // run store


});

//need these to be global
var lines = "*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*"



var runRelics = function() {

    var query = "SELECT * FROM products"
    connection.query(query, function(err, res) {
        console.log(lines);
        console.log(lines);
        console.log(columnify(res));
        console.log(lines);
        console.log(lines);
        //browseRelics();
        completePurchase();
    });
}


//new connection attempt
var completePurchase = function(){

var query = "SELECT * FROM products"
    connection.query(query, function(err, res) {

//console.log(res);
    inquirer.prompt([

        {
            name: "browseID",
            message: "Like our inventory, select the item by id to make a purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, 
        {
            name: "purchase",
            message: "Deposit the exact amount to complete you purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
        }

    ]).then(function(checkout){
        var idSelection = parseINT(res[checkout.browseID -1].stock_quantity);

        var makeDeposit = parseINT(res[request.purchase -1].price); 

        if (idSelection === res.item_id){
            var query = "UPDATE item_id SET stock_quantity = ?  WHERE item_id = ?";
    
            connection.query(query, [(idSelection - stock_quantity), checkout.browseID], function(err, res) {
                if (err) throw err;
                console.log(res[checkout.browseID -1].product_name + " : $" + makeDeposit);
                console.log("I approve of your purchase");
                runRelics();
            });
        }   
        else{
            console.log(lines);
            console.log(lines);
            console.log("Insufficient Funds")
            console.log("Whoa, Whoa, WHOA, make sure you deposit the correct amount pls.");
            console.log(lines);
            console.log(lines);
            completePurchase();
        }

        
    });

    }); 
}
//



/*i think im nesting too much 
var browseRelics = function() {
    var query = "SELECT * FROM products"
    connection.query(query, function(err, res) {

    inquirer.prompt([

        {
            name: "browse",
            message: "Like our inventory, select the item by id to make a purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "purchase",
            message: "Deposit the exact amount to complete you purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function(request) {
        var idSelection = parseInt(res[request.browse -1].stock_quantity);

        var makeDeposit = parseInt(res[request.purchase -1].price);
        completePurchase();

    });
    
    });
}

function completePurchase() {
    var query = "SELECT item_id FROM products WHERE ?";
    connection.query(query, [idSelection], function(err, res) {
        if (err) throw err;
        if (makeDeposit > res[i].price) {
            console.log("Whoa, Whoa, WHOA, make sure you deposit the correct amount pls.");
        } else {
            console.log("I approve of your purchase");
            var query = "DELETE FROM products WHERE ?";
            connection.query(query, [{ id: idSelection }], function(err, res) {

            });
        }


    });

}

*/

//module.exports = bamazonCustomer;

