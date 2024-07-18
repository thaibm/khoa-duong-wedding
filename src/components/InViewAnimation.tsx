import { useAnimation, motion, Variants } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export const InViewAnimation: FC<Props> = ({ children, delay }) => {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  const variants: Variants = {
    visible: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 1, delay: delay ?? 0 },
    },
    hidden: { opacity: 0, translateY: 100 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
