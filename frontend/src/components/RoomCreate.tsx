import React, { useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { RoomInterface, TypeInterface, BuildingInterface, ServiceDayInterface, PeriodInterface, EmployeeInterface } from "../models/IRoom";
import MenuItem from '@mui/material/MenuItem';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RoomCreate() {
  const [room, setRoom] = React.useState<Partial<RoomInterface>>({}); //setRoomรับค่ามาแล้วไปเก็บไว้ในroom เพื่อเอาroomไปใช้
  const [employee, setEmployee] = React.useState<EmployeeInterface>(); 
  const [type, setType] = React.useState<TypeInterface[]>([]); 
  const [building, setBuilding] = React.useState<BuildingInterface[]>([]); 
  const [serviceday, setServiceDay] = React.useState<ServiceDayInterface[]>([]); 
  const [period, setPeriod] = React.useState<PeriodInterface[]>([]); 
  const [success, setSuccess] = React.useState(false); 
  const [error, setError] = React.useState(false); 
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);

  };
  // การรับข้อมูลที่กรอก
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RoomCreate;
    const { value } = event.target;
    setRoom({ ...room, [id]: value });

  };
  // การรับข้อมูลที่กรอก(ใช้กับcombobox)
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof room;
    setRoom({
      ...room,
      [name]: event.target.value,
    });
  };

  const getEmployee = async () => {
    const apiUrl = `http://localhost:8080/employee/${localStorage.getItem("id")}`; //localStorage เก็บไอดีของพนักงานที่ล็อกอินเข้ามา
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
    //เรียกใช้ฟังก์ชัน fetch ในการดึงข้อมูล (input เป็น apiUrl,RequestInfo เป็น requestOptions)
    fetch(apiUrl, requestOptions) 
      .then((response) => response.json())  //พอหลังบ้าน respon กลับมาเราก็จะทำการ then ข้อมูลที่ได้จากหลังบ้าน โดยเริ่มจากการแปลงข้อมูลให้เป็น json 
      .then((res) => {
        console.log(res.data); //console log ดูว่าข้อมูลที่ได้จากหลังบ้านเป็นหน้าตายังไง
        if (res.data) { //ติดต่อกันผ่าน path /employee มันก็เลยจะวิ่งไปที่ controller employee (List)ใน Backend อะ
          setEmployee(res.data) //โดยตัว respone ที่เราได้จาก backend มันก็จะมี data กับ error ซึ่งถ้ามันมี data ส่งมาอะมันก็จะเอาค่าไปเก็บไว้ใน setEmployee (Set function ที่เรากำหนดไว้ก่อนหน้านี้อะ)
        } else {
          console.log("else") 
        }
      });
  }

  const getType = async () => {
    const apiUrl = "http://localhost:8080/type";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setType(res.data)
        } else {
          console.log("else")
        }
      });
  }

  const getBuilding = async () => {
    const apiUrl = "http://localhost:8080/building";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setBuilding(res.data)
        } else {
          console.log("else")
        }
      });
  }

  const getServiceDay = async () => {
    const apiUrl = "http://localhost:8080/serviceday";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setServiceDay(res.data)
        } else {
          console.log("else")
        }
      });
  }
  const getPeriod = async () => {
    const apiUrl = "http://localhost:8080/period";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setPeriod(res.data)
        } else {
          console.log("else")
        }
      });
  }

  function submit() {
    let data = {
      EmployeeID: employee?.ID ?? "",
      Number: room.Number ?? "",
      Name: room.Name ?? "",
      TypeID: room?.TypeID ?? "",
      BuildingID: room?.BuildingID ?? "",
      ServiceDayID: room.ServiceDayID ?? "",
      PeriodID: room.PeriodID ?? "",
    }; //เวลากดsubmitบันทึกข้อมูลอะไรบ้าง

    const apiUrl = "http://localhost:8080/createroom";
    const requestOptions = {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions) //เรียกใช้ฟังก์ชัน fetch ในการดึงข้อมูล (input เป็น apiUrl,RequestInfo เป็น requestOptions)
      .then((response) => response.json()) //พอหลังบ้าน respon กลับมาเราก็จะทำการ then ข้อมูลที่ได้จากหลังบ้าน โดยเริ่มจากการแปลงข้อมูลให้เป็น json
      .then((res) => {
        if (res.data) { //กดsubmitสำเร็จ 
          setSuccess(true); 
          setTimeout(() => { //ดีเลย์ 2 วิแล้วไปที่หน้าroomที่file rooms
            window.location.href = "/room";
          }, 2000)
        } else {
          setError(true); //เซ็ทให้มันerror
        }
      });
  }

  useEffect(() => {
    getEmployee();
    getType();
    getBuilding();
    getServiceDay();
    getPeriod();
  }, []);

  console.log(room)

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>

      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกรายละเอียดห้อง
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <p>First Name</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="First_Name" //ระบุว่าบันทึกที่ไหน
                disabled
                variant="outlined"
                type="string"
                size="medium"
                value={employee?.First_Name  || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>Last Name</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Last_Name"
                disabled
                variant="outlined"
                type="string"
                size="medium"
                value={employee?.Last_Name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Room Number</p>
              <TextField
                id="Number"
                variant="outlined"
                type="uint"
                size="medium"
                value={room.Number || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>

            <FormControl fullWidth variant="outlined">
              <p>Room Name</p>
              <TextField
                id="Name"
                variant="outlined"
                type="string"
                size="medium"
                value={room.Name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Room Type</p>
              <TextField
                id="Type"
                select
                label="Select"
                value={room.TypeID}
                onChange={handleChange}
                inputProps={{ name: "TypeID" }} //หาobjectที่ตรงกับTypeID
              >
                
                {type.map((item: TypeInterface) => (
                  <MenuItem key={item.Name} value={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Building</p>
              <TextField
                id="Building"
                select
                label="Select"
                value={room.BuildingID}
                onChange={handleChange}
                inputProps={{ name: "BuildingID" }}
              >
                {building.map((item: BuildingInterface) => (
                  <MenuItem key={item.Name} value={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Service Day</p>
              <TextField
                id="ServiceDay"
                select
                label="Select"
                value={room.ServiceDayID}
                onChange={handleChange}
                inputProps={{ name: "ServiceDayID" }}

              >
                {serviceday.map((item: ServiceDayInterface) => (
                  <MenuItem key={item.Day} value={item.ID}>
                    {item.Day}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Peiod</p>
              <TextField
                id="Period"
                select
                label="Select"
                value={room.PeriodID}
                onChange={handleChange}
                inputProps={{ name: "PeriodID" }}
              >
                {period.map((item: PeriodInterface) => (
                  <MenuItem key={item.Time} value={item.ID}>
                    {item.Time}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button component={RouterLink} to="/room" variant="contained">
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"

            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>

  );
}
export default RoomCreate;