import CircularProgress from "@mui/material/CircularProgress";
import {
  AppImg,
  LogoContainer,
  LogoInProgressContainer,
  LogoInProgressWrapper,
} from "../styles";
import { useSelector } from "react-redux";

function AppLogo() {
  const isInstalling = useSelector(({ install }) => install.isInstalling);

  return (
    <>
      {isInstalling ? (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg src="/icon.png" alt="App logo" />
          </LogoInProgressContainer>

          <CircularProgress
            disableShrink
            size={56}
            thickness={1}
            sx={{
              position: "absolute",
              color: "primary.main",
            }}
          />
        </LogoInProgressWrapper>
      ) : (
        <LogoContainer>
          <AppImg src="/icon.png" alt="App logo" />
        </LogoContainer>
      )}
    </>
  );
}

export default AppLogo;
