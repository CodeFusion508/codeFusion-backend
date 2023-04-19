const {
  GET_UUID,
  CREATE_DAY,
  UPDATE_DAY
} = require("../days.joi.js");

describe("days joi tests", () => {
  describe("day joi uuid", () => {
    it("give error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });

  describe("joi create day", () => {
    it("give error when desc is number", () => {
      const body = {
        desc       : 143,
        dayNo      : 4,
        sprintUuid : "2312321dd34-d423135d34"
      };

      const { error } = CREATE_DAY.validate(body);

      expect(error.details[0].message).toBe('"desc" must be a string');
    });

    it("give error when no sprintUuid given", () => {
      const body = {
        desc  : "something1 here.",
        dayNo : 4
      };

      const { error } = CREATE_DAY.validate(body);

      expect(error.details[0].message).toBe('"sprintUuid" is required');
    });
  });

  describe("joi update day", () => {
    it("give error when desc is number", () => {
      const body = {
        uuid : "0kdi29k-89d4uj239d4",
        desc : 213
      };

      const { error } = UPDATE_DAY.validate(body);

      expect(error.details[0].message).toBe('"desc" must be a string');
    });

    it("give error when no uuid given", () => {
      const body = {
        exp  : "0kdi29k-89d4uj239d4",
        desc : "hey I am trying to change it"
      };

      const { error } = UPDATE_DAY.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });
});