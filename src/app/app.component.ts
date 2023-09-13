import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormsModule

} from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges { 
  title = 'form-tata';

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    
  }

}





  

  
    // console.log("dateArray", this.dateArray)



  // dropDownForm = new FormGroup({
  //   busClass: new FormControl(''),
  //   bus: new FormControl(''),
  //   driver: new FormControl(''),                  
  // })
  
  
  ;

 




  





    

    // this.dropDownForm.setValue({
    //   busClass: this.dropDownForm.get('busClass')?.value || null,
    //   bus: this.dropDownForm.get('bus')?.value || null,
    //   driver: this.dropDownForm.get('driver')?.value || null,
    // });
  

  // }
