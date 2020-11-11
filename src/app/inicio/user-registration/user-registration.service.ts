import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  private typeRegistration: any;
  private dataUserReg = { email: '', phone: '' };
  constructor() { }

  setTypeReg(type: string) { this.typeRegistration = type; }
  getTypeReg() { return this.typeRegistration; }

  setDataUserEmail(email: string) { this.dataUserReg.email = email; }
  getDataUserEmail() { return this.dataUserReg.email; }
  setDataUserPhone(phone: string) { console.log(phone); this.dataUserReg.phone = phone; }
  getDataUserPhone() { return this.dataUserReg.phone; }

}
