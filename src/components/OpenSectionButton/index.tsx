import { Button, Grid } from "@mui/material";
import { ButtonTitle } from "../styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useIntl } from "react-intl";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  id: string;
  view: string;
  setView: Dispatch<SetStateAction<string>>;
}

const OpenSectionButton: React.FC<Props> = ({ id, view, setView }) => {
  const intl = useIntl();

  const handleSetView = () => {
    setView(view);
  };

  return (
    <Button fullWidth sx={{ padding: 0 }} onClick={handleSetView}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <ButtonTitle>{intl.formatMessage({ id })}</ButtonTitle>
        </Grid>
        <Grid item xs={2} container justifyContent="end" alignItems="center">
          <ArrowForwardIcon sx={{ color: "rgb(32, 33, 36)" }} />
        </Grid>
      </Grid>
    </Button>
  );
};

export default OpenSectionButton;
