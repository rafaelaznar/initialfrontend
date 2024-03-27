import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';


export interface initial {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,

  providers: [HttpClient],
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: initial = { id: 0, name: "" };

  constructor(
    private oHttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.get();
  }

  getOne(id: number): Observable<initial> {
    return this.oHttpClient.get<initial>("http://localhost:8080/initial/" + id);
  }


  get(): void {
    this.getOne(1).subscribe({
      next: (data: initial) => {
        this.title = data;
      },
      error: (error: HttpErrorResponse) => {
        this.title.name = error.message;
      }

    })

  }

}