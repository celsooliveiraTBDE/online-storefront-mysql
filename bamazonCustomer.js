// require the MySQL and Inquirer npm packages 
var inquirer = require("inquirer");
var mysql = require("mysql");

function TTTT() {



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
        afterConnection();
    });

    function afterConnection() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // console.log(res);
            console.log(`               -----------THE BEST DRINK EVER--------------\n
id |         -------product-------       |  category  | price | in stock \n`);

            for (var i = 0; i < res.length; i++) {

                console.log(`${res[i].item_id}| ${res[i].product_name}  | ${res[i].department_name} | $${res[i].price}|${res[i].stock_qty}`);
            }
            console.log("-----------------------------------");

            // Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
            // The app should then prompt users with two messages.

            inquirer.prompt([
                // {
                //     type: "input",
                //     message: "Enter your Username: ",
                //     name: "username"
                // },
                // {
                //     type: "confirm",
                //     message: "Are you sure:",
                //     name: "confirm",
                //     default: true
                // },
                {
                    name: "choice",
                    type: "list",
                    message: "What are you looking for today? : ",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    }
                },
                {
                    type: "input",
                    message: "Please type Item ID to confirm your selection: ",// The first should ask them the ID of the product they would like to buy.
                    name: "item_id"
                },
                // The second message should ask how many units of the product they would like to buy.
                {
                    type: "input",
                    message: "Quantity: ",// The first should ask them the ID of the product they would like to buy.
                    name: "product_qty"
                },
            ])
                .then(function (inquirerResponse) {
                    // if (inquirerResponse.confirm) {
                    console.log("-----------------------------------");

                    console.log("\nWe are adding " + inquirerResponse.product_qty + " bottles of the following to your shopping cart: 00" + inquirerResponse.item_id + " " + inquirerResponse.choice);

                    console.log("-----------------------------------");


                    // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
                    if (inquirerResponse.product_qty > res[parseInt(inquirerResponse.item_id) - 1].stock_qty) {
                        console.log("-----------------------------------");
                        console.log("I'm sorry but we don't have enough bottles to fulfill your order.\nYou can order " + res[parseInt(inquirerResponse.item_id) - 1].stock_qty + " bottles at the most at this time");
                        console.log("-----------------------------------");

                    }
                    // }
                    else {
                        var new_qty = res[parseInt(inquirerResponse.item_id) - 1].stock_qty - inquirerResponse.product_qty
                        updateProduct(new_qty, parseInt(inquirerResponse.item_id));
                        var total = inquirerResponse.product_qty * res[parseInt(inquirerResponse.item_id) - 1].price;
                        console.log("\n-------------CUSTOMER TOTAL: --------------");

                        console.log(`00${inquirerResponse.item_id} ${inquirerResponse.choice}   Quantity: ${inquirerResponse.product_qty}
                    
                    Your total is: $${total}                    `)

                        console.log("-----------------------------------");
                        // updating inventory quantities and providing customer with a total;
                    }
                    console.log("\n Thank you for shopping with The Best Drink Ever")
                    afterConnection();
                });
        });
    }
}
function updateProduct(new_qty, booze_var) {
    console.log("Updating inventory quantities...\n");
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
        }
    );
    
    // logs the actual query being run
    console.log(query.sql);
};

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// This means updating the SQL database to reflect the remaining quantity.

// Once the update goes through, show thecustomer the total cost of their purchase.
module.exports = TTTT()











