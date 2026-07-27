import { motion } from "framer-motion";

const circles = [
    { size: 260, top: "8%", left: "8%" },
    { size: 180, top: "70%", left: "15%" },
    { size: 220, top: "25%", right: "10%" },
    { size: 140, bottom: "12%", right: "25%" },
];

const BackgroundAnimation = () => {

    return (

        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-900">

            {

                circles.map((circle, index) => (

                    <motion.div

                        key={index}

                        animate={{
                            y: [0, -25, 0],
                            x: [0, 20, 0]
                        }}

                        transition={{
                            repeat: Infinity,
                            duration: 6 + index,
                            ease: "easeInOut"
                        }}

                        className="absolute rounded-full bg-cyan-400/10 blur-3xl"

                        style={{
                            width: circle.size,
                            height: circle.size,
                            ...circle
                        }}

                    />

                ))

            }

        </div>

    );

};

export default BackgroundAnimation;