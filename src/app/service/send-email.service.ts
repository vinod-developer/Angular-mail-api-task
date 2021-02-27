import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Email } from '../send-email/send-email.component';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private http : HttpClient) { }
 
  sendEmailBackend(email){
       return this.http.post('http://localhost:8080/sendemail',email);
  }

  getEmailFromBackend(){
    return this.http.get<Email[]>('http://localhost:8080/getEmail');
}
}


 

