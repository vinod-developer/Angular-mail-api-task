import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { SendEmailService } from '../service/send-email.service';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class Email{
 
  constructor(
    public subject : string,
    public  fromEmail : string,
    public emailBody: string,
    public companyName : string,
    public fromName : string,
    public sendTo : string
  ){
    //this.email = new Email('','','','','') 
    // this.subject = '',
    // this.fromEmail ='', 
    // this.emailBody ='',
    // this.companyName ='',
    // this.sendTo =''

  }
}

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  closeResult: string = "";
  
  

 

  constructor(private sendEmailService: SendEmailService,
    private modalService: NgbModal) { }
 
   email : Email = new Email('','','','','','') 
   emails : Email[]=[];
  ngOnInit() {
   
     this.email = new Email('','','','','','') 
    
     this.sendEmailService.getEmailFromBackend().subscribe (
      data =>{this.emails= data
      console.log(this.emails);
      }
    )
    
  }
 
  sendEmail(){
      this.sendEmailService.sendEmailBackend(this.email).subscribe(
        data => {
          console.log(data);
        }
      )
  }
  websiteList: any = ['Java', 'Python']
  
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });

  changeWebsite(e) {
    console.log(e.target.value);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

 
  
}
  
  
  
  


