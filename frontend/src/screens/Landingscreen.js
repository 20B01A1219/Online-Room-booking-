import React from "react";
import { Link } from "react-router-dom";
const Landingscreen = () => {
  return (
    <div>
      <div className="row landing justify-content-center">
        <div className="col-md-9 text-center my-auto" style={{borderRight : 'solid white 10px'}}>
          <h1 style={{ fontSize: "115px", color: "white" }}  data-aos="flip-left"   data-aos-delay="500">BOOKURROOM</h1>
          <h6 style={{ color: "white" }}>You are our most prized possession</h6>
          <Link to="/home">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "white", color: "#000080", marginTop: "50px", height : '50px' }}
            >
              Show Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landingscreen;
