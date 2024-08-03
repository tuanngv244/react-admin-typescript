import { Select as SelectMui, SelectProps } from "@mui/material";
import React from "react";

type Props = SelectProps & {};

const Select: React.FC<Props> = ({ ...props }) => <SelectMui {...props} />;

export default Select;
