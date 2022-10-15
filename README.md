# Azure Durable Function

Requirements:

- [Azure Functions Core Tools SDK](https://github.com/Azure/azure-functions-core-tools)
- [Azure Azurite](https://github.com/Azure/Azurite)
- Service Bus namespace
- Node 16+

## Setup

Ramp up a Service Bus instance:

```sh
# Create the thing
az group create -n "rg-local-dev" -l "eastus2"
az servicebus namespace create -n "bus-az-durable-functions-dev" -g "rg-local-dev" -l "eastus2" --sku "Basic"
az servicebus queue create -n "queue1" --namespace-name "bus-az-durable-functions-dev" -g "rg-local-dev" --enable-partitioning
az servicebus queue create -n "queue2" --namespace-name "bus-az-durable-functions-dev" -g "rg-local-dev" --enable-partitioning

# Export for the function
export AZURE_SERVICEBUS_CONNECTION_STRING=$(az servicebus namespace authorization-rule keys list -g "rg-local-dev" --namespace-name "bus-az-durable-functions-dev" --name "RootManageSharedAccessKey" --query "primaryConnectionString" -o tsv)
```

> 💡 To quick start Service Bus local testing use my [Postman collection boilerplate](https://github.com/epomatti/servicebus-postman-collection)

Start Azurite:

```sh
azurite -s -l /tmp/azurite
```

Create `local.settings.json` with the following content:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "QueueConnectionString": "AccountName=devstoreaccount1;AccountKey=<<<ACCOUNT_KEY>>>;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;"
  }
}
```

Replace the account key with your emulator key (use Storage Explorer to the Key).

Start the function app:

```sh
func start
```

Testing the app:

```sh
curl -X POST http://localhost:7071/api/counters/myCounter

curl http://localhost:7071/api/counters/myCounter
```
