const {
    createUser,
    deleteUser,
    getUser,
    updateUser,
} = require("../users.ctrl.js");

describe("hey this is a test", () => {
    let deps;

    beforeAll(() => {
        deps = {
            config   : {},
            ctrls    : {},
            services : {
                neo4j: {
                    session: {
                        run: jest.fn().mockResolvedValue()
                    }
                }
            }
        };

    });


    it("createUser", async () => {


        expect(createUser).toBeDefined();
    });

});