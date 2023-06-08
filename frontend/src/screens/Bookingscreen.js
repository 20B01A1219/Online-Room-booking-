import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../componenets/Loader";
import Error from "../componenets/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2';
const Bookingscreen = () => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setRoom] = useState([]);
  let { roomid, fromdate, todate } = useParams();
  const firstdate = moment(fromdate, "DD-MM-YYYY");
  const lastdate = moment(todate, "DD-MM-YYYY");
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalamount, settoatalamount] = useState();

 

  useEffect(() => {
    const getroomdata = async () => {
      try {
        setloading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid }))
          .data;
        setRoom(data);
        settoatalamount(totaldays * data.rentperday);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    if(!localStorage.getItem('currentUser')){
      window.location.href = '/login'
    }
    getroomdata();
  }, [roomid]);

  useEffect(() => {
    console.log(room);
  }, [room]);

 async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire({
        title: 'Congratulations',
        text: 'Your room is booked',
        icon: 'success',
      }).then(result=>{
        window.location.href = '/profile'
      })
    } catch (error) {
      setloading(false);
      Swal.fire('OOPS!', 'Something Went Wrong', 'error');

    }

  }
  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" alt="newimg" />
          </div>
          <div className="col-md-5">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>From Date : {fromdate} </p>
                <p>To Date : {todate} </p>
                <p>Max Count: {room.maxcount}</p>
              </b>
            </div>

            <div style={{ textAlign: "right" }}>
              <b>
                {" "}
                <h1>Amount</h1>
                <hr />
                <p>Total Days : {totaldays}</p>
                <p>Rent Per Day: {room.rentperday}</p>
                <p>Total Amount:{totalamount} </p>
              </b>
            </div>
            <div style={{ float: "right" }}>
            
              <StripeCheckout
                token={onToken}
                currency="INR"
                amount = {totalamount * 100}
                stripeKey="pk_test_51NFYDZSGc5qh12af1AiFUFj5hAuW3qYKMEIBNEcCjLBh0rfPnl1jY4g5l1ahVMgPWq63s9sFeERdkKmwernMQiYl00iMSxGqN0"
              >  <button className="btn btn-primary" >
              {" "}
              Pay Now
            </button></StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error message={"Something Went Wrong"} />
      )}
    </div>
  );
};

export default Bookingscreen;
