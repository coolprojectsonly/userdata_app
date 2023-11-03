import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk(
  "/post/getdata",
  async ({ selectedOption }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data?selectedOption=${selectedOption}`
      );
      const data = response.data;
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);
