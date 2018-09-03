# bamazon

Welcome to my bamazon app. Below, I will be detailing how this program functions in the various forms for each application point.

1. Bamazoncustomercode.js:
1A. This application replicates a bamazon program, or a bad amazon program, through a node based application. It runs off 2 files and 4 programs. 
Files: bamazoncustomercode.js and bamazon.sql
Programs: visual studio code, MYSQL, MAMP, and node for terminal. 

Process: the application will open up greeting the user to the store and introducing the wares that are available for them to peruse through, including: the items id, the name of the item, the department name for the item, the price of the item, and how many items we have in stock for each instance.

There are ten "Generic" items available for sale. the application will open by asking what items the user would like to purchase based on a nicely formatted spread sheet that is just above it. The user will then enter the id instance number of the item, then the program will ask how many of that item the user would like to purchase, if the user picks a number that is within the limit of stock available, the program will tell the user a congratulatory message on their purchase and tell them what their total came out to be. The application will make the assumption of the sale going through.

However! if the user fails to enter a stock number that is equal to or less than the remaining stock number, the program will give them a snarky retort and ask them to either try again, or quit while they are ahead. 

If the purchase is succesful the application will ask if there is another item that the user had their eye on. If they say yes, the cycle will loop, if the say no the application will end.

If the purchase is not successful, the application will ask the user if they would like to try again. 

The table creates and runs through MYSQL and MAMP and will live adjust functioning number on the stock remaining as the app proceeds in its session, it will only reset its variables should the table be re-created. 
