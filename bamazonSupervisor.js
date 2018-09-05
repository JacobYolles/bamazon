  // SET UP ALL REQUIRES FIRST

  var inquirer = require("inquirer");
  var mysql = require("mysql");
  
  
  // SET UP BASE LINE STANDARD CONNECTIVITY TO TABLE.
  var connection = mysql.createConnection({
      host: "localhost",
      port: 8889,
      user: "root",
      password: "root",
      database: "departments_db"
  });

//   Challenge #3: Supervisor View (Final Level)
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    hello();
});


// primary greeting with standard console log.
function hello() {
    inquirer.prompt([{
        type: "list",
        name: "decision",
        message: "Welcome Executive Manager, what would you like to do today? :)",
        choices: ["View Product Sales by Department", "Create New Department", "End current session"]
    }]).then(function(ans) {
        switch (ans.decision) {
            case "View Product Sales by Department": viewProductSales();
            break;
            case "Create New Department": createNewDepartment();
            break;
            case "End current session": console.log("Have a wonderful day!") + connection.end(); 
        }
    });
}

//secondary greeting, with changed console log.
function helloTwo() {
    inquirer.prompt([{
        type: "list",
        name: "decision",
        message: "Welcome again, Executive Manager, what else would you like to do today? :)",
        choices: ["View Product Sales by Department", "Create New Department", "End current session"]
    }]).then(function(ans) {
        switch (ans.decision) {
            case "View Product Sales by Department": viewProductSales();
            break;
            case "Create New Department": createNewDepartment();
            break;
            case "End current session": console.log("Have a wonderful day!") + connection.end(); 
        }
    });
}

// when view product sales is chosen.
function viewProductSales() {
    connection.query("SELECT * FROM Departments", function(err, res){
        if(err) throw err;
        console.log(">>>>>>Product Sales by Department<<<<<<");
        console.log("----------------------------------------------------------------------------------------------------")
    
        for(var i = 0; i<res.length;i++){
          console.log("Department ID: " + res[i].department_id 
          + " | " + "Department Name: " + res[i].department_name + 
            " | " + "Over Head Cost: " + (res[i].over_head_costs).toFixed(2) + 
            " | " + "Product Sales: " + (res[i].total_sales).toFixed(2) + 
            " | " + "Total Profit: " + (res[i].total_sales - res[i].over_head_costs).toFixed(2));
            console.log("----------------------------------------------------------------------------------------------------")
        }
        helloTwo();
      })
    }

// when create new department is chosen.
function createNewDepartment() {
    console.log("Creating New Department, Executive.")
    // create a prompt for the department name and numbers if no value is provided default is 0.
    inquirer.prompt([{
        type: "input",
        name: "department_name",
        message: "What is the name of the new department you would like to add today?"
    }, {
        type: "input",
        name: "over_head_costs",
        message: "What is the overhead cost of the new department you would like to add today?",
        // default: 0,
        validate: function (val) {
            if (isNaN(val) === false) {return true;}
            else {return false;}
        }
    }, {
        type: "input",
        name: "total_sales",
        message: "What are the current product sales for your new department?",
        // default: 0,
        validate: function (val) {
            if (isNaN(val) === false) {return true;}
            else {return false;}
        }
    }
    ]).then(function(ans){
        connection.query("INSERT INTO departments SET ?", {
            department_name: ans.department_name,
            over_head_costs: ans.over_head_costs,
            total_sales: ans.total_sales
        }, function(err, res) {
            if (err) throw (err)
            console.log("Your new department was added, executive! You will see it on your next go around!")
            console.log(res)
            helloTwo();
        })
        

    }); 

};




// Create a new MySQL table called departments. Your table should include the following columns:

// department_id
// department_name
// over_head_costs (A dummy number you set for each department)

// Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

// Make sure your app still updates the inventory listed in the products column.

// Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

// View Product Sales by Department
// Create New Department

// When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// department_id
// department_name
// over_head_costs
// product_sales
// total_profit

// 01
// Electronics
// 10000
// 20000
// 10000

// 02
// Clothing
// 60000
// 100000
// 40000

// The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
// If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

// Hint: You may need to look into aliases in MySQL.
// Hint: You may need to look into GROUP BYs.
// Hint: You may need to look into JOINS.
// HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)