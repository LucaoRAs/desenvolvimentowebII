const veiculosController = require('./veiculosController');

module.exports = (app) => {
    app.post('/veiculos', veiculosController.post);
    app.put('/veiculos/:id', veiculosController.put);
    app.delete('/veiculos/:id', veiculosController.delete);
    app.get('/veiculos', veiculosController.get);
    app.get('/veiculos/:id', veiculosController.getById);
};
