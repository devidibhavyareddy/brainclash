import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

// Trainer Pages
import TrainerDashboard from "../pages/trainer/Dashboard";
import CreateQuiz from "../pages/trainer/CreateQuiz";
import QuizList from "../pages/trainer/QuizList";
import AddQuestion from "../pages/trainer/AddQuestion";
import StartQuiz from "../pages/trainer/StartQuiz";
import WaitingRoom from "../pages/trainer/WaitingRoom";
import Leaderboard from "../pages/trainer/Leaderboard";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import JoinQuiz from "../pages/student/JoinQuiz";
import WaitingApproval from "../pages/student/WaitingApproval";
import LiveQuiz from "../pages/student/LiveQuiz";
import Result from "../pages/student/Result";
import PreviousResults from "../pages/student/PreviousResults";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= Public Routes ================= */}

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= Trainer Routes ================= */}

      <Route
        path="/trainer/dashboard"
        element={
          <ProtectedRoute role="trainer">
            <TrainerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/create-quiz"
        element={
          <ProtectedRoute role="trainer">
            <CreateQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/quizzes"
        element={
          <ProtectedRoute role="trainer">
            <QuizList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/questions/:quizId"
        element={
          <ProtectedRoute role="trainer">
            <AddQuestion />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/start-quiz"
        element={
          <ProtectedRoute role="trainer">
            <StartQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/waiting-room"
        element={
          <ProtectedRoute role="trainer">
            <WaitingRoom />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainer/leaderboard/:sessionId"
        element={
          <ProtectedRoute role="trainer">
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      {/* ================= Student Routes ================= */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/join"
        element={
          <ProtectedRoute role="student">
            <JoinQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/waiting"
        element={
          <ProtectedRoute role="student">
            <WaitingApproval />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/live"
        element={
          <ProtectedRoute role="student">
            <LiveQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/result/:sessionId"
        element={
          <ProtectedRoute role="student">
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/history"
        element={
          <ProtectedRoute role="student">
            <PreviousResults />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;