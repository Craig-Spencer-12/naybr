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

// type ReturnID struct {
// 	ID string `json:"id"`
// }

type Activity struct {
	ID         string `json:"id"`
	UserID     string `json:"userID"`
	Title      string `json:"title"`
	PhotoURL   string `json:"photoURL"`
	ImageOrder int    `json:"imageOrder"`
}

type Like struct {
	ID         string `json:"id"`
	LikerID    string `json:"likerId"`
	LikedID    string `json:"likedId"`
	ActivityID string `json:"activityId"`
}

type ViewableProfile struct {
	FirstName       string     `json:"firstName"`
	Age             int        `json:"age"`
	Gender          string     `json:"gender"`
	Borough         string     `json:"borough"`
	Activities      []Activity `json:"activities"`
	BIO             string     `json:"bio"`
	ProfilePhotoURL string     `json:"profilePhotoURL"`
}
