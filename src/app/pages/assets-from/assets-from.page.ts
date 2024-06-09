import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
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
import { FormComponent } from '../../components/form/form.component';

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
  selector: 'app-assets-from',
  templateUrl: './assets-from.page.html',
  styleUrls: ['./assets-from.page.scss'],
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
    FormsModule,
    IonToggle,
    FormComponent,
  ],
})
export class AssetsFromPage implements OnInit {
  formBuilder = inject(FormBuilder);

  form: FormGroup = new FormGroup({});
  fields: FormFieldConfig[] = [];

  assets = [
    {
      name: 'Silo',
      key: 'silo',
    },
    {
      name: 'Building (administration), Building (industrial),  Preheater tower',
      key: 'building',
    },
    {
      name: 'Ladder Walkway Staircase Work platform Access platform',
      key: 'platform',
    },
    {
      name: 'Conveyor / Gantry Stacker Reclaimer',
      key: 'conveyor',
    },
    {
      name: 'Hopper',
      key: 'hopper',
    },
  ];

  fieldMapping = {
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
        name: 'building_type',
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
        label: 'Type',
        name: 'platform_type',
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
        name: 'surface_type',
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
        name: 'support_type',
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
        name: 'support_type',
        size: 12,
        required: true,
        options: ['Suspended', 'Supported by foot or other structure'],
      },
      {
        type: 'radio',
        label: 'Fixation type',
        name: 'fixation_type',
        size: 12,
        required: true,
        options: ['Bolted', 'Welded', 'Non Applicable'],
      },
      {
        type: 'toggle',
        label: 'Original wall thickness is known?',
        name: 'wall_thickness_status',
        size: 12,
        required: true,
        options: ['yes', 'no'],
        condition: {
          fieldName: 'thickness',
          value: true,
          fields: [
            {
              type: 'input',
              label: 'Original wall thickness',
              name: 'wall_thickness',
              inputType: 'number',
              size: 12,
              required: true,
            },
          ],
        },
      },
    ],
  };

  selectedField: WritableSignal<string> = signal('');

  constructor() {}

  ngOnInit() {}

  onClick(field: string) {
    console.log(field);
    this.selectedField.set(field);
  }

  onSelectChange(field: string) {
    this.selectedField.set(field);
    this.generateForm(field);
  }

  getFieldConfig(value: string): FormFieldConfig[] {
    const configs: { [key: string]: FormFieldConfig[] } = this.fieldMapping;
    return configs[value] || [];
  }

  generateForm(value: string) {
    // this.form.get('selectedField')?.valueChanges.subscribe((value) => {
    this.fields = this.getFieldConfig(value);
    this.buildForm(value);
    // });
  }

  buildForm(value: string) {
    // const group: any = {
    //   selectedField: new FormControl(this.form.get('selectedField')?.value),
    // };

    const group: any = {
      selectedField: new FormControl(value),
    };

    this.fields.forEach((field) => {
      const control = new FormControl(
        {
          value: field.type === 'toggle' ? false : '',
          disabled: field.disabled ?? false,
        },
        field.required ? Validators.required : []
      );
      group[field.name] = control;
    });

    console.log('group: ', group, this.form.valid, this.form);
    this.form = this.formBuilder.group(group);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
