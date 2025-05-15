import { useState, useEffect, useRef } from "react";
import ModalWrapper from "./ModalWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Chip, TextField, Button, Box, Typography } from "@mui/material";

const EditModal = ({ isOpen, onCancel, onSave, initialData }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setCaption(initialData.caption || "");
      
      // Handle different keyword formats (string or array)
      if (initialData.keywords) {
        if (Array.isArray(initialData.keywords)) {
          setKeywords(initialData.keywords);
        } else if (typeof initialData.keywords === 'string') {
          // Convert comma-separated string to array
          const keywordArray = initialData.keywords
            .split(',')
            .map(k => k.trim())
            .filter(k => k.length > 0);
          setKeywords(keywordArray);
        }
      } else {
        setKeywords([]);
      }
    }
  }, [initialData]);

  const handleAddKeyword = () => {
    if (keywordInput.trim() && keywords.length < 5) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleSave = () => {
    const updatedPost = {
      ...initialData,
      caption,
      keywords, // Now saving as an array
    };
    onSave(updatedPost);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCancel}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Post</h2>

      {/* Media Preview */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          {/* Custom Navigation Buttons */}
          <div className="absolute top-1/2 left-5 z-10 -translate-y-1/2">
            <button
              ref={prevRef}
              className="w-12 h-12 xl:w-16 xl:h-16 bg-blue-100/40 border border-white rounded-full hover:bg-c-green-300 flex items-center justify-center"
            >
              <ArrowBackIosRoundedIcon />
            </button>
          </div>

          <div className="absolute top-1/2 right-5 z-10 -translate-y-1/2">
            <button
              ref={nextRef}
              className="w-12 h-12 xl:w-16 xl:h-16 bg-blue-100/40 border border-white rounded-full hover:bg-c-green-300 flex items-center justify-center"
            >
              <ArrowForwardIosRoundedIcon />
            </button>
          </div>

          {/* Swiper Component */}
          <div className="w-full max-h-[800px] relative overflow-hidden rounded-md bg-white">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {Array.isArray(initialData?.images) &&
                initialData.images.map((imgUrl, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="w-full max-h-60 flex items-center justify-center bg-white">
                      <img
                        src={imgUrl}
                        alt={`Post Image ${idx + 1}`}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              {initialData?.video && (
                <SwiperSlide>
                  <video
                    src={initialData.video}
                    controls
                    muted
                    autoPlay={true}
                    className="w-full h-auto max-h-60 rounded-lg object-contain"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Caption Input */}
      <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">
        Caption
      </label>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* Keywords Input - Updated to use chips */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Keywords (Max 5)
        </label>
        
        <div className="flex items-center gap-2 mb-2">
          <TextField
            placeholder="Add keyword and press Enter"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={handleKeywordKeyPress}
            disabled={keywords.length >= 5}
            fullWidth
            size="small"
            className="rounded-md"
            inputProps={{ 
              className: "p-2 text-sm",
              style: { borderRadius: "0.375rem" }
            }}
          />
          <Button 
            onClick={handleAddKeyword}
            disabled={!keywordInput.trim() || keywords.length >= 5}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            variant="contained"
            size="small"
          >
            Add
          </Button>
        </div>
        
        {/* Keywords Chips Display */}
        <div className="flex flex-wrap gap-2 my-2">
          {keywords.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              onDelete={() => handleRemoveKeyword(keyword)}
              color="primary"
              variant="outlined"
              size="small"
            />
          ))}
        </div>
        
        {keywords.length >= 5 && (
          <Typography className="text-xs text-amber-600 mt-1">
            Maximum of 5 keywords reached
          </Typography>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </ModalWrapper>
  );
};

export default EditModal;