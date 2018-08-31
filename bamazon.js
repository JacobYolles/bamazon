var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //WHEN THE PRODUCT LAUNCHES. READ THE USER ALL THE AVAILABLE ITEMS.
    readProducts();
    //AFTER THE USER HAS READ THE PRODUCTS ASK IF THEY KNOW WHICH ITEM, BASED ON ID VARIABLE, THEY WANT TO BUY.
    prompt()
  });

function readProducts() {
    console.log("Showing all products to make your selection easier!\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(JSON.stringify(res))
    //   connection.end();
    });
  }

  function prompt() {
    
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(results);
        console.log("Showing all products to make your selection easier! \n");
        console.log(JSON.stringify(results))
  inquirer
    .prompt([
        {
           type: "input",
           name: "id",
           message: "What is the id of the item you would like to purchase?",
           // SET SO THAT IF THEY DON'T SPECIFY A VALUE IT WON'T CONTINUE OR IF THE VALUE IS TOO HIGH.
           // FORCES THEM TO SELECT A PROPER NUMBER.
           validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= results.length && parseInt(value) > 0){
              return true;
            } else{
                // THIS CODING WILL ALLOW THE USER TO GET THE VALUE WRONG 1 TIME TOTAL
                connection.end();
              return false;
       
            }
          }
        },
        {
          type: "input",
          name: "qty",
          message: "How much would you like to purchase?",
          validate: function(value){
            if(isNaN(value)){

                  // THIS WILL ALLOW THE USER TO NOT GET THE VALUE WRONG.
                connection.end();
              return false;
            } else{
    
              return true;
            }
          }   
        }
    ])  


    }) // end tag for connection.query
} // end tag for function prompt.