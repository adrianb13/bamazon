var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var mysqlConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'YourPassword',
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
        menu();
    };
});

function menu () {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Do want to view Product Sales or Create a New Department?",
                choices: ["View Product Sales", "Create New Department"],
                name: "dept"
            }
        ])
        .then(function (response) {
            if (response.dept === "View Product Sales") {
                displayProfit();
            } else if (response.dept === "Create New Department") {
                newDept();
            };
        });
};

function displayProfit () {
    connection.query(
        'SELECT department_name, (SUM(product_sales - overhead_costs)) AS total_profit FROM departments GROUP BY department_name',
        function (error, result) {
            if (error) {
                console.log(error);
                connection.end();
            } else {
                console.log("\r");
                console.log("Welcome to the Sales Tracker");
                console.log("Here are the department metrics.")
                console.log("\r");

                console.table(result);
                displayDepts(result)
                
            }
        }
    )
    console.log("\r");
}

function displayDepts (){
    connection.query(
        'SELECT * FROM departments',
        function (error, result2) {
            if (error) {
                console.log(error);
                connection.end();
            } else {            
                console.table(result2);            
                connection.end();
            }
        }
    )
};

function newDept () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the new department called?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the current overhead cost for this dept? (Do NOT include $)",
                name: "overhead",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ])
        .then(function(response){
            connection.query(
                'INSERT INTO departments (department_name, overhead_costs) VALUES ("'+ response.name +'", "' + response.overhead+'")',
                function(error , result) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("\r");
                        console.log("New Department Has Been Added");
                        console.log("New Department ID# is: " + result.insertId)
                        console.log("\r");
                        
                        displayDepts();
                    }
                }
            )
        })
}