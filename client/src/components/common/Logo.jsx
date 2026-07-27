import { motion } from "framer-motion";

const Logo = () => {
  return (
<motion.div

    whileHover={{ scale: 1.05 }}

    className="flex flex-col"

>

    <h1 className="text-4xl font-extrabold tracking-wide">

        <span className="text-white">

            Brain

        </span>

        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">

            Clash

        </span>

    </h1>

    <span className="text-cyan-300 text-xs tracking-[5px] mt-1">

        Learn • Play • Win

    </span>

    <span className="text-yellow-300 text-sm tracking-[6px] mt-2">

        by SRK

    </span>

</motion.div>
  );
};

export default Logo;