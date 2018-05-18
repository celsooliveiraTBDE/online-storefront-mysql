var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});
//database config
connection.connect(function (err) {
  if (err) throw err;
});
//database configured and connected

function menu() {
  inquirer.prompt([
    {
      type: "input",
      message: "Welcome to The Best Drink Ever, an online mall for rare bottles of whiskey, gin and more.\n Please enter your username: ",
      name: "username"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    },
    {
      name: "routes",
      type: "list",
      message: "How may I help you today? : ",
      choices: ["CUSTOMER", "ADMIN"]

    },
  ])
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.routes.toUpperCase() === "CUSTOMER") {
        viewAllItems();

      }
      else {
        adminMenu();

      }
    });
};

function viewAllItems() {
  var arrayofRows = [];

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(res);
    console.log(
      `               -----------THE BEST DRINK EVER--------------\n
id |         -------product-------       |  category  | price | in stock \n`);

    for (var i = 0; i < res.length; i++) {
      console.log(`${res[i].item_id}| ${res[i].product_name}  | ${res[i].department_name} | $${res[i].price}|${res[i].stock_qty}`);
    }
    orderStuff();
  })
}
function orderStuff() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(res);

    inquirer.prompt([

      {
        name: "choice",
        type: "rawlist",
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

        console.log("\nWe are checking our inventory for " + inquirerResponse.product_qty + " bottles of t: 00" + inquirerResponse.item_id + " " + inquirerResponse.choice);

        console.log("-----------------------------------");

        // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        if (inquirerResponse.product_qty > res[parseInt(inquirerResponse.item_id) - 1].stock_qty) {
          console.log("-----------------------------------");
          console.log("I'm sorry but we don't have enough bottles to fulfill your order.\nYou can order " + res[parseInt(inquirerResponse.item_id) - 1].stock_qty + " bottles at the most at this time");
          console.log("-----------------------------------");
          viewAllItems();
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

      });
  });
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
  menu();
};
menu();


// Challenge #2: Manager View (Next Level)
// require the MySQL and Inquirer npm packages 

// Create a new Node application called bamazonManager.js. Running this application will:    function mainMenu (){
function adminMenu() {

  inquirer.prompt([
    // List a set of menu options:
    {
      name: "mgr_menu",
      type: "rawlist",
      message: "Manager, Choose your option : ",
      choices: ["View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product", 
        "Back to Menu"
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

          case "Back to Menu":
          menu();
          break;
      }
    });

}

function ViewProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(`-----------THE BEST DRINK EVER--------------\n
        id |         -------product-------       |  category  | price | in stock \n`);

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_qty);
    }
    console.log("-----------------------------------");
    adminMenu();
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
  adminMenu();
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
      var new_stock;
      if (answer.summary) {
        connection.query("SELECT * FROM products", function (err, res) {
          if (err) throw err;
          // console.log(res);
          new_stock = res[answer.booze_var - 1].stock_qty + parseInt(answer.order_qty);

          console.log("-New Stock: ---------" + new_stock + "--------------");
          var query = "UPDATE products SET ? WHERE ?";
          connection.query(query, [{ stock_qty: new_stock }, { item_id: answer.booze_var }],
            function (err, res) {
              console.log(res.affectedRows + " products updated!\n");
              ViewProducts();
            }
          );
        })
      }
    });
};
