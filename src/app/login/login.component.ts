import {Input, Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Form} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : FormControl;
  password: FormControl;
  form: FormGroup;

  constructor() {
    this.username = new FormControl();
    this.password = new FormControl();

    this.form = new FormGroup({
      username: this.username,
      password: this.password
    });

    this.error = "";
  }

  @Input() error: string | null;

  @Output() submitEm = new EventEmitter();

  submit(){
    if(this.form.valid){
      this.submitEm.emit(this.form.value);
    }
  }

  ngOnInit(): void {
  }

}
