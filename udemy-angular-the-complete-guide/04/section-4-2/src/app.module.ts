import { NgModule } from '@angular/core';
import { UserInputComponent } from './app/user-input/user-input.component';
import { InvestmentResultsComponent } from './app/investment-results/investment-results.component';
import { HeaderComponent } from './app/header/header.component';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserInputComponent,
    InvestmentResultsComponent,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
