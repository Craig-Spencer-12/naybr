package models

type Book struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Author   string `json:"author"`
	Quantity int    `json:"quantity"`
}

type Image struct {
	ActivityName string `json:"activityName"`
	URL          string `json:"url"`
}

var ExampleBooks = []Book{
	{ID: "4", Title: "In Search of Lost Time", Author: "Marcel Proust", Quantity: 2},
	{ID: "5", Title: "The Great Gatsby", Author: "F. Scott Fitzgerald", Quantity: 5},
	{ID: "6", Title: "War and Peace", Author: "Leo Tolstoy", Quantity: 6},
}
