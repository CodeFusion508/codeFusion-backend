const {
  GET_UUID,
  CREATE_DAY,
  UPDATE_DAY
} = require("../days.joi.js");

describe("Days Joi Tests", () => {
  describe("GET_UUID Joi", () => {
    it("give error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const params = {
        uuid: "e1fa1541-a533-4936-bcbd-19221ad5da9e"
      };

      const { value } = GET_UUID.validate(params);

      expect(value).toHaveProperty("uuid", params.uuid);
    });
  });

  describe("CREATE_DAY Joi", () => {
    it("give error when desc is number", () => {
      const body = {
        desc       : 12,
        dayNo      : 4,
        sprintUuid : "356a0665-e499-408b-95d9-93aec11a9544"
      };

      const { error } = CREATE_DAY.validate(body);

      expect(error.details[0].message).toBe('"desc" must be a string');
    });

    it("Give value when body is correct", () => {
      const body = {
        desc       : "BFG",
        dayNo      : 1993,
        sprintUuid : "356a0665-e499-408b-95d9-93aec11a9544"
      };

      const { value } = CREATE_DAY.validate(body);

      expect(value).toHaveProperty("dayNo", body.dayNo);
      expect(value).toHaveProperty("sprintUuid", body.sprintUuid);
      expect(value).toHaveProperty("desc", body.desc);
    });
  });

  describe("UPDATE_DAY Joi", () => {
    it("give error when desc is number", () => {
      const body = {
        uuid : "e1fa1541-a533-4936-bcbd-19221ad5da9e",
        desc : 1994
      };

      const { error } = UPDATE_DAY.validate(body);

      expect(error.details[0].message).toBe('"desc" must be a string');
    });

    it("Give value when body is correct", () => {
      const body = {
        uuid : "e1fa1541-a533-4936-bcbd-19221ad5da9e",
        exp  : 1994,
        desc : "Hell on Earth"
      };

      const { value } = UPDATE_DAY.validate(body);

      expect(value).toHaveProperty("uuid", body.uuid);
      expect(value).toHaveProperty("exp", body.exp);
      expect(value).toHaveProperty("desc", body.desc);
    });
  });
});