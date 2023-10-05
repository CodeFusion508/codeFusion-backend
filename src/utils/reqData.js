const params = ({ params }) => params;
const paramsAndQuery = ({ params, query }) => ({ ...params, ...query });

const body = ({ body }) => body;
const bodyAndParams = ({ params, body }) => ({ ...params, ...body });
const bodyAndQuery = ({ query, body }) => ({ ...query, ...body });

const query = ({ query }) => query;

module.exports = {
    body,
    bodyAndParams,
    bodyAndQuery,
    params,
    paramsAndQuery,
    query
};