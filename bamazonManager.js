var mysql = require("mysql");
var inquirer = require("inquirer");

var mysqlConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'YourPassord',
    database: 'bamazon_db'
};

var connection = mysql.createConnection(mysqlConfig);

connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("\r");
        console.log("Welcome to the Bamazon Inventory Manager!!!");
        console.log("\r");
        menu();
    };
});

function menu () {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose an option below:",
                choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
                name: "menu"
            }
        ])
        .then(function (response) {
            if (response.menu === "View Products For Sale") {
                displayProducts();
            } else if (response.menu === "View Low Inventory") {
                lowInventory();
            } else if (response.menu === "Add To Inventory") {
                addInventory();                
            } else if (response.menu === "Add New Product") {
                addProduct();
            }
        });
}

function displayProducts () {
    connection.query(
        'SELECT * FROM products',
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log("Bamazon Available Inventory");
                console.log("Here are the items in the inventory.");
                console.log("\r");
                for (i=0; i < result.length; i++)
                console.log("Item ID: " + result[i].item_id + "   Quantity: " + result[i].stock_quantity + "   Price: " + result[i].price + "   Name: " + result[i].product_name);
            };
        console.log("\r");
        }
    ); 
    connection.end();
};

function lowInventory () {
    connection.query(
        'SELECT * FROM products',
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log("\r");
                console.log("Low Inventory Screen");
                console.log("Here are the items that need to be replenished:");
                console.log("\r");

                var lowInv = false;
                for (j=0; j < result.length; j++) {
                    if (result[j].stock_quantity <= 5) {
                        console.log("Quantity: " + result[j].stock_quantity + " --- Item ID #" + result[j].item_id + " --- " + result[j].product_name);
                        lowInv = true;
                    } 
                };
                if (lowInv === false) {
                    console.log("You are fully stocked. You do not need to replenish any items at this time.");                   
                };
            };
        console.log("\r");
        }
    ); 
    connection.end();
};

function addInventory() {
    connection.query(
        'SELECT * FROM products',
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log("\r");
                console.log("Bamazon Inventory Update Screen");
                console.log("Here are the items in the inventory.");
                console.log("\r");
                for (i=0; i < result.length; i++)
                console.log("Item ID: " + result[i].item_id + "   Quantity: " + result[i].stock_quantity + "   Price: " + result[i].price + "   Name: " + result[i].product_name);
            };
            console.log("\r");

            inquirer
                .prompt([
                {
                    type: "input",
                    message: "Please enter the [ITEM ID#] we are adding inventory for: ",
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
                    message: "Please enter the [QUANTITY] to be added to the inventory: ",
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
                .then(function (response) {
                    connection.query(
                        'UPDATE products SET stock_quantity = "' + (parseInt(response.quantity) + parseInt(result[parseInt(response.id) - 1].stock_quantity)) +'" WHERE item_id = "' + response.id +'"',
                        function(error, change) {
                            if (error) {
                                console.log(error);
                                connection.end();
                            } else {
                                console.log("\r");
                                console.log("Inventory has been updated");
                                console.log("New quantity is: " + (result[parseInt(response.id) - 1].stock_quantity + parseInt(response.quantity)) + " --- Item ID #" + result[parseInt(response.id) - 1].item_id + " - " + result[2].product_name);
                                connection.end();
                            }
                        }
                    );
                })
        }
    );
};

function addProduct () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name/description of the new product?",
                name: "name"
            },
            {
                type: "list",
                message: "Which department does the product belong?",
                choices: ["Cleaning", "Cooking"],
                name: "dept"
            },
            {
                type: "input",
                message: "What is the price of the product (do not include $)?",
                name: "price",
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
                message: "What is the available quantity of the new product for sale?",
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
            connection.query(
                'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("' + response.name + '", "' + response.dept + '", "' + response.price +'", "' + response.quantity + '") ',
                function(error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("\r");
                        console.log("The new product has been added");
                        console.log("It is assigned Item ID #" + result.insertId);
                    }
                }
            )
            connection.end();
        });
};
