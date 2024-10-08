import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
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
} from '@ionic/angular/standalone';

interface FieldModel {
  label: string;
  value: string;
}

interface FormFieldConfig {
  type: string;
  label: string;
  name: string;
  inputType?: string;
  options?: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
  ],
})
export class HomePage {
  private formBuilder = inject(FormBuilder);

  form!: FormGroup;
  formConfig = this.getFormConfig();
  fields: FormFieldConfig[] = [];

  constructor() {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      selectedField: [''],
    });

    // this.form.get('selectedField')?.valueChanges.subscribe((value) => {
    //   this.fields = this.getFieldConfig(value);
    //   this.buildForm();
    // });
    this.generateForm();
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

  getFormConfig() {
    return [
      { label: 'Field 1', value: 'field_1' },
      { label: 'Field 2', value: 'field_2' },
      { label: 'Field 3', value: 'field_3' },
      { label: 'Field 4', value: 'field_4' },
    ];
  }

  getFieldConfig(value: string): FormFieldConfig[] {
    const configs: { [key: string]: FormFieldConfig[] } = {
      field_1: [
        { type: 'input', label: 'Input 1', name: 'input1' },
        {
          type: 'dropdown',
          label: 'Dropdown 1',
          name: 'dropdown1',
          options: ['Option 1', 'Option 2'],
        },
      ],
      field_2: [
        {
          type: 'radio',
          label: 'Radio 1',
          name: 'radio1',
          options: ['Radio 1', 'Radio 2'],
        },
        {
          type: 'input',
          label: 'Input 2',
          name: 'input2',
          inputType: 'number',
        },
      ],
    };
    return configs[value] || [];
  }

  buildForm() {
    const group: any = {
      selectedField: this.form.get('selectedField')?.value,
    };
    this.fields.forEach((field) => {
      group[field.name] = new FormControl('');
    });
    this.form = this.formBuilder.group(group);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
