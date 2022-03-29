export interface CreateConsignmentFormProps {
    isActiveModal: boolean;
    handleClose: () => void;
    handleSubmit: any;
    newGoods: any;
    handleFieldAdd: any;
    handleFieldChange: any;
}

export type Driver = {
    id: number;
    first_name: string;
    second_name: string;
    middle_name: string;
    email: string;
    birthday: any;
    login: string;
    passport: string;
}

export type Truck = {
    id: number;
    truck_number: string;
    fuel_consumption: number;
}

export type Item = {
    id: number;
    good_name: string;
    quantity: number;
    unit_of_measurement: string;
    bundle_seria: string;
    bundle_number: string;
}