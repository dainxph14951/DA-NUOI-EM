import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  startDate: Date;
}

interface TimeUnit {
  label: string;
  value: number;
}

export const Counter: React.FC<CounterProps> = ({ startDate }) => {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { label: "Ngày", value: 0 },
    { label: "Giờ", value: 0 },
    { label: "Phút", value: 0 },
    { label: "Giây", value: 0 },
  ]);

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeUnits([
        { label: "Ngày", value: days },
        { label: "Giờ", value: hours },
        { label: "Phút", value: minutes },
        { label: "Giây", value: seconds },
      ]);
    };

    calculateTimeDifference();
    const interval = setInterval(calculateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="py-12 px-4 text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="text-3xl leading-none mt-1">🕐</span>

        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text">
          Dự án "Yêu Em" đã duy trì được
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="backdrop-blur-md bg-white bg-opacity-30 rounded-2xl p-6 border border-white border-opacity-30 shadow-lg"
          >
            <motion.div
              key={`${unit.value}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text mb-2"
            >
              {String(unit.value).padStart(2, "0")}
            </motion.div>
            <p className="text-pink-600 font-semibold text-lg">{unit.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
