import React, { useEffect} from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from '@mui/material/Container';
import { RoomInterface } from "../models/IRoom";


function Rooms() {
    const [rooms, setRoom] = React.useState<RoomInterface[]>([]);
    const getRoom = async() => {
      const apiUrl = "http://localhost:8080/room";
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",},
      };
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setRoom(res.data);
          } else {
            console.log("else");
          }
        });
    };
  
    useEffect(() => {
      getRoom();
    }, []);
  
    return (
      <div>
      <Container maxWidth="lg"
      sx={{ marginTop:2}}
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลห้อง
            </Typography>
          </Box>
          
          <Box>
            <Button
              component={RouterLink}
              to="/createroom"
              variant="contained"
              color="primary"
            >
              Create Room
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  Room Number
                </TableCell>
                <TableCell align="center" width="10%">
                  Room Name
                </TableCell>
                <TableCell align="center" width="10%">
                  Room Type
                </TableCell>
                <TableCell align="center" width="12%">
                  Building
                </TableCell>
                <TableCell align="center" width="10%">
                  Service Day
                </TableCell>
                <TableCell align="center" width="10%">
                  Period
                </TableCell>
                <TableCell align="center" width="12%">
                  Employee
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((item: RoomInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.Number}</TableCell>
                  <TableCell align="center">{item.Name}</TableCell>
                  <TableCell align="center">{item.Type.Name}</TableCell>
                  <TableCell align="center">{item.Building.Name}</TableCell>
                  <TableCell align="center">{item.ServiceDay.Day}</TableCell>
                  <TableCell align="center">{item.Period.Time}</TableCell>
                  <TableCell align="center">{item.Employee.First_Name} {item.Employee.Last_Name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }
export default Rooms; 