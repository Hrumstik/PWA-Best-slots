import CircularProgress from "@mui/material/CircularProgress";
import {
  AppImg,
  LogoContainer,
  LogoInProgressContainer,
  LogoInProgressWrapper,
} from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";
import { useEffect, useState } from "react";
import {
  setInstallProgress,
  stopFakeInstall,
  stopInstalling,
} from "../../Redux/feat/InstallSlice";

function AppLogo() {
  const [installProgressNumber, setInstallProgressNumber] = useState(0);
  const dispatch = useDispatch();

  const isInstalling = useSelector(
    (state: RootState) => state.install.isInstalling
  );

  const isFakeInstallStarted = useSelector(
    (state: RootState) => state.install.fakeInstall
  );

  useEffect(() => {
    const fakeInstall = async () => {
      let progress = 0;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const randomIncrement = Math.random() * (30 - 10) + 10;
        progress += randomIncrement;
        progress = Math.min(progress, 100);
        progress = Math.floor(progress);

        dispatch(setInstallProgress(progress));
        setInstallProgressNumber(progress);

        const elapsedTime = (Date.now() - startTime) / 1000;

        if (progress >= 100 && elapsedTime >= 12) {
          clearInterval(interval);
          dispatch(stopFakeInstall());
          dispatch(stopInstalling());
          setInstallProgress(0);
          dispatch(setInstallProgress("pending"));
        }
      }, 1000);
    };

    if (isFakeInstallStarted) {
      fakeInstall();
    }
  }, [isFakeInstallStarted, dispatch]);

  const showCircularProgress = isInstalling && isFakeInstallStarted;
  const showPermanentCircularProgress = isInstalling && !isFakeInstallStarted;
  const showLogo = !isInstalling && !isFakeInstallStarted;

  return (
    <>
      {showCircularProgress && (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg src="/icon.png" alt="App logo" />
          </LogoInProgressContainer>

          <CircularProgress
            variant="determinate"
            value={installProgressNumber}
            disableShrink
            size={56}
            thickness={3}
            sx={{
              position: "absolute",
              color: "primary.main",
            }}
          />
        </LogoInProgressWrapper>
      )}
      {showPermanentCircularProgress && (
        <LogoInProgressWrapper>
          <LogoInProgressContainer>
            <AppImg src="/icon.png" alt="App logo" />
          </LogoInProgressContainer>

          <CircularProgress
            disableShrink
            size={56}
            thickness={3}
            sx={{
              position: "absolute",
              color: "primary.main",
            }}
          />
        </LogoInProgressWrapper>
      )}
      {showLogo && (
        <LogoContainer>
          <AppImg src="/icon.png" alt="App logo" />
        </LogoContainer>
      )}
    </>
  );
}

export default AppLogo;
