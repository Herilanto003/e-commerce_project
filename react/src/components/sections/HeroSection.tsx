import SectionContainer from "../SectionContainer";
import { RippleButton } from "../ui/ripple-button";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="w-full bg-zinc-800 text-white md:h-[calc(100vh-100px)] flex items-center overflow-y-hidden"
    >
      <SectionContainer>
        <div className="flex flex-col md:flex-row items-center gap-6 pt-10 md:pt-0">
          <motion.div
            className="w-full text-center md:text-left flex flex-col items-center md:items-start md:justify-center gap-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.3,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <h4 className="font-bold text-zinc-400">Pro.Beyond.</h4>

            <h1 className="text-5xl md:text-8xl xl:text-9xl font-extralight">
              IPhone 14 <span className="font-bold">Pro</span>
            </h1>

            <p className="text-sm md:text-[16px] text-zinc-400">
              Created to change everything for the better. For everyone
            </p>

            <RippleButton className="border font-light border-white text-white bg-transparent text-sm md:text-[16px] px-10">
              Shop Now
            </RippleButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="w-full h-full relative"
          >
            <div className="relative md:absolute h-72 md:h-200 md:-bottom-90 w-full">
              <img
                src={"/images/iphone_image.png"}
                alt="iphone image"
                className="object-contain "
              />
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
