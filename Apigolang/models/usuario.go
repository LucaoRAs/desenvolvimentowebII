package models

type Usuario struct {
	IDUSUARIO     int    `json:"idusuario"`
	NOME    string `json:"nome"`
	EMAIL   string `json:"email"`
	SENHA    string `json:"senha"`
	TELEFONE string `json:"telefone"`
}