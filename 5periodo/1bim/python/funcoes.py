import jwt  
from flask import current_app

def valida_token(token):
    try:
        if not token or not token.startswith("Bearer "):
            return {"success": False}, 401
        dados = jwt.decode(token.split(" ")[1], current_app.config.get("SECRET_KEY"), algorithms=["HS256"])
        return True
    except jwt.ExpiredSignatureError:
        return {"success": False}, 401
    