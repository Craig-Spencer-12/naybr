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
	BIO             string `json:"bio"`
	ProfilePhotoURL string `json:"profilePhotoURL"`
}

type Activity struct {
	ID         string `json:"id"`
	UserID     string `json:"userID"`
	Title      string `json:"title"`
	PhotoURL   string `json:"photoURL"`
	ImageOrder int    `json:"imageOrder"`
}

type ViewableProfile struct {
	FirstName       string             `json:"firstName"`
	Age             int                `json:"age"`
	Gender          string             `json:"gender"`
	Borough         string             `json:"borough"`
	Activities      []ViewableActivity `json:"activities"`
	BIO             string             `json:"bio"`
	ProfilePhotoURL string             `json:"profilePhotoURL"`
}

type ViewableActivity struct {
	Title    string `json:"title"`
	PhotoURL string `json:"photoURL"`
}
