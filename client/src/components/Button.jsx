import { motion } from "framer-motion";

const Button = ({
  children,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      type={type}
      className={`rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;