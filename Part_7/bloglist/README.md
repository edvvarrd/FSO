## Start the application

To start this app, run in application's front-end directory:

```bash
$ npm install
$ npm run start
```

and in application's back-end inventory:

```bash
$ npm install
$ npm run start
```

To properly run an application, it needs to provide .env file in root directory - that contains variables:

```bash
# MongoDB url
MONGODB_URI = 'x'
# MongoDB url for testing
TEST_MONGODB_URI = 'x'
# Port for running an application
PORT = 'x'
# Secret variable for decrypthing hashpasswords
SECRET = 'x'
```
