'use strict';

const bcrypt   = require('bcrypt-nodejs');
var User = {};
var instanceMethods = {};
var classMethods = {};

const initModel = function(sequelize, DataTypes) {
  User = sequelize.define("user", {
		email: {
			type: DataTypes.STRING, 
			unique:  {
        args: true,
        msg: 'This email is already used. Please choose another one.'
      },
			isEmail: 		true,
			allowNull: 	false
		},
    password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				min: {
					args: [8],
					msg: 'Password must be 8 characters or more.'
				}
			},
			set: function(password) {
				/*
				 * If password is too short, we set the field to an arbitrary
				 * value below 8 characters, to make the validation fail
				 * If we didn't do this, the hash function would hash the bad password
				 * into a string more than 8 characters long and validation would
				 * not fail...
				 */
				if(typeof password === 'undefined' || password.length < 8) {
					return this.setDataValue('password', '0');
				}
				this.setDataValue('password', bcrypt.hashSync(password));
			}
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '/img/user.png'
		},
    role: {
			type: DataTypes.ENUM('member', 'admin'),
			allowNull: false,
			/*
			 * There is a mysql quirk that causes it to not throw an error if we try to save a 
			 * record where an ENUM field has a value not in ENUM. Instead mysql
			 * will save the record with a blank value for this field. In order to prevent this,
			 * We need to throw the error manually in the model before it hits mysql
			 */ 
			validate: {
				mustBeInEnum: function (val) {
					if(['member', 'admin'].indexOf(val) === -1) throw new Error('Role must be either member or admin.');
				}
			}
		}}, {
			instanceMethods: instanceMethods,
			classMethods: classMethods
		});
	
  return User;
};

/*
 * Class methods
 **/
classMethods.associate = function (models) {
  // User.hasMany(models.modelName, {foreignKey: 'userId'});
};

/*
 * Instance methods
 **/
instanceMethods.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = initModel;