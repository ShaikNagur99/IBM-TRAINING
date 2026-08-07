import React, {
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from "react";
import "./Dashboard.css";
import Account from "./Account";
import TransactionForm from "./TransactionForm";
import { UserContext } from "../App";

function PropGrandChild({ user }) {
  return <p className="prop-drill">Hello {user}</p>;
}

function PropChild({ user }) {
  return (
    <div className="prop-child">
      <PropGrandChild user={user} />
    </div>
  );
}

function PropParent({ user }) {
  return (
    <div className="prop-parent">
      <PropChild user={user} />
    </div>
  );
}

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

const initialState = {
  balance: 1000,
  transactions: [],
  searchQuery: "",
  filterType: "All",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "CLEAR_HISTORY":
      return { ...state, transactions: [] };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_FILTER_TYPE":
      return { ...state, filterType: action.payload };
    default:
      return state;
  }
}

function Dashboard({ onLogout }) {
  const user = useContext(UserContext);
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    () => {
      try {
        const savedTransactions = JSON.parse(localStorage.getItem("dashboardTransactions") || "[]");
        const savedBalance = Number(localStorage.getItem("dashboardBalance"));
        return {
          ...initialState,
          balance: Number.isFinite(savedBalance) ? savedBalance : 1000,
          transactions: Array.isArray(savedTransactions) ? savedTransactions : [],
        };
      } catch (e) {
        return initialState;
      }
    }
  );
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
  }, [state.searchQuery, state.filterType]);

  useEffect(() => {
    try {
      localStorage.setItem("dashboardBalance", String(state.balance));
      localStorage.setItem("dashboardTransactions", JSON.stringify(state.transactions));
    } catch (e) {
      // ignore
    }
  }, [state.balance, state.transactions]);

  const totalDeposits = useMemo(
    () => state.transactions.filter(tx => tx.type === "Deposit").reduce((sum, tx) => sum + tx.amount, 0),
    [state.transactions]
  );

  const totalWithdrawals = useMemo(
    () => state.transactions.filter(tx => tx.type === "Withdraw").reduce((sum, tx) => sum + tx.amount, 0),
    [state.transactions]
  );

  const netChange = useMemo(() => totalDeposits - totalWithdrawals, [totalDeposits, totalWithdrawals]);

  const displayedTransactions = useTransactionFilter(state.transactions, state.filterType, state.searchQuery);

  const handleTransaction = useCallback((type, amount) => {
    const newBalance = type === "Deposit" ? state.balance + amount : state.balance - amount;
    const tx = {
      id: Date.now(),
      type,
      amount,
      balanceAfter: newBalance,
      date: new Date().toLocaleString(),
    };
    dispatch({ type: "SET_BALANCE", payload: newBalance });
    dispatch({ type: "ADD_TRANSACTION", payload: tx });
  }, [state.balance]);

  const clearHistory = useCallback(() => {
    if (!window.confirm('Clear all transaction history?')) return;
    dispatch({ type: "CLEAR_HISTORY" });
  }, []);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    startTransition(() => {
      dispatch({ type: "SET_SEARCH_QUERY", payload: value });
    });
  }, []);

  const handleFilterChange = useCallback((e) => {
    dispatch({ type: "SET_FILTER_TYPE", payload: e.target.value });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-user">
          <span>Hello, {user?.name}</span>
          <button className="btn secondary" onClick={() => {
            if (window.confirm('Logout now?')) onLogout();
          }}>Logout</button>
        </div>
      </div>
      <div className="prop-drill-card">
        <h3>Prop drilling example</h3>
        <p className="prop-drill-note">This passes <strong>user</strong> from Dashboard → PropParent → PropChild → PropGrandChild.</p>
        <PropParent user={user?.name || 'Guest'} />
      </div>
      <div className="context-card">
        <h3>Context hook example</h3>
        <p className="context-example">Context user: {user?.name || 'Guest'}</p>
      </div>
      <Account balance={state.balance} />
      <TransactionForm onTransaction={handleTransaction} />
      <div className="section-actions">
        <button className="btn warning" onClick={clearHistory}>Clear history</button>
      </div>

      <div className="summary-row">
        <div className="summary-card">Total Deposits: <strong className="positive">₹{totalDeposits}</strong></div>
        <div className="summary-card">Total Withdrawals: <strong className="negative">₹{totalWithdrawals}</strong></div>
        <div className="summary-card">Net Change: <strong className={netChange >= 0 ? 'positive' : 'negative'}>₹{netChange}</strong></div>
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
                className={`bar-fill ${netChange >= 0 ? 'deposit' : 'withdraw'}`}
                style={{ height: `${(Math.abs(netChange) / Math.max(totalDeposits, totalWithdrawals, Math.abs(netChange), 1)) * 100}%` }}
              />
            </div>
            <strong className={netChange >= 0 ? 'positive' : 'negative'}>₹{netChange}</strong>
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
            value={state.searchQuery}
            onChange={handleSearchChange}
          />
          <p className="filter-hint">Input width: {searchWidth}px {isPending && '(updating...)'}</p>
        </div>
        <div className="filter-group">
          <label htmlFor={filterTypeId}>Type</label>
          <select
            id={filterTypeId}
            value={state.filterType}
            onChange={handleFilterChange}
            className="transaction-filter-select"
          >
            <option value="All">All</option>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
          </select>
        </div>
        <div className="filter-summary">Showing {displayedTransactions.length} of {state.transactions.length}</div>
      </div>

      <div className="table-section">
        <h3>Transaction History</h3>
        {state.transactions.length === 0 ? (
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
              {displayedTransactions.map(tx => (
                <tr key={tx.id} className={tx.type === 'Deposit' ? 'deposit' : 'withdraw'}>
                  <td>{tx.type}</td>
                  <td style={{ color: tx.type === 'Deposit' ? 'green' : 'red' }}>
                    {tx.type === 'Deposit' ? '+' : '-'}₹{tx.amount}
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