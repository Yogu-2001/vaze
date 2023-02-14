import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
const Dashboard = () => {
  const [placed, setPlaced] = useState([]);
  var etrx = 0;
  var extc = 0;
  var cmpn = 0;
  var it = 0;
  const [count, setCount] = useState(0);
  const columns = [
    {
      field: "username",
      headerName: "Name",
      width: 400,
    },
    {
      field: "branch",
      headerName: "Branch Name",
      width: 400,
    },
    {
      field: "company",
      headerName: "Company Placed",
      width: 400,
    },
    {
      field: "package",
      headerName: "Package (lpa)",
      width: 400,
    },
  ];

  // var i = 0;
  // for (i; i < placed.length; i++) {
  //   if (placed[i].branch === "Electronics Engineering") setCount(count + 1);
  //   else if (placed[i].branch == "Computer Engineering") cmpn = cmpn + 1;
  //   else if (placed[i].branch == "IT Engineering") it = it + 1;
  //   else extc = extc + 1;
  // }

  useEffect(() => {
    const getAllPlacedStudent = async () => {
      await axios
        .get("http://localhost:8080/api/v1/admin/get-all-placed")
        .then((res) => {
          setPlaced(res.data);
        });
    };
    getAllPlacedStudent();
  }, []);

  return (
    <>
      <main>
        <h1>Dashboard</h1>
        <DataGrid
          style={{ height: 400, width: "100%" }}
          rows={placed}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
        />

        <section className="mt-4">
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>Computer Engineering</p>
            <p>{cmpn}</p>
          </div>
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>IT Engineering</p>
            <p>{it}</p>
          </div>
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>Electronics & Telecommunication Engineering</p>
            <p>{extc}</p>
          </div>
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>Electronics Engineering</p>
            <p>{etrx && etrx}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
