const { v4 } = require("uuid");

module.exports = (deps) =>
  Object.entries(module.exports).reduce((acc, [name, method]) => {
    return {
      ...acc,
      [name]: method.bind(null, { ...module.exports, ...deps }),
    };
  }, {});

const {
  createdQuery,
  getAllBySprint,
  getByUuid,
  deleteByIdQuery,
} = require("./Exams.query");
const {
  cleanRecord,
  cleanNeo4j,
  cleanRecords,
} = require("../../utils/cleanData");

const createdExams = async ({ services }, body) => {
  const allData = [];
    for (const key in body.content) {
      const content = body.content[key];
      const uuid = v4();
      const query = createdQuery(uuid, content);
      console.log(query);
      let data = await services.neo4j.session.run(query);
      data = cleanNeo4j(data);
      cleanRecord(data);
      allData.push(data);
    }

    return allData;
};

const findAllBySprint = async ({ services }, params) => {
  try {
    const query = getAllBySprint(params);

    let data = await services.neo4j.session.run(query);

    if (data.records.length === 0)
      throw { err: 404, message: "No hay resultados para su búsqueda." };

    data = cleanNeo4j(data);
    cleanRecords(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getById = async ({ services }, params) => {
  console.log(params);
  const query = getByUuid(params);
  let data = await services.neo4j.session.run(query);

  if (data.records.length === 0)
    throw { err: 404, message: "No hay resultados para su búsqueda." };

  data = cleanNeo4j(data);
  cleanRecords(data);

  return data;
};

const deleteExams = async ({ services }, params) => {
  const query = deleteByIdQuery(params);

  let data = await services.neo4j.session.run(query);
  data = cleanNeo4j(data);

  return data;
};

Object.assign(module.exports, {
  createdExams,
  findAllBySprint,
  getById,
  deleteExams,
});
