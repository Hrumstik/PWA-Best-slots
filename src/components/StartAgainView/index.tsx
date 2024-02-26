import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import mixpanel from "mixpanel-browser";
import { CustomButton } from "../styles";
import { useIntl } from "react-intl";

interface Props {
  pwaLink: string;
}

const StartAgainView: React.FC<Props> = ({ pwaLink }) => {
  const intl = useIntl();

  const handleClick = () => {
    mixpanel.track("pwa_splashScreen_btn_startAgain");
    window.location.href = pwaLink;
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6}>
          <CustomButton fullWidth variant="contained" onClick={handleClick}>
            {intl.formatMessage({ id: "startAgain" })}
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StartAgainView;
