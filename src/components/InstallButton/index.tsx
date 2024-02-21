/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { install, stopInstalling } from "../../Redux/feat/InstallSlice";
import { Button } from "@mui/material";
import { CustomButton, colors } from "../styles";
import { useIntl } from "react-intl";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface Props {
  link: string;
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
const InstallButton: React.FC<Props> = ({ link }) => {
  const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [isPWAActive, setIsPWAActive] = useState(false);
  const isInstalling = useSelector(({ install }) => install.isInstalling);
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    const isPWAActiveted = window.matchMedia(
      "(display-mode: minimal-ui)"
    ).matches;

    if (isPWAActiveted) {
      setIsPWAActive(true);
      window.location.href = link;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      installPromptRef.current = e;
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    window.addEventListener("appinstalled", () => {
      dispatch(stopInstalling());
      setIsPWAActive(true);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, [link, dispatch]);

  const installPWA = async () => {
    dispatch(install());
    if (installPromptRef.current) {
      dispatch(install());
      await installPromptRef.current.prompt();
      const choiceResult = await installPromptRef.current.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("PWA installation was accepted");
      } else {
        alert("PWA installation rejected");
      }
      installPromptRef.current = null;
    }
  };

  const openLink = () => {
    window.location.href = link;
  };

  return isPWAActive ? (
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
