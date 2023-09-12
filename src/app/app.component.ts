import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'form-tata';
  currentForm = 'form1';
  weeks = [
    {data: 'M', selected: false},
    {data: 'T', selected: false},
    {data: 'W', selected: false},
    {data: 'T', selected: false},
    {data: 'F', selected: false},
    {data: 'S', selected: false},
    {data: 'S', selected: false},
  ]
startDate: any;
ngOnInit(): void {
 
}
dateSelectorForm = new FormGroup ({

  'timeSelected': new FormControl(null),
  'weekDaySelected': new FormArray([]),
  'startDate': new FormControl(null),
  'endDate': new FormControl(null, ),
  'endDateAuto': new FormControl(false)
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
    }
  })

  console.log(this.dateSelectorForm)
  console.log(this.dateSelectorForm.get('startDate'))
  console.log(this.getWeekendDates(this.dateSelectorForm.get('startDate')?.value, this.dateSelectorForm.get('endDate')?.value))

}

createWeekFormGroup(item: any): FormGroup {
  const weekFormGroup = new FormGroup({
    data: new FormControl(item.data)
    });

  return weekFormGroup

}
getWeekendDates(startDate: any, endDate: any): Date[] {
  const weekendDates: Date[] = [];
  const currentDate = new Date(startDate);
  const endDate1 = new Date(endDate)

  while (currentDate <= endDate1) {
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      weekendDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekendDates;
}




}
