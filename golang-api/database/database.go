package database

import (
	"database/sql"
	"example/golang-api/models"
	"fmt"
	"log"
	"os"
)

var db *sql.DB

func InitDatabase() {

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

	createTableQuery := `CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		phone_number VARCHAR(15) UNIQUE NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL,
		first_name VARCHAR(100),
		last_name VARCHAR(100),
		date_of_birth DATE,
		gender VARCHAR(10),
		profile_photo_url VARCHAR(255),
		bio TEXT,
		borough VARCHAR(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err = db.Exec(createTableQuery)
	if err != nil {
		log.Fatalf("Failed to create table: %v", err)
	} else {
		log.Printf("Table created or already exists")
	}

	// 	createTableQuery = `CREATE TABLE IF NOT EXISTS photos (
	//     id SERIAL PRIMARY KEY,
	//     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	//     photo_url VARCHAR(255) NOT NULL,
	//     is_profile BOOLEAN DEFAULT FALSE,
	//     order INTEGER DEFAULT 0,
	//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	// );`
	// 	_, err = db.Exec(createTableQuery)
	// 	if err != nil {
	// 		log.Fatalf("Failed to create table: %v", err)
	// 	} else {
	// 		log.Printf("Table created or already exists")
	// 	}

}

func CreateUserQuery(newUser models.User) error {
	query := `INSERT INTO users (first_name, last_name, phone_number, email, password, date_of_birth, gender, borough) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
	err := db.QueryRow(query, newUser.FirstName, newUser.LastName, newUser.PhoneNumber, newUser.Email, newUser.Password, newUser.DOB, newUser.Gender, newUser.Borough).Scan(&newUser.ID)
	if err != nil {
		log.Println("Database insert error:", err)
		return err
	}

	return nil
}

func GetUserQuery(name string) (models.User, error) {

	var user models.User
	query := `SELECT first_name, last_name, phone_number FROM users WHERE first_name = $1`
	err := db.QueryRow(query, name).Scan(&user.FirstName, &user.LastName, &user.PhoneNumber)

	if err != nil {
		return user, err
	}

	return user, nil
}

// func GetAllBooksQuery() ([]models.Book, error) {
// 	query := `SELECT id, title, author, quantity FROM books`
// 	rows, err := db.Query(query)
// 	if err != nil {
// 		log.Println("Error fetching books:", err)
// 		return nil, err
// 	}
// 	defer rows.Close()

// 	var books []models.Book
// 	for rows.Next() {
// 		var b models.Book
// 		if err := rows.Scan(&b.ID, &b.Title, &b.Author, &b.Quantity); err != nil {
// 			log.Println("Error scanning book row:", err)
// 			return nil, err
// 		}
// 		books = append(books, b)
// 	}

// 	if err = rows.Err(); err != nil {
// 		log.Println("Row iteration error:", err)
// 		return nil, err
// 	}

// 	return books, nil
// }

// func ChangeBookQuantityQuery(id string, n int) error {
// 	book, err := GetBookQuery(id)
// 	if err != nil {
// 		log.Println("Database query error:", err)
// 		return err
// 	}

// 	if n < 0 && book.Quantity < -n {
// 		return errors.New("Not enough copies of this book to fulfill request")
// 	}

// 	query := `UPDATE books SET quantity = quantity + $1 WHERE id = $2`
// 	res, err := db.Exec(query, n, id)
// 	if err != nil {
// 		log.Println("Error updating quantity:", err)
// 		return err
// 	}

// 	rowsAffected, err := res.RowsAffected()
// 	if err != nil {
// 		log.Println("Error fetching rows affected:", err)
// 		return err
// 	}

// 	if rowsAffected == 0 {
// 		return errors.New("no book found with given ID")
// 	}

// 	return nil
// }
