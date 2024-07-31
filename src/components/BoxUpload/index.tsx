import {
  BoxDeleteStyled,
  BoxPreviewImageStyled,
  BoxWrapStyled,
  InputUploadHidden,
} from "@/components/BoxUpload/styled";
import { validFileTypes } from "@/utils/validation";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";

type BoxUploadProps = {
  handleFileChange: (data: File) => void;
  handleDeleteFile: VoidFunction;
  width?: number | string;
  height?: number;
  acceptTypes?: string[];
  initialImage?: string;
};

const BoxUpload: React.FC<BoxUploadProps> = ({
  handleFileChange,
  width = 200,
  height = 150,
  handleDeleteFile,
  initialImage,
}) => {
  const [imgPreview, setImgPreview] = useState<string | null>(
    initialImage || null
  );

  const _onFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target?.files?.[0] as File;
    if (!validFileTypes(file)) return alert("Format file is invalid!");

    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onloadend = function (_: unknown) {
      setImgPreview(reader.result as string);
    };
    handleFileChange(file);
  };

  const _onDeleteImg = () => {
    handleDeleteFile();
    setImgPreview(null);
  };

  useEffect(() => {
    (() => {
      if (initialImage) {
        setImgPreview(initialImage);
      }
    })();
  }, [JSON.stringify(initialImage)]);

  return (
    <BoxWrapStyled wbox={width} hbox={imgPreview ? 200 : height}>
      {imgPreview && (
        <React.Fragment>
          <BoxPreviewImageStyled component={"img"} src={imgPreview as string} />
          <BoxDeleteStyled className="btnDelete">
            <Button onClick={_onDeleteImg} className="danger">
              <DeleteIcon />
            </Button>
          </BoxDeleteStyled>
        </React.Fragment>
      )}
      {!imgPreview && (
        <React.Fragment>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            style={{ width: "100px", fontSize: "12px" }}
          >
            Upload
            <InputUploadHidden
              accept="image/*"
              multiple
              type="file"
              onChange={_onFileChange}
            />
          </Button>
        </React.Fragment>
      )}
    </BoxWrapStyled>
  );
};

export default BoxUpload;
