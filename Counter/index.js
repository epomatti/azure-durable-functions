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
    if(currentValue >= 1000) {
        console.log(">>>>>>>>>>>>>>> Completed <<<<<<<<<<<<<<<<<")
    }
    context.df.setState(currentValue);
});