import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.css']
})
export class JoinLobbyComponent implements OnInit {

  constructor(private service: ApiService, private router: Router) 
  {

  }

  joinForm = new FormGroup({
    join: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  ngOnInit(): void 
  {
  }

    onSubmit()
    {
      const code = {
        join: this.joinForm.value.join,
      }
    }
}
