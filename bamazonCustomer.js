
var mysql = require("mysql");
var inquirer = require("inquirer");

var mysqlConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'UseYourPassword',
    database: 'bamazon_db'
};

var connection = mysql.createConnection(mysqlConfig);

connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("\r");
        console.log("WELCOME!!!");
        console.log("\r");
        displayItems();
    };
});

function displayItems () {
    connection.query(
        'SELECT * FROM products',
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log("Thank you for choosing BAMAZON!!!");
                console.log("Here are the available items for purchase.")
                console.log("\r");
                for (i=0; i < result.length; i++)
                console.log("Item ID: " + result[i].item_id + "     Price: $" + result[i].price + "     Name: " + result[i].product_name);
            };

        console.log("\r");
        buyItem();
        }
    ); 
    
};

function buyItem () {
    
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the [Item ID] you would like to purchase from above.",
                name: "id",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }                
                }
            },
            {
                type: "input",
                message: "Please enter the quantity you would like to purchase.",
                name: "quantity",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ])
        .then(function(response) {
            quantitySearch(response);
        })
}

function quantitySearch (response) {
    connection.query(
        'SELECT * FROM products WHERE item_id = "' + response.id + '"',
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log("\r");

                if (response.id === result[0].item_id || response.quantity <= result[0].stock_quantity) {
                    console.log("You want to purchase " + response.quantity + " of Item ID #" + response.id + " - " + result[0].product_name);
                    console.log("\r");
                    quantityAndCost(response, result); 
                    var cost = result[0].price * parseFloat(response.quantity);
                    console.log("The total for your order is $" + (cost.toFixed(2)));
                } else {
                    console.log("Insufficient quantity.");
                    console.log("The available quantity is: " + result[0].stock_quantity);
                    console.log("Please adjust your order.")
                    console.log("\r");
                    buyItem(response);
                } 
            }
        }
    );
};

function quantityAndCost (response, result) {
    connection.query(
        'UPDATE products SET stock_quantity = "' + parseFloat(result[0].stock_quantity - response.quantity) +'" WHERE item_id = "' + response.id +'"',
        function(error, result2) {
            if (error) {
                console.log(error);
            } else {
                console.log("Your Order has been placed!")
                console.log("THANK YOU for your purchase!!!");
            }
        }
    );
    connection.end();
};