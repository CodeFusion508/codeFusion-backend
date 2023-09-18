const {
  GET_UUID,
  CREATE_PROBLEM,
  CREATE_QUIZ,
  CREATE_VIDEO,
  CREATE_TEXT,
  UPDATE_CONTENT
} = require("../content.joi.js");

describe("Content Joi Tests", () => {
  describe("GET_UUID Joi", () => {
    it("Throw error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("Give value when body is correct", () => {
      const params = {
        uuid: "f40eeba5-392d-464f-8c3f-f246d13658bd"
      };

      const { error, value } = GET_UUID.validate(params);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("uuid", params.uuid);
    });
  });

  describe("CREATE_PROBLEM Joi", () => {
    it("Throw error when no dayUuid given", () => {
      const body = {
        label     : "Problem",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "",
        contentNo : 2009,
        time      : "2009 Hours",

        language: "Java"
      };

      const { error } = CREATE_PROBLEM.validate(body);

      expect(error.details[0].message).toBe('"dayUuid" is not allowed to be empty');
    });

    it("Give value when body is correct", () => {
      const body = {
        label     : "Problem",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
        contentNo : 2009,
        time      : "2009 Hours",

        language: "Java"
      };

      const { error, value } = CREATE_PROBLEM.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("desc", body.desc);
      expect(value).toHaveProperty("language", body.language);
    });
  });

  describe("CREATE_QUIZ Joi", () => {
    it("Throw error when no path given", () => {
      const body = {
        label     : "Quiz",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
        contentNo : 2009,
        time      : "2009 Hours",

        path: ""
      };

      const { error } = CREATE_QUIZ.validate(body);

      expect(error.details[0].message).toBe('"path" is not allowed to be empty');
    });

    it("Give value when body is correct", () => {
      const body = {
        label     : "Quiz",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
        contentNo : 2009,
        time      : "2009 Hours",

        path: "Camino al Cielo"
      };

      const { error, value } = CREATE_QUIZ.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("path", body.path);
      expect(value).toHaveProperty("title", body.title);
      expect(value).toHaveProperty("time", body.time);
    });
  });

  describe("CREATE_VIDEO Joi", () => {
    it("Throw error when no link given", () => {
      const body = {
        label     : "Video",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
        contentNo : 2009,
        time      : "2009 Hours",

        link: ""
      };

      const { error } = CREATE_VIDEO.validate(body);

      expect(error.details[0].message).toBe('"link" is not allowed to be empty');
    });

    it("Give value when body is correct", () => {
      const body = {
        label     : "Video",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
        contentNo : 2009,
        time      : "2009 Hours",

        link: "https://phind.com"
      };

      const { error, value } = CREATE_VIDEO.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("link", body.link);
      expect(value).toHaveProperty("contentNo", body.contentNo);
      expect(value).toHaveProperty("exp", body.exp);
    });
  });

  describe("CREATE_TEXT Joi", () => {
    it("Throw error when no path given", () => {
      const body = {
        label     : "Text",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
        contentNo : 2009,
        time      : "2009 Hours"
      };

      const { error } = CREATE_TEXT.validate(body);

      expect(error.details[0].message).toBe('"path" is required');
    });

    it("Give value when body is correct", () => {
      const body = {
        label     : "Text",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        dayUuid   : "b994c88a-44b8-40a3-8f3e-788ccfdbb348",
        contentNo : 2009,
        time      : "2009 Hours",

        path: "Camino al Cielo"
      };

      const { error, value } = CREATE_TEXT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("path", body.path);
      expect(value).toHaveProperty("desc", body.desc);
      expect(value).toHaveProperty("exp", body.exp);
    });
  });

  describe("UPDATE_CONTENT Joi", () => {
    it("Throw error when label lowercase", () => {
      const body = {
        uuid      : "f40eeba5-392d-464f-8c3f-f246d13658bd",
        label     : "problem",
        exp       : 2009,
        title     : "Minecraft",
        desc      : "The creeper was a bug!",
        contentNo : 2009,
        time      : "2009 Hours",

        language: "Java"
      };

      const { error } = UPDATE_CONTENT.validate(body);

      expect(error.details[0].message).toBe('"label" must be one of [Problem, Quiz, Text, Video]');
    });

    it("Give value when body is correct", () => {
      const body = {
        uuid  : "f40eeba5-392d-464f-8c3f-f246d13658bd",
        label : "Problem",
        exp   : 2009,
        title : "Minecraft",
        desc  : "The creeper was a bug!",
        time  : "2009 Hours",

        language: "Java"
      };

      const { error, value } = UPDATE_CONTENT.validate(body);
      if (error) throw new Error(`${error.message}`);

      expect(value).toHaveProperty("desc", body.desc);
      expect(value).toHaveProperty("uuid", body.uuid);
      expect(value).toHaveProperty("label", body.label);
    });
  });
});