import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomFlashMessageService {

  constructor(private toastrService: ToastrService) { }

  public showSuccess(message, timeout = 5000) {

    setTimeout(() => this.toastrService.success(message));
  }

  public showError(message, timeout = 5000) {

    setTimeout(() => this.toastrService.error(message));
  }
}
