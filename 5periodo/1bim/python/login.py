import pymysql
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint, current_app
import jwt
import datetime

login_bp = Blueprint("login", __name__)


@login_bp.route('/login', methods=["POST"])
def login():
    try:

        #pegar os dados do JSON
        usuario = request.json
        email = usuario['email']
        senha = usuario['senha']
        #conectar ao banco de dados
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM usuario WHERE email = %s AND senha = %s", (email, senha))
        rows = cursor.fetchall()

        if len(rows) == 0:
            resp = {"success": False}, 401
        else:
        
            token = jwt.encode({"user": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, current_app.config.get("SECRET_KEY"), algorithm="HS256")
            resp = {"success": True, "token": token}, 200
        return resp

    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()