import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

interface QuestionProps {
  onYes?: () => void;
  onNo?: () => void;
  onGiftOpened?: () => void;
  onAnswered?: () => void;
}

export const Question: React.FC<QuestionProps> = ({
  onYes,
  onNo,
  onGiftOpened,
  onAnswered,
}) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [answered, setAnswered] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [giftClickCount, setGiftClickCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoClick = () => {
    // Nếu là mobile, di chuyển nút thay vì click
    if (window.innerWidth <= 768) {
      const randomX = (Math.random() - 0.5) * 300;
      const randomY = (Math.random() - 0.5) * 300;
      setNoButtonPosition({ x: randomX, y: randomY });
    } else {
      // Nếu là desktop, thực hiện callback
      onNo?.();
    }
  };

  const handleNoHover = () => {
    // Chỉ di chuyển trên desktop (màn hình > 768px)
    if (window.innerWidth > 768) {
      const randomX = (Math.random() - 0.5) * 300;
      const randomY = (Math.random() - 0.5) * 300;
      setNoButtonPosition({ x: randomX, y: randomY });
    }
  };

  const handleNoMouseMove = () => {
    // Trên desktop, luôn di chuyển khi con trỏ gần
    if (window.innerWidth > 768) {
      const randomX = (Math.random() - 0.5) * 400;
      const randomY = (Math.random() - 0.5) * 400;
      setNoButtonPosition({ x: randomX, y: randomY });
    }
  };

  const handleGiftClick = () => {
    const newCount = giftClickCount + 1;
    setGiftClickCount(newCount);

    if (newCount === 3) {
      // Mở hộp quà và bắn pháo hoa
      setGiftOpened(true);
      onGiftOpened?.();

      // Bắn pháo hoa
      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "9999";
      document.body.appendChild(canvas);

      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      // Bắn từ nhiều hướng khi mở hộp
      myConfetti({
        particleCount: 200,
        spread: 180,
        origin: { y: 0.5 },
      });

      setTimeout(() => {
        myConfetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.25, y: 0.3 },
        });

        myConfetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.75, y: 0.3 },
        });
      }, 300);

      setTimeout(() => {
        document.body.removeChild(canvas);
      }, 5000);
    }
  };

  const handleYes = () => {
    setAnswered(true);
    onAnswered?.();

    // Bắn pháo hoa
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    // Bắn từ nhiều hướng
    myConfetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.5 },
    });

    // Hiệu ứng trái tim rơi từ trên xuống
    const duration = 5000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const heartRain = () => {
      myConfetti({
        particleCount: 15,
        startVelocity: randomInRange(-10, -5),
        spread: 180,
        gravity: 0.8,
        ticks: 200,
        origin: {
          x: Math.random(),
          y: -0.1,
        },
        shapes: ["heart"],
        colors: ["#ff69b4", "#ff1493", "#ff69b4", "#ffb6c1", "#ffc0cb"],
      });
    };

    const heartFrame = () => {
      if (Date.now() < animationEnd) {
        heartRain();
        requestAnimationFrame(heartFrame);
      }
    };

    heartFrame();

    setTimeout(() => {
      myConfetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.25, y: 0.5 },
      });

      myConfetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.75, y: 0.5 },
      });
    }, 300);

    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 5000);

    onYes?.();
  };

  if (answered) {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="py-12 px-4 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-7xl mb-6"
        >
          💍
        </motion.div>

        <motion.h2
          className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Update hệ điều hành từ 'Bạn gái' lên 'Nóc nhà'!
        </motion.h2>

        <motion.p
          className="text-2xl text-pink-600 mb-6 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Yêu em nhiều lắm ❤️
        </motion.p>

        <motion.div
          className="inline-block backdrop-blur-md bg-white bg-opacity-30 rounded-2xl p-8 border border-white border-opacity-30 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-pink-600 text-xl">
            ✨ Cảm ơn em vì đã chấp nhận anh ✨
          </p>
        </motion.div>
      </motion.section>
    );
  }

  // Hiển thị hộp quà nếu chưa mở
  if (!giftOpened) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="py-12 px-4 text-center"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text mb-12"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Anh có một quà cho em! 🎁
        </motion.h2>

        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.button
            onClick={handleGiftClick}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-9xl md:text-[120px] cursor-pointer hover:filter hover:drop-shadow-lg transition-shadow"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            🎁
          </motion.button>
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl font-bold text-pink-600 mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Click {3 - giftClickCount} lần nữa để mở quà 💕
        </motion.p>

        <div className="flex justify-center gap-3 mb-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={i < giftClickCount ? { scale: [1, 1.2, 1] } : {}}
              transition={{
                duration: 0.4,
                repeat: i < giftClickCount ? 0 : Infinity,
              }}
              className={`w-4 h-4 rounded-full transition-colors ${
                i < giftClickCount ? "bg-pink-500" : "bg-pink-200"
              }`}
            />
          ))}
        </div>

        <motion.p
          className="text-pink-600 text-lg italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          ✨ Em sẵn sàng chưa? ✨
        </motion.p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="py-12 px-4 text-center"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text mb-12"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Em sẽ làm vợ anh chứ? 💍
      </motion.h2>

      <div className="flex flex-wrap gap-6 justify-center items-center min-h-20">
        <motion.button
          onClick={handleYes}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 md:px-12 md:py-6 text-xl md:text-2xl font-bold text-white rounded-full overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 z-0"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 opacity-0 z-0"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          ></motion.div>
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={24} />
            Đồng ý
            <Sparkles size={24} />
          </span>
        </motion.button>

        <div
          onMouseMove={window.innerWidth > 768 ? handleNoMouseMove : undefined}
          className="relative"
        >
          <motion.button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onMouseMove={handleNoMouseMove}
            onClick={handleNoClick}
            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="px-8 py-4 md:px-12 md:py-6 text-xl md:text-2xl font-bold text-pink-600 backdrop-blur-md bg-white bg-opacity-30 rounded-full border-2 border-pink-300 hover:border-pink-500 transition-colors cursor-pointer"
          >
            Không
          </motion.button>
        </div>
      </div>

      <motion.p
        className="text-pink-600 mt-8 text-lg italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        (Anh biết em không thể chọn lựa chọn thứ hai 😉)
      </motion.p>
    </motion.section>
  );
};
