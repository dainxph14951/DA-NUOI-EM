import React, { useState } from "react";
import {
  Hero,
  Counter,
  Question,
  HeartRain,
  FloatingHearts,
  ParallaxBackground,
  ParticleEffect,
} from "./components";

function App() {
  const relationshipStartDate = new Date("2024-02-29");
  const [giftOpened, setGiftOpened] = useState(false);
  const [answered, setAnswered] = useState(false);

  return (
    <div className="relative w-full">
      <ParticleEffect />
      <ParallaxBackground />
      <HeartRain />
      <FloatingHearts />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mx-auto pt-12 pb-12">
          <Hero giftOpened={giftOpened} answered={answered} />

          <Counter startDate={relationshipStartDate} />

          <Question
            onGiftOpened={() => setGiftOpened(true)}
            onAnswered={() => setAnswered(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
