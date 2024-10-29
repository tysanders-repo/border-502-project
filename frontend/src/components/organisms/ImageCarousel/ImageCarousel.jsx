import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ImageCarousel({ images = [], interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const cycleImages = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    };

    const imageInterval = setInterval(cycleImages, interval);

    return () => clearInterval(imageInterval);
  }, [images.length, interval]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden">
      {images.length > 0 ? (
        <>
          <Box
            component="img"
            src={images[currentIndex]?.url}
            alt={`Image ${currentIndex + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
          />
          <IconButton
            onClick={handlePrev}
            aria-label="Previous image"
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              color: "white",
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            aria-label="Next image"
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              color: "white",
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      ) : (
        <img
          src="/placeholder.png"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="Description of homepage6"
        />
      )}
    </Box>
  );
}
