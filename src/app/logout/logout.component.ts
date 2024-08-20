import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  public mensagem: String = "";
  public obj: Cliente = new Cliente();

  constructor(){
    let json = localStorage.getItem("cliente");
    if(json==null){
      this.mensagem = "";
    } else {
      this.obj = JSON.parse(json);
      this.mensagem = "Seja bem vindo "+ this.obj.nome;
    }     }
   
    fazerLogout(){
        localStorage.removeItem("cliente");
        this.mensagem = "";
    }

  }


