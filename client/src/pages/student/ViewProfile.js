import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const columns = [
  {
    field: "company",
    headerName: "Company Name",
    width: 300,
  },
  {
    field: "package",
    headerName: "Package",
    width: 200,
  },
];

const ViewProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/user/get-all-companies/${user._id}`)
        .then((res) => {
          setData(res.data[0].placedData);
        });
    };
    getAll();
  }, []);

  if (data) {
    return (
      <DataGrid
        style={{ height: 400, width: "100%" }}
        rows={data}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row.company}
      />
    );
  } else {
    return (
      <>
        <h1>Loading..</h1>
      </>
    );
  }
};

export default ViewProfile;
