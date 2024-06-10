import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
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
import { FormServiceService } from 'src/app/services/form-service.service';

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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
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
export class FormComponent implements OnInit {
  formServiceService = inject(FormServiceService);

  // constructor() {}

  ngOnInit(): void {
    // this.buildForm();
    // console.log('comp form: ', this.form);
    // console.log('comp fields: ', this.fields);
    // this.buildForm();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('changes', changes);
  // }

  // handleChange(event: any, field: FormFieldConfig, index: number) {
  //   console.log('form grp: ', this.form);
  //   console.log('index: ', index, field);
  //   const group: any = {};

  //   let conditionalValue = false;
  //   if (typeof field.condition?.value === 'boolean') {
  //     conditionalValue = field.condition.value === event?.detail?.checked;
  //   } else {
  //     conditionalValue =
  //       field.condition?.value?.toLowerCase() ===
  //       event?.detail?.value?.toLowerCase();
  //   }

  //   if (field.condition && conditionalValue) {
  //     field.condition.fields.forEach((condField) => {
  //       const condControl = new FormControl(
  //         { value: '', disabled: condField.disabled ?? false },
  //         condField.required ? Validators.required : []
  //       );
  //       group[condField.name] = condControl;
  //       this.form.addControl(condField.name, condControl);
  //     });
  //   } else {
  //     field.condition &&
  //       field?.condition?.fields.forEach((condField) => {
  //         if (this.form.contains(condField.name)) {
  //           this.form.removeControl(condField.name);
  //         }
  //       });
  //   }

  //   console.log('form grp: ', this.form.valid, this.form.value);
  // }

  // buildForm() {
  //   this.fields.forEach((field) => {
  //     const control = new FormControl(
  //       {
  //         value: field.type === 'toggle' ? false : '',
  //         disabled: field.disabled ?? false,
  //       },
  //       field.required ? Validators.required : []
  //     );
  //     this.form.addControl(field.name, control);
  //   });

  //   console.log('comp form name: ', this.form);
  // }
}
