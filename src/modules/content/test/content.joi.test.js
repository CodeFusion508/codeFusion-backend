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
    it("give error when no UUID given", () => {
      const params = {};

      const { error } = GET_UUID.validate(params);

      expect(error.details[0].message).toBe('"uuid" is required');
    });
  });

  describe("joi create PROBLEM", () => {
    it("give back value when body is correct", () => {
      const body = {
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

      expect(value).toHaveProperty("desc");
      expect(value).toHaveProperty("element");
      expect(value).toHaveProperty("language");
    });

    it("give error when no dayUuid given", () => {
      const body = {
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

      const { error } = CREATE_PROBLEM.validate(body);

      expect(error.details[0].message).toBe('"dayUuid" is not allowed to be empty');
    });
  });

  describe("joi create QUIZ", () => {
    it("give back value when body is correct", () => {
      const body = {
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

      const { value } = CREATE_QUIZ.validate(body);

      expect(value).toHaveProperty("desc");
      expect(value).toHaveProperty("element");
      expect(value).toHaveProperty("language");
    });

    it("give error when no dayUuid given", () => {
      const body = {
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

      const { error } = CREATE_QUIZ.validate(body);

      expect(error.details[0].message).toBe('"dayUuid" is not allowed to be empty');
    });
  });

  describe("joi create VIDEO", () => {
    it("give back value when body is correct", () => {
      const body = {
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

      const { value } = CREATE_VIDEO.validate(body);

      expect(value).toHaveProperty("desc");
      expect(value).toHaveProperty("element");
      expect(value).toHaveProperty("language");
    });

    it("give error when no dayUuid given", () => {
      const body = {
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

      const { error } = CREATE_VIDEO.validate(body);

      expect(error.details[0].message).toBe('"dayUuid" is not allowed to be empty');
    });
  });

  describe("joi create TEXT", () => {
    it("give back value when body is correct", () => {
      const body = {
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

      const { value } = CREATE_TEXT.validate(body);

      expect(value).toHaveProperty("desc");
      expect(value).toHaveProperty("element");
      expect(value).toHaveProperty("language");
    });

    it("give error when no dayUuid given", () => {
      const body = {
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

      const { error } = CREATE_TEXT.validate(body);

      expect(error.details[0].message).toBe('"dayUuid" is not allowed to be empty');
    });
  });

  describe("joi update CONTENT", () => {
    it("give error when no uuid given", () => {
      const body = {
        desc  : "lorem asd",
        path  : "3s/3s3s3srcfff",
        exp   : 120,
        title : "section 1",
        time  : 1000
      };

      const { error } = UPDATE_CONTENT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is required');
    });

    it("give error when uuid is empty", () => {
      const body = {
        uuid  : "",
        title : "sakdlsakld",
        time  : 39324932
      };

      const { error } = UPDATE_CONTENT.validate(body);

      expect(error.details[0].message).toBe('"uuid" is not allowed to be empty');
    });
  });
});