import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonItem,
  IonList,
  IonTitle,
  IonHeader,
  IonSelect,
  IonToolbar,
  IonContent,
  IonSelectOption,
  IonLabel,
  IonInput,
  IonRadioGroup,
  IonButton,
  IonRadio,
  IonText,
  IonRow,
  IonCol,
  IonToggle,
} from '@ionic/angular/standalone';

import { fields, formFieldConfigs } from './data';

interface FormFieldConfig {
  type: string;
  label: string;
  name: string;
  inputType?: string;
  options?: string[];
  size?: number | string;
  required?: boolean;
  disabled?: boolean;
  message?: string;
  condition?: {
    fieldName: string;
    value: any;
    fields: FormFieldConfig[];
  };
}

@Component({
  selector: 'app-dynamic-required',
  templateUrl: './dynamic-required.page.html',
  styleUrls: ['./dynamic-required.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonText,
    IonRadio,
    IonButton,
    IonRadioGroup,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonTitle,
    IonHeader,
    IonSelect,
    IonToolbar,
    IonContent,
    IonSelectOption,
    ReactiveFormsModule,
    CommonModule,
    IonToggle,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicRequiredPage implements OnInit {
  form: FormGroup = new FormGroup({});
  formConfig = this.getFormConfig();
  fields: FormFieldConfig[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      selectedField: [''],
    });

    this.generateForm();
  }

  getFormConfig() {
    return fields;
  }

  getFieldConfig(value: string): FormFieldConfig[] {
    const configs: { [key: string]: FormFieldConfig[] } = formFieldConfigs;
    return configs[value] || [];
  }

  onSelectChange() {
    this.generateForm();
  }

  generateForm() {
    this.form.get('selectedField')?.valueChanges.subscribe((value) => {
      this.fields = this.getFieldConfig(value);
      this.buildForm();
    });
  }

  buildForm() {
    const group: any = {
      selectedField: new FormControl(this.form.get('selectedField')?.value),
    };

    this.fields.forEach((field) => {
      const control = new FormControl(
        { value: '', disabled: field.disabled ?? false },
        field.required ? Validators.required : []
      );
      group[field.name] = control;
    });
    this.form = new FormGroup({});

    this.form = this.fb.group(group);
    console.log('this.form.controls: ', this.form.controls);
    console.log('this.form.value: ', this.form.value);
  }

  handleChange(event: any, field: FormFieldConfig, index: number) {
    // console.log('form grp: ', this.form.valid);
    // console.log('index: ', index, field);
    const group: any = {};

    let conditionalValue = false;
    if (typeof field.condition?.value === 'boolean') {
      conditionalValue = field.condition.value === event?.detail?.checked;
    } else {
      conditionalValue =
        field.condition?.value?.toLowerCase() ===
        event?.detail?.value?.toLowerCase();
    }

    if (field.condition && conditionalValue) {
      field.condition.fields.forEach((condField) => {
        const condControl = new FormControl(
          { value: '', disabled: condField.disabled ?? false },
          condField.required ? Validators.required : []
        );
        group[condField.name] = condControl;
        this.form.addControl(condField.name, condControl);
      });
    } else {
      field.condition &&
        field?.condition?.fields.forEach((condField) => {
          if (this.form.contains(condField.name)) {
            this.form.removeControl(condField.name);
          }
        });
    }

    // console.log('form grp: ', this.form.valid, this.form.value);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
