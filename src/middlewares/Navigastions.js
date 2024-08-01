// middlewares/Navigations.js
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import ReadPage from '../pages/ReadPage';
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoutes';

export const nav = [
    { path: "/login", name: "AuthPage", element: <ProtectedRoute element={<AuthPage />} isPrivate={false} />, isMenu: false, isPrivate: false },
    { path: "/", name: "HomePage", element: <ProtectedRoute element={<HomePage />} isPrivate={true} />, isMenu: true, isPrivate: true },
    { path: "/read", name: "ReadPage", element: <ProtectedRoute element={<ReadPage />} isPrivate={true} />, isMenu: true, isPrivate: true },
    // { path: "/profile", name: "ProfilePage", element: <ProtectedRoute element={<ProfilePage />} isPrivate={true} />, isMenu: true, isPrivate: true },
    // { path: "/setting", name: "SettingPage", element: <ProtectedRoute element={<SettingPage />} isPrivate={true} />, isMenu: true, isPrivate: true },
    { path: "*", name: "NotFoundPage", element: <NotFoundPage />, isMenu: false, isPrivate: false }
];
