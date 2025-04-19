package models

type Book struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Author   string `json:"author"`
	Quantity int    `json:"quantity"`
}

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

type Image struct {
	ActivityName string `json:"activityName"`
	URL          string `json:"url"`
}
