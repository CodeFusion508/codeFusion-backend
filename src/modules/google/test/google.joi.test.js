const {
  AUTH_G_USER
} = require("../google.joi.js");

describe("Google Joi Tests", () => {
  describe("CREATE_G_USER Joi", () => {
    it("Throw error when email is not valid", () => {
      const body = {
        email    : "Something Malicious",
        userName : "Async Research Institute",
        idToken  : "Super Secret Token"
      };

      const { error } = AUTH_G_USER.validate(body);

      expect(error.details[0].message).toBe('"email" must be a valid email');
    });

    it("Give value when body is correct", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        userName : "Async Research Institute",
        idToken  : "Super Secret Token"
      };

      const { error, value } = AUTH_G_USER.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("email", body.email);
      expect(value).toHaveProperty("userName", body.userName);
      expect(value).toHaveProperty("idToken", body.idToken);
    });
  });
});


