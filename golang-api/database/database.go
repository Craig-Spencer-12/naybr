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

	CreateTables()
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

	query = `SELECT id, user_id, title FROM activities WHERE user_id = $1`
	rows, err := db.Query(query, userId)
	if err != nil {
		log.Println("Error fetching activities:", err)
		return profile, err
	}
	defer rows.Close()

	var activities []models.Activity
	for rows.Next() {
		var a models.Activity
		if err := rows.Scan(&a.ID, &a.UserID, &a.Title); err != nil {
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

func CreateActivityQuery(activity *models.Activity) error {
	query := `INSERT INTO activities (user_id, title, image_order) VALUES ($1, $2, $3) RETURNING id`
	err := db.QueryRow(query, activity.UserID, activity.Title, activity.ImageOrder).Scan(&activity.ID)
	if err != nil {
		log.Println("Database insert error:", err)
		return err
	}

	return nil
}

func DeleteActivityQuery(id string) (bool, error) {
	query := `DELETE FROM activities WHERE id = $1`
	result, err := db.Exec(query, id)
	if err != nil {
		log.Println("Database delete error:", err)
		return false, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("Failed to get affected rows:", err)
		return false, err
	}

	if rowsAffected == 0 {
		return false, nil
	}

	return true, nil
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

func GetLikeQuery(id string) (models.Like, error) {

	var like models.Like
	like.ID = id

	query := `SELECT liker_id, liked_id, activity_id FROM likes WHERE id = $1`
	err := db.QueryRow(query, id).Scan(&like.LikerID, &like.LikedID, &like.ActivityID)

	if err != nil {
		log.Println("Failed to get like: ", err)
		return like, err
	}

	return like, nil
}

func SendLikeQuery(like models.Like) error {

	log.Printf("%s %s %s", like.LikerID, like.LikedID, like.ActivityID)

	query := `INSERT INTO likes (liker_id, liked_id, activity_id) VALUES ($1, $2, $3) RETURNING id`
	err := db.QueryRow(query, like.LikerID, like.LikedID, like.ActivityID).Scan(&like.ID)
	if err != nil {
		log.Println("Database insert error: ", err)
		return err
	}

	return nil
}

func DeleteLikeQuery(id string) (bool, error) { // Consider combining this function with delete activity
	query := `DELETE FROM likes WHERE id = $1`
	result, err := db.Exec(query, id)
	if err != nil {
		log.Println("Database delete error:", err)
		return false, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("Failed to get affected rows:", err)
		return false, err
	}

	if rowsAffected == 0 {
		return false, nil
	}

	return true, nil
}

func CreateMatchQuery(match *models.Match) error {

	log.Printf("%s %s %s", match.LikerID, match.LikedID, match.ActivityID)

	query := `INSERT INTO matches (liker_id, liked_id, activity_id) VALUES ($1, $2, $3) RETURNING id`
	err := db.QueryRow(query, match.LikerID, match.LikedID, match.ActivityID).Scan(&match.ID)
	if err != nil {
		log.Println("Database insert error: ", err)
		return err
	}

	return nil
}
