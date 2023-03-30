const {
  createUSER,
  logInUSER,
  getUUID
} = require("../users.joi.js");

describe("user joi tests", () => {
  describe("create user joi", () => {
    it("validate schema user when exist a error in password", () => {
      const body = {
        email    : "testing10390@gmail.com",
        password : null,
        userName : "testing800",
      };

      const { error } = createUSER.validate(body);

      expect(error.details[0].message).toBe('"password" must be a string');
    });

    it("validate schema user when exist a error in email", () => {
      const body = {
        email    : null,
        password : "1234",
        userName : "testing800",
      };

      const { error } = createUSER.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
    });
  });


  describe("user joi login", () => {
    it("Email null", () => {
      const body = {
        email    : "",
        password : "1234",
      };

      const { error } = logInUSER.validate(body);

      expect(error.details[0].message).toBe('"email" is not allowed to be empty');
    });
  });

  describe("user joi uuid", () => {
    it("UUID null", () => {
      const params = {};

      const { error } = getUUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });
});



