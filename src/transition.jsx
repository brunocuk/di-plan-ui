import { motion } from "framer-motion";

const transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />

      {/* Transition layers for animating in */}
      <motion.div
        className="page-transition-in"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.3, // delay the exit animation to let the in animation complete
        }}
      ></motion.div>

      {/* Transition layers for animating out */}
      <motion.div
        className="page-transition-out"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }}
      ></motion.div>
    </>
  );
};

export default transition;
