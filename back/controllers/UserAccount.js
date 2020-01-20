const UserAccount = require('../service/UserAccountService');

module.exports.createUserAccount = function createUserAccount (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  let tmp = "";
  UserAccount.createUserAccount(username, email, password)
    .then((userID) => {
      tmp += userID;
    })
    .catch(err => {
      console.log(err);
      tmp += "-1";
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.deleteUserAccount = function deleteUserAccount (req, res, userId) {
  let tmp = "";
  UserAccount.deleteUserAccount(userId)
    .then((deleted) => {
      tmp += deleted;
    })
    .catch(err => {
      tmp += err;
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.loginUserAccount = function loginUserAccount (req, res) {
  const usernameOrEmail = req.query.usernameOrEmail;
  const password = req.query.password;
  let tmp = "";
  UserAccount.loginUserAccount(usernameOrEmail, password)
    .then((response) => {
      tmp += response;
    })
    .catch(err => {
      tmp += err;
    })
    .then(() => res.write(tmp))
    .then(() => res.send());
};

module.exports.updateUserAccount = function updateUserAccount (req, res, userId) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  UserAccount.updateUserAccount(userId, username, email, password)
    .then((response) => {
      tmp += response;
    })
    .catch(err => {
      tmp += err;
    })
    .then(() => res.write(tmp))
    .then(() => res.send());;
};
