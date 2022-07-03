import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomFlashMessageService } from 'src/app/common/services/custom-flash-message.service';
import { CustomService } from 'src/app/common/services/custom.service';
import { emailValidator } from 'src/app/common/custom-validator/email.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = 0;
  isSubmitted = 0;
  loginFormInfo ={
    email :'',
    password: '',
  };
  rememberMe = 0;
  rememberMeData = {
    email: '',
    password: '',
  }
  isPasswordTextFieldType: boolean;

  constructor(
    private formBuilder:FormBuilder,
    public commonService: CommonService,
    public customService: CustomService,
    private router:Router,
    private customFlashMessageService: CustomFlashMessageService
  ) { }

  ngOnInit() {

    if(localStorage.getItem('rememberMeData') !=  null)
    {
      this.rememberMe = 1;
      this.rememberMeData = JSON.parse(atob(localStorage.getItem('rememberMeData')));
      this.loginFormInfo.email = this.rememberMeData.email;
      this.loginFormInfo.password = this.rememberMeData.password;
    }

    this.setForm();
  }

  // Set initial form data
  setForm()
  {
    this.loginForm = this.formBuilder.group({
      email: [this.loginFormInfo.email, [Validators.required, emailValidator]],
      password: [this.loginFormInfo.password, [Validators.required, Validators.maxLength(16), Validators.minLength(8)] ],
      fcmToken: '',
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

    // Update remember flag
    changeRememberMe(event)
    {
      this.rememberMe = event.target.checked;
    }

    //Toggle password field type
    togglePasswordFieldType(){
      this.isPasswordTextFieldType = !this.isPasswordTextFieldType;
    }

    // Clear input text on click of cross sign
    clearInputText(fieldName)
    {
      if(fieldName == 'email')
      {
        this.loginForm.controls.email.setValue('');
      }
    }

  /*********************************************  API section   **************************************/
  //Login form submit
  onSubmit()
  {
    this.isSubmitted = 1;
    if (this.loginForm.invalid) {
      return;
    }

    this.customService.login(this.loginForm.value).subscribe(
      (result) => {
        if(result.status)
        {
          if(this.rememberMe)
          {
            const rememberMeData = {
              email: this.loginForm.controls.email.value,
              password: this.loginForm.controls.password.value,
            };
            localStorage.setItem('rememberMeData', btoa(JSON.stringify(rememberMeData)));
          }
          else
          {
            localStorage.removeItem('rememberMeData');
          }

          if(result.result.accessToken != '')
          {
            localStorage.setItem('BlogAccessToken', result.result.accessToken);
            localStorage.setItem('BlogUserDetail', JSON.stringify(result.result.userDetail));
            this.router.navigate(['dashboard']);
          }
        }
        else
        {
          this.customFlashMessageService.showError(result.message);
        }
        this.isSubmitted =0;
    });
  }
}
