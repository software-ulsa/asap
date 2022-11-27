import { useEffect, useState } from "react";

import MUIRichTextEditor from "mui-rte";
import { Grid } from "@mui/material";

import { EditorState, convertToRaw } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import { Box } from "@mui/system";

const TextEditorWithFormik = ({ actividad, formik, campo, setEmpty }) => {
  const [formatted, setFormatted] = useState(
    JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
  );

  useEffect(() => {
    if (actividad[campo] && actividad[campo] !== "") {
      const state = stateFromHTML(actividad[campo]);
      setFormatted(JSON.stringify(convertToRaw(state)));
      setEmpty(false);
    }
  }, [actividad]);

  const isEmpty = (data) => {
    setEmpty(
      data
        .replace(/<(.|\n)*?>/g, "")
        .replace(/&nbsp;/g, "")
        .trim().length === 0
    );
  };

  return (
    <Grid item xs={12}>
      <Box sx={{ mb: 2 }}>
        <MUIRichTextEditor
          defaultValue={formatted}
          controls={[
            "title",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "highlight",
            "undo",
            "redo",
            "numberList",
            "bulletList",
            "quote",
            "clear",
          ]}
          label="Escribe el contenido aqui..."
          onChange={(data) => {
            formik.setFieldValue(campo, stateToHTML(data.getCurrentContent()));
            isEmpty(stateToHTML(data.getCurrentContent()));
          }}
        />
      </Box>
    </Grid>
  );
};

export default TextEditorWithFormik;
