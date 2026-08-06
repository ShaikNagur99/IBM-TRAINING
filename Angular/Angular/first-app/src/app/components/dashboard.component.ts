import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FundTransferService, Account } from "../services/fundTransfer.service";
import { SharedModule } from "../pipes/shared/shared.module";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [FormsModule,
    SharedModule
  ],

  template: `
    <h1>Dashboard</h1>

    <h2>Create Account</h2>

    <input
      placeholder="Account Number"
      [(ngModel)]="accountNumber">

    <input
      type="number"
      placeholder="Balance"
      [(ngModel)]="balance">

    <button (click)="createAccount()">
      Add Account
    </button>

    <hr>

    <button (click)="loadAccounts()">
      Refresh Accounts
    </button>

    @for(account of accounts; track account.id){

      <div class="account-card">

        <p><strong>ID :</strong> {{account.id}}</p>
        <p><strong>Account :</strong> {{account.accountNumber}}</p>
        <p><strong>Balance :</strong> ₹{{account.balance}}</p>

        <button
          (click)="updateBalance(account.id!, account.balance)">
          Add ₹500
        </button>

        <button
          (click)="deleteAccount(account.id!)">
          Delete
        </button>

      </div>
    }
  `,

  styles: [`
    h1{
      text-align:center;
      color:#2c3e50;
      margin-bottom:20px;
    }

    h2{
      color:#34495e;
      margin-bottom:15px;
    }

    input{
      width:220px;
      padding:10px;
      margin:8px;
      border:1px solid #ccc;
      border-radius:5px;
      font-size:15px;
    }

    input:focus{
      outline:none;
      border-color:#007bff;
    }

    button{
      padding:10px 18px;
      margin:8px;
      background-color:#007bff;
      color:white;
      border:none;
      border-radius:5px;
      cursor:pointer;
      font-size:15px;
    }

    button:hover{
      background-color:#0056b3;
    }

    hr{
      margin:25px 0;
    }

    .account-card{
      width:320px;
      padding:15px;
      margin:15px auto;
      border-radius:8px;
      border:1px solid #ddd;
      box-shadow:0 2px 8px rgba(0,0,0,0.1);
      background:#ffffff;
    }

    .account-card p{
      margin:8px 0;
      font-size:15px;
    }

    .account-card button:first-of-type{
      background-color:#28a745;
    }

    .account-card button:first-of-type:hover{
      background-color:#218838;
    }

    .account-card button:last-of-type{
      background-color:#dc3545;
    }

    .account-card button:last-of-type:hover{
      background-color:#c82333;
    }
  `]
})
export class Dashboard implements OnInit {

  accounts: Account[] = [];

  accountNumber = "";

  balance = 0;

  constructor(
    private fundTransferService: FundTransferService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.fundTransferService
      .getAccounts()
      .subscribe(data => {
        this.accounts = data;
      });
  }

  createAccount() {

    const account: Account = {
      accountNumber: this.accountNumber,
      balance: this.balance
    };

    this.fundTransferService
      .createAccount(account)
      .subscribe(() => {

        this.loadAccounts();

        this.accountNumber = "";
        this.balance = 0;
      });
  }

  updateBalance(
    id: number,
    currentBalance: number
  ) {

    this.fundTransferService
      .updateBalance(
        id,
        currentBalance + 500
      )
      .subscribe(() => {
        this.loadAccounts();
      });
  }

  deleteAccount(id: number) {

    this.fundTransferService
      .deleteAccount(id)
      .subscribe(() => {
        this.loadAccounts();
      });
  }
}