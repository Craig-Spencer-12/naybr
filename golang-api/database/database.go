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
	// dbHost := "localhost"

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

	createTableQuery = `CREATE TABLE IF NOT EXISTS likes (
	    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	    liker_id UUID REFERENCES users(id) ON DELETE CASCADE,
	    liked_id UUID REFERENCES users(id) ON DELETE CASCADE,
		activity_id UUID REFERENCES activities(id),
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`
	_, err = db.Exec(createTableQuery)
	if err != nil {
		log.Fatalf("Failed to create table: %v", err)
	} else {
		log.Printf("Table created or already exists")
	}
}

func CreateUserQuery(user models.User) error {
	query := `INSERT INTO users (first_name, last_name, phone_number, email, password, date_of_birth, gender, borough, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`
	err := db.QueryRow(query, user.FirstName, user.LastName, user.PhoneNumber, user.Email, user.Password, user.DOB, user.Gender, user.Borough, user.BIO).Scan(&user.ID)
	if err != nil {
		log.Println("Database insert error:", err)
		return err
	}

	return nil
}

func UpdateUserQuery(userId string, updates map[string]string) error {

	for key, value := range updates {
		query := fmt.Sprintf("UPDATE users SET %s='%s' WHERE id=$1", key, value)
		_, err := db.Query(query, userId)

		if err != nil {
			return err
		} else {
			log.Printf("Updated %s to be %s", key, value)
		}
	}

	return nil
}

func GetRandomUserIdQuery() (string, error) {

	var id string
	query := `SELECT id FROM users ORDER BY RANDOM() LIMIT 1`
	err := db.QueryRow(query).Scan(&id)

	if err != nil {
		return "", err
	}

	return id, nil
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

func GetViewableProfileQuery(userId string) (models.ViewableProfile, error) {

	var profile models.ViewableProfile
	var dob string
	query := `SELECT first_name, date_of_birth, gender, borough, bio FROM users WHERE id = $1`
	err := db.QueryRow(query, userId).Scan(&profile.FirstName, &dob, &profile.Gender, &profile.Borough, &profile.BIO)

	if err != nil {
		return profile, err
	}

	profile.Age, err = helpers.CalculateAge(dob)
	if err != nil {
		return profile, err
	}

	query = `SELECT id, user_id, title, photo_url FROM activities WHERE user_id = $1`
	rows, err := db.Query(query, userId)
	if err != nil {
		log.Println("Error fetching activities:", err)
		return profile, err
	}
	defer rows.Close()

	var activities []models.Activity
	for rows.Next() {
		var a models.Activity
		if err := rows.Scan(&a.ID, &a.UserID, &a.Title, &a.PhotoURL); err != nil {
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

func GetViewableLikeListQuery(id string) (models.ViewableLikeList, error) {
	var result models.ViewableLikeList

	query := `SELECT users.id, users.first_name
		FROM likes
		JOIN users ON likes.liker_id = users.id
		WHERE likes.liked_id = $1;
	`
	rows, err := db.Query(query, id)
	if err != nil {
		return result, err
	}
	defer rows.Close()

	for rows.Next() {
		var like models.ViewableLike
		if err := rows.Scan(&like.UserID, &like.FirstName); err != nil {
			return result, err
		}
		result.Likes = append(result.Likes, like)
	}

	if err := rows.Err(); err != nil {
		return result, err
	}

	return result, nil
}

func SendLikeQuery(like models.Like) error {

	log.Printf("%s %s %s", like.LikerID, like.LikedID, like.ActivityID)

	query := `INSERT INTO likes (liker_id, liked_id, activity_id) VALUES ($1, $2, $3) RETURNING id`
	err := db.QueryRow(query, like.LikerID, like.LikedID, like.ActivityID).Scan(&like.ID)
	if err != nil {
		log.Println("Database insert error:", err)
		return err
	}

	return nil
}
