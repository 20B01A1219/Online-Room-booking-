import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  const [loading, setloading] = useState(true);
  return (
    <div style={{ marginTop: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <HashLoader color="#000080" loading={loading} size={120} />
      </div>
    </div>
  );
};

export default Loader;
