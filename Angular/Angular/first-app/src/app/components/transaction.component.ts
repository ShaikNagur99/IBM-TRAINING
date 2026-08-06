import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";

import { FundTransferService }
    from "../services/fundTransfer.service";

import { minimumAmountValidator }
    from "../validators/minimum-amount.validator";

import { sameAccountValidator }
    from "../validators/same-account.validator";

import { AccountMaskPipe }
    from "../pipes/account-mask.pipe";

@Component({
    selector: "app-transaction",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        AccountMaskPipe
    ],

    template: `
    <div class="container">

      <h1>Fund Transfer</h1>

      <h2>
        {{ accountNumber | accountMask }}
      </h2>

      <form
        [formGroup]="transferForm"
        (ngSubmit)="transfer()">

        <div class="form-group">
          <label>From Account</label>
          <input
            type="text"
            formControlName="fromAccount">
        </div>

        <div class="form-group">
          <label>To Account</label>
          <input
            type="text"
            formControlName="toAccount">
        </div>

        <div class="form-group">
          <label>Amount</label>
          <input
            type="number"
            formControlName="amount">
        </div>

        @if(
          transferForm.get('amount')
          ?.errors?.['minimumAmount']
        ){
          <p class="error">
            Minimum amount should be ₹100
          </p>
        }

        @if(
          transferForm.errors?.['sameAccount']
        ){
          <p class="error">
            Source and destination account cannot be same
          </p>
        }

        <button
          type="submit"
          [disabled]="transferForm.invalid">

          Transfer

        </button>

      </form>

      @if(message){
        <p class="success">{{message}}</p>
      }

    </div>
    `,

    styles: [`

      .container{
          width:420px;
          margin:50px auto;
          padding:30px;
          background:#ffffff;
          border-radius:10px;
          box-shadow:0 4px 12px rgba(0,0,0,0.15);
          font-family:Arial, Helvetica, sans-serif;
      }

      h1{
          text-align:center;
          color:#2c3e50;
          margin-bottom:10px;
      }

      h2{
          text-align:center;
          color:#007bff;
          margin-bottom:25px;
      }

      .form-group{
          margin-bottom:18px;
      }

      label{
          display:block;
          font-weight:bold;
          margin-bottom:6px;
      }

      input{
          width:100%;
          padding:10px;
          border:1px solid #ccc;
          border-radius:5px;
          font-size:15px;
          box-sizing:border-box;
      }

      input:focus{
          outline:none;
          border-color:#007bff;
      }

      button{
          width:100%;
          padding:12px;
          margin-top:15px;
          background:#007bff;
          color:white;
          border:none;
          border-radius:5px;
          font-size:16px;
          cursor:pointer;
      }

      button:hover:not(:disabled){
          background:#0056b3;
      }

      button:disabled{
          background:#bdbdbd;
          cursor:not-allowed;
      }

      .error{
          color:red;
          font-size:14px;
          margin-top:5px;
      }

      .success{
          margin-top:20px;
          text-align:center;
          color:green;
          font-weight:bold;
          font-size:16px;
      }

    `]
})
export class Transaction {

    accountNumber = "1234567890";

    message = "";

    constructor(
        private fundTransferService: FundTransferService
    ) { }

    transferForm = new FormGroup({

        fromAccount: new FormControl(
            "",
            [Validators.required]
        ),

        toAccount: new FormControl(
            "",
            [Validators.required]
        ),

        amount: new FormControl(
            0,
            [
                Validators.required,
                minimumAmountValidator
            ]
        )

    }, {
        validators: sameAccountValidator
    });

    transfer() {

        const value =
            this.transferForm.value;

        this.fundTransferService
            .transferFunds(
                value.fromAccount!,
                value.toAccount!,
                Number(value.amount)
            )
            .subscribe({

                next: () => {

                    this.message =
                        `₹${value.amount} transferred successfully`;

                    this.transferForm.reset();
                },

                error: () => {

                    this.message =
                        "Transfer Failed";
                }
            });
    }
}