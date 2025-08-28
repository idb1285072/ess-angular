import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  imports: [RouterLink, RouterModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail implements OnInit {
  public employeeId!: number;
  public employeeName!: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  previousEmployee() {
    let previousId = this.employeeId - 1;
    this.router.navigate(['/employee', previousId]);
    // this.employeeId = previousId;
  }
  nextEmployee() {
    let nextId = this.employeeId + 1;
    this.router.navigate(['/employee', nextId]);
    // this.employeeId = nextId;
  }
  backEmployees() {
    let selectedId = this.employeeId;
    console.log(selectedId);
    this.router.navigate(['/employee', { id: selectedId }]);
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    let name = this.route.snapshot.paramMap.get('name');
    this.employeeId = id ? Number(id) : 0;
    this.employeeName = name ? name : '';
  }
}
