package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Employee{},
		&Period{},
		&ServiceDay{},
		&Type{},
		&Building{},
		&Room{},
	)

	db = database

	// setup employee
	PasswordEmployee1, err := bcrypt.GenerateFromPassword([]byte("123456789"), 14)
	Employee1 := Employee{
		Model:       gorm.Model{},
		First_Name:  "Pimchanok",
		Last_Name:   "Somsri",
		Email:       "pimchanok447@gmail.com",
		Password:    string(PasswordEmployee1),
	}
	db.Model(&Employee{}).Create(&Employee1)

	PasswordEmployee2, err := bcrypt.GenerateFromPassword([]byte("11112222"), 14)
	Employee2 := Employee{
		Model:       gorm.Model{},
		First_Name:  "Wichai",
		Last_Name:   "Srisuruk",
		Email:       "abcdefg@gmail.com",
		Password:    string(PasswordEmployee2),
	}
	db.Model(&Employee{}).Create(&Employee2)

	// setup type
	Type1 := Type{
		Name:  "Laboratory",
		Price: 3000,
	}
	db.Model(&Type{}).Create(&Type1)

	Type2 := Type{
		Name:  "Lecture",
		Price: 500,
	}
	db.Model(&Type{}).Create(&Type2)

	Type3 := Type{
		Name:  "Meeting",
		Price: 1500,
	}
	db.Model(&Type{}).Create(&Type3)

	// setup building
	Building1 := Building{
		Name: "Building Complex 1",
	}
	db.Model(&Building{}).Create(&Building1)

	Building2 := Building{
		Name: "Building Complex 2",
	}
	db.Model(&Building{}).Create(&Building2)

	Building3 := Building{
		Name: "Equipment Building Complex F7",
	}
	db.Model(&Building{}).Create(&Building3)

	// setup serviceday
	ServiceDay1 := ServiceDay{
		Day: "Monday - Friday",
	}
	db.Model(&ServiceDay{}).Create(&ServiceDay1)

	ServiceDay2 := ServiceDay{
		Day: "Saturday - Sunday",
	}
	db.Model(&ServiceDay{}).Create(&ServiceDay2)

	// setup period
	Period1 := Period{
		Time: "09:00 - 12:00",
	}
	db.Model(&Period{}).Create(&Period1)

	Period2 := Period{
		Time: "13:00 - 16:00",
	}
	db.Model(&Period{}).Create(&Period2)

	Period3 := Period{
		Time: "17:00 - 20:00",
	}
	db.Model(&Period{}).Create(&Period3)
}
