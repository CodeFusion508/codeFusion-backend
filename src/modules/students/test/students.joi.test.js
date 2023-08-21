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

    it("Throw error when email is null", () => {
      const body = {
        email    : null,
        password : "password",
        userName : "Async Research Institute"
      };

      const { error } = CREATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
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

    it("Throw error when exp is not a number", () => {
      const body = {
        uuid     : "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7",
        totalExp : "Totally not malicious"
      };

      const { error } = UPDATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"totalExp" must be a number');
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

    it("Throw error when password is empty", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        password : "",
      };

      const { error } = LOGIN_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"password" is not allowed to be empty');
    });
  });

  describe("GET_UUID Joi", () => {
    it("Throw error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });

  describe("CREATE_RELATION Joi", () => {
    it("Throw error when no uuid is given", () => {
      const body = {
        contentUuid: "@B9D3F1-!XZ@QP-9876-PL0M9N-A#C2E4"
      };

      const { error } = CREATE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Throw error when no contentUuid is given", () => {
      const body = {
        uuid: "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7"
      };

      const { error } = CREATE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"contentUuid" is required');
    });
  });

  describe("DELETE_RELATION Joi", () => {
    it("Throw error when no uuid is given", () => {
      const body = {
        contentUuid: "@B9D3F1-!XZ@QP-9876-PL0M9N-A#C2E4"
      };

      const { error } = DELETE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Throw error when no contentUuid is given", () => {
      const body = {
        uuid: "G1bB3ri$-X5Y9-!nv4l!d-#c0d3-Z7T8X@7"
      };

      const { error } = DELETE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"contentUuid" is required');
    });
  });

  describe("CONFIRM_ACCOUNT Joi", () => {
    it("Throw error when no token given", () => {
      const params = {};

      const { error } = CONFIRM_ACCOUNT.validate(params);

      expect(error.details[0].message).toBe('"token" is required');
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
  });
});