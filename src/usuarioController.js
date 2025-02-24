async function connect() {
    if (global.connection && global.connection.state != 'discconnect') {
        return global.connection;
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: '54.91.193.137',
        user: 'libertas',
        password: '123456',
        database: 'libertas5per'
    });
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const con = await connect();
    const sql = 'INSERT INTO usuario' 
                + '(nome, telefone, email, senha)'
                + ' VALUES (?, ?, ?, ?)';
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha];
    await con.query(sql, values);
    res.status(201).send('inserido com sucesso');
}

exports.put = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = 'UPDATE usuario SET nome =?, telefone =?, email =?, senha =? WHERE idusuario = ?';
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha, id];
    await con.query(sql, values);
    res.status(201).send('ok');
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200)('rota delete ' + id);
}

exports.get = async (req, res, next) => {
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM usuario');
    res.status(200).send(rows);
}

exports.getById = async (req, res, next) => {
    let id = req.params.id;
    res.status(200).send('rota get com id ' + id);
}