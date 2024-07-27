import React, { ReactNode, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import DialogBase from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useBoolean } from "@/hooks/useBoolean";
import { useTranslation } from "react-i18next";

type DialogProps = {
  title?: string;
  renderContent: ReactNode | (() => ReactNode);
  renderButton?: (toggle: VoidFunction) => ReactNode;
  handleCancel?: VoidFunction;
  handleAgree?: VoidFunction;
};

const Dialog = forwardRef((props: DialogProps, ref) => {
  const { t } = useTranslation();
  const { title, renderContent, handleAgree, handleCancel, renderButton } =
    props;
  const [open, { on, off, toggle }] = useBoolean();
  useImperativeHandle(
    ref,
    () => ({
      onDialog: on,
      offDialog: off,
      openDialog: open,
    }),
    []
  );

  return (
    <React.Fragment>
      {renderButton?.(toggle)}
      <DialogBase
        open={open}
        onClose={off}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {typeof renderContent === "function"
            ? renderContent()
            : renderContent}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleCancel?.();
              off();
            }}
          >
            {t("COMMON.cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleAgree?.();
              off();
            }}
            autoFocus
          >
            {t("COMMON.agree")}
          </Button>
        </DialogActions>
      </DialogBase>
    </React.Fragment>
  );
});

export default Dialog;
