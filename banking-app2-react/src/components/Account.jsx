import React, { useEffect, useState } from "react";

function Account({ balance: initialBalance }) {
  const [account, setAccount] = useState({ balance: initialBalance, name: "Account Holder", status: "Loading" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAccount((prev) => ({ ...prev, balance: initialBalance }));
  }, [initialBalance]);

  useEffect(() => {
    let isMounted = true;
    const url = "/mock-account.json";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setAccount((prev) => ({
          ...prev,
          name: data.name ?? prev.name,
          status: data.status ?? prev.status,
        }));
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to load account details from local mock. Showing saved balance.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="account">
      <h2>💰 Current Balance: ₹{account.balance}</h2>
      <p>{loading ? "Loading account details..." : `Account status: ${account.status}`}</p>
      {error && <p className="error" style={{ color: "orange" }}>{error}</p>}
      {account.balance < 0 && <p style={{ color: "red" }}>⚠️ Overdraft Alert!</p>}
    </div>
  );
}

export default Account;