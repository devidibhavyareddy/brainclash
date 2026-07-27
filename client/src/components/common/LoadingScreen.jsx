import { motion } from "framer-motion";
import Logo from "./Logo";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <Logo />
        </motion.div>

        <motion.p

    animate={{
        opacity: [0.5, 1, 0.5]
    }}

    transition={{
        repeat: Infinity,
        duration: 1.4
    }}

    className="mt-6 text-gray-300 text-lg"

>

    Loading BrainClash...

</motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;