import { Button, Grid } from "@mui/material";
import { ButtonTitle } from "../styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useIntl } from "react-intl";

const OpenSectionButton = ({ string }: { string: string }) => {
  const intl = useIntl();
  return (
    <Button fullWidth sx={{ padding: 0 }}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <ButtonTitle>{intl.formatMessage({ id: string })}</ButtonTitle>
        </Grid>
        <Grid item xs={2} container justifyContent="end" alignItems="center">
          <ArrowForwardIcon sx={{ color: "rgb(32, 33, 36)" }} />
        </Grid>
      </Grid>
    </Button>
  );
};

export default OpenSectionButton;
