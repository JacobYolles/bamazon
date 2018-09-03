  // SET UP ALL REQUIRES FIRST

var inquirer = require("inquirer");
var mysql = require("mysql");


// SET UP BASE LINE STANDARD CONNECTIVITY TO TABLE.
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});


// PROVE THAT THE CONNECTION WORKS.
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //WHEN THE PRODUCT LAUNCHES. READ THE USER ALL THE AVAILABLE ITEMS.
    // readProducts();
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

  function goAgain() {
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Is there another item you had your eye on?"
    }]).then(function (ans) {
      if (ans.reply === true) {
        prompt();
    }
    else {
      console.log("Thank you so much for a buying my items.")
      connection.end();
    }
  
    })
  
  }

  function goAgainTwo() {
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to try this again?"
    }]).then(function (ans) {
      if (ans.reply === true) {
        prompt();
    }
    else {
      console.log("Better luck next time, champ.")
      connection.end();
    }
  
    })
  
  }



  function prompt() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
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
  inquirer
    .prompt([
        {
           type: "input",
           name: "id",
           message: "What is the id of the item you would like to purchase?",
           // SET SO THAT IF THEY DON'T SPECIFY A VALUE IT WON'T CONTINUE OR IF THE VALUE IS TOO HIGH.
           // FORCES THEM TO SELECT A PROPER NUMBER.
           validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;
            } else{
                // THIS CODING WILL ALLOW THE USER TO GET THE VALUE WRONG 1 TIME TOTAL
                // connection.end();
              return false;
       
            }
          }
        },
        {
          type: "input",
          name: "quantity",
          message: "How much would you like to purchase?",
          validate: function(value){
            if(isNaN(value)){

                  // THIS WILL ALLOW THE USER TO NOT GET THE VALUE WRONG.
                // connection.end();
                

              return false;
          

            } else{
    
              return true;
            }
          }   
        }
  ]).then(function(ans){
    var desiredItem = (ans.id)-1;
    var howMuchDesired = parseInt(ans.quantity);
    var grandTotal = parseFloat(((res[desiredItem].price)*howMuchDesired).toFixed(2));

    //check if quanitity is sufficiently met.
    // if it is not met. 
    if(res[desiredItem].stock_quantity < howMuchDesired){
      console.log("Sorry, there's not enough in stock!")
      goAgainTwo();
    }
    // else if it is met.
   else if(res[desiredItem].stock_quantity >= howMuchDesired){
    
    // create a new query
    //update my table.
    connection.query("UPDATE Products SET ? WHERE ?", [
      {stock_quantity: (res[desiredItem].stock_quantity - howMuchDesired)},
      {id: ans.id}
      ],

       // if we have enough items for the customer proceed:
      // if we can't throw an error, otherwise congratulate the purchase.
     function(err, res){
       if (err) throw (err) 
           console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you as soon as possible.")
          

          
            
          });
   

      // if(err) throw err;
      // console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you as soon as possible.");

      // if{
      //   console.log("Sorry, there's not enough in stock!");
      // }
    

       



    // select all from departments
    // connection.query("SELECT * FROM Departments", function(err, deptRes){
    //   if(err) throw err;
    //   var index;
    //   for(var i = 0; i < deptRes.length; i++){
    //     if(deptRes[i].DepartmentName === res[desiredItem].DepartmentName){
    //       index = i;
    //     }
    //   }
  
    //   //updates totalSales in departments table
    //   connection.query("UPDATE Departments SET ? WHERE ?", [
    //     {TotalSales: deptRes[index].TotalSales + grandTotal},
    //     {DepartmentName: res[desiredItem].DepartmentName}
    //     ], function(err, deptRes){
    //         if(err) throw err;
    //         //console.log("Updated Dept Sales.");
    //     });
    // })

    
    goAgain();    
    }



   

  }) // END tag for then function(answer)

    }) // end tag for connection.query
} // end tag for function prompt.


