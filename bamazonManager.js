// Create a new Node application called bamazonManager.js. Running this application will:


// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

// inquirer.prompt syntax is always ([{


  // SET UP ALL REQUIRES FIRST

var inquirer = require("inquirer");
var mysql = require("mysql");
var displayTable = require("./bamazonnewtable")

var Table = require('cli-table2');

// SET UP BASE LINE STANDARD CONNECTIVITY TO TABLE.
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

var displayForManager = function(results) {   
    var display = new displayTable();
    display.displayInventoryTable(results);
}


// PROVE THAT THE CONNECTION WORKS.
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    welcome();
});

function welcome() {
    inquirer.prompt([{
        type: "list",
        name: "whatToDo",
        message: "Welcome Manager, what would you like to do today?",
        choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Nevermind!"]
    }]).then(function(ans){
        switch (ans.whatToDo){
            case "View products for sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break;
            case "Add to Inventory": addToInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            case "Nevermind!": connection.end();
            console.log("Come again soon!")
        }
    });
}


function welcomeTwo() {
    inquirer.prompt([{
        type: "list",
        name: "whatToDo",
        message: "Hello Manager, what else would you like to do?",
        choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(ans){
        switch (ans.whatToDo){
            case "View products for sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break;
            case "Add to Inventory": addToInventory();
            break;
            case "Add New Product": addNewProduct();
        }
    });
}


function anythingElse() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Is there another activity you'd like to partake in, Manager?"
      }]).then(function(ans){
        if(ans.reply){
          welcomeTwo();
        } else{
          console.log("See you soon!");
        }
      });
}




function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
      console.log("Welcome to Bamazon!")

        console.log("Look at the ugly version of all our products!")
        console.log('--------------------------------------------------------------------------------------------------')
        console.log(res);

        console.log('--------------------------------------------------------------------------------------------------')
        console.log("Showing all products to make your selection easier! \n");
        // console.log(JSON.stringify(res))
        for(var i = 0; i<res.length;i++){
          console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name 
          + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
          console.log('--------------------------------------------------------------------------------------------------')
        }
        anythingElse();
    })
}

function viewLowInventory() {
    // select all items from products where the stock quantity is less then five, order by the product name/stock quantity
    connection.query("SELECT * FROM products WHERE stock_quantity < 5 ORDER BY product_name", function (err, res) {
        // connection.query("SELECT * FROM top5000 WHERE artist IN (SELECT artist FROM top5000 GROUP BY artist HAVING COUNT(*) > 15) ORDER BY artist", function (err, res) {
console.log(res)
        if (err) throw err;
        console.log("Current Stock")
        for(var i = 0; i<res.length;i++){
            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name 
            + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
          }
          anythingElse();
        })
    }

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    function addToInventory() {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            
          
            console.log("Showing all products to make your selection easier! \n");
            // console.log(JSON.stringify(res))
            for(var i = 0; i<res.length;i++){
              console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name 
              + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
              console.log('--------------------------------------------------------------------------------------------------')
            }
            
            
        inquirer.prompt([{
                    name: "id",
                    type: "input",
                    message: " Enter the  ID of the product",
            
                }, {
                    name: "quantity",
                    type: "input",
                    message: " Enter the quantity of product you wish to add",
            
                }]).then(function(answer){

                    connection.query("SELECT * FROM products WHERE ?", {id: answer.id},function(err,res){
                        itemQuantity = res[0].stock_quantity + parseInt(answer.quantity);
                        console.log("I've updated the stock quantity master, see inventory table\n");
                        console.log(res)
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: itemQuantity
                        }, {
                            id: answer.id
                        }], function(err, res) {
                            if (err) throw err
                    
                        });
                        // connection.query("SELECT * FROM products WHERE products DIFFERENCE > 1",function (err, res) {
                        //     console.log(res)
                        // })
                        
                    

                        // connection.query("SELECT * FROM products", function (err, results) {
                        //     if (err) throw (err)
                            // console.log("I've updated the stock quantity master, see inventory table\n");
                            // console.log(results)
                        //     // displayForManager();
                        //     // console.log(res)
                        //     anythingElse();

                        
                        // });
                    
                    });
                
                });
            
            }
        )}
   


    