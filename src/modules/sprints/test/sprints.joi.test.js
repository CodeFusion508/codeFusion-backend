const {
  GET_UUID,
  CREATE_SPRINT,
  UPDATE_SPRINT
} = require("../sprints.joi.js");

describe("sprints joi tests", () => {
  describe("create sprint joi", () => {
    it("give error when password is null", () => {
      const body = {
        email    : "testing10390@gmail.com",
        password : null,
        userName : "testing800"
      };

      const { error } = CREATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"password" must be a string');
    });

    it("give error when email is null", () => {
      const body = {
        email    : null,
        password : "1234",
        userName : "testing800"
      };

      const { error } = CREATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"email" must be a string');
    });
  });

});