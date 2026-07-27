import { motion } from "framer-motion";

const Card = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 text-white p-6 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;