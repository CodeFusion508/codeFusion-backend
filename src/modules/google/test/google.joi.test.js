const {
  CREATE_G_USER,
  LOGIN_G_USER,
  GET_ALL_ANSWERS,
  GET_USER_ANSWERS
} = require("../google.joi");

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

    it("give error when idToken is a number", () => {
      const body = {
        email    : "JuanDoe@mail.com",
        userName : "testing800",
        idToken  : 918274108
      };

      const { error } = CREATE_G_USER.validate(body);

      expect(error.details[0].message).toBe('"idToken" must be a string');
    });
  });

  describe("google user login joi", () => {
    it("give error when idToken is not provided", () => {
      const body = {};

      const { error } = LOGIN_G_USER.validate(body);

      expect(error.details[0].message).toBe('"idToken" is required');
    });

    it("give error when idToken is not a string", () => {
      const body = {
        idToken: 489405,
      };

      const { error } = LOGIN_G_USER.validate(body);

      expect(error.details[0].message).toBe('"idToken" must be a string');
    });
  });

  describe("get all answers joi", () => {
    it("give error when idToken is not provided", () => {
      const body = {};

      const { error } = GET_ALL_ANSWERS.validate(body);

      expect(error.details[0].message).toBe('"sheet_id" is required');
    });

    it("give error when idToken is not a string", () => {
      const body = {
        sheet_id: 949494,
      };

      const { error } = GET_ALL_ANSWERS.validate(body);

      expect(error.details[0].message).toBe('"sheet_id" must be a string');
    });
  });

  describe("get user answers joi", () => {
    it("give error when idToken is not provided", () => {
      const body = {};

      const { error } = GET_USER_ANSWERS.validate(body);

      expect(error.details[0].message).toBe('"sheet_id" is required');
    });

    it("give error when idToken is not a string", () => {
      const body = {
        sheet_id: "something123",
      };

      const { error } = GET_USER_ANSWERS.validate(body);

      expect(error.details[0].message).toBe('"email" is required');
    });
  });
});


