const {
  GET_UUID,
  CREATE_PROBLEM,
  CREATE_QUIZ,
  CREATE_VIDEO,
  CREATE_TEXT,
  UPDATE_CONTENT
} = require("../content.joi.js");

describe("content joi tests", () => {
  describe("content joi uuid", () => {
    it("Give Value when UUID given", () => {
      const params = {
        uuid: "1234567890abcdef"
      };

      const { value } = GET_UUID.validate(params);

      expect(value).toHaveProperty("uuid", params.uuid);
    });

    it("give error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });

  describe("joi create PROBLEM", () => {
    it("give back value when body is correct", () => {
      const body = {
        label     : "Problem",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        element  : "H1",
        content  : "String content",
        language : "Javascript"
      };

      const { value } = CREATE_PROBLEM.validate(body);

      expect(value).toHaveProperty("desc", body.desc);
      expect(value).toHaveProperty("element", body.element);
      expect(value).toHaveProperty("language", body.language);
    });

    it("give error when no dayUuid given", () => {
      const body = {
        label     : "Problem",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "",
        contentNo : 6,
        time      : 100,

        element  : "H1",
        content  : "String content",
        language : "Javascript"
      };

      const { error } = CREATE_PROBLEM.validate(body);

      expect(error.details[0].message).toBe('"dayUuid" is not allowed to be empty');
    });
  });

  describe("joi create QUIZ", () => {
    it("give back value when body is correct", () => {
      const body = {
        label     : "Quiz",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        path: "Camino al Cielo"
      };

      const { value } = CREATE_QUIZ.validate(body);

      expect(value).toHaveProperty("path", body.path);
      expect(value).toHaveProperty("title", body.title);
      expect(value).toHaveProperty("time", body.time);
    });

    it("give error when no dayUuid given", () => {
      const body = {
        label     : "Quiz",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        path: ""
      };

      const { error } = CREATE_QUIZ.validate(body);

      expect(error.details[0].message).toBe('"path" is not allowed to be empty');
    });
  });

  describe("joi create VIDEO", () => {
    it("give back value when body is correct", () => {
      const body = {
        label     : "Video",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        link: "http://example.com"
      };

      const { value } = CREATE_VIDEO.validate(body);

      expect(value).toHaveProperty("link", body.link);
      expect(value).toHaveProperty("contentNo", body.contentNo);
      expect(value).toHaveProperty("exp", body.exp);
    });

    it("give error when no dayUuid given", () => {
      const body = {
        label     : "Video",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        link: ""
      };

      const { error } = CREATE_VIDEO.validate(body);

      expect(error.details[0].message).toBe('"link" is not allowed to be empty');
    });
  });

  describe("joi create TEXT", () => {
    it("give back value when body is correct", () => {
      const body = {
        label     : "Text",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        path: "Camino al Cielo"
      };

      const { value } = CREATE_TEXT.validate(body);

      expect(value).toHaveProperty("path", body.path);
      expect(value).toHaveProperty("desc", body.desc);
      expect(value).toHaveProperty("exp", body.exp);
    });

    it("give error when no dayUuid given", () => {
      const body = {
        label     : "Text",
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100
      };

      const { error } = CREATE_TEXT.validate(body);

      expect(error.details[0].message).toBe('"path" is required');
    });
  });

  describe("joi update CONTENT", () => {
    it("give error when no uuid given", () => {
      const body = {
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        path     : "Camino al Cielo",
        element  : "H1",
        content  : "String content",
        language : "Javascript"
      };

      const { error } = UPDATE_CONTENT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("give error when uuid is empty", () => {
      const body = {
        exp       : 10,
        title     : "something 1",
        desc      : "something 1/.",
        dayUuid   : "2k3-d4l42-3d-l4d23",
        contentNo : 6,
        time      : 100,

        path     : "Camino al Cielo",
        element  : "H1",
        content  : "String content",
        language : "Javascript"
      };

      const { error } = UPDATE_CONTENT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is not allowed to be empty');
    });
  });
});