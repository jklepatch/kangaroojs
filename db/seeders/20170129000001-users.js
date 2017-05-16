'use strict';

/*
 * Create test data with the faker library
 * - 1 admin,
 * - 2 members
 * 
 * To run the seed, type sequelize db:seed`
 * To create other seed files, type `sequelize seed:create`
 * For more information on the sequelize-cli, commands,
 * see the official docs: https://github.com/sequelize/cli 
 * 
 * Seeds file will be run in the order
 * they were created.
 */

const bcrypt = require('bcrypt-nodejs');
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('users', users, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

const users = [
  {
    email: 'admin@admin.com',  
    avatar: faker.internet.avatar(),  
    password: bcrypt.hashSync('00000000'), 
    role: 'admin', 
    createdAt: new Date(), 
    updatedAt: new Date()
  },
  {
    email: 'bob@bob.com', 
    avatar: faker.internet.avatar(),  
    password: bcrypt.hashSync('00000000'), 
    role: 'member', 
    createdAt: new Date(), 
    updatedAt: new Date()
  },
  {
    email: 'jack@jack.com', 
    avatar: faker.internet.avatar(), 
    password: bcrypt.hashSync('00000000'), 
    role: 'member', 
    createdAt: new Date(), 
    updatedAt: new Date()
  },
];
