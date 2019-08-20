var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306, 
	user: 'nodeuser',
	password: 'password',
	database: 'bamazon'
});

connection.connect(function(err){
	if (err) throw err;
});

console.log("\nWelcome to Bamazon!");

showProducts();

function showProducts() {
	
	console.log("\nProducts:\n");

	connection.query('SELECT item_id, product_name, price FROM products', function(err, res){

		for (var i = 0; i < res.length; i++) {
			console.log("ID:", res[i].item_id, "     Price", res[i].price, "     Name:", res[i].product_name);
        }
        
		inquirer.prompt([
            {
                name: "product",
                message: "Which product would you like to buy? (type id)"
            },
            {
                name: "quantity",
                message: "How many would you like to buy?"
            },
        ]). then(function(answers){
            checkInventory(answers.product, answers.quantity);            
        })
	});
}

function checkInventory(productId, quantityRequested) {

	connection.query("SELECT stock_quantity FROM products WHERE item_id='"+productId+"'", function(err, res){

		if(quantityRequested > res[0].stock_quantity) {
			console.log("Insufficient Quantity!\nOnly "+res[0].stock_quantity+" left. Please order a different amount!");
			// showProducts();
			connection.end();
		}
		else {
			completePurchase(productId, quantityRequested, res[0].stock_quantity);
		}
	});
};

function completePurchase(id, q, i) {

	connection.query("UPDATE products SET stock_quantity="+ (i-q) +" WHERE item_id='"+id+"'", function(err, res){

		console.log("Inventory updated to:", i-q);

		connection.query("SELECT price FROM products WHERE item_id='"+id+"'", function(err, res){

			console.log("Your total price is: $"+(res[0].price * q));
            connection.end();
            
		});
	});
};