import React, { useState } from "react";

function TransactionForm({ onTransaction }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Deposit");

  const submit = (e) => {
    e.preventDefault();
    const a = Number(amount) || 0;
    if (a <= 0) return;
    if (typeof onTransaction === "function") onTransaction(type, a);
    setAmount("");
  };

  return (
    <form className="transaction-form" onSubmit={submit}>
      <div className="transaction-inputs">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn primary" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default TransactionForm;
