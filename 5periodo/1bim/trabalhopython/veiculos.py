import pymysql
from db_config import connect_db
from flask import jsonify, request, Blueprint

veiculos_bp = Blueprint("veiculo", __name__)

@veiculos_bp.route('/veiculos')
def veiculos():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM veiculos")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@veiculos_bp.route('/veiculos/<id>')
def veiculosbyid(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM veiculos WHERE id = %s", (id,))
        row = cur.fetchone()
        if row:
            resp = jsonify(row)
        else:
            resp = jsonify({'message': 'Veículo não encontrado'}), 404
        return resp
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@veiculos_bp.route('/veiculos', methods=['POST'])
def veiculonovo():
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        veiculos = request.json
        modelo = veiculos['modelo']
        marca = veiculos['marca']
        ano = veiculos['ano']
        cor = veiculos['cor']
        preco = veiculos['preco']
        cur.execute("INSERT INTO veiculos (modelo, marca, ano, cor, preco) VALUES (%s, %s, %s, %s, %s)", 
                    (modelo, marca, ano, cor, preco))
        conn.commit()
        resp = jsonify({'message': 'Veículo cadastrado com sucesso'})
        resp.status_code = 200
        return resp
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@veiculos_bp.route('/veiculos/<id>', methods=['PUT'])
def veiculoatualiza(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        veiculos = request.json
        modelo = veiculos['modelo']
        marca = veiculos['marca']
        ano = veiculos['ano']
        cor = veiculos['cor']
        preco = veiculos['preco']
        cur.execute("UPDATE veiculos SET modelo = %s, marca = %s, ano = %s, cor = %s, preco = %s WHERE id = %s", 
                    (modelo, marca, ano, cor, preco, id))
        conn.commit()
        resp = jsonify({'message': 'Veículo atualizado com sucesso'})
        resp.status_code = 200
        return resp
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@veiculos_bp.route('/veiculos/<id>', methods=['DELETE'])
def veiculodeleta(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("DELETE FROM veiculos WHERE id = %s", (id,))
        conn.commit()
        resp = jsonify({'message': 'Veículo deletado com sucesso'})
        resp.status_code = 200
        return resp
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        conn.close()
