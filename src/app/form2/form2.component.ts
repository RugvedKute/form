import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ManageService } from '../manage.service';
import { dataSelected } from '../models/data.model';



@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css'],
})
export class Form2Component implements OnInit {
  constructor(private route: ActivatedRoute, private service: ManageService,private routeNav: Router) {}

  // dateArray: dataSelected[] = [];
    dateArray: dataSelected[] = [
    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
    {
      date: '19/03/2023',
      day: 'Tuesday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },

    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },   {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },   {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },   {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
    {
      date: '17/03/2023',
      day: 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false,
    },
  ];


  dropDownForm: any;
  allValuesChecked: boolean = false;

  // activatedRoute: any;
  ngOnInit(): void {
    // this.dateArray = this.service.getData();


    this.dropDownForm = new FormArray(
      this.dateArray.map((x: any) => {
        console.log(x);
        return this.createGroup({
          date: x.date,
          day: x.day,
          busClass: x.busClass,
          bus: x.bus,
          driver: x.driver,
          selected: x.driver,
        });
      })
    );

    console.log(this.dropDownForm.controls);


    
      this.dropDownForm.controls.forEach((control: FormGroup) => {
    
        control.get('busClass')?.valueChanges.subscribe(() => {
          const checkbox = document.getElementById(
            'auto-fill-values',
          ) as HTMLInputElement;

          if (this.allValuesChecked === true) {
            checkbox.checked = false;
            this.allValuesChecked = false;
          }

       
    
        })

        control.get('bus')?.valueChanges.subscribe(value => {
          const checkbox = document.getElementById(
            'auto-fill-values',
          ) as HTMLInputElement;

          if (this.allValuesChecked === true) {
            checkbox.checked = false;
            this.allValuesChecked = false;
          }
          // this.allValuesChecked = false;
        })
    
        control.get('driver')?.valueChanges.subscribe(value => {
          const checkbox = document.getElementById(
            'auto-fill-values',
          ) as HTMLInputElement;

          if (this.allValuesChecked === true ) {
            checkbox.checked = false;
            this.allValuesChecked = false;
          }
          // this.allValuesChecked = false;
          console.log("this.allValuesChecked",this.allValuesChecked);
          
        })
      })

    
  }

  createGroup(data: any): FormGroup {
    data = data || {
      busClass: null,
      bus: null,
      driver: null,
      date: null,
      day: null,
    };
    return new FormGroup({
      date: new FormControl(data.date),
      day: new FormControl(data.day),
      busClass: new FormControl(data.busClass, [Validators.required]),
      bus: new FormControl(data.bus, [Validators.required]),
      driver: new FormControl(data.driver, [Validators.required]),
      selected: new FormControl(false),
    });
  }

  selectedRow(index: number) {
    this.dropDownForm.at(index).patchValue({
      selected: !this.dropDownForm.controls[index].value.selected,
    });

    console.log(this.dropDownForm.controls[index].value.selected);
  }

  onSubmit() {

    let isFormValid = true;

    this.dropDownForm.controls.forEach((control: FormGroup, index: number) => {

      if (control.status === 'INVALID') {
        isFormValid = false
        throw alert('All values are not selcted!')
        

      } 
    })
   
    if (isFormValid === true) {
      console.log()
      throw alert('The form has been sucessfully submittted')
    }


  }

  checkboxChanged(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.allValuesChecked = checkbox.checked;
    console.log(this.allValuesChecked, '---234---')
    if (this.allValuesChecked) {
      this.dropDownForm.controls.forEach(
        (control: FormGroup, index: number) => {
          console.log(index);
          if (index > 0) {
            control.patchValue({
              busClass: this.dropDownForm.controls[0].get('busClass').value,
              bus: this.dropDownForm.controls[0].get('bus').value,
              driver: this.dropDownForm.controls[0].get('driver').value,
            });
          }
        }
      );
      checkbox.checked = false;
    } else {
        this.dropDownForm.controls.forEach((control: FormGroup, index: number) => {

          if(index > 0) {
            control.patchValue({
              busClass: '',
              bus: '',
              driver: '',
            });

          }

        })

       
      }
    }

    navigateToRoute() {
      this.routeNav.navigate([''])
  
    }

  }

