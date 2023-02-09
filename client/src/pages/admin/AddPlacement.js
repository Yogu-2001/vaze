import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { message } from "antd";

const AddPlacement = () => {
  const editor = useRef("");
  const [con, setCon] = useState({
    companyName: "",
    driveDate: "",
    editorData: "",
    jdfile: "",
  });

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
        });
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setCon({
          companyName: "",
          driveDate: "",
          editorData: "",
          jdfile: "",
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
        <Typography variant="h4" color="textSecondary" className="my-4">
          Add new discussion
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
