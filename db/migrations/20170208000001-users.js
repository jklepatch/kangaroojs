'use strict';

/*
 * Migration file for the `users` table
 *
 * To run it, type `sequelize db:migrate`
 * To create other seed files, type `sequelize migrattion:create`
 * For more information on the sequelize-cli, commands,
 * see the official docs: https://github.com/sequelize/cli  
 * 
 * Migration files will be run in the order they were created.
 */

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', 
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        avatar: {
			    type: Sequelize.STRING,
			    allowNull: true,
          defaultValue: '/img/user.png'
		    },
        role: {
          type: Sequelize.ENUM('member', 'admin'),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
