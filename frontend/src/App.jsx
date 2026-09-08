import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import RecurringTransactions from "./pages/RecurringTransactions";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import SavingsGoals from "./pages/SavingsGoals";
import Transactions from "./pages/Transactions";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="income" element={<AddIncome />} />
          <Route path="expense" element={<AddExpense />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="savings-goals" element={<SavingsGoals />} />
          <Route path="recurring" element={<RecurringTransactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
