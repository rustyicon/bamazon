var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify');

var lines = "*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*"

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

});

var managerMode = function(){
	inquirer.prompt([
		{
			name:"action",
			type: "list",
			message:"Hey Boss, what changes do you want to make to the store?",
			choices: ["View Products For Sale","View Low Inventory",
					  "Add To Inventory","Add New Product"]
		}
	]).then(function(boss){



		switch (boss.action) {
    		case "View Products For Sale":
        	viewProducts();
        	break;

    		case "View Low Inventory":
        	viewInventory();
        	break;

    		case "Add To Inventory":
        	addInventory();
        	break;

    		case "Add New Product":
        	addProduct();
        	break;

		}
	});
}


function viewProducts() {
    var query = "SELECT * FROM products"
    connection.query(query, function(err, res) {
        console.log(lines);
        console.log(lines);
        console.log(columnify(res));
        console.log(lines);
        console.log(lines);
    });
}

function viewInventory() {
    var query = "SELECT * FROM products WHERE COUNT (*) >5";
    connection.query(query, function(err, res) {
        console.log(lines);
        console.log(lines);
        console.log(columnify(res));
        console.log(lines);
        console.log(lines);
    });
}

function addInventory(id, stock) {

    inquirer.prompt[(
    		{
            
            name: "grabID",
            message: "First select item by ID",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
        	name: "addStock",
        	message: "Now, how much inventory would you like to add?",
        	  validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    )].then(function(res) {
        var query = "UPDATE products SET ? WHERE ?";
        connection.query(query, [{
            item_id: res.grabID
        }, {
            stock_quantity: res.addStock
        }], function (err,res) {
        	if (err) throw err;
        	console.log("Updated: " + id.res.item_id + stock.res.stock_quantity);
        });
        viewProducts();
    });
}

function addProduct(name, department, price, quantity){

	var query = "INSERT INTO products SET ?";
	connection.query(query, {
		product_name: name,
		department_name: department, 
		price: parseInt(price),
		stock_quantity: parseInt(quantity)
	}, function(err, res){
		if (err) throw err;
		console.log(res);
	});
}

managerMode();

