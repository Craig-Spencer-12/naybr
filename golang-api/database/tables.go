package database

import (
	"example/golang-api/models"
	"log"
)

var tables = []models.Table{
	{
		Name: "users",
		Query: `CREATE TABLE IF NOT EXISTS users (
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
	);`,
	},
	{
		Name: "activities",
		Query: `CREATE TABLE IF NOT EXISTS activities (
	    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
		title VARCHAR(50) NOT NULL,
	    image_order INTEGER DEFAULT 0,
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`,
	},
	{
		Name: "likes",
		Query: `CREATE TABLE IF NOT EXISTS likes (
	    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	    liker_id UUID REFERENCES users(id) ON DELETE CASCADE,
	    liked_id UUID REFERENCES users(id) ON DELETE CASCADE,
		activity_id UUID REFERENCES activities(id),
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`,
	},
}

func CreateTables() {
	for _, table := range tables {
		_, err := db.Exec(table.Query)
		if err != nil {
			log.Fatalf("Failed to create table: %v", err)
		} else {
			log.Printf("Table %s created or already exists", table.Name)
		}
	}
}
