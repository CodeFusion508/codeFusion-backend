const {
  GET_UUID,
  CREATE_SPRINT,
  UPDATE_SPRINT
} = require("../sprints.joi.js");

describe("Sprints Joi Tests", () => {
  describe("CREATE_SPRINT Joi", () => {
    it("Throw error when title is number", () => {
      const body = {
        sprintNo : 1993,
        title    : 1993,
        desc     : "If you're not careful and you noclip out of reality in the wrong areas"
      };

      const { error } = CREATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"title" must be a string');
    });

    it("Give value when body is correct", () => {
      const body = {
        sprintNo : 1993,
        title    : "The Backrooms",
        desc     : "If you're not careful and you noclip out of reality in the wrong areas"
      };

      const { error, value } = CREATE_SPRINT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("sprintNo", body.sprintNo);
      expect(value).toHaveProperty("title", body.title);
      expect(value).toHaveProperty("desc", body.desc);
    });
  });

  describe("GET_UUID Joi", () => {
    it("Throw error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const params = {
        uuid: "997bb6d3-b309-492e-a19d-f9cbc1af7fbf"
      };

      const { error, value } = CREATE_SPRINT.validate(params);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("uuid", params.uuid);
    });
  });

  describe("UPDATE_SPRINT Joi", () => {
    it("Throw error when no uuid given", () => {
      const body = {
        uuid     : undefined,
        sprintNo : 1993,
        title    : "Doom",
        desc     : "Avenge Daisy",
        totalExp : 1993
      };

      const { error } = UPDATE_SPRINT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        uuid     : "997bb6d3-b309-492e-a19d-f9cbc1af7fbf",
        sprintNo : 1993,
        title    : "Doom",
        desc     : "Avenge Daisy",
        totalExp : 1993
      };

      const { error, value } = CREATE_SPRINT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("uuid", body.uuid);
      expect(value).toHaveProperty("sprintNo", body.sprintNo);
      expect(value).toHaveProperty("title", body.title);
      expect(value).toHaveProperty("desc", body.desc);
      expect(value).toHaveProperty("totalExp", body.totalExp);
    });
  });

});