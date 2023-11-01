const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync("1", 10);

exports.seed = function (knex) {
  const dateObj = new Date();
  const date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`


  return knex.schema.raw(`
    INSERT IGNORE INTO users (id,email,password,first_name,last_name,sex,active_status,user_type,created_on)
    VALUES(1,"1","${password}","Stanisav","Plochev","male","active","admin","${date}")
    ON DUPLICATE KEY UPDATE
    id=id,
    password=password,
    first_name=first_name,
    last_name=last_name,
    active_status=active_status,
    user_type=user_type,
    email=email
  `)
};
