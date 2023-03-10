// const { Query } = require("cypher-query-builder");

// const createUser = (data) => {
//     let query = new Query();

//     query
//         .createNode("user", "Student")
//         .set({
//             variables: {
//                 user: {
//                     totalExp  : 0,
//                     userData  : null,
//                     uuid      : null,
//                     weeklyExp : 0
//                 }
//             }
//         });

//     return query;
// };

// const getUsers = (data) => {
//     let query = new Query();

//     query
//         .matchNode()
//         .return();

//     return query;
// };


// module.exports = {
//     createUser,
//     getUsers
// };