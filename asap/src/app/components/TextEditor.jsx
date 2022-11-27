import { useEffect, useState } from "react";

import MUIRichTextEditor from "mui-rte";
import { Grid, Stack, Button } from "@mui/material";
import { Box } from "@mui/system";

import { EditorState, convertToRaw } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import { useDispatch } from "react-redux";
import { handleBack, handleNext } from "../reducers/ModalReducer";

const TextEditor = ({ item, setItem, campo, cancelAction }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");
  const [empty, setEmpty] = useState(true);

  const [formatted, setFormatted] = useState(
    JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
  );

  useEffect(() => {
    if (item[campo] && item[campo] !== "") {
      const state = stateFromHTML(item[campo]);
      setFormatted(JSON.stringify(convertToRaw(state)));
      setEmpty(false);
    }
  }, [item]);

  const isEmpty = (data) => {
    setEmpty(
      data
        .replace(/<(.|\n)*?>/g, "")
        .replace(/&nbsp;/g, "")
        .trim().length === 0
    );
  };

  const next = () => {
    setItem((prev) => ({
      ...prev,
      [campo]: info,
    }));
    dispatch(handleNext());
  };

  return (
    <>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} sx={{ marginBottom: 5, width: "900px" }}>
          <Box>
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
                setInfo(stateToHTML(data.getCurrentContent()));
                isEmpty(stateToHTML(data.getCurrentContent()));
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          py: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            py: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(handleBack())}
            sx={{ mr: 1 }}
          >
            Anterior
          </Button>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={next}
              disabled={empty}
            >
              Siguiente
            </Button>

            <Button variant="contained" color="error" onClick={cancelAction}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default TextEditor;
