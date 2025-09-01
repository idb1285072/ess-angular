import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InvestmentService } from '../investment.service';
@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrls: ['./investment-results.component.css'],
  standalone: true,
  imports: [CurrencyPipe],
})
export class InvestmentResultsComponent {
  // @Input() results?: {
  //   year: number;
  //   interest: number;
  //   valueEndOfYear: number;
  //   annualInvestment: number;
  //   totalInterest: number;
  //   totalAmountInvested: number;
  // }[]
  constructor(private investmentService: InvestmentService) {}
  // private investmentService = inject(InvestmentService);
  get results() {
    return this.investmentService.resultData;
  }
}
