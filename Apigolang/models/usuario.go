package models

// import "database/sql"

type Usuario struct {
	Idusuario int `json:"idusuario"`
	Nome *string `json: "nome"`
	Email *string `json: "email"`
	Senha *string `json:"senha"`
	Telefone *string `json:"telefone"`
}