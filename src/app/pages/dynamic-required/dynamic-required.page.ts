import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';

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
  ],
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

    // this.form.get('selectedField')?.valueChanges.subscribe((value) => {
    //   this.fields = this.getFieldConfig(value);
    //   this.buildForm();
    // });
    this.generateForm();
  }

  getFormConfig() {
    return [
      { label: 'Field 1', value: 'field_1', children: [] },
      { label: 'Field 2', value: 'field_2' },
      { label: 'Field 3', value: 'field_3' },
      { label: 'Field 4', value: 'field_4' },
    ];
  }

  getFieldConfig(value: string): FormFieldConfig[] {
    const configs: { [key: string]: FormFieldConfig[] } = {
      field_1: [
        {
          type: 'input',
          label: 'Input 1',
          name: 'input1',
          size: 6,
          required: false,
        },
        {
          type: 'dropdown',
          label: 'Dropdown 1',
          name: 'dropdown1',
          options: ['Option 1', 'Option 2'],
          size: 6,
          required: true,
          message: 'Option select kor',
          condition: {
            fieldName: 'dropdown1',
            value: 'Option 1',
            fields: [
              {
                type: 'input',
                label: 'Conditional Input',
                name: 'conditionalInput',
                size: 6,
                required: true,
              },
            ],
          },
        },
      ],
      field_2: [
        {
          type: 'radio',
          label: 'Radio 1',
          name: 'radio1',
          options: ['Radio 1', 'Radio 2'],
          size: 5,
          condition: {
            fieldName: 'radio1',
            value: 'Radio 2',
            fields: [
              {
                type: 'input',
                label: 'Conditional Input 2',
                name: 'conditionalInput2',
                size: 12,
                required: true,
                message: 'lakh kisu',
              },
            ],
          },
        },
        {
          type: 'input',
          label: 'Input 2',
          name: 'input2',
          inputType: 'number',
          size: 10,
          disabled: true,
        },
      ],
    };
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

      // if (field.condition) {
      //   field.condition.fields.forEach((condField) => {
      //     const condControl = new FormControl(
      //       { value: '', disabled: condField.disabled ?? false },
      //       condField.required ? Validators.required : []
      //     );
      //     group[condField.name] = condControl;
      //   });
      // }
    });

    console.log('group: ', group, this.form.valid);
    this.form = this.fb.group(group);
  }

  // updateConditionalFields(field: FormFieldConfig, selectedValue: any) {
  //   const group = { ...this.form.value };
  //   if (selectedValue === field.condition?.value) {
  //     field.condition?.fields.forEach((condField) => {
  //       const condControl = new FormControl(
  //         { value: '', disabled: condField.disabled ?? false },
  //         condField.required ? Validators.required : []
  //       );
  //       group[condField.name] = condControl;
  //     });
  //   } else {
  //     field.condition?.fields.forEach((condField) => {
  //       delete group[condField.name];
  //     });
  //   }
  //   this.form = this.fb.group(group);
  // }

  onSubmit() {
    console.log(this.form.value);
  }

  handleChange(event: any, field: FormFieldConfig, index: number) {
    // console.log('form grp: ', this.form.valid);
    // console.log('index: ', index, field);
    const group: any = {};

    if (
      field.condition &&
      field.condition.value?.toLowerCase() ===
        event?.detail?.value?.toLowerCase()
    ) {
      field.condition.fields.forEach((condField) => {
        const condControl = new FormControl(
          { value: '', disabled: condField.disabled ?? false },
          condField.required ? Validators.required : []
        );
        group[condField.name] = condControl;
        this.form.addControl(condField.name, condControl);
      });
    } else {
      field?.condition?.fields.forEach((condField) => {
        if (this.form.contains(condField.name))
          this.form.removeControl(condField.name);
      });
    }

    // console.log('form grp: ', this.form.valid, this.form.value);
  }
}
