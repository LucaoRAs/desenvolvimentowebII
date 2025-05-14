package routers

import (
    "Apigolang/controllers"
    "github.com/gorilla/mux"
)

// SetupRouter inicializa o roteador e define as rotas.
func SetupRouter() *mux.Router {
    router := mux.NewRouter()

    // Define as rotas para os endpoints da API
    router.HandleFunc("/usuarios", controllers.GetUsuarios).Methods("GET")
    return router
}
