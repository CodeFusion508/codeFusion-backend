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
  describe("CREATE_STUDENT JOI", () => {
    it("give error when password is null", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        password : null,
        userName : "Async Research Institute"
      };

      const { error } = CREATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"password" must be a string');
    });

    it("give error when email is null", () => {
      const body = {
        email    : null,
        password : "1234",
        userName : "Async Research Institute"
      };

      const { error } = CREATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
    });
  });

  describe("UPDATE_STUDENT JOI", () => {
    it("give error when no uuid given", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        userName : "Async Research Institute"
      };

      const { error } = UPDATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("give error when exp is not a number", () => {
      const body = {
        uuid     : "03aef53a-f14f-4405-b31f-24c10ca4d3e3",
        totalExp : "Hey123"
      };

      const { error } = UPDATE_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"totalExp" must be a number');
    });
  });

  describe("LOGIN_STUDENT JOI", () => {
    it("give error when email is empty", () => {
      const body = {
        email    : "",
        password : "1234",
      };

      const { error } = LOGIN_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"email" is not allowed to be empty');
    });

    it("give error when password is empty", () => {
      const body = {
        email    : "AsyncResearch@mail.org",
        password : "",
      };

      const { error } = LOGIN_STUDENT.validate(body);

      expect(error.details[0].message).toBe('"password" is not allowed to be empty');
    });
  });

  describe("GET_UUID JOI", () => {
    it("give error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });

  describe("CREATE_RELATION JOI", () => {
    it("give error when no uuid is given", () => {
      const body = {
        contentUuid: "4963c5ca-fe26-4c5e-b302-d2c134be29a0"
      };

      const { error } = CREATE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("give error when no contentUuid is given", () => {
      const body = {
        uuid: "4963c5ca-fe26-4c5e-b302-d2c134be29a0"
      };

      const { error } = CREATE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"contentUuid" is required');
    });
  });

  describe("DELETE_RELATION JOI", () => {
    it("give error when no uuid is given", () => {
      const body = {
        contentUuid: "4963c5ca-fe26-4c5e-b302-d2c134be29a0"
      };

      const { error } = DELETE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("give error when no contentUuid is given", () => {
      const body = {
        uuid: "4963c5ca-fe26-4c5e-b302-d2c134be29a0"
      };

      const { error } = DELETE_RELATION.validate(body);

      expect(error.details[0].message).toBe('"contentUuid" is required');
    });
  });

  describe("CONFIRM_ACCOUNT JOI", () => {
    it("give error when no token given", () => {
      const params = {};

      const { error } = CONFIRM_ACCOUNT.validate(params);

      expect(error.details[0].message).toBe('"token" is required');
    });
  });

  describe("RECOVERY_ACCOUNT JOI", () => {
    it("give error when email is a number", () => {
      const body = {
        email: 123831
      };

      const { error } = RECOVERY_ACCOUNT.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
    });
  });
});