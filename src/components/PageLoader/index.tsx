import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect } from "react";

interface Props {
  isPWAActiveted: boolean;
  pwaLink: string;
}

const PageLoader: React.FC<Props> = ({ isPWAActiveted, pwaLink }) => {
  useEffect(() => {
    if (isPWAActiveted) {
      window.location.href = pwaLink;
    }
  });
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
