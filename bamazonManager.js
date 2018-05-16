// Challenge #2: Manager View (Next Level)
// require the MySQL and Inquirer npm packages 
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);
});

// Create a new Node application called bamazonManager.js. Running this application will:    function mainMenu (){
function mainMenu() {

    inquirer.prompt([


        // List a set of menu options:
        {
            name: "mgr_menu",
            type: "rawlist",
            message: "Manager, Choose your option : ",
            choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }])
        .then(function (inquirerResponse) {
            switch (inquirerResponse.mgr_menu) {
                case "View Products for Sale":
                    console.log("BOOGA BOO!")
                    ViewProducts();
                    break;
                case "View Low Inventory":
                    ViewLowInventory();
                    break;

                case "Add to Inventory":
                    AddtoInventory();
                    break;

                case "Add New Product":
                    AddNewProduct();
                    break;
            }
        });

}
mainMenu(); 

function ViewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("id |         -------product-------       |  category  | price | in stock \n");

        for (var i = 0; i < res.length; i++) {

            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_qty);

        }

        console.log("-----------------------------------");


    })
    mainMenu(); 
};

function ViewLowInventory() {
    connection.query("SELECT * FROM products WHERE", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("id |         -------product-------       |  category  | price | in stock \n");

        for (var i = 0; i < res.length; i++) {

            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_qty);

        }

        console.log("-----------------------------------");


    })
};
function AddNewProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("id |         -------product-------       |  category  | price | in stock \n");

        for (var i = 0; i < res.length; i++) {

            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_qty);

        }

        console.log("-----------------------------------");


    })
};
function AddtoInventory() {
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_qty: new_qty
                },
                {
                    item_id: booze_var
                }
            ],
            function (err, res) {
                console.log(res.affectedRows + " products updated!\n");
                // Call deleteProduct AFTER the UPDATE completes
            }
        );
        // logs the actual query being run
        console.log(query.sql);
      
};

// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.







// If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.