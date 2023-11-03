import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./action";
import { motion } from "framer-motion";

function App() {
  const { error, data, status } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("username");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // const [info, setInfo] = useState({});

  // console.log(selectedOption);
  const handleDisplay = () => {
    dispatch(getData({ selectedOption }));
    // selectedOption
    // console.log(data.data.users.map((item) => item.email));
  };

  console.log(data);

  useEffect(() => {
    const handleDispatch = () => {
      dispatch(getData({ selectedOption }));
    };

    handleDispatch();
  }, [dispatch, selectedOption]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div>
      <h1>
        Users Data <span className="spanHead">App</span>
        <div className="inputContainer">
          {/* <label htmlFor="selectInput">Select an option:</label> */}
          <select
            className="inputComponent"
            id="selectInput"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">Select an option</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="username">UserName</option>
            <option value="email">Email</option>
          </select>
          <button onClick={handleDisplay}>Display</button>
        </div>
        <div className="dataSection">
          <div className="dataComponent">
            {data.data &&
              data.data.users &&
              data.data.users.map((user, index) => (
                <motion.div
                  className="textComponent"
                  initial={{
                    x: index % 3 === 0 ? -20 : index % 3 === 1 ? -15 : -10,
                  }}
                  animate={{ x: 0 }}
                  exit={{ x: 10 }}
                  transition={{ duration: (index % 3) / 0.9 }}
                  key={index}
                  style={{ margin: "20px", background: "white" }}
                >
                  <h6> {user[selectedOption]}</h6>
                </motion.div>
              ))}
          </div>
        </div>
      </h1>
    </div>
  );
}

export default App;
