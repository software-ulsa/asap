import React, { useEffect, useState } from "react";

import MUIRichTextEditor from "mui-rte";

import { stateToHTML } from "draft-js-export-html";
import { EditorState, convertToRaw } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";

const TextEditor = ({ formik, nota }) => {
  const [formatted, setFormatted] = useState(
    JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
  );

  useEffect(() => {
    if (nota.contenido && nota.contenido !== "") {
      const state = stateFromHTML(nota.contenido);
      setFormatted(JSON.stringify(convertToRaw(state)));
    }
  }, [nota]);

  return (
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
      label="Escribe el contenido de la nota aquí"
      onChange={(data) => {
        formik.setFieldValue(
          "contenido",
          stateToHTML(data.getCurrentContent())
        );
      }}
    />
  );
};

export default TextEditor;
