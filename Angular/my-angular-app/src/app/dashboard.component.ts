import { Component } from '@angular/core';
import { BankService } from './bank.spec';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(public bank: BankService) {}
}
