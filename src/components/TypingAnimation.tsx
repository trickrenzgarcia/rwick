"use client"
import { TypeAnimation } from "react-type-animation";

export default function TypingAnimation() {
  return (
    <TypeAnimation
      cursor={true}
      sequence={[
        "I am Web Developer",
        1000,
        "I am Freelancer",
        1250,
        "I am Frontend Developer",
        1750,
        "I am Backend Developer",
        1000,
        "I am Fullstack Developer",
        1500
      ]}
      repeat={Infinity}
    />
  )
}
