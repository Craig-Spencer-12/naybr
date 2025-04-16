package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"os"
)

var db *sql.DB

func initDatabase() {

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName,
	)

	var err error
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	} else {
		log.Printf(("Connected to database"))
	}

	// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	createTableQuery := `
CREATE TABLE IF NOT EXISTS books (
	id TEXT PRIMARY KEY NOT NULL,
	title TEXT NOT NULL,
	author TEXT NOT NULL,
	quantity INT NOT NULL
);
`
	_, err = db.Exec(createTableQuery)
	if err != nil {
		log.Fatalf("Failed to create table: %v", err)
	} else {
		log.Printf("Table created or already exists")
	}
}

func createBookQuery(newBook book) error {
	query := `INSERT INTO books (id, title, author, quantity) VALUES ($1, $2, $3, $4) RETURNING id`
	err := db.QueryRow(query, newBook.ID, newBook.Title, newBook.Author, newBook.Quantity).Scan(&newBook.ID)
	if err != nil {
		log.Println("Database insert error:", err)
		return err
	}

	return nil
}

func getBookQuery(id string) (book, error) {

	var b book
	query := `SELECT id, title, author, quantity FROM books WHERE id = $1`
	err := db.QueryRow(query, id).Scan(&b.ID, &b.Title, &b.Author, &b.Quantity)

	if err != nil {
		return b, err
	}

	return b, nil
}

func getAllBooksQuery() ([]book, error) {
	query := `SELECT id, title, author, quantity FROM books`
	rows, err := db.Query(query)
	if err != nil {
		log.Println("Error fetching books:", err)
		return nil, err
	}
	defer rows.Close()

	var books []book
	for rows.Next() {
		var b book
		if err := rows.Scan(&b.ID, &b.Title, &b.Author, &b.Quantity); err != nil {
			log.Println("Error scanning book row:", err)
			return nil, err
		}
		books = append(books, b)
	}

	if err = rows.Err(); err != nil {
		log.Println("Row iteration error:", err)
		return nil, err
	}

	return books, nil
}

func changeBookQuantityQuery(id string, n int) error {
	book, err := getBookQuery(id)
	if err != nil {
		log.Println("Database query error:", err)
		return err
	}

	if n < 0 && book.Quantity < -n {
		return errors.New("Not enough copies of this book to fulfill request")
	}

	query := `UPDATE books SET quantity = quantity + $1 WHERE id = $2`
	res, err := db.Exec(query, n, id)
	if err != nil {
		log.Println("Error updating quantity:", err)
		return err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Println("Error fetching rows affected:", err)
		return err
	}

	if rowsAffected == 0 {
		return errors.New("no book found with given ID")
	}

	return nil
}
