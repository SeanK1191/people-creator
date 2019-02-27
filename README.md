# people-creator
Small UI and API for creating People

You can see a demo of this repo [here](https://seank1191.github.io/)

:warning: If nothing loads please refresh the page, it's likely just the time it takes for the service worker to register.

# Running Locally

## Back End 

Back-end should be set up first.

Open the Tech-Test solution in the backend folder in visual studio.

Set the database context called Tech_TestContext with your SQL connection string like below:

```
<add name="Tech_TestContext" connectionString="Server={YourServerUrl};Initial Catalog=techTest;Persist Security Info=False;User ID={YourSQLUser};Password={YourSQLPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
      providerName="System.Data.SqlClient" />

```

Now you can start the Tech-Test project in visual studio and it should start running the API locally at http://localhost:50753

## Front End

In the front end set the value of apiUrl in public/config.json to the url where your API started (should be http://localhost:50753).

Then navigate to the front-end folder on the command line and run `` npm install`` and then ``npm start ``.

This should open a local UI at http://localhost:3000 and should be calling your local API.