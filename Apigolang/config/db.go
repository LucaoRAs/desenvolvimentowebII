package config

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/go-sql-driver/mysql"
)

const (
	DB_HOST	 = "54.91.193.137"
	DB_USER = "libertas"
	DB_PASSWORD = "123456"
	DB_NAME = "libertas5per"
)
func ConnectDB() (*sql.DB, error) {
	// Construct the data source name (DSN)
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", DB_USER, DB_PASSWORD, DB_HOST, DB_NAME)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	log.Println("Conexão com BD ok!")
	return db, nil
}