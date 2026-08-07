import React, { createContext, useEffect, useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import "./App.css";

export const UserContext = createContext(null);

function App() {
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

  if (!user) {
    return <Auth onLogin={login} onSignup={signup} />;
  }

  return (
    <UserContext.Provider value={userMemo}>
      <div>
        <h1>🏦 My Banking Application</h1>
        <Dashboard onLogout={logout} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
