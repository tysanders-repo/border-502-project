"use client";

import { useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "../components/organisms/Navbar";
import theme from "@utils/theme";

export default function RootLayout({ children }) {
  const router = useRouter();

  console.log("Current Path:", router.pathname);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Navbar />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
