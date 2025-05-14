package controllers

import (
    "encoding/json"
    "net/http"

    "Apigolang/config"
    "Apigolang/models"
)

func GetUsuarios(w http.ResponseWriter, r *http.Request) {
    db, err := config.ConnectDB()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer db.Close()

    rows, err := db.Query("SELECT idusuario, nome, email, senha, telefone FROM usuario")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var usuarios []models.Usuario

    for rows.Next() {
        var usuario models.Usuario
        err := rows.Scan(&usuario.IDUSUARIO, &usuario.NOME, &usuario.EMAIL, &usuario.SENHA, &usuario.TELEFONE)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        usuarios = append(usuarios, usuario)
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(usuarios); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}
