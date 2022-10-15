/*
* This function is not intended to be invoked directly. Instead it will be
* triggered by a client function.
* 
* Before running this sample, please:
* - create a Durable entity HTTP function
* - run 'npm install durable-functions' from the root of your app
*/

const df = require("durable-functions");

module.exports = df.entity(function (context) {
    let currentValue = context.df.getState(() => 0);

    switch (context.df.operationName) {
        case "add":
            const amount = context.df.getInput();
            currentValue += amount;
            break;
        case "reset":
            currentValue = 0;
            break;
        case "get":
            context.df.return(currentValue);
            break;
    }

    context.df.setState(currentValue);
});