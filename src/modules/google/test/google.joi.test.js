const {
    CREATE_G_USER,
    LOGIN_G_USER,
    GET_ALL_ANSWERS,
    GET_USER_ANSWERS
} = require("../google.joi");
const {number} = require("joi");

describe("google joi tests", () => {
  describe("create google user joi", () => {
    it("give error when email is null", () => {
      const body = {
        email    : null,
        userName : "testing800",
        idToken  : "asdasdasdasdasdadasd"
      };

      const { error } = CREATE_G_USER.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
    });
  });
  describe("google user login joi", () => {
    it("give error when no idToken is empty", () => {
      const body = {
        idToken: "",
      };

      const { error } = LOGIN_G_USER.validate(body);

      expect(error.details[0].message).toBe('"idToken" is not allowed to be empty');
    });

    it("give error when idToken is not provided", () => {
      const body = {
      };

      const { error } = LOGIN_G_USER.validate(body);

      expect(error.details[0].message).toBe('"idToken" is required');
    });

    it("give error when idToken is not a string", () => {
      const body = {
        idToken: number,
      };

      const { error } = LOGIN_G_USER.validate(body);

      expect(error.details[0].message).toBe('"idToken" must be a string');
    });
  });
});


