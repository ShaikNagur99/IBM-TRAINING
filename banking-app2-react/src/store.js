import { createStore } from "redux";

function loadState() {
  try {
    const balance = Number(localStorage.getItem("bankBalance"));
    const savedTransactions = JSON.parse(localStorage.getItem("bankTransactions") || "[]");

    return {
      balance: Number.isFinite(balance) ? balance : 1000,
      transactions: Array.isArray(savedTransactions) ? savedTransactions : [],
    };
  } catch (error) {
    return {
      balance: 1000,
      transactions: [],
    };
  }
}

const initialState = loadState();

function bankReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const amount = Number(action.payload.amount) || 0;
      const delta = action.payload.type === "Deposit" ? amount : -amount;
      const nextBalance = state.balance + delta;
      const transaction = {
        id: action.payload.id || Date.now(),
        type: action.payload.type,
        amount,
        date: action.payload.date || new Date().toLocaleString(),
        balanceAfter: nextBalance,
      };

      return {
        ...state,
        balance: nextBalance,
        transactions: [transaction, ...state.transactions],
      };
    }
    case "CLEAR_HISTORY":
      return {
        ...state,
        transactions: [],
      };
    default:
      return state;
  }
}

const store = createStore(bankReducer);

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("bankBalance", String(state.balance));
    localStorage.setItem("bankTransactions", JSON.stringify(state.transactions));
  } catch (error) {
    // ignore persistence errors
  }
});

export default store;
