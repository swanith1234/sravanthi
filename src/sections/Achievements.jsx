import { useState, useRef, useEffect } from "react";

const Achievements = ({ userData }) => {
  const achievements = userData?.achievements || [];
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const containerRef = useRef(null);

  const calculateActiveCard = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cards = containerRef.current.querySelectorAll(".achievement-card");

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const containerCenterX = containerRect.left + containerRect.width / 2;

      if (
        cardCenterX > containerCenterX - cardRect.width / 2 &&
        cardCenterX < containerCenterX + cardRect.width / 2
      ) {
        setActiveCardIndex(index);
      }
    });
  };

  useEffect(() => {
    if (achievements.length > 0) {
      calculateActiveCard();
    }
    window.addEventListener("resize", calculateActiveCard);
    return () => window.removeEventListener("resize", calculateActiveCard);
  }, [achievements]);

  const cardWidth =
    achievements.length === 2
      ? "50%"
      : achievements.length === 3
        ? "33.33%"
        : achievements.length >= 4
          ? "25%"
          : "auto";

  const shouldAnimate = achievements.length > 4;

  return (
    <section className="c-space my-20">
      <p className="head-text text-center text-3xl font-bold">
        My Achievements
      </p>

      <div
        className="relative flex items-center justify-center overflow-hidden mt-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
      >
        <div
          className={`flex ${shouldAnimate ? "animate-achievements" : ""}`}
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`achievement-card ${
                index === activeCardIndex && shouldAnimate ? "active" : ""
              }`}
              style={{ width: `${cardWidth}` }}
            >
              <div className="achievement-card-content">
                <p className="text-white text-xl font-bold">
                  {achievement.title}
                </p>
                <p className="text-white mt-2">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
  .achievement-card {
    background: #1e293b;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transform: scale(0.8);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    word-wrap: break-word;
    width: 250px; /* Fixed width for uniform dimensions */
    height: 150px; /* Fixed height for uniform dimensions */
    overflow: hidden; /* Ensures content doesn't overflow */
    position: relative; /* Required for the scrollable hidden area */
  }

  .achievement-card-content {
    overflow-y: auto; /* Allows vertical scrolling for overflowing content */
    max-height: 100%; /* Restricts content height to fit the card */
    padding-right: 10px; /* Prevents content from being too close to the edge */
  }

  .achievement-card::-webkit-scrollbar {
    width: 0; /* Removes the visible scrollbar */
  }

  .achievement-card.active {
    transform: scale(1.2);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
    z-index: 10;
  }
}


        .animate-achievements {
          display: flex;
          animation: slide-step 17s steps(${achievements.length}) infinite;
        }

        @keyframes slide-step {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default Achievements;
