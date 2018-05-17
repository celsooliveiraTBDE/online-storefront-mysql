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
    mainMenu();
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

function ViewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("id |         -------product-------       |  category  | price | in stock \n");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_qty);
        }
        console.log("-----------------------------------");
        mainMenu();

    })
};

function ViewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_qty < 5", function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log(
            ` 
-----------THE BEST DRINK EVER--------------
id |         -------Low Item-------       |  category  | price | in stock 
                                                                                                `);

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_qty);
        }
        console.log("-----------THE BEST DRINK EVER--------------");
    });
    mainMenu();
};
function AddNewProduct() {
    inquirer
        .prompt([
            {
                name: "product_name",
                type: "input",
                message: "Enter the name of the product we are adding today : ",
            },
            {
                name: "department_name",
                type: "input",
                message: "Enter category : ",
            },
            {
                name: "price",
                type: "input",
                message: "Enter price retail : ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_qty",
                type: "input",
                message: "Quantity Added : ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "summary",
                type: "confirm",
                message: `Are you sure you want to add this bottles of to our inventory ? `
            }
        ])
        .then(function (answer) {
            console.log(answer.summary);

            if (answer.summary) {
                var query = "INSERT INTO products (product_name, department_name, price, stock_qty) VALUES(?, ?, ?, ?)";
                connection.query(query, [answer.product_name, answer.department_name, answer.price, answer.stock_qty], function (err, res) {
                    console.log(
                        `-----------THE BEST DRINK EVER--------------
                    SUCCESSFULLY ADDED ${answer.stock_qty} bottles of ${answer.product_name} to our inventory 
                    at ${answer.price} per bottle under the category ${answer.department_name} ! `);
                });
            }
            ViewProducts();
        });
};
function AddtoInventory() {
    inquirer.prompt([
        {
            name: "booze_var",
            type: "input",
            message: "Enter the code for the product we are ordering today : ",
        },
        {
            name: "order_qty",
            type: "input",
            message: "Quantity Added : ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "summary",
            type: "confirm",
            message: "Are you sure you want to purchase these bottles for our inventory ?"
        }
    ])
        .then(function (answer) {
            console.log("Updating inventory quantities...\n");
        var new_stock = 0;
            if (answer.summary) {
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    // console.log(res);
                    new_stock = res[answer.booze_var-1].stock_qty + parseInt(answer.order_qty);
                    
                    console.log("-New Stock: ---------"+new_stock+"--------------");
                })
                console.log("BLEH BLEH",new_stock);
                var query = "UPDATE products SET ? WHERE ?";
                connection.query(query, [{ stock_qty: new_stock }, { item_id: answer.booze_var }],
                    function (err, res) {
                        console.log(res.affectedRows + " products updated!\n");
                        ViewProducts();
                    }
                );
            }

        });

    // ViewProducts();

};


// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

// If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.