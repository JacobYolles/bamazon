# bamazon

Welcome to my bamazon app. Below, I will be detailing how this program functions in the various forms for each application point.

1. Bamazoncustomercode.js:
1A. This application replicates a bamazon program, or a bad amazon program, through a node based application, based on a customers interaction with it! It runs off 2 files and 4 programs. 
Files: bamazoncustomercode.js and bamazon.sql
Programs: visual studio code, MYSQL, MAMP, and node for terminal, with some node programs ran through.

Process: the application will open up greeting the user to the store and introducing the wares that are available for them to peruse through, including: the items id, the name of the item, the department name for the item, the price of the item, and how many items we have in stock for each instance.

There are ten "Generic" items available for sale. the application will open by asking what items the user would like to purchase based on a nicely formatted spread sheet that is just above it. The user will then enter the id instance number of the item, then the program will ask how many of that item the user would like to purchase, if the user picks a number that is within the limit of stock available, the program will tell the user a congratulatory message on their purchase and tell them what their total came out to be. The application will make the assumption of the sale going through.

However! if the user fails to enter a stock number that is equal to or less than the remaining stock number, the program will give them a snarky retort and ask them to either try again, or quit while they are ahead. 

If the purchase is succesful the application will ask if there is another item that the user had their eye on. If they say yes, the cycle will loop, if the say no the application will end.

If the purchase is not successful, the application will ask the user if they would like to try again. 

The table creates and runs through MYSQL and MAMP and will live adjust functioning number on the stock remaining as the app proceeds in its session, it will only reset its variables should the table be re-created. 

2. bamazonManager.js
2A. this application replicates a bamazon program, or a bad amazon program through a node based application, based on a managers' interaction with it! It runs off 2 files and 4 programs.
Files: bamazonManager.js and bamazon.sql
Programs: visual studio code, MYSQL, MAMP, and node for terminal, with some node programs ran through.

Process: This application opens up by greeting the manager to the managerial side of the store and asking what task the manager would like to control today. Through use of a switch case, the manager can choose to 1. View products for sale. 2. View low inventory. 3. Add stock to an item, or 4. Add a whole brand new item. 

The process uses the same models that were created for bamazoncustomer code, so the same base items apply here but are either added to or appended on from. if the manager fails to enter numbers or responses that are correct in the context of the application, it will shut down on them.

The process will loop with a different cycle using the same code but a different message to query the manager if they are finished or if there are more activities they would like to partake in.