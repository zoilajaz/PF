const modelAudi = {
    querygetaudi: "SELECT * FROM prestamo",
    querygetaudiID: "SELECT * FROM prestamo WHERE id = ?",
    queryviExist:`SELECT Name_facilitator FROM prestamo WHERE Name_facilitator = ?`,
    queryInsert: `INSERT INTO prestamo(
        Name_facilitator,
        Name_applicant,
        Position,
        Borrowed_resource,
        Ocupation_time)
    VALUES (
        ?,?,?,?,?)`
}

module.exports = modelAudi