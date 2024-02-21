/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { install, startFakeInstall } from "../../Redux/feat/InstallSlice";
import { Button } from "@mui/material";
import { CustomButton, colors } from "../styles";
import { useIntl } from "react-intl";
import { RootState } from "../../Redux/store/store";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface Props {
  appLink: string;
  setIsPWAActive: Dispatch<SetStateAction<boolean>>;
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

const InstallButton: React.FC<Props> = ({ appLink, setIsPWAActive }) => {
  const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const isInstalling = useSelector(
    (state: RootState) => state.install.isInstalling
  );
  const isInstalled = useSelector(
    (state: RootState) => state.install.isInstalled
  );

  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    const isPWAActiveted = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isPWAActiveted) {
      setIsPWAActive(true);
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      installPromptRef.current = e;
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, [appLink, dispatch, setIsPWAActive]);

  const installPWA = async () => {
    dispatch(install());
    if (installPromptRef.current) {
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
    window.open(appLink, "_blank");
  };

  return isInstalled ? (
    <CustomButton fullWidth onClick={openLink}>
      {intl.formatMessage({ id: "open" })}
    </CustomButton>
  ) : (
    <AnimatedButton
      fullWidth
      onClick={!isInstalling && installPWA}
      $isInstalling={isInstalling}
      disabled={isInstalling}
    >
      {isInstalling
        ? intl.formatMessage({ id: "open" })
        : intl.formatMessage({ id: "install" })}
    </AnimatedButton>
  );
};

export default InstallButton;
