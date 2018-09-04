
// Displays Inventory Table for Manager, Results from a SELECT query are passed in as parameter and used 
Table = require('cli-table2');
var displayTable = function() {

    this.table = new Table({
        head: ["id", "product_name", "department_name", "price", "stock_quantity"],
    });

    this.displayInventoryTable = function(results) {
    	this.results = results;
	    for (var i=0; i <this.results.length; i++) {
	        this.table.push(
                [this.results[i].id, this.results[i].product_name, this.results[i].department_name, '$'+ this.results[i].price, this.results[i].stock_quantity] );
	    }
    	console.log('\n' + this.table.toString());
	};
}
module.exports = displayTable;





// var displayTable = function() {

//     this.table = new displayTable({
//         head: ["id", "product_name", "department_name", "price", "stock_quantity"],
//     });

//     this.displayInventoryTable = function(results) {
//     	this.results = results;
// 	    for (var i=0; i <this.results.length; i++) {
// 	        this.table.push(
// 	            [this.results[i].id, this.results[i].product_name, this.results[i].department_name, '$'+ this.results[i].price, this.results[i].stock_quantity] );
// 	    }
//     	console.log('\n' + this.table.toString());
// 	};
// }
// module.exports = displayTable;