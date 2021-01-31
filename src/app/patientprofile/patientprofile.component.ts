import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  public fileName:any;
  public formDetails: any;
  public medicalHistory: any [] = ['Diabetes', 'Hypertension', 'Heart disease', 'Asthma', 'High Cholesterol', 'Thyroid', 'Cancer', 'Jaundice'];

  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        age: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
        gender: ['', Validators.required],
        file: ['',''],
        phone_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        weight: ['', [ Validators.pattern('^[0-9]*')]],
        medicalHistory: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      var data = this.form.value;
      data.fileUrl = this.fileName;
      this.formDetails = data;
  }

  onChange(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    if(target.files.length === 0){
      return;
    }
    const files: FileList = target.files;
    const file = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.fileName = reader.result; 
    } 
  }


}
