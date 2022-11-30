package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	First_Name 	string
	Last_Name  	string
	Email     	string `gorm:"uniqueIndex"`
	Password  	string
	//พนักงาน1คนบันทึกได้หลายห้อง
	Rooms []Room `gorm:"foreignKey:EmployeeID"`
}

type Building struct {
	gorm.Model
	Name  string
	//อาคาร1อาคารมีได้หลายห้อง
	Rooms []Room `gorm:"foreignKey:BuildingID"`
}

type ServiceDay struct {
	gorm.Model
	Day   string
	//1ServiceDayมีได้หลายห้อง
	Rooms []Room `gorm:"foreignKey:ServiceDayID"`
}

type Period struct {
	gorm.Model
	Time  string
	//1ช่วงเวลามีได้หลายห้อง
	Rooms []*Room `gorm:"foreignKey:PeriodID"`
}

type Type struct {
	gorm.Model
	Name  string
	Price int
	Room []Room `gorm:"foreignKey:TypeID"`
}


type Room struct {
	gorm.Model
	Number string
	Name string
	//PeriodID ทำหน้าที่เป็น FK
	PeriodID *uint
	Period   Period 
	//BuildingID ทำหน้าที่เป็น FK
	BuildingID *uint
	Building   Building
	//DayID ทำหน้าที่เป็น FK
	ServiceDayID *uint
	ServiceDay   ServiceDay
	//TypeID  ทำหน้าที่เป็น FK
	TypeID *uint
	Type   Type
	//EmployeeID ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee
}

