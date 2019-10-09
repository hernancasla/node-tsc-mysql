const User        = require('./models').User;

//get some fake data for example
const faker = require('faker');
const email = faker.internet.email();
const password = faker.internet.password();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const body = {email: email, password: password, name: lastName, surname: firstName};

//create a user
const newUser =  User.create(body);

//find the user
let user =  User.findOne({where: {email}});

//destroy the user with the object, this will call DELETE where id = our_user_id automatically.
 //user.destroy();