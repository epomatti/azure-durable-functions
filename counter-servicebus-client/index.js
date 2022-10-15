const df = require("durable-functions");

module.exports = async function (context, mySbMsg) {
    const client = df.getClient(context);
    const entityId = new df.EntityId("Counter", mySbMsg);
    await client.signalEntity(entityId, "add", 1);
};
