import { v4 as uuidv4 } from 'uuid';

export const consignmentFields = [
  {
    id: uuidv4(),
    title: 'Bundle seria',
    model: 'bundle_seria',
    required: true,
    placeholder: 'Bundle seria',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Bundle number',
    model: 'bundle_number',
    placeholder: 'Bundle number',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Consignment seria',
    model: 'consignment_seria',
    placeholder: 'Consignment seria',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Consignment number',
    model: 'consignment_number',
    placeholder: 'Consignment number',
    required: true,
    type: 'text',
  },
];

export const consignmentAddFields = [
  {
    id: uuidv4(),
    title: 'Product name',
    model: 'good_name',
    placeholder: 'Product name',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Measurement unit',
    model: 'unit_of_measurement',
    placeholder: 'Measurement unit',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Quantity',
    model: 'quantity',
    placeholder: 'Quantity of goods',
    required: true,
    type: 'number',
  },
];
