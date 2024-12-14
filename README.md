# TODOs Code Base

This is the TODOs base solution. It contains a .NET server along with an Angular client.

### Install dependencies

- In the project folder run: `dotnet restore`
- In the **/client** folder run: `npm ci`

### Run the server solution

- From the root run: `dotnet run --project src/Todos`
- Open a browser and navigate to http://localhost:4100/api/todos

### Run the server solution watching changes

- In the root run: `dotnet watch run --project src/Todos`

### Run the server tests

- In the root run: `dotnet test test/Todos.Tests`

### Run the client

- In the `/client` folder run `npm start`
- Open a browser and navigate to http://localhost:4200

### Run the client tests

- In the `/client` folder run `npm test`
