import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/user/UserDashboard";
import Quiz from "../pages/user/Quiz";
import QuizList from "../pages/user/QuizList";
import AdminDashboard from "../pages/admin/AdminDashboard";
import QuizPage from "../pages/admin/QuizPage";
import QuestionsPage from "../pages/admin/QuestionsPage";
import ThemesPage from "../pages/admin/ThemesPage";
import UsersPage from "../pages/admin/UsersPage";
import HistoryPage from "../pages/admin/HistoryPage";
import ExportPage from "../pages/admin/ExportPage";
import NotFound from "../pages/public/NotFound";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User Routes */}
                <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/quizlist" element={<QuizList />} />
                </Route>

                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={<ProtectedRoute allowedRoles={["admin"]} />}
                >
                    <Route element={<AdminDashboard />}>
                        <Route index element={<Navigate to="questions" replace />} />
                        <Route path="questions" element={<QuestionsPage />} />
                        <Route path="themes" element={<ThemesPage />} />
                        <Route path="quiz" element={<QuizPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="history" element={<HistoryPage />} />
                        <Route path="export" element={<ExportPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
