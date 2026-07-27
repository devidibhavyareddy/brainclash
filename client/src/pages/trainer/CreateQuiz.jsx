import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaClock,
  FaLayerGroup,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import TrainerLayout from "../../layouts/TrainerLayout";

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [quiz, setQuiz] = useState({
    title: "",
    subject: "",
    description: "",
    difficulty: "Easy",
    duration: 30,
  });

  const handleChange = (e) => {
    setQuiz({
      ...quiz,
      [e.target.name]:
        e.target.name === "duration"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const createQuiz = async (e) => {
    e.preventDefault();

    const title = quiz.title?.trim();
    const subject = quiz.subject?.trim();
    const description = quiz.description?.trim();
    const duration = Number(quiz.duration);

    if (!title || !subject || !duration) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/quizzes", {
        title,
        description,
        category: subject,
        difficulty: quiz.difficulty,
        duration,
      });

      toast.success("Quiz Created Successfully 🎉");

      // If backend returns created quiz
      if (res.data.quiz?._id) {
        navigate(`/trainer/questions/${res.data.quiz._id}`);
      } else {
        navigate("/trainer/quizzes");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create quiz"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TrainerLayout>
      <BackgroundAnimation />

      <div className="text-white">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl"
        >
          <h1 className="text-4xl font-bold mb-8">
            Create New Quiz
          </h1>

          <form onSubmit={createQuiz} className="space-y-6">

            <div>
              <label className="block mb-2">
                <FaBookOpen className="inline mr-2" />
                Quiz Title
              </label>

              <input
                name="title"
                value={quiz.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-4 text-black"
                placeholder="Enter quiz title"
              />
            </div>

            <div>
              <label className="block mb-2">
                <FaLayerGroup className="inline mr-2" />
                Subject
              </label>

              <input
                name="subject"
                value={quiz.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl p-4 text-black"
                placeholder=""
              />
            </div>

            <div>
              <label className="block mb-2">
                <FaFileAlt className="inline mr-2" />
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={quiz.description}
                onChange={handleChange}
                className="w-full rounded-xl p-4 text-black"
                placeholder="Enter quiz description"
              />
            </div>

            <div>
              <label className="block mb-4">
                Difficulty
              </label>

              <div className="flex gap-5">

                {["Easy", "Medium", "Hard"].map((level) => (
                  <motion.div
                    key={level}
                    whileHover={{ scale: 1.05 }}
                    onClick={() =>
                      setQuiz({
                        ...quiz,
                        difficulty: level,
                      })
                    }
                    className={`cursor-pointer rounded-2xl px-8 py-4 ${
                      quiz.difficulty === level
                        ? "bg-cyan-500"
                        : "bg-white/20"
                    }`}
                  >
                    {level}
                  </motion.div>
                ))}

              </div>
            </div>

            <div>

              <label className="block mb-3">
                <FaClock className="inline mr-2" />
                Duration
              </label>

              <input
                type="range"
                min="10"
                max="120"
                name="duration"
                value={quiz.duration}
                onChange={handleChange}
                className="w-full"
              />

              <h3 className="mt-3 text-lg font-semibold">
                {quiz.duration} Minutes
              </h3>

            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-2xl py-4 text-xl font-bold disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Quiz 🚀"}
            </motion.button>

          </form>
        </motion.div>

      </div>
    </TrainerLayout>
  );
};

export default CreateQuiz;