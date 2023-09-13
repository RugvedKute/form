import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form2Component } from './form2/form2.component';
import { Form1Component } from './form1/form1.component';

const routes: Routes = [
    {path: '', component: Form1Component},
    {path: 'form-2', component: Form2Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
