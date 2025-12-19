import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserDashboard from '../pages/user/UserDashboard';
import Quiz from '../pages/user/Quiz';
import QuizList from '../pages/user/QuizList';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFound from '../pages/public/NotFound';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quizlist" element={<QuizList />} />

                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
