import { motion } from "framer-motion";

const QuestionCard = ({ question, onAnswer }) => {

    return (

        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 rounded-3xl p-8"
        >

            <h2 className="text-3xl font-bold mb-8">

                {question.questionText}

            </h2>

            <div className="grid grid-cols-2 gap-6">

                {question?.options?.map((option, index) => (

                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 py-5 rounded-2xl hover:scale-105 transition"
                    >
                        {option}
                    </button>

                ))}

            </div>

        </motion.div>

    );

};

export default QuestionCard;