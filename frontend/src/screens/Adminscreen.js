import React, { useState, useEffect } from "react";
import Loader from "../componenets/Loader";
import Error from "../componenets/Error";
import { Tabs } from "antd";
import axios from "axios";
import Swal from 'sweetalert2';
const TabPane = Tabs.TabPane;

const Adminscreen = () => {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="mt-5 ml-3 bs mr-3">
      <h1 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add new Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Adminscreen;

export function Bookings() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [bookings, setbookings] = useState([]);
  useEffect(() => {
    async function asyncfun() {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    }
    asyncfun();
  }, []);
  return (
    <div>
      <h1>Bookings</h1>
      {loading && <Loader />}
      <table className="table table-bordered table-primary">
        <thead className="bs">
          <tr>
            <th>Booking Id</th>
            <th>User Id</th>
            <th>Room</th>
            <th>check in date</th>
            <th>check out date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length &&
            bookings.map((booking) => {
              return (
                <tr>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export function Rooms() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [rooms, setrooms] = useState([]);
  useEffect(() => {
    async function asyncfun() {
      try {
        const data = await (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    }
    asyncfun();
  }, []);
  return (
    <div>
      <h1>Rooms</h1>
      {loading && <Loader />}
      <table className="table table-bordered table-primary">
        <thead className="bs">
          <tr>
            <th>Room Id</th>
            <th>Room Name</th>
            <th>Type</th>
            <th>Rent per Day</th>
            <th>Max Count</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length &&
            rooms.map((room) => {
              return (
                <tr>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export function Users() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [users, setusers] = useState([]);
  useEffect(() => {
    async function asyncfun() {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    }
    asyncfun();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-primary">
          <thead className="bs">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export function Addroom() {
  
const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

 async function addRoom(){
  const newroom = {
      name,
      rentperday,
      description,
      type,
      maxcount,
      phonenumber,
      imageurls: [imageurl1, imageurl2, imageurl3]
  }
    try{
      setloading(true);
      const result = await (await axios.post("/api/rooms/addroom", newroom)).data;
      console.log(result);
      setloading(false);
      Swal.fire('Congrats', 'New Room added Successfully', 'success').then(result=>{
        window.location.href = '/home';
      });
    }
    catch(error){
      console.log(error);
      setloading(false);
      seterror(true);
      Swal.fire('OOPS!', 'Something went wrong', 'error')
    }
}

  return (
    
    <div className="row">
            {loading && (<Loader/>)}
      <div className="col-md-5">
        <input
          type="text"
          className="form-control in"
          placeholder="Room Name"
          value={name}
          onChange={e=>{
            setname(e.target.value)
          }}
        />
        <input
          type="text"
          className="form-control in"
          placeholder="Description"
          value={description}
          onChange={e=>{
            setdescription(e.target.value)
          }}
        />
        <input
          type="text"
          className="form-control in "
          placeholder="Maximum count"
          value={maxcount}
          onChange={e=>{
            setmaxcount(e.target.value)
          }}
        />
        <input
          type="text"
          className="form-control in "
          placeholder="Rent Per Day"
          value={rentperday}
          onChange={e=>{
            setrentperday(e.target.value)
          }}
        />
        <input
          type="text"
          className="form-control in"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={e=>{
            setphonenumber(e.target.value)
          }}
        />
      </div>
      <div className="col-md-5">
        <input type="text" className="form-control in" placeholder="Type" 
        value={type}
        onChange={e=>{
          settype(e.target.value)
        }}
        />
        <input
          type="text"
          className="form-control in"
          placeholder="Image URL - 1"
          value={imageurl1}
          onChange={e=>{
            setimageurl1(e.target.value)
          }}
        />
        <input
          type="text"
          className="form-control in"
          placeholder="Image URL - 2"
          value={imageurl2}
          onChange={e=>{
            setimageurl2(e.target.value)
          }}
        />
        <input
          type="text"
          className="form-control in"
          placeholder="Image URL - 3"
          value={imageurl3}
          onChange={e=>{
            setimageurl3(e.target.value)
          }}
        />
        <div className="text-right">
          <button className="btn btn-primary mt-3" onClick={addRoom}>Add Room</button>
        </div>
      </div>
    </div>
  );
}
