import React from "react";
import Account from "../components/Account";

function Accounts() {
  return (
    <div>
      <h2>Account Details</h2>
      <Account balance={1200} />
    </div>
  );
}

export default Accounts;
