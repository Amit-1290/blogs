import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomFlashMessageService } from 'src/app/common/services/custom-flash-message.service';
import { emailValidator } from 'src/app/common/custom-validator/email.validator';
import { CustomService } from 'src/app/common/services/custom.service';
import { API } from 'src/app/common/constants/constant';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isLoading = 0;
  isSubmitted = 0;
  signupFormInfo ={
    name:'',
    email :'',
    password: '',
  };
 
  isPasswordTextFieldType: boolean;

  constructor(
    private formBuilder:FormBuilder,
    public commonService: CommonService,
    public customService: CustomService,
    private router:Router,
    private customFlashMessageService: CustomFlashMessageService
  ) { }

  ngOnInit() {

    this.setForm();
  }

  // Set initial form data
  setForm()
  {
    this.signupForm = this.formBuilder.group({
      name: [this.signupFormInfo.name, [Validators.required]],
      email: [this.signupFormInfo.email, [Validators.required, emailValidator]],
      password: [this.signupFormInfo.password, [Validators.required, Validators.maxLength(16), Validators.minLength(8)] ],
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

    //Toggle password field type
    togglePasswordFieldType(){
      this.isPasswordTextFieldType = !this.isPasswordTextFieldType;
    }

    // Clear input text on click of cross sign
    clearInputText(fieldName)
    {
      if(fieldName == 'email')
      {
        this.signupForm.controls.email.setValue('');
      }
    }

  /*********************************************  API section   **************************************/
  //Login form submit
  onSubmit()
  {
    this.isSubmitted = 1;
    if (this.signupForm.invalid) {
      return;
    }

    this.customService.signup(this.signupForm.value).subscribe(
      (result) => {
        if(result.status)
        {
          this.router.navigate(['auth/login']);
          this.customFlashMessageService.showSuccess(result.message);
          
        }
        else
        {
          this.customFlashMessageService.showError(result.message);
        }
        this.isSubmitted =0;
    });
  }
}
