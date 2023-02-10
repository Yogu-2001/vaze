import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import { Button, Link, MenuItem, Select, TextField } from "@material-ui/core";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setDrives } from "../../redux/features/driveSlice";
const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <Avatar alt="Travis Howard" src={`${params.row.photourl}`} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  { field: "branch", headerName: "Branch", width: 200 },
  { field: "engineering_division", headerName: "Division", width: 130 },
  { field: "engineeringAggrpercent", headerName: "Aggr CGPA", width: 150 },
  { field: "engineeringpercent", headerName: "Eng Aggr %", width: 170 },
  {
    field: "placed",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <p className="my-auto">
        {params.value ? (
          <CheckCircleIcon style={{ color: "greenyellow" }} />
        ) : (
          <CancelIcon style={{ color: "red" }} />
        )}
      </p>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: "130",
    renderCell: (params) => <EditIcon />,
  },
];

const AllStudentsTable = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [formData, setFormData] = React.useState({
    companyName: "",
    package: "",
  });
  const getAllStudents = async () => {
    await axios
      .get("http://localhost:8080/api/v1/admin/get-allstudents/")
      .then((res) => {
        console.log(res.data);
        setRows(res.data.allstudents);
        dispatch(setDrives(res.data.allCompanies));
        setCompanies(res.data.allCompanies);
      });
  };

  React.useEffect(() => {
    getAllStudents();
  }, []);

  const updateStudent = async (e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:8080/api/v1/admin/update-placed-status", {
        ...formData,
        selectedRows,
      })
      .then((res) => {
        message.success(res.data.message);
        getAllStudents();
      });
  };
  return (
    <>
      <h4>All Students List</h4>
      <DataGrid
        style={{ height: 400, width: "100%" }}
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
        onSelectionModelChange={(itm) => setSelectedRows(itm)}
      />
      <form className="col-10 mx-auto my-3 " onSubmit={updateStudent}>
        <TextField
          variant="outlined"
          name="package"
          type={"number"}
          label="Package"
          required
          value={formData.package}
          onChange={(e) =>
            setFormData({ ...formData, package: e.target.value })
          }
          className="col-6 my-4"
        />
        <br />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="companyName"
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          className="col-6 my-4"
        >
          {companies &&
            companies.map((company) => (
              <MenuItem value={company?.companyName}>
                {company?.companyName}
              </MenuItem>
            ))}
        </Select>
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="col-6 my-2"
        >
          Update Selected Rows
        </Button>
      </form>
    </>
  );
};

export default AllStudentsTable;
