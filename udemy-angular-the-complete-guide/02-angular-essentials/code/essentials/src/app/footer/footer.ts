import { Component } from '@angular/core';
@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
  <h1 class="footer">Footer</h1>`,
  styles: `.footer{
    color: #ffe2ff;
    text-align: center;
    margin: 0px;
    padding: 20px;
    background-color: #112233;
  }`

})
export class Footer{

}