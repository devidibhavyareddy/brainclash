import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import BackgroundAnimation from "../components/common/BackgroundAnimation";

const TrainerLayout = ({ children }) => {

    return (

        <>
            <BackgroundAnimation />

            <div className="flex min-h-screen text-white">

                <Sidebar role="trainer" />

                <motion.main
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 overflow-y-auto p-8"
                >

                    {children}

                </motion.main>

            </div>

        </>

    );

};

export default TrainerLayout;