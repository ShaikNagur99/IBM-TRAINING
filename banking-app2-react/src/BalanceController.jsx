import React, { useState } from "react";

function BalanceController({ balance, onDeposit, onWithdraw }) {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (action) => {
    const value = Number(amount);
    if (Number.isNaN(value) || value <= 0) return;
    if (action === "deposit") {
      onDeposit(value);
    } else {
      onWithdraw(value);
    }
    setAmount(0);
  };

  return (
    <section className="balance-controller">
      <h2>Redux Balance Control</h2>
      <p>Current Balance from Redux: ₹{balance}</p>
      <div className="balance-controls">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button className="btn primary" onClick={() => handleSubmit("deposit")}>Deposit</button>
        <button className="btn warning" onClick={() => handleSubmit("withdraw")}>Withdraw</button>
      </div>
    </section>
  );
}

export default BalanceController;
