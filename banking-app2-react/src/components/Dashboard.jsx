import React, {
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useId,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import Account from "./Account";
import TransactionForm from "./TransactionForm";
import { UserContext } from "../App";

function useTransactionFilter(transactions, filterType, searchQuery) {
  const deferredQuery = useDeferredValue(searchQuery);

  const filtered = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return transactions.filter((tx) => {
      if (filterType !== "All" && tx.type !== filterType) return false;
      if (!normalizedQuery) return true;
      return (
        tx.type.toLowerCase().includes(normalizedQuery) ||
        tx.amount.toString().includes(normalizedQuery) ||
        tx.date.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [transactions, filterType, deferredQuery]);

  useDebugValue(`${filterType}:${deferredQuery || "none"}`);
  return filtered;
}

function Dashboard() {
  const user = useContext(UserContext);
  const balance = useSelector((state) => state.balance);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [searchWidth, setSearchWidth] = useState(0);
  const inputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const searchId = useId();
  const filterTypeId = useId();

  useInsertionEffect(() => {
    document.documentElement.style.setProperty("--dashboard-accent", "#1976d2");
    return () => {
      document.documentElement.style.removeProperty("--dashboard-accent");
    };
  }, []);

  useLayoutEffect(() => {
    if (inputRef.current) {
      setSearchWidth(inputRef.current.offsetWidth);
    }
  }, [searchQuery, filterType]);

  const totalDeposits = useMemo(
    () => transactions.filter((tx) => tx.type === "Deposit").reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

  const totalWithdrawals = useMemo(
    () => transactions.filter((tx) => tx.type === "Withdraw").reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

  const netChange = useMemo(() => totalDeposits - totalWithdrawals, [totalDeposits, totalWithdrawals]);

  const displayedTransactions = useTransactionFilter(transactions, filterType, searchQuery);

  const handleTransaction = useCallback(
    (type, amount) => {
      const tx = {
        id: Date.now(),
        type,
        amount,
        date: new Date().toLocaleString(),
      };
      dispatch({ type: "ADD_TRANSACTION", payload: tx });
    },
    [dispatch]
  );

  const clearHistory = useCallback(() => {
    if (!window.confirm("Clear all transaction history?")) return;
    dispatch({ type: "CLEAR_HISTORY" });
  }, [dispatch]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    startTransition(() => {
      setSearchQuery(value);
    });
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilterType(e.target.value);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-user">
          <span>Hello, {user?.name}</span>
        </div>
      </div>

      <div className="dashboard-top">
        <div className="dashboard-left">
          <Account balance={balance} />

          <div className="summary-row">
            <div className="summary-card">
              Total Deposits: <strong className="positive">₹{totalDeposits}</strong>
            </div>
            <div className="summary-card">
              Total Withdrawals: <strong className="negative">₹{totalWithdrawals}</strong>
            </div>
            <div className="summary-card">
              Net Change: <strong className={netChange >= 0 ? "positive" : "negative"}>₹{netChange}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          <TransactionForm onTransaction={handleTransaction} />
          <div className="section-actions">
            <button className="btn warning" onClick={clearHistory}>Clear history</button>
          </div>

          <div className="chart-card">
            <h3>Transaction Overview</h3>
            <div className="chart-bars">
              <div className="chart-bar">
                <span>Deposits</span>
                <div className="bar-track">
                  <div
                    className="bar-fill deposit"
                    style={{ height: `${(totalDeposits / Math.max(totalDeposits, totalWithdrawals, Math.abs(netChange), 1)) * 100}%` }}
                  />
                </div>
                <strong>₹{totalDeposits}</strong>
              </div>
              <div className="chart-bar">
                <span>Withdrawals</span>
                <div className="bar-track">
                  <div
                    className="bar-fill withdraw"
                    style={{ height: `${(totalWithdrawals / Math.max(totalDeposits, totalWithdrawals, Math.abs(netChange), 1)) * 100}%` }}
                  />
                </div>
                <strong>₹{totalWithdrawals}</strong>
              </div>
              <div className="chart-bar">
                <span>Net Change</span>
                <div className="bar-track">
                  <div
                    className={`bar-fill ${netChange >= 0 ? "deposit" : "withdraw"}`}
                    style={{ height: `${(Math.abs(netChange) / Math.max(totalDeposits, totalWithdrawals, Math.abs(netChange), 1)) * 100}%` }}
                  />
                </div>
                <strong className={netChange >= 0 ? "positive" : "negative"}>₹{netChange}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="transaction-filters">
        <div className="filter-group">
          <label htmlFor={searchId}>Search</label>
          <input
            ref={inputRef}
            id={searchId}
            className="transaction-search"
            type="text"
            placeholder="Search by type, amount, or date"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <p className="filter-hint">Input width: {searchWidth}px {isPending && "(updating...)"}</p>
        </div>
        <div className="filter-group">
          <label htmlFor={filterTypeId}>Type</label>
          <select
            id={filterTypeId}
            value={filterType}
            onChange={handleFilterChange}
            className="transaction-filter-select"
          >
            <option value="All">All</option>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
          </select>
        </div>
        <div className="filter-summary">Showing {displayedTransactions.length} of {transactions.length}</div>
      </div>

      <div className="table-section">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((tx) => (
                <tr key={tx.id} className={tx.type === "Deposit" ? "deposit" : "withdraw"}>
                  <td>{tx.type}</td>
                  <td style={{ color: tx.type === "Deposit" ? "green" : "red" }}>
                    {tx.type === "Deposit" ? "+" : "-"}₹{tx.amount}
                  </td>
                  <td>₹{tx.balanceAfter}</td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
