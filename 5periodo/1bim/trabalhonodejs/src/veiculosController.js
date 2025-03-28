async function connect() {
    if (global.connection && global.connection.state != 'disconnected') {
        return global.connection;
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '4862',
        database: 'veiculos_db'
    });
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const con = await connect();
    const sql = 'INSERT INTO veiculos' 
                + '(modelo, marca, ano, cor, preco)'
                + ' VALUES (?, ?, ?, ?, ?)';
    const values = [req.body.modelo, req.body.marca, req.body.ano, req.body.cor, req.body.preco];
    await con.query(sql, values);
    res.status(201).send('Veículo inserido com sucesso');
}

exports.put = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = 'UPDATE veiculos SET modelo =?, marca =?, ano =?, cor =?, preco=? WHERE id = ?';
    const values = [req.body.modelo, req.body.marca, req.body.ano, req.body.cor, req.body.preco, id];
    await con.query(sql, values);
    res.status(201).send('ok');
}

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = 'DELETE from veiculos WHERE id = ?';
    const values = [id];
    await con.query(sql, values);
    res.status(201).send('ok');
}
exports.get = async (req, res, next) => {
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM veiculos');
    res.status(200).send(rows);
}

exports.getById = async (req, res, next) => {
    try{
        let id = req.params.id;
        const con = await connect();
        const [rows] = await con.query('SELECT * FROM veiculos WHERE id =?', [id]);
        if (rows.length == 0) {
            return res.status(404).send({error: 'Veículo não encontrado'});
        }
        res.status(200).send(rows[0]);
    } catch (error){
        res.status(500).send({error: 'Erro interno no servidor'});
    }
}