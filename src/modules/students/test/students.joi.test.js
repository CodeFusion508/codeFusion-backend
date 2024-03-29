const {
  GET_UUID,
  CREATE_STUDENT,
  LOGIN_STUDENT,
  UPDATE_STUDENT,

  CREATE_RELATION,
  DELETE_RELATION,

  CONFIRM_ACCOUNT,
  RECOVERY_ACCOUNT
} = require("../students.joi.js");

describe("Students Joi Tests", () => {
  describe("CREATE_STUDENT Joi", () => {
    it("Throw error when password is null", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        password : null,
        userName : "Async Research Institute"
      };

      const { error } = CREATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"password" must be a string');
    });

    it("Give value when body is correct", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        password : "password",
        userName : "Async Research Institute"
      };

      const { error, value } = CREATE_STUDENT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("email", body.email);
      expect(value).toHaveProperty("password", body.password);
      expect(value).toHaveProperty("userName", body.userName);
    });
  });

  describe("UPDATE_STUDENT Joi", () => {
    it("Throw error when no uuid given", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        userName : "Async Research Institute"
      };

      const { error } = UPDATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        uuid      : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
        totalExp  : 1993,
        weeklyExp : 1993,
        userName  : "Async Research Institute",
        email     : "AsyncResearch@mail.org",
        password  : "password"
      };

      const { error, value } = UPDATE_STUDENT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("uuid", body.uuid);
      expect(value).toHaveProperty("totalExp", body.totalExp);
      expect(value).toHaveProperty("weeklyExp", body.weeklyExp);
      expect(value).toHaveProperty("userName", body.userName);
      expect(value).toHaveProperty("email", body.email);
      expect(value).toHaveProperty("password", body.password);
    });
  });

  describe("LOGIN_STUDENT Joi", () => {
    it("Throw error when email is empty", () => {
      const body = {
        email    : "",
        password : "password",
      };

      const { error } = LOGIN_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"email" is not allowed to be empty');
    });

    it("Give value when body is correct", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        password : "password"
      };

      const { error, value } = LOGIN_STUDENT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("email", body.email);
      expect(value).toHaveProperty("password", body.password);
    });
  });

  describe("GET_UUID Joi", () => {
    it("Throw error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        uuid: "245710fd-67d0-45d4-a7a2-9e963aa45e7f"
      };

      const { error, value } = GET_UUID.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("uuid", body.uuid);
    });
  });

  describe("CREATE_RELATION Joi", () => {
    it("Throw error when no uuid is given", () => {
      const body = {
        contentUuid: "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43"
      };

      const { error } = CREATE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        uuid         : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
        contentUuid  : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
        contentLabel : "Problem",
        relation     : "FAILED"
      };

      const { error, value } = CREATE_RELATION.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("uuid", body.uuid);
      expect(value).toHaveProperty("contentUuid", body.contentUuid);
      expect(value).toHaveProperty("contentLabel", body.contentLabel);
      expect(value).toHaveProperty("relation", body.relation);
    });
  });

  describe("DELETE_RELATION Joi", () => {
    it("Throw error when no uuid is given", () => {
      const body = {
        contentUuid: "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43"
      };

      const { error } = DELETE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        uuid         : "245710fd-67d0-45d4-a7a2-9e963aa45e7f",
        contentUuid  : "c4fc0d8d-5608-4c1e-ab7e-1bf61392cd43",
        contentLabel : "Problem",
        relation     : "FAILED"
      };

      const { error, value } = DELETE_RELATION.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("uuid", body.uuid);
      expect(value).toHaveProperty("contentUuid", body.contentUuid);
      expect(value).toHaveProperty("contentLabel", body.contentLabel);
      expect(value).toHaveProperty("relation", body.relation);
    });
  });

  describe("CONFIRM_ACCOUNT Joi", () => {
    it("Throw error when no token given", () => {
      const params = {};

      const { error } = CONFIRM_ACCOUNT.validate(params);

      expect(error.details[0].message).toBe('"token" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      };

      const { error, value } = CONFIRM_ACCOUNT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("token", body.token);
    });
  });

  describe("RECOVERY_ACCOUNT Joi", () => {
    it("give error when email is a number", () => {
      const body = {
        email: 1993
      };

      const { error } = RECOVERY_ACCOUNT.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
    });

    it("Give value when body is correct", () => {
      const body = {
        email: "AsyncResearch@mail.org",
      };

      const { error, value } = RECOVERY_ACCOUNT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("email", body.email);
    });
  });
});
