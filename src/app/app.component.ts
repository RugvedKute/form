import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RouterTestingHarness } from '@angular/router/testing';

interface dataSelected {
  'date': any,
  'day': string,
  'busClass': string,
  'bus': string,
  'driver': string,
  'selected': boolean

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'form-tata';
  form1: boolean = true;
  // busClass: any;
  // bus: any;
  // driver:any;
  datesSelected: Array<number> = [];
  dateArray: dataSelected[] = [];
  dateArray1: dataSelected[] = [

    {
      date: '17/03/2023',
      'day': 'Monday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false

    },
    {
      date: '19/03/2023',
      'day': 'Tuesday',
      busClass: '',
      bus: '',
      driver: '',
      selected: false

    }
  ]

  weeks = [
    { data: 'M', selected: false, day: 1 },
    { data: 'T', selected: false, day: 2 },
    { data: 'W', selected: false, day: 3 },
    { data: 'T', selected: false, day: 4 },
    { data: 'F', selected: false, day: 5 },
    { data: 'S', selected: false, day: 6 },
    { data: 'S', selected: false, day: 0 },
  ]
  startDate: any;
  ngOnInit(): void {
    this.form1 = false;




  }


  dropDownForm = new FormGroup({

    // 'dates': new FormArray([zzz])
    'busClass': new FormControl(''),
    'bus': new FormControl(''),
    'driver': new FormControl('')

  })


  dateSelectorForm = new FormGroup({

    'timeSelected': new FormControl(null, [Validators.required]),
    'weekDaySelected': new FormArray([]),
    'startDate': new FormControl(null, [Validators.required]),
    'endDate': new FormControl(null, [Validators.required]),
    'endDateAuto': new FormControl(false),

  })



  weekClicked(index: number) {
    this.weeks[index].selected = !this.weeks[index].selected;

  }

  onSumbit() {

    const weekDaySelectedArray = this.dateSelectorForm.get('weekDaySelected') as FormArray;

    this.weeks.forEach((item) => {
      if (item.selected === true) {

        const selectedWeekFormGroup = this.createWeekFormGroup(item);
        weekDaySelectedArray.push(selectedWeekFormGroup);
        this.datesSelected.push(item.day)

      }
    })


    this.form1 = false



    console.log(this.datesSelected)


    this.getWeekendDates(this.dateSelectorForm.get('startDate')?.value, this.dateSelectorForm.get('endDate')?.value, this.datesSelected);
    console.log(this.dateArray);




  }

  createWeekFormGroup(item: any): FormGroup {
    const weekFormGroup = new FormGroup({
      data: new FormControl(item.data)
    });

    return weekFormGroup

  }
  getWeekendDates(startDate: any, endDate: any, dates: any) {


    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDate = new Date(startDate);
    const endDate1 = new Date(endDate)

    while (currentDate <= endDate1) {
      if (dates.includes(currentDate.getDay())) {

        const data = new Date(currentDate)

        const dateObj: dataSelected = {
          date: data.toLocaleDateString(),
          'day': day[data.getDay()],
          busClass: '',
          bus: '',
          driver: '',
          selected: false,
        }



        this.dateArray
        this.dateArray.push(dateObj);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

  }

  selectedRow(index: number) {
    // this.dateArray[index].selected = !this.dateArray[index].selected

    this.dateArray1[index].selected = !this.dateArray1[index].selected

    console.log(index)

  }


  onSubmit() {
    console.log(this.dropDownForm.value);


    this.dateArray1.forEach((item) => {
      item.busClass = this.dropDownForm.get('busClass')?.value!;
      item.bus = this.dropDownForm.get('bus')?.value!;
      item.driver = this.dropDownForm.get('driver')?.value!;

    })

    console.log(this.dropDownForm.get('busClass')?.value)
    this.dropDownForm.setValue({ busClass: 'abc', bus: '' , driver: ''})

}



}
