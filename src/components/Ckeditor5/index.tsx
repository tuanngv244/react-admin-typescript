import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box, FormHelperText, InputLabel } from "@mui/material";
import React from "react";
import { MyCustomUploadAdapterPlugin } from "./uploadAdapter";

const MIN_MAX_HEIGHT_CONTENT = 300;

type CkEditor5Props = {
  data?: string;
  handleChange: (data: string) => void;
  label?: string;
  errorMessage?: string;
};

const CkEditor5: React.FC<CkEditor5Props> = ({
  label,
  data,
  handleChange,
  errorMessage,
}) => {
  return (
    <Box
      sx={{
        ".ck-editor": {
          ".ck-content": {
            minHeight: MIN_MAX_HEIGHT_CONTENT,
            maxHeight: MIN_MAX_HEIGHT_CONTENT,
          },
        },
      }}
    >
      {label && (
        <InputLabel
          htmlFor={label}
          sx={{ position: "relative", marginBottom: "10px" }}
        >
          {label}
        </InputLabel>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={data || ""}
        config={{
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
        onReady={(_: unknown) => {}}
        onChange={(_: any, editor: ClassicEditor) => {
          const html = editor.getData();
          handleChange(html);
        }}
      />
      {errorMessage && (
        <FormHelperText
          error
          sx={{ fontSize: "14px" }}
          id="component-error-text"
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CkEditor5;
