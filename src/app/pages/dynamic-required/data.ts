export const fields = [
  { label: 'Field 1', value: 'field_1' },
  { label: 'Field 2', value: 'field_2' },
  { label: 'Field 3', value: 'field_3' },
  { label: 'Field 4', value: 'field_4' },
];

export const formFieldConfigs = {
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
      message: 'Required!',
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
            message: 'Required!',
          },
        ],
      },
    },
    {
      type: 'toggle',
      label: 'Toggle 1',
      name: 'toggle1',
      size: 12,
      required: true,
      condition: {
        fieldName: 'toggle1',
        value: false,
        fields: [
          {
            type: 'input',
            label: 'Input 3',
            name: 'input3',
            inputType: 'number',
            size: 10,
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
