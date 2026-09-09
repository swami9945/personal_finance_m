import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Calculator from "./pages/Calculator";
import SavingsGoals from "./pages/SavingsGoals";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";

import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";


function MainLayout({ children }) {
  return (
    <div className="main-layout">

      <Sidebar />

      <main className="main-content">
        {children}
      </main>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Routes>

          {/* =========================
              START
          ========================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />


          {/* =========================
              AUTHENTICATION
          ========================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* =========================
              DASHBOARD
          ========================= */}

          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />


          {/* =========================
              TRANSACTIONS
          ========================= */}

          <Route
            path="/transactions"
            element={
              <MainLayout>
                <Transactions />
              </MainLayout>
            }
          />


          {/* =========================
              INCOME
          ========================= */}

          <Route
            path="/income"
            element={
              <MainLayout>
                <Income />
              </MainLayout>
            }
          />


          {/* =========================
              EXPENSES
          ========================= */}

          <Route
            path="/expenses"
            element={
              <MainLayout>
                <Expenses />
              </MainLayout>
            }
          />


          {/* =========================
              BUDGET
          ========================= */}

          <Route
            path="/budget"
            element={
              <MainLayout>
                <Budget />
              </MainLayout>
            }
          />


          {/* =========================
              REPORTS
          ========================= */}

          <Route
            path="/reports"
            element={
              <MainLayout>
                <Reports />
              </MainLayout>
            }
          />


          {/* =========================
              CALCULATOR
          ========================= */}

          <Route
            path="/calculator"
            element={
              <MainLayout>
                <Calculator />
              </MainLayout>
            }
          />


          {/* =========================
              SAVINGS GOALS
          ========================= */}

          <Route
            path="/savings-goals"
            element={
              <MainLayout>
                <SavingsGoals />
              </MainLayout>
            }
          />


          {/* =========================
              UNKNOWN URL
          ========================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;