const params = ({ params }) => params;
const paramsAndQuery = ({ params, query }) => { return { ...params, ...query }; };

const body = ({ body }) => body;

const bodyAndParams = ({ params, body }) => { return { ...params, ...body }; };
const bodyAndQuery = ({ query, body }) => { return { ...query, ...body }; };

const query = ({ query }) => query;

module.exports = {
    body,
    bodyAndParams,
    bodyAndQuery,
    params,
    paramsAndQuery,
    query
};