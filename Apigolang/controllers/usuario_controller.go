package controllers

import (
	// "database/sql"
	"apigolang/config"
	"apigolang/models"
	"encoding/json"
	"net/http"

	// "strconv"
	"github.com/gorilla/mux"
)

func GetUsuarios(w http.ResponseWriter, r *http.Request) {
	db, erro := config.Connect()
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close() //executa no fim do método

	row, erro := db.Query("SELECT idusuario, nome, email, senha, telefone FROM usuario")
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}
	defer row.Close()

	var usuarios []models.Usuario
	for row.Next() {
		var usuario models.Usuario
		erro := row.Scan(&usuario.Idusuario, &usuario.Nome, &usuario.Email, &usuario.Senha, &usuario.Telefone)
		if erro != nil {
			http.Error(w, erro.Error(), http.StatusInternalServerError)
			return
		}
		usuarios = append(usuarios, usuario)
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(usuarios)
}

func GetUsuarioById(w http.ResponseWriter, r *http.Request) {
	db, erro := config.Connect()
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close() //executa no fim do método

	row, erro := db.Query("SELECT idusuario, nome, email, senha, telefone FROM usuario WHERE idusuario=?", id)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}
	defer row.Close()

	var usuarios models.Usuario
	if row.Next() {
		var usuario models.Usuario
		erro := row.Scan(&usuario.Idusuario, &usuario.Nome, &usuario.Email, &usuario.Senha, &usuario.Telefone)
		if erro != nil {
			http.Error(w, erro.Error(), http.StatusInternalServerError)
			return
		}
	}
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(usuarios)
}

func CreateUsuario(w http.ResponseWriter, r *http.Request) {
	db, erro := config.Connect()
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}
	defer db.Close() //executa no fim do método

	var usuario models.Usuario
	erro = json.NewDecoder(r.Body).Decode(&usuario)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}

	query := "INSERT INTO usuario (nome, email, senha, telefone) VALUES (?, ?, ?, ?)"

	_, erro = db.Exec(query, usuario.Nome, usuario.Email, usuario.Senha, usuario.Telefone)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(
		map[string]string{"message": "Sucesso"},
	)

}

func UpdateUsuario(w http.ResponseWriter, r *http.Request) {
	db, erro := config.Connect()
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}
	defer db.Close() //executa no fim do método

	var usuario models.Usuario
	erro = json.NewDecoder(r.Body).Decode(&usuario)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}

	params := mux.Vars(r)
	id := params["id"]
	query := "UPDATE usuario SET nome=?, email=?, senha=?, telefone=? WHERE idusuario=?"

	_, erro = db.Exec(query, usuario.Nome, usuario.Email, usuario.Senha, usuario.Telefone, id)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(
		map[string]string{"message": "Sucesso"},
	)

}

func DeleteUsuario(w http.ResponseWriter, r *http.Request) {
	db, erro := config.Connect()
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}
	defer db.Close() //executa no fim do método

	params := mux.Vars(r)
	id := params["id"]
	query := "DELETE FROM usuario WHERE idusuario=?"

	_, erro = db.Exec(query, id)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(
		map[string]string{"message": "Sucesso"},
	)

}
