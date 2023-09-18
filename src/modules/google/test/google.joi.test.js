const {
  CREATE_G_USER,
  LOGIN_G_USER,
  GET_ALL_ANSWERS,
  GET_USER_ANSWERS
} = require("../google.joi");

describe("Google Joi Tests", () => {
  describe("CREATE_G_USER Joi", () => {
    it("Throw error when email is not valid", () => {
      const body = {
        email    : "Something Malicious",
        userName : "Async Research Institute",
        idToken  : "Super Secret Token"
      };

      const { error } = CREATE_G_USER.validate(body);

      expect(error.details[0].message).toBe('"email" must be a valid email');
    });

    it("Give value when body is correct", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        userName : "Async Research Institute",
        idToken  : "Super Secret Token"
      };

      const { error, value } = CREATE_G_USER.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("email", body.email);
      expect(value).toHaveProperty("userName", body.userName);
      expect(value).toHaveProperty("idToken", body.idToken);
    });
  });

  describe("LOGIN_G_USER Joi", () => {
    it("Throw error when idToken is not provided", () => {
      const body = {};

      const { error } = LOGIN_G_USER.validate(body);

      expect(error.details[0].message).toBe('"idToken" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        idToken: "Super Secret Token"
      };

      const { error, value } = LOGIN_G_USER.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("idToken", body.idToken);
    });
  });

  describe("GET_ALL_ANSWERS Joi", () => {
    it("Throw error when sheet_id is not provided", () => {
      const body = {};

      const { error } = GET_ALL_ANSWERS.validate(body);

      expect(error.details[0].message).toBe('"sheet_id" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        sheet_id: "Sheet ID"
      };

      const { error, value } = GET_ALL_ANSWERS.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("sheet_id", body.sheet_id);
    });
  });

  describe("GET_USER_ANSWERS Joi", () => {
    it("Throw error when sheet_id is a number", () => {
      const body = {
        sheet_id : 1993,
        email    : "AsyncResearch@mail.org"
      };

      const { error } = GET_USER_ANSWERS.validate(body);

      expect(error.details[0].message).toBe('"sheet_id" must be a string');
    });

    it("Give value when body is correct", () => {
      const body = {
        sheet_id : "Sheet ID",
        email    : "AsyncResearch@mail.org"
      };

      const { error, value } = GET_ALL_ANSWERS.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("sheet_id", body.sheet_id);
      expect(value).toHaveProperty("email", body.email);
    });
  });
});


