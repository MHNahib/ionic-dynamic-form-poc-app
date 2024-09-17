import { Component, OnInit } from '@angular/core';

import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';

import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

interface FormFieldConfig {
  type: 'dropdown' | 'input' | 'radio' | 'toggle';
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
  selector: 'app-schema-form',
  templateUrl: './schema-form.page.html',
  styleUrls: ['./schema-form.page.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonHeader,
    IonContent,
    IonToolbar,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
  ],
})
export class SchemaFormPage implements OnInit {
  form: FormGroup = new FormGroup({});

  schema: FormFieldConfig[] = [];

  formSchema: FormFieldConfig[] = [
    {
      type: 'dropdown',
      label: 'Stored Material',
      name: 'stored_material',
      size: 12,
      required: true,
      options: [
        'Homo material',
        'Additives',
        'Clinker',
        'Cement',
        'Solid Fuels',
        'Finished products',
        'Liquid Fuels',
      ],
    },
    {
      type: 'toggle',
      label: 'Original wall thickness is known?',
      name: 'thickness',
      size: 12,
      required: true,
      condition: {
        fieldName: 'thickness',
        value: true,
        fields: [
          {
            type: 'input',
            label: 'Original wall thickness',
            name: 'wall_thickness',
            inputType: 'number',
            size: 6,
            required: true,
          },
          {
            type: 'dropdown',
            label: 'Units',
            name: 'units',
            options: ['inches', 'mm'],
            size: 6,
            required: true,
          },
        ],
      },
    },
  ];

  formFieldConfigs = {
    silo: [
      {
        type: 'dropdown',
        label: 'Stored Material',
        name: 'stored_material',
        size: 12,
        required: true,
        options: [
          'Homo material',
          'Additives',
          'Clinker',
          'Cement',
          'Solid Fuels',
          'Finished products',
          'Liquid Fuels',
        ],
      },
      {
        type: 'toggle',
        label: 'Original wall thickness is known?',
        name: 'thickness',
        size: 12,
        required: true,
        condition: {
          fieldName: 'thickness',
          value: true,
          fields: [
            {
              type: 'input',
              label: 'Original wall thickness',
              name: 'wall_thickness',
              inputType: 'number',
              size: 6,
              required: true,
            },
            {
              type: 'dropdown',
              label: 'Units',
              name: 'units',
              options: ['inches', 'mm'],
              size: 6,
              required: true,
            },
          ],
        },
      },
    ],
    building: [
      {
        type: 'dropdown',
        label: 'Building type',
        name: 'buildingType',
        size: 12,
        required: true,
        options: [
          'Industrial',
          'Administration',
          'Storage',
          'Electrical',
          'Preheater',
        ],
      },
    ],
    platform: [
      {
        type: 'dropdown',
        label: 'Platform type',
        name: 'platformType',
        size: 12,
        required: true,
        options: [
          'Access ramp',
          'Staircase',
          'Walkway',
          'Cat-ladder',
          'Working platform',
        ],
      },
      {
        type: 'dropdown',
        label: 'Location (Floor)',
        name: 'location_floor',
        size: 12,
        required: true,
        options: [
          'Ground',
          '1st Floor',
          '2nd Floor',
          '3rd Floor',
          '4th Floor',
          '5th Floor',
          '6th Floor',
          '7th Floor',
          '8th Floor',
          '9th Floor',
          '10th Floor',
        ],
      },
      {
        type: 'dropdown',
        label: 'Surface type',
        name: 'surfaceType',
        size: 12,
        required: true,
        options: ['Grating', 'Checker plate', 'Concrete', 'Composite'],
      },
      {
        type: 'toggle',
        label: 'Inspection colour coded or tagged?',
        name: 'color_tagged',
        size: 12,
        required: true,
      },
    ],
    conveyor: [
      {
        type: 'dropdown',
        label: 'Type of support',
        name: 'supportType',
        size: 12,
        required: true,
        options: ['Colums / legs', 'Suspended', 'Cantilever', 'encastred'],
      },
      {
        type: 'dropdown',
        label: 'Sliding or bearing  joints/supports are located and accesible?',
        name: 'sliding_or_bearing',
        size: 12,
        required: true,
        options: ['Yes', 'No', 'Non Applicable'],
      },
      {
        type: 'dropdown',
        label: 'Fixed or Mobile structure?',
        name: 'structure_type',
        size: 12,
        required: true,
        options: ['Fixed', 'Mobile'],
      },
    ],
    hopper: [
      {
        type: 'dropdown',
        label: 'Type of support',
        name: 'supportType',
        size: 12,
        required: true,
        options: ['Suspended', 'Supported by foot or other structure'],
      },
      {
        type: 'radio',
        label: 'Fixation type',
        name: 'fixationType',
        size: 12,
        required: true,
        options: ['Bolted', 'Welded', 'Non Applicable'],
      },
      {
        type: 'toggle',
        label: 'Original wall thickness is known?',
        name: 'wallThicknessStatus',
        size: 12,
        required: true,
        options: ['yes', 'no'],
        condition: {
          fieldName: 'wallThicknessStatus',
          value: true,
          fields: [
            {
              type: 'input',
              label: 'Original wall thickness',
              name: 'wallThickness',
              inputType: 'number',
              size: 12,
              required: true,
            },
          ],
        },
      },
    ],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // this.buildForm(this.formSchema);
    this.getRandomConfig();
  }

  buildForm(schema: FormFieldConfig[]) {
    console.log(schema);
    let group: Record<string, FormControl> = {};

    schema.forEach((field) => {
      const control = new FormControl(
        { value: '', disabled: field.disabled ?? false },
        field.required ? Validators.required : []
      );
      group[field.name] = control;
    });
    this.form = new FormGroup({});

    this.form = this.formBuilder.group(group);
    console.log('this.form.controls: ', this.form.controls);
    console.log('this.form.value: ', this.form.value);
  }

  handleChange(
    event: MatRadioChange | MatSelectChange | MatCheckboxChange | MatInput,
    field: FormFieldConfig,
    index: number
  ) {
    let conditionalValue = false;
    if (typeof field.condition?.value === 'boolean') {
      conditionalValue =
        field.condition.value === (event as MatCheckboxChange).checked;
    } else {
      conditionalValue =
        field.condition?.value?.toLowerCase() ===
        (event as MatSelectChange | MatInput).value?.toLowerCase();
    }

    const condFields = field.condition?.fields ?? [];

    const controls = this.form.controls;
    const formValues = this.form.value;

    if (conditionalValue) {
      condFields.forEach((condField) => {
        if (!controls[condField.name]) {
          const control = new FormControl(
            { value: '', disabled: condField.disabled ?? false },
            condField.required ? Validators.required : []
          );
          this.form.addControl(condField.name, control);
        }
      });
    } else {
      condFields
        .filter((condField) => controls[condField.name])
        .forEach((condField) => {
          this.form.removeControl(condField.name);
          delete formValues[condField.name];
        });
    }

    console.log('form grp: ', this.form.valid, this.form.value);
  }

  onToggleChange(event: MatSlideToggleChange, field: FormFieldConfig) {
    const { name, condition } = field;
    const condFields = condition?.fields ?? [];

    const controls = this.form.controls;
    const formValues = this.form.value;

    if (event.checked) {
      condFields.forEach((condField) => {
        if (!controls[condField.name]) {
          const control = new FormControl(
            { value: '', disabled: condField.disabled ?? false },
            condField.required ? Validators.required : []
          );
          this.form.addControl(condField.name, control);
        }
      });
    } else {
      condFields
        .filter((condField) => controls[condField.name])
        .forEach((condField) => {
          this.form.removeControl(condField.name);
          delete formValues[condField.name];
        });
    }

    console.log('form grp: ', this.form.valid, this.form.value);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  getRandomConfig() {
    const keys = Object.keys(this.formFieldConfigs);

    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];

    const config = Object.values(this.formFieldConfigs)[randomIndex];
    this.formSchema = config as FormFieldConfig[];

    this.buildForm(config as FormFieldConfig[]);
  }
}
