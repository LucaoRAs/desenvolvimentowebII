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
            resp = {}
            resp.status_code = 401
        else:
            resp = {"sucess": False}
            resp.status_code = 200

    except Exception as e:
        print(e)
    
    finally:
        cur.close()
        conn.close()

