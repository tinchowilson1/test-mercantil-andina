import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    // HeaderModule,
    // FooterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    // FooterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
