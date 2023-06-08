import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../componenets/Room";
import Loader from "../componenets/Loader";
import Error from "../componenets/Error";
import 'antd/dist/reset.css';
import moment from 'moment'

import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [type, settype] = useState('all');
  function filterBySearch(){
      const temprooms = duplicaterooms.filter(room=> room.name.toLowerCase().includes(searchkey.toLowerCase()))
      setrooms(temprooms);
  }
  function filterByDates(dates){
    setfromdate(dates[0].format('DD-MM-YYYY'));
    settodate(dates[1].format('DD-MM-YYYY'));
    var tempRooms = [];
    
    for(const room of duplicaterooms){
      console.log(room);
      var availability = false;
      if(room.currentbooking.length > 0){
        for(const booking of room.currentbooking){
          if(!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)){
             if(dates[0].format('DD-MM-YYYY') !== booking.fromdate && 
             dates[0].format('DD-MM-YYYY') !== booking.todate &&
             dates[1].format("DD-MM-YYYY") !== booking.fromdate &&
             dates[1].format("DD-MM-YYYY") !== booking.todate ){
              availability = true;
             }
          }
        }
      }
      else{
        availability = true;
      }
      if(availability === true){
        tempRooms.push(room);
      }
    }
    setrooms(tempRooms);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };

    fetchData();
  }, []);

  function filterByType(e){
    settype(e);
    if(e !== 'all'){
    const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase() == e.toLowerCase())
    setrooms(temprooms)
    }
    else{
      setrooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs" >
        <div className="col-md-4">
        <RangePicker format = 'DD-MM-YYYY' onChange={filterByDates} />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="search a Room"
         
          onChange = {(e)=>{setsearchkey(e.target.value)}}  onKeyUp = {filterBySearch}
          />
        </div>
        <div className="col-md-4">
          <select className="form-control" value={type} onChange={(e) => {filterByType(e.target.value)}}>
            <option value = 'all'>
              All
            </option>
            <option value = 'Delux'>
              Delux
            </option>
            <option value = 'Non-Delux'>
              Non Delux
            </option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ): (
          rooms.map((room) => {
            return <div className="col-md-9 mt-2">
              <Room room = {room} fromdate = {fromdate} todate = {todate}/>
            </div>
          })
      
        ) }
      </div>
    </div>
  );
};

export default Homescreen;




