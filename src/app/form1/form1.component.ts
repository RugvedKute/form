import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { dataSelected } from '../models/data.model';
import { ManageService } from '../manage.service';




@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component {

  constructor(private route: Router, private service: ManageService) {}


  dateSelectorForm = new FormGroup({
    timeSelected: new FormControl(null, [Validators.required]),
    weekDaySelected: new FormArray([]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    endDateAuto: new FormControl(false),
  });

  form1: boolean = true;
  datesSelected: Array<number> = [];
  dateArray: dataSelected[] = [];
  startDate: any;
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

  weekClicked(index: number) {
    this.weeks[index].selected = !this.weeks[index].selected;
  }
  

  onSumbit() {
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

    // if ((this.dateSelectorForm.get('endDateAuto')?.value) === true) {
    //   let dt = new Date();
      
    //   let endDateFunc = this.dateSelectorForm.get('startDate')?.value;

    //   console.log('entereddd', 94);

      
    //   this.getWeekendDates(
    //     this.dateSelectorForm.get('startDate')?.value,
    //     dt.setDate((endDateFunc! as any).getDate() + 90),
    //     this.datesSelected
    //   );

    //   console.log('left', 94);

    // } else {
      this.getWeekendDates(
        this.dateSelectorForm.get('startDate')?.value,
        this.dateSelectorForm.get('endDate')?.value,
        this.datesSelected
      );

    // }


    this.service.updateData(this.dateArray);

    this.route.navigate(['/form-2'])

    
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

    console.log(startDate, 'STARTDte');
    console.log(endDate, 'endDate')
    const currentDate = new Date(startDate);

    const endDate1 = new Date(endDate);

    console.log(endDate1, 'endDate1');

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

    console.log(this.dateArray)
  }

  createWeekFormGroup(item: any): FormGroup {
    const weekFormGroup = new FormGroup({
      data: new FormControl(item.data),
    });

    return weekFormGroup;
  }



}