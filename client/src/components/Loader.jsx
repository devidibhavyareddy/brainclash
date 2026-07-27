import { motion } from "framer-motion";

const Loader = () => {

    return (

        <div className="min-h-screen flex justify-center items-center">

            <motion.div
                className="w-20 h-20 rounded-full border-8 border-cyan-400 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

        </div>

    );

};

export default Loader;