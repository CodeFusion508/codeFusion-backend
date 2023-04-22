const {
  CREATE_USER,
  LOGIN_USER,
  UPDATE_USER,
  GET_UUID,
  CREATE_RELATION,
  DELETE_RELATION
} = require("../users.joi.js");

describe("user joi tests", () => {
  describe("create user joi", () => {
    it("give error when password is null", () => {
      const body = {
        email    : "testing10390@gmail.com",
        password : null,
        userName : "testing800"
      };

      const { error } = CREATE_USER.validate(body);

      expect(error.details[0].message).toBe('"password" must be a string');
    });

    it("give error when email is null", () => {
      const body = {
        email    : null,
        password : "1234",
        userName : "testing800"
      };

      const { error } = CREATE_USER.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
    });
  });

  describe("update user joi", () => {
    it("give error when no uuid given", () => {
      const body = {
        email    : "somethingELSE@gmail.com",
        userName : "asd400"
      };

      const { error } = UPDATE_USER.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("give error when exp is not a number", () => {
      const body = {
        uuid     : "03aef53a-f14f-4405-b31f-24c10ca4d3e3",
        totalExp : "Hey123"
      };

      const { error } = UPDATE_USER.validate(body);

      expect(error.details[0].message).toBe('"totalExp" must be a number');
    });
  });

  describe("user joi login", () => {
    it("give error when email is empty", () => {
      const body = {
        email    : "",
        password : "1234",
      };

      const { error } = LOGIN_USER.validate(body);

      expect(error.details[0].message).toBe('"email" is not allowed to be empty');
    });

    it("give error when password is empty", () => {
      const body = {
        email    : "testing400@mail.com",
        password : "",
      };

      const { error } = LOGIN_USER.validate(body);

      expect(error.details[0].message).toBe('"password" is not allowed to be empty');
    });
  });

  describe("user joi uuid", () => {
    it("give error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });

  describe("create rel joi", () => {
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

  describe("delete rel joi", () => {
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
});


