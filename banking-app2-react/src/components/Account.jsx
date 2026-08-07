import React from "react";

function Account({ balance }) {
  return (
    <div className="account">
      <h2>💰 Current Balance: ₹{balance}</h2>
      {balance < 0 && <p style={{ color: "red" }}>⚠️ Overdraft Alert!</p>}
    </div>
  );
}

export default Account;