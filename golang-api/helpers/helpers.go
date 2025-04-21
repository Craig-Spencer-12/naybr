package helpers

import "time"

func CalculateAge(dob string) (int, error) {
	birthDate, err := time.Parse(time.RFC3339, dob)
	if err != nil {
		return 0, err
	}

	currentDate := time.Now()

	age := currentDate.Year() - birthDate.Year()
	if currentDate.YearDay() < birthDate.YearDay() {
		age--
	}

	return age, nil
}
