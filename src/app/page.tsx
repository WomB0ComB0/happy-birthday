"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { ParticlesContainer } from "@/components/Confetti";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { toast } from "sonner";
export default function Home() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [mounted, setMounted] = useState(false)
  const isBirthdayToday = (): boolean => {
    const today = new Date();
    return today.getMonth() === 2 && today.getDate() === 24;
  }
  useEffect(() => {
    setIsBirthday(isBirthdayToday());
    setMounted(true);
    if (isBirthdayToday()) {
      toast("🥳 Today's my Birthday! 🎉");
    }
  }, []);
  return (
    <main
    >
      {mounted ? (
        <>
          {
            isBirthday && (
              <ParticlesContainer />
            )
          }
          <AuroraBackground>
            <motion.article
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center text-white prose max-w-screen-xl px-2.5 md:px-20 "
            >
              <picture
                className={`
                  relative
                  rounded-full
                  overflow-hidden
                  w-60 h-60
                `}
              >
                <Image
                  src="/Mike_Odnis.jpg"
                  alt="Mike Odnis"
                  className={`
                    rounded-full shadow-lg
                    object-cover object-center
                    w-full h-full select-none pointer-events-none
                  `}
                  layout={`fill`}
                  fetchPriority={`high`}
                  quality={100}
                  loading={`eager`}
                />
              </picture>
              <Countdown />
              <CurrentAge />
            </motion.article>
          </AuroraBackground>
        </>
      ) : null}
    </main>
  );
}


const CurrentAge = () => {
  const diffCalc = () => {
    const diff =
      (new Date().getTime() - new Date("March 24, 2004").getTime()) /
      1000 /
      60 /
      60 /
      24 /
      365;
    return diff.toFixed(5);
  };
  const [age, setAge] = useState(diffCalc());
  useEffect(() => {
    const interval = setInterval(() => {
      setAge(diffCalc());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <p
          className={`
            text-center text-lg
          `}
        >
          Current age (years): <span className={`font-bold`}>{age}</span>
        </p>
      )}
    </>
  )
}

const Countdown = () => {
  const diffCalc = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextBirthdayYear = today.getMonth() > 2 || (today.getMonth() === 2 && today.getDate() > 24)
      ? currentYear + 1
      : currentYear;

    const diff =
      (new Date(`March 24, ${nextBirthdayYear}`).getTime() - today.getTime()) /
      1000 /
      60 /
      60 /
      24;

    return {
      days: Math.floor(diff),
      hours: Math.floor((diff % 1) * 24),
      minutes: Math.floor(((diff % 1) * 24) % 1 * 60),
      seconds: Math.floor((((diff % 1) * 24) % 1 * 60) % 1 * 60),
    };
  };
  const [time, setTime] = useState(diffCalc());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(diffCalc());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <h1
          className={`
            text-2xl text-center
          `}
        >
          Countdown to my next birthday: <span className={`font-bold`}>{time.days}</span> days, <span className={`font-bold`}>{time.hours}</span> hours, <span className={`font-bold`}>{time.minutes}</span> minutes, <span className={`font-bold`}>{time.seconds}</span> seconds
        </h1>
      )}
    </>
  )
}