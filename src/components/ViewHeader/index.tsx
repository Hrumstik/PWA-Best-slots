import { IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ViewHeaderContainer } from "../styles";

export default function ViewHeader() {
  return (
    <IconButton>
      <ViewHeaderContainer>
        <ArrowForwardIcon sx={{ color: "rgb(32, 33, 36)" }} />
      </ViewHeaderContainer>
    </IconButton>
  );
}
