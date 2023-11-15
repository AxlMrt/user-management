import sql from "./db.js";

const User = (user) => {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.password = user.password;
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log(err);
      result (err, null);
      return
    }

    console.log("User created")
  })
}
