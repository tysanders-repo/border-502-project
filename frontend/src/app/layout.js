"use client";

import { useRouter } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "@components/organisms/Navbar";
import Footer from "@components/organisms/Footer";
import theme from "@utils/theme";

import './globals.css';

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Navbar />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ minHeight: "65vh" }}>{children}</Box>
          </LocalizationProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
