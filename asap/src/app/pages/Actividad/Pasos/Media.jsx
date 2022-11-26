import { useState } from "react";

import { Tab, Grid, Box, InputAdornment } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AddAPhotoRounded,
  PictureAsPdfRounded,
  YouTube,
} from "@mui/icons-material";

import InputFieldWithIcon from "../../../components/Input/InputFieldWithIcon";
import ImageLoader from "../../../components/ImageLoader";

const Media = ({ formik }) => {
  const [value, setValue] = useState("imagen");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={12}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
          >
            <Tab
              icon={<AddAPhotoRounded />}
              label="Subir imagen"
              value="imagen"
            ></Tab>
            <Tab
              icon={<YouTube />}
              label="Video de Youtube"
              value="youtube"
            ></Tab>
            <Tab
              icon={<PictureAsPdfRounded />}
              label="Documento"
              value="doc"
            ></Tab>
          </TabList>
        </Box>
        <TabPanel value="imagen">
          <Grid item xs={12}>
            <ImageLoader
              formik={formik}
              campo="url_media"
              width="400px"
              variant="rounded"
            />
          </Grid>
        </TabPanel>
        <TabPanel value="youtube">
          <InputFieldWithIcon
            field="youtube_url"
            formik={formik}
            label="Enlace de Youtube"
            type="text"
            required={false}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTube />
                </InputAdornment>
              ),
            }}
          />
        </TabPanel>
        <TabPanel value="doc">
          <InputFieldWithIcon
            field="doc_url"
            formik={formik}
            label="Enlace de documento"
            type="text"
            required={false}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PictureAsPdfRounded />
                </InputAdornment>
              ),
            }}
          />
        </TabPanel>
      </TabContext>
    </Grid>
  );
};

export default Media;
