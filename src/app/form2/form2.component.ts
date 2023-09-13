import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManageService } from '../manage.service';

interface dataSelected {
  date: any;
  day: string;
  busClass: string;
  bus: string;
  driver: string;
  selected: boolean;
}

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css'],
})
export class Form2Component implements OnInit {
  constructor(private route: ActivatedRoute, private service: ManageService) {}

  dateArray: dataSelected[] = []
  // dateArray: dataSelected[] = [
  //   {
  //     date: '17/03/2023',
  //     day: 'Monday',
  //     busClass: '',
  //     bus: '',
  //     driver: '',
  //     selected: false,
  //   },
  //   {
  //     date: '19/03/2023',
  //     day: 'Tuesday',
  //     busClass: '',
  //     bus: '',
  //     driver: '',
  //     selected: false,
  //   },
  // ];

  dropDownForm: any;
  allValuesChecked: boolean = false;

  // activatedRoute: any;
  ngOnInit(): void {
    this.dateArray = this.service.getData();


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
          // this.allValuesChecked = false;
          const checkbox = document.getElementById(
            'auto-fill-values',
          ) as HTMLInputElement;

          if (this.allValuesChecked === true) {
            checkbox.checked = false;
          }
    
        })

        control.get('bus')?.valueChanges.subscribe(value => {
          const checkbox = document.getElementById(
            'auto-fill-values',
          ) as HTMLInputElement;

          if (this.allValuesChecked === true) {
            checkbox.checked = false;
          }
          // this.allValuesChecked = false;
        })
    
        control.get('driver')?.valueChanges.subscribe(value => {
          const checkbox = document.getElementById(
            'auto-fill-values',
          ) as HTMLInputElement;

          if (this.allValuesChecked === true ) {
            checkbox.checked = false;
          }
          // this.allValuesChecked = false;
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
      busClass: new FormControl(data.busClass),
      bus: new FormControl(data.bus),
      driver: new FormControl(data.driver),
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
    console.log(this.dropDownForm.get('1.busClass'));
    this.dateArray.forEach((item: any) => {
      item.busClass = this.dropDownForm.get('busClass.first')?.value!;
      item.bus = this.dropDownForm.get('bus.first')?.value!;
      item.driver = this.dropDownForm.get('driver.first')?.value!;
    });

    console.log(this.dateArray);
  }

  checkboxChanged(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.allValuesChecked = checkbox.checked;
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
    }

    // } else {
    //   this.allValuesChecked = false;

    // }
  }
}
