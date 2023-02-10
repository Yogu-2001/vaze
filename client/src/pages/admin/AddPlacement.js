import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { message } from "antd";

const AddPlacement = () => {
  const editor = useRef("");
  const [checked, setChecked] = useState(false);
  const [branches, setBranches] = useState([]);
  const [con, setCon] = useState({
    companyName: "",
    driveDate: "",
    editorData: "",
    jdfile: "",
    branchcriteria: [],
    engAggrrpercentCriteria: "",
  });

  const handleBranchChange = (e) => {
    const index = branches.indexOf(e.target.value);
    if (index === -1) {
      setBranches([...branches, e.target.value]);
    } else {
      setBranches(branches.filter((branch) => branch !== e.target.value));
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(con.jdfile);
    // const base64 = await convertToBase64(con.jdfile);
    // setCon({ ...con, jdfile: base64 });
    setCon({ ...con, branchcriteria: branches });

    await axios
      .post("http://localhost:8080/api/v1/admin/add-placement", {
        ...con,
        // jdfile: base64,
      })
      .then((res) => {
        message.success(res.data.message);
        setCon({
          companyName: "",
          driveDate: "",
          editorData: "",
          jdfile: "",
          branchcriteria: [],
        });
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setCon({
          companyName: "",
          driveDate: "",
          editorData: "",
          jdfile: "",
          branchcriteria: [],
        });
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="col-md-8 mx-auto add-drive-form "
        encType="multipart/form-data"
      >
        <Typography variant="h4" className="my-4">
          Add Placement Drive
        </Typography>
        <div className="d-flex justify-content-between flex-wrap">
          <TextField
            id="standard-basic"
            variant="outlined"
            label="company name"
            className="col-md-5 col-12 my-2"
            name="companyName"
            value={con.companyName}
            placeholder="Enter company name.."
            onChange={(e) => setCon({ ...con, companyName: e.target.value })}
          />
          <TextField
            id="date"
            label="Drive date"
            name="driveDate"
            value={con.driveDate}
            onChange={(e) => setCon({ ...con, driveDate: e.target.value })}
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            className="col-md-5 col-12 my-2"
          />
        </div>
        <JoditEditor
          config={{ height: 400 }}
          ref={editor}
          value={con.editorData}
          tabIndex={1}
          onBlur={(newContent) => setCon({ ...con, editorData: newContent })}
          onChange={(newContent) => {}}
        />
        <TextField
          variant="outlined"
          type="file"
          onChange={(e) => setCon({ ...con, jdfile: e.target.files[0] })}
          className="col-md-5 col-12 my-3"
        />
        <hr />
        <br />
        <h4>Criteria Form:</h4>
        <Typography>pick the candidates who can aply</Typography>
        <FormGroup>
          {["CMPN", "INFT", "ETRX", "EXTC", "BIOM"].map((branch, i) => (
            <FormControlLabel
              control={<Checkbox />}
              label={branch}
              value={branch}
              checked={branches.includes(branch)}
              onChange={handleBranchChange}
            />
          ))}
        </FormGroup>
        <TextField
          type={"number"}
          variant="outlined"
          label="Engineering Aggr % Criteria"
          name="engAggrrpercentCriteria"
          value={con.engAggrrpercentCriteria}
          className="col-md-5 col-12 my-3"
          onChange={(e) =>
            setCon({ ...con, engAggrrpercentCriteria: e.target.value })
          }
        />
        <br />
        {
          <Button
            className="text-center me-3 w-30"
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Drive
          </Button>
        }

        <Button variant="contained" color="secondary">
          Clear
        </Button>
      </form>
    </>
  );
};

export default AddPlacement;
