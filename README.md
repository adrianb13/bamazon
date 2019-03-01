# bamazon

This app was written with JavaScript, node.js and MySQL.  Also used were 3 npm packages as follows: mysql, inquirer, and console.table.  The pseudo site is called Bamazon.

To run this program on your own, you will need to update your MySQL user connect info in each JS file.
You will also need to install the previously listed npm packages in the directory the code will be copied to locally.

The example below is what you will need to update.

var mysqlConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'YourPassword',
    database: 'bamazon_db'
};

Bamazon would be the basics of basically having your own retail site.  There are 3 parts to this program:
  - Customer program:  Where customer views and orders product.
  - Manager program: Where you are the business owner are able to control the inventory. Such as view, update, or add products.
  - Supervisor program:  Where you view product sales and profitability as well as being able to expand with new department creations.
  
The programs are called bamazonCustomer, bamazonManager, and bamazonSupervisor, respectively.

The database used for this program was created in MySQL.  

Attached in the repository is a separate Word document that has each program's step by step functionality as well as screenshots of them working.  There is obvious room to expand and improve the code for actual day-to-day use, but it's a starting point for you.
