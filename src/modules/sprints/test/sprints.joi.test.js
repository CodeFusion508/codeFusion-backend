const {
  GET_UUID,
  CREATE_SPRINT,
  UPDATE_SPRINT
} = require("../sprints.joi.js");

describe("sprints joi tests", () => {
  describe("create sprint joi", () => {
    it("give error when title is number", () => {
      const body = {
        path  : "something",
        title : 123,
        desc  : "something",
        label : "something"
      };

      const { error } = CREATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"title" must be a string');
    });

    it("give error when path is number", () => {
      const body = {
        path  : 8403129,
        title : "something",
        desc  : "something",
        label : "something"
      };

      const { error } = CREATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"path" must be a string');
    });
  });

  describe("sprint joi uuid", () => {
    it("give error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });

  describe("update sprint joi", () => {
    it("give error when no uuid given", () => {
      const body = {
        totalExp : 11,
        title    : "some1",
        desc     : "thing.1",
        path     : "here/"
      };

      const { error } = UPDATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("give error when path is number", () => {
      const body = {
        uuid     : "d93k240d-d94k032i",
        totalExp : 11,
        title    : "some1",
        desc     : "thing.1",
        path     : 494321
      };

      const { error } = UPDATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"path" must be a string');
    });
  });

});