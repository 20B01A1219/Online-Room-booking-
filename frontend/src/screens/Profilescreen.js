import React, { useState, useEffect } from "react";
import { Result, Tabs } from "antd";
import axios from "axios";
import Loader from "../componenets/Loader";
import Error from "../componenets/Error";
import Swal from "sweetalert2";
import { Divider, Space, Tag } from 'antd';

const TabPane = Tabs.TabPane;


const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, []);
  return (
    <div className="ml-5 mt-5 mr-5">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>Is Admin: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Bookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profilescreen;

export const Bookings = () => {
  const [booking, setbooking] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const asyncfun = async () => {
      try {
        setloading(true);
        const data = await (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        console.log(data);
        setbooking(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    };
    asyncfun();
  }, []);
  async function cancelbooking(bookingid, roomid) {
    try {
      setloading(true);
      const res = await await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        roomid,
      });
      console.log(res);
      setloading(false);
      Swal.fire("Congrats", "Your Room is Cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("OOPS!", "Something Went wrong", "error");
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {booking &&
            booking.map((book) => {
              return (
                <div className="bs">
                  <h1>{book.room}</h1>
                  <p>
                    <b>Booking Id:</b> {book._id}
                  </p>
                  <p>
                    <b>Check In Date:</b> {book.fromdate}
                  </p>
                  <p>
                    <b>Check Out Date:</b> {book.todate}
                  </p>
                  <p>
                    <b>Total Amount : </b>
                    {book.totalamount}
                  </p>
                  <p>
                    <b>Status :</b>{" "}
                    {book.status == 'cancelled' ? (  <Tag color="red">Cancelled</Tag>) : (<Tag color="green">Confirmed</Tag>)}
                  </p>
                  {book.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelbooking(book._id, book.roomid);
                        }}
                      >
                        {" "}
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
