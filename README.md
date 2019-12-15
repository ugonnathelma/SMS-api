# SMS-api

SMS-api is an sms management system that enables users send an sms from to each other.

### Features!

- Contacts can be created with the following fields:
- - First name
- - Last name
- - Phone number
- Contact can send an sms to another existing contact
- The status of the message is set as sent when a message has been sent
- When a contact is deleted, all messages associated with that contact are also deleted

### Tools and Modules Required
* [NodeJs](https://nodejs.org/en) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
*  Express - fast node.js network app framework
* [PostgreSQL](https://www.postgresql.org/)- The Relational database
* [Sequelize.js](http://docs.sequelizejs.com/manual/installation/getting-started.html) - An ORM to interface with PostgresQL
* [Postman](https://www.getpostman.com/) - To test APi's
* Terminal or Command Line
* Text Editor or IDE

### Installation
SMS-api requires you have [Node.js](https://nodejs.org/) v7+. Check your node version by typing `node -v`

```sh
$ git clone https://github.com/ugonnathelma/SMS-api.git
$ cd <into folder>
$ npm install
```

If you have postgres db already online, then copy the db url and add it to the `env file` as as `DATABASE_URL= '<link from dashboard>'` else if you are using postgres locally, then you need to do the following:
1. Create a db: Type `creadtedb <db name>` in your terminal
 2. Add an example of the following to your .env file, Note that DB_PASSWORD is optional

   ```
  DB_PASSWORD=
  DB_USER=
  DB_NAME=
  DB_TEST_NAME=
  DB_PORT=5432
  NODE_ENV=development
  HOST=127.0.0.1
   ```
Run migration 
```sh
$ sequelize db:migrate
```
Start the server.

```sh
$ npm start
```
To run Tests locally, 

```sh
$ npm test
```

### Endpoints

| VERB | URL | ACTION |
| ------ | ------ | ------ |
| POST | /api/contact | Creates a new contact |
| DELETE | /api/contact/:phoneNumber | Deletes contact |
| POST | /api/contact/:senderNumber/message/:receiverNumber | Create a message |
| DELETE | /api/message/:id | Deletes a message |
| GET | /api/message/:id | Gets a message |

### Apiary Documentation
https://app.apiary.io/smsapi24

### Development

Want to contribute? Great!

### Future Improvements

 - Write MORE Tests
 - Allow messgae to be sent to multiple recipients
 - Enable messgaes to be saved as draft so it can be editted
 - Add UI

License
----

MIT
