async function getAllAnswersQuery({ service, authClient }, sheet_id) {
    try {
        const res = await service.spreadsheets.values.get({
            auth          : authClient,
            spreadsheetId : sheet_id,
            range         : "'Respuestas de formulario 1'",
        });

        const rows = res.data.values;

        return rows;
    } catch (error) {
        throw { err: 400, message: `${error}` };
    }
}

async function getEvaluationQuery({ service, authClient }, sheet_id, email) {
    try {
        const res = await service.spreadsheets.values.get({
            auth          : authClient,
            spreadsheetId : sheet_id,
            range         : "B:C",
        });

        const rows = res.data.values;

        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] === email) {
                return rows[i][1];
            }
        }
    } catch (error) {
        throw { err: 400, message: `${error}` };
    }
}

module.exports = { getAllAnswersQuery, getEvaluationQuery };