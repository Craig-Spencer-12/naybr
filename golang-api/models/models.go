package models

type User struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	PhoneNumber string `json:"phoneNumber"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	DOB         string `json:"dateOfBirth"`
	Gender      string `json:"gender"`
	Borough     string `json:"borough"`

	ID              string `json:"id"`
	ProfilePhotoURL string `json:"profilePhotoURL"`
	BIO             string `json:"bio"`
}

type Activity struct {
	ID         string `json:"id"`
	UserID     string `json:"userID"`
	Title      string `json:"title"`
	PhotoURL   string `json:"photoURL"`
	ImageOrder int    `json:"imageOrder"`
}

type ViewableProfile struct {
	FirstName  string             `json:"firstName"`
	Gender     string             `json:"gender"`
	Borough    string             `json:"borough"`
	Activities []ViewableActivity `json:"activities"`
}

type ViewableActivity struct {
	Title    string `json:"title"`
	PhotoURL string `json:"photoURL"`
}
