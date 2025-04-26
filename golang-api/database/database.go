package database

import (
	"database/sql"
	"example/golang-api/helpers"
	"example/golang-api/models"
	"fmt"
	"log"
)

var db *sql.DB

func InitDatabase() {

	// dbHost := os.Getenv("DB_HOST")
	// dbPort := os.Getenv("DB_PORT")
	// dbUser := os.Getenv("DB_USER")
	// dbPassword := os.Getenv("DB_PASSWORD")
	// dbName := os.Getenv("DB_NAME")

	dbHost := "db"
	dbPort := "5432"
	dbUser := "user"
	dbPassword := "password"
	dbName := "mydb"

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
		id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		first_name VARCHAR(100),
		last_name VARCHAR(100),
		phone_number VARCHAR(15) UNIQUE NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL,
		date_of_birth DATE,
		gender VARCHAR(10),
		borough VARCHAR(255),
		bio TEXT,
		profile_photo_url VARCHAR(255),
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

	createTableQuery = `CREATE TABLE IF NOT EXISTS activities (
	    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
		title VARCHAR(50) NOT NULL,
	    photo_url VARCHAR(255) NOT NULL,
	    image_order INTEGER DEFAULT 0,
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`
	_, err = db.Exec(createTableQuery)
	if err != nil {
		log.Fatalf("Failed to create table: %v", err)
	} else {
		log.Printf("Table created or already exists")
	}

}

func CreateUserQuery(user models.User) error {
	query := `INSERT INTO users (first_name, date_of_birth, gender, borough, bio) VALUES ($1, $2, $3, $4, $5) RETURNING id`
	// last_name, phone_number, email, password,
	// user.LastName, user.PhoneNumber, user.Email, user.Password,
	err := db.QueryRow(query, user.FirstName, user.DOB, user.Gender, user.Borough, user.BIO).Scan(&user.ID)
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

func GetViewableProfileQuery(id string) (models.ViewableProfile, error) {

	var profile models.ViewableProfile
	var dob string
	query := `SELECT first_name, date_of_birth, gender, borough, bio, profile_photo_url FROM users WHERE id = $1`
	err := db.QueryRow(query, id).Scan(&profile.FirstName, &dob, &profile.Gender, &profile.Borough, &profile.BIO, &profile.ProfilePhotoURL)

	if err != nil {
		return profile, err
	}

	profile.Age, err = helpers.CalculateAge(dob)
	if err != nil {
		return profile, err
	}

	query = `SELECT title, photo_url FROM activities WHERE user_id = $1`
	rows, err := db.Query(query, id)
	if err != nil {
		log.Println("Error fetching activities:", err)
		return profile, err
	}
	defer rows.Close()

	var activities []models.ViewableActivity
	for rows.Next() {
		var a models.ViewableActivity
		if err := rows.Scan(&a.Title, &a.PhotoURL); err != nil {
			log.Println("Error scanning activity row:", err)
			return profile, err
		}
		activities = append(activities, a)
	}

	if err = rows.Err(); err != nil {
		log.Println("Row iteration error:", err)
		return profile, err
	}

	profile.Activities = activities

	return profile, nil
}

func CreateActivityQuery(activity models.Activity) error {
	query := `INSERT INTO activities (user_id, title, photo_url, image_order) VALUES ($1, $2, $3, $4) RETURNING id`
	err := db.QueryRow(query, activity.UserID, activity.Title, activity.PhotoURL, activity.ImageOrder).Scan(&activity.ID)
	if err != nil {
		log.Println("Database insert error:", err)
		return err
	}

	return nil
}

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
