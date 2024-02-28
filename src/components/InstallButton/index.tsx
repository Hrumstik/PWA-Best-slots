/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useMixpanel } from "react-mixpanel-browser";
import { useSelector, useDispatch } from "react-redux";
import { install, startFakeInstall } from "../../Redux/feat/InstallSlice";
import { Button } from "@mui/material";
import { CustomButton, CustomLoadingButton, colors } from "../styles";
import { useIntl } from "react-intl";
import { RootState } from "../../Redux/store/store";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface Props {
  appLink: string;
}

const AnimatedButton = styled<any>(motion(Button), {
  shouldForwardProp: (prop) => prop !== "$isInstalling",
})`
  border-radius: 20px;
  border: none;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-transform: none;
  box-shadow: none;
  margin-bottom: 24px;
  background-color: ${(props) =>
    props.$isInstalling ? colors.background : colors.buttonBackground};
  color: ${(props) => (props.$isInstalling ? colors.disabledText : "white")};
  &:hover {
    background-color: ${(props) =>
      props.$isInstalling ? colors.background : colors.primary};
    box-shadow: none;
  }
  &:active {
    background-color: ${(props) =>
      props.$isInstalling ? colors.background : colors.primary};
  }
`;

const InstallButton: React.FC<Props> = ({ appLink }) => {
  const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [readyToInstall, setReadyToInstall] = useState(false);
  const isInstalling = useSelector(
    (state: RootState) => state.install.isInstalling
  );
  const isInstalled = useSelector(
    (state: RootState) => state.install.isInstalled
  );

  const mixpanel = useMixpanel();
  const dispatch = useDispatch();
  const intl = useIntl();

  const trackEvent = (eventName: string) => {
    if (mixpanel) {
      mixpanel.track(eventName);
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      installPromptRef.current = e;
      setReadyToInstall(true);
      console.log(1);
    };

    const handleAppInstalled = () => {
      trackEvent("landing_callback_pwa_installed");
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [appLink, dispatch]);

  const installPWA = async () => {
    if (installPromptRef.current) {
      trackEvent("landing_btn_install_pressed");
      dispatch(install());
      await installPromptRef.current.prompt();
      const choiceResult = await installPromptRef.current.userChoice;
      if (choiceResult.outcome === "accepted") {
        dispatch(startFakeInstall());
      } else {
        alert("PWA installation rejected");
      }
      installPromptRef.current = null;
    }
  };

  const openLink = () => {
    trackEvent("landing_btn_open_pressed");
    window.open(appLink, "_blank");
  };

  if (isInstalled) {
    return (
      <CustomButton fullWidth onClick={openLink}>
        {intl.formatMessage({ id: "open" })}
      </CustomButton>
    );
  }

  if (!readyToInstall) {
    return (
      <CustomLoadingButton variant="outlined" loading fullWidth>
        {intl.formatMessage({ id: "install" })}
      </CustomLoadingButton>
    );
  }

  if (readyToInstall) {
    return (
      <AnimatedButton
        fullWidth
        onClick={!isInstalling ? installPWA : undefined}
        $isInstalling={isInstalling}
        disabled={isInstalling}
      >
        {isInstalling
          ? intl.formatMessage({ id: "installing" })
          : intl.formatMessage({ id: "install" })}
      </AnimatedButton>
    );
  }
};

export default InstallButton;
