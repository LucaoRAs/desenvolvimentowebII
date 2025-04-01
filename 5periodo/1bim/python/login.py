import pymysql
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint

login_bp = Blueprint("login", __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    try:
        usuario = request.json
        email = usuario['email']
        senha = usuario['senha']

        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        
        cur.execute("SELECT * FROM usuario WHERE email = %s AND senha = %s", (email, senha))
        rows = cur.fetchall()
        if len(rows) == 0:
            resp = {"sucess": False}, 401
        else:
            resp = {"sucess": False}, 200
        return resp

    except Exception as e:
        print(e)
    
    finally:
        cur.close()
        conn.close()

