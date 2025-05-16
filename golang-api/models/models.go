package models

type User struct {
	ID          string `json:"id"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	PhoneNumber string `json:"phoneNumber"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	DOB         string `json:"dateOfBirth"`
	Gender      string `json:"gender"`
	Borough     string `json:"borough"`
	BIO         string `json:"bio"`
}

type Activity struct {
	ID         string `json:"id"`
	UserID     string `json:"userID"`
	Title      string `json:"title"`
	ImageOrder int    `json:"imageOrder"`
}

type Like struct {
	ID         string `json:"id"`
	LikerID    string `json:"likerId"`
	LikedID    string `json:"likedId"`
	ActivityID string `json:"activityId"`
}

type Match struct {
	ID         string `json:"id"`
	LikerID    string `json:"likerId"`
	LikedID    string `json:"likedId"`
	ActivityID string `json:"activityId"`
}

type ViewableLike struct {
	UserID    string `json:"userId"`
	FirstName string `json:"firstName"`
}

type ViewableLikeList struct {
	Likes []ViewableLike `json:"list"`
}

type ViewableProfile struct {
	FirstName  string     `json:"firstName"`
	Age        int        `json:"age"`
	Gender     string     `json:"gender"`
	Borough    string     `json:"borough"`
	Activities []Activity `json:"activities"`
	BIO        string     `json:"bio"`
}

type Table struct {
	Name  string
	Query string
}

type ReturnManageLike struct {
	MatchCreated bool   `json:"matchCreated"`
	LikeDeleted  bool   `json:"likeDeleted"`
	MatchID      string `json:"matchId"`
}
