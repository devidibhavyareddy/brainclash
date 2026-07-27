import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../../services/api";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import TrainerLayout from "../../layouts/TrainerLayout";

const AddQuestion = () => {
  const { quizId } = useParams();

  const [questions, setQuestions] = useState([]);

  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 1,
    timeLimit: 30,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get(`/questions/${quizId}`);
      setQuestions(res.data.questions);
    } catch (error) {
      toast.error("Unable to load questions");
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...formData.options];
    updated[index] = value;

    setFormData({
      ...formData,
      options: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/questions", {
        quizId,
        questionText: formData.questionText,
        options: formData.options,
        correctAnswer: Number(formData.correctAnswer),
        marks: Number(formData.marks),
        timeLimit: Number(formData.timeLimit),
      });

      toast.success("Question Added Successfully");

      setFormData({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: 1,
        timeLimit: 30,
      });

      fetchQuestions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Add Question");
    }
  };

  return (
    <TrainerLayout>
      <BackgroundAnimation />

      <div className="text-white">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
        >
          <h1 className="text-4xl font-bold mb-8">
            Add Questions
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <textarea
              placeholder="Enter Question"
              value={formData.questionText}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  questionText: e.target.value,
                })
              }
              className="w-full rounded-xl p-4 text-black"
              required
            />

            {formData.options.map((option, index) => (
              <input
                key={index}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, e.target.value)
                }
                className="w-full rounded-xl p-4 text-black"
                required
              />
            ))}

            <select
              value={formData.correctAnswer}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  correctAnswer: e.target.value,
                })
              }
              className="w-full rounded-xl p-4 text-black"
              required
            >
              <option value="">Select Correct Answer</option>

              {formData.options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-200">
                  Marks
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.marks}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marks: e.target.value,
                    })
                  }
                  className="w-full rounded-xl p-4 text-black"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-200">
                  Time Limit
                </label>
                <input
                  type="number"
                  min="10"
                  value={formData.timeLimit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timeLimit: e.target.value,
                    })
                  }
                  className="w-full rounded-xl p-4 text-black"
                />
              </div>

            </div>

            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl py-4 text-xl font-semibold"
            >
              Save Question
            </button>

          </form>
        </motion.div>

        {/* Questions List */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Existing Questions
          </h2>

          {questions.length === 0 ? (
            <p className="text-gray-300">
              No questions added yet.
            </p>
          ) : (
            questions.map((q, index) => (
              <motion.div
                key={q._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 rounded-2xl p-6 mb-5"
              >
                <h2 className="text-xl font-semibold">
                  Q{index + 1}. {q.questionText}
                </h2>

                <div className="mt-4 space-y-2">
                  {q.options.map((option, i) => (
                    <p
                      key={i}
                      className={
                        i === q.correctAnswer
                          ? "text-green-400"
                          : ""
                      }
                    >
                      {i + 1}. {option}
                    </p>
                  ))}
                </div>

                <div className="mt-4 flex gap-8 text-sm text-gray-300">
                  <span>Marks: {q.marks}</span>
                  <span>Time: {q.timeLimit} sec</span>
                </div>

              </motion.div>
            ))
          )}

        </div>

      </div>
    </TrainerLayout>
  );
};

export default AddQuestion;