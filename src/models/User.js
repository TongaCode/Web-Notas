const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  password : {type: String, require: true}
}, {timestamps: true});

module.exports = model('User', UserSchema);

UserSchema.methods.encrypPassword = async pasword => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password)
};