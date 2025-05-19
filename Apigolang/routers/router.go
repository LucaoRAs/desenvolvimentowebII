package routers

import (
    "Apigolang/controllers"
    "github.com/gorilla/mux"
    "net/http"
)

// SetupRouter inicializa o roteador e define as rotas.
func SetupRouter() *mux.Router {
    router := mux.NewRouter()
    router.HandleFunc("/usuarios", controllers.GetUsuarios).Methods("POST")   

    router.PathPrefix("/").Handler(
        http.StripPrefix("/", http.FileServer(http.Dir("./static/"))),
    )
    return router
}
