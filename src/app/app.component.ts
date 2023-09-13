import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormsModule

} from '@angular/forms';

interface dataSelected {
  date: any;
  day: string;
  busClass: string;
  bus: string;
  driver: string;
  selected: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-tata';
  form1: boolean = true;
  datesSelected: Array<number> = [];
  dateArray: dataSelected[] = [];
  selectedValues: any = {
    busClass: '',
    bus: '',
    driver: '',
  };
  dateArray1: dataSelected[] = [
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
  ];




  weeks = [
    { data: 'M', selected: false, day: 1 },
    { data: 'T', selected: false, day: 2 },
    { data: 'W', selected: false, day: 3 },
    { data: 'T', selected: false, day: 4 },
    { data: 'F', selected: false, day: 5 },
    { data: 'S', selected: false, day: 6 },
    { data: 'S', selected: false, day: 0 },
  ];
  startDate: any;
  ngOnInit(): void {
    // this.dropDownForm.valueChanges.subscribe((item) =>
    //   console.log('1111111111111111111', item)
    // );
    

    this.form1 = false;
  }

  allValuesChecked: boolean = false;

  dropDownForm = new FormGroup({
    busClass: new FormControl(''),
    bus: new FormControl(''),
    driver: new FormControl(''),
    allValuesChecked: new FormControl(false)
  });

  dateSelectorForm = new FormGroup({
    timeSelected: new FormControl(null, [Validators.required]),
    weekDaySelected: new FormArray([]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    endDateAuto: new FormControl(false),
  });

  weekClicked(index: number) {
    this.weeks[index].selected = !this.weeks[index].selected;
  }

  onSumbit1() {
    const weekDaySelectedArray = this.dateSelectorForm.get(
      'weekDaySelected'
    ) as FormArray;

    this.weeks.forEach((item) => {
      if (item.selected === true) {
        const selectedWeekFormGroup = this.createWeekFormGroup(item);
        weekDaySelectedArray.push(selectedWeekFormGroup);
        this.datesSelected.push(item.day);
      }
    });

    this.form1 = false;

    console.log(this.datesSelected);

    this.getWeekendDates(
      this.dateSelectorForm.get('startDate')?.value,
      this.dateSelectorForm.get('endDate')?.value,
      this.datesSelected
    );
    console.log(this.dateArray);
  }

  createWeekFormGroup(item: any): FormGroup {
    const weekFormGroup = new FormGroup({
      data: new FormControl(item.data),
    });

    return weekFormGroup;
  }
  getWeekendDates(startDate: any, endDate: any, dates: any) {
    const day = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date(startDate);
    const endDate1 = new Date(endDate);

    while (currentDate <= endDate1) {
      if (dates.includes(currentDate.getDay())) {
        const data = new Date(currentDate);

        const dateObj: dataSelected = {
          date: data.toLocaleDateString(),
          day: day[data.getDay()],
          busClass: '',
          bus: '',
          driver: '',
          selected: false,
        };

        this.dateArray;
        this.dateArray.push(dateObj);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  selectedRow(index: number) {
    // this.dateArray[index].selected = !this.dateArray[index].selected

    this.dateArray1[index].selected = !this.dateArray1[index].selected;

    console.log(index);
  }

  onSubmit() {
  

   
    console.log(this.dateArray1);

    this.dateArray1.forEach((item) => {
      item.busClass = this.dropDownForm.get('busClass')?.value!;
      item.bus = this.dropDownForm.get('bus')?.value!;
      item.driver = this.dropDownForm.get('driver')?.value!;
    });

    console.log(this.dropDownForm.get('bus'));

   
  }

  checkboxChanged(event: Event) {

    // this.selectedValues.busClass = this.dropDownForm.get('busClass')?.value;
    // this.selectedValues.bus = this.dropDownForm.get('bus')?.value;
    // this.selectedValues.driver = this.dropDownForm.get('driver')?.value;


  
      const checkbox = event.target as HTMLInputElement;
      this.allValuesChecked = checkbox.checked
    
      if (this.allValuesChecked) {
        const selectedValues = {
          busClass: this.dropDownForm.get('busClass')?.value,
          bus: this.dropDownForm.get('bus')?.value,
          driver: this.dropDownForm.get('driver')?.value
        };
    
        this.dropDownForm.patchValue(selectedValues);
      } else {
        this.allValuesChecked = false
      }
    }
    

    // this.dropDownForm.setValue({
    //   busClass: this.dropDownForm.get('busClass')?.value || null,
    //   bus: this.dropDownForm.get('bus')?.value || null,
    //   driver: this.dropDownForm.get('driver')?.value || null,
    // });
  

  }
