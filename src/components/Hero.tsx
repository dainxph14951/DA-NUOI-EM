import React from "react";
import { motion } from "framer-motion";

import { useTypewriter } from "../hooks/useTypewriter";
import avatar1Image from "../image/avata3.jpeg";
import avatar2Image from "../image/avata2.jpeg";
import avatarImage from "../image/avata.jpeg";

interface HeroProps {
  memoryImage?: string;
  giftOpened?: boolean;
  answered?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  memoryImage,
  giftOpened = false,
  answered = false,
}) => {
  const titleText = "Chào em Nguyễn Văn A";
  const subtitleText = "Chuẩn bị tinh thần chưa";

  const displayedTitle = useTypewriter(titleText, 20);
  const displayedSubtitle = useTypewriter(subtitleText, 30);

  // Chọn ảnh dựa trên trạng thái
  let currentAvatar = avatarImage;
  if (answered) {
    currentAvatar = avatar2Image;
  } else if (giftOpened) {
    currentAvatar = avatar1Image;
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-12 px-4"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mb-6 tracking-tight p-2"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "0.5px",
        }}
      >
        {displayedTitle}
      </motion.h1>

      <p
        className="text-xl md:text-2xl bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent font-medium mb-8 leading-relaxed px-4"
        style={{
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.3px",
        }}
      >
        ✨ {displayedSubtitle} ✨
      </p>

      {memoryImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-300 rounded-lg blur-lg opacity-60"></div>
            <img
              src={memoryImage}
              alt="Our memories"
              className="relative w-64 h-64 rounded-lg object-cover shadow-2xl"
            />
          </div>
        </motion.div>
      )}

      {!memoryImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-300 rounded-lg blur-lg opacity-60"></div>
            <div className="relative w-64 h-64 rounded-lg object-cover shadow-2xl bg-gradient-to-br from-pink-200 to-white flex items-center justify-center">
              <motion.img
                key={currentAvatar}
                src={currentAvatar}
                alt="Avatar"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-64 h-64 object-cover shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};
