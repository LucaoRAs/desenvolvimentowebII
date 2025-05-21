package routers

import (
	"apigolang/controllers"
	"net/http"
	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/usuarios", controllers.GetUsuarios).Methods("GET")
	router.HandleFunc("/usuarios/{id}", controllers.GetUsuarioById).Methods("GET")
	router.HandleFunc("/usuarios", controllers.CreateUsuario).Methods("POST")
	router.HandleFunc("/usuarios/{id}", controllers.UpdateUsuario).Methods("PUT")
	router.HandleFunc("/usuarios/{id}", controllers.DeleteUsuario).Methods("DELETE")

	router.PathPrefix("/").Handler(http.StripPrefix("/",http.FileServer(http.Dir("./static/"))))

	return router
}