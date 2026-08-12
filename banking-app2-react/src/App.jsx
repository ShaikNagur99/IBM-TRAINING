import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import BalanceController from "./BalanceController";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import About from "./pages/About";
import "./App.css";

export const UserContext = createContext(null);

function App() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const [rememberLogin, setRememberLogin] = useState(() => {
    try {
      return localStorage.getItem("rememberedLogin") === "true";
    } catch (e) {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      if (localStorage.getItem("rememberedLogin") === "true") {
        const saved = localStorage.getItem("bankingUser");
        return saved ? JSON.parse(saved) : null;
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user && rememberLogin) {
        localStorage.setItem("bankingUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("bankingUser");
      }
    } catch (e) {
      // ignore
    }
  }, [user, rememberLogin]);

  useEffect(() => {
    try {
      if (rememberLogin) {
        localStorage.setItem("rememberedLogin", "true");
      } else {
        localStorage.removeItem("rememberedLogin");
      }
    } catch (e) {
      // ignore
    }
  }, [rememberLogin]);

  const login = (userInfo, remember) => {
    setUser(userInfo);
    setRememberLogin(remember);
  };

  const signup = (userInfo, remember) => {
    setUser(userInfo);
    setRememberLogin(remember);
  };

  const logout = () => {
    setUser(null);
  };

  const userMemo = useMemo(() => user, [user]);

  const createTransaction = (type, amount) => ({
    id: Date.now(),
    type,
    amount,
    date: new Date().toLocaleString(),
  });

  const handleDeposit = (amount) => {
    dispatch({ type: "ADD_TRANSACTION", payload: createTransaction("Deposit", amount) });
  };

  const handleWithdraw = (amount) => {
    dispatch({ type: "ADD_TRANSACTION", payload: createTransaction("Withdraw", amount) });
  };

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth onLogin={login} onSignup={signup} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <UserContext.Provider value={userMemo}>
      <BrowserRouter>
        <div className="app-shell">
          <header className="app-header">
            <div>
              <h1>🏦 My Banking Application</h1>
              <p className="redux-balance">Balance: ₹{balance}</p>
            </div>
            <nav className="app-nav">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/accounts">Accounts</Link>
              <Link to="/about">About</Link>
              <button className="btn secondary" onClick={() => logout()}>
                Logout
              </button>
            </nav>
          </header>
          <BalanceController balance={balance} onDeposit={handleDeposit} onWithdraw={handleWithdraw} />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
