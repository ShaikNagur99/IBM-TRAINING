import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { BankService } from './bank.spec';
import { sameAccountValidator } from './same-account.validator';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public bank: BankService,
  ) {
    this.transferForm = this.fb.group({
      accountNumber: ['', [Validators.required, sameAccountValidator]],

      transactionType: ['Deposit', Validators.required],

      amount: ['', [Validators.required, Validators.min(100)]],
    });
  }

  submitTransaction() {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();

      alert('Please correct the errors.');

      return;
    }

    const amount = Number(this.transferForm.value.amount);

    const type = this.transferForm.value.transactionType;

    if (type === 'Deposit') {
      this.bank.deposit(amount);
    } else {
      this.bank.withdraw(amount);
    }

    this.transferForm.reset({
      accountNumber: '',

      transactionType: 'Deposit',

      amount: '',
    });
  }
}
