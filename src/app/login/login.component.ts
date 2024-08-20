import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  mensagem: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.senha).subscribe(
      response => {
        if (response) {
          this.mensagem = 'Credenciais válidas.';
          this.router.navigate(['/vitrine']);
        } else {
          this.mensagem = 'Credenciais inválidas.';
        }
      },
      error => {
        if (error.status === 401) {
          this.mensagem = 'Credenciais inválidas.';
        } else {
          this.mensagem = 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
        }
      }
    );
  }
}
