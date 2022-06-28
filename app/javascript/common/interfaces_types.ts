import * as React from 'react';
import { AlertColor } from '@mui/material';
import { Order, UserData } from '../mixins/initialValues/userList';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import { userFormValues } from '../initialValues/userInitialValues';

/* eslint-disable no-unused-vars */

// TYPES
export type User = {
    id: number;
    first_name: string;
    middle_name: string;
    second_name: string;
    email: string;
    login: string;
    password: string;
    password_confirmation: string;
    birthday: string;
    address: { town: string, street: string, building: number, apartment: number, }
    role: { role_name: string },
    passport: string,
    company: string,
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
    status: string;
    unit_of_measurement: string;
    bundle_seria: string;
    bundle_number: string;
}

export type Company = {
    id: number;
    name: string;
    is_suspended: boolean;
}

export type Role = {
    id: number;
    role_name: string;
}

export type Alert = {
    alertType: AlertColor;
    alertText: string;
    open: boolean;
}

export type NewGoods = {
    id: string;
    good_name: string;
    quantity: number;
    unit_of_measurement: string;
}

export type Checkpoint = {
    id: number;
    city: string, city_name: string;
    is_passed: boolean;
    pass_date: Date;
}

export type GoodsOwners = {
    goods_owner_name: string;
}

export type CreateWaybillData = {
    truckNumber: string;
    driverFio: string;
}

export type Waybill = {
    id: number;
    status: string;
    waybill_seria: string;
    waybill_number: number;
    startpoint: { town: string, street: string, building: string };
    endpoint: { town: string, street: string, building: string };
}

export type Consignment = {
    id: number;
    status: string;
    bundle_seria: string;
    bundle_number: number;
    consignment_seria: string;
    consignment_number: string;
    dispatcher: string;
    manager: string;
    driver: string;
    truck: string;
    waybill: string;
    goods: Item[];
}

export type WriteOffAct = {
    id: number;
    good_name: string;
    description: string;
    lost_quantity: number;
    consignment: Consignment;
}

export type Warehouse = {
    id: number;
    warehouse_name: string;
    trusted: boolean;
    warehouseman: User;
}

export declare type AlignType = 'left' | 'center' | 'right';

export type UserLogs = {
    id: string;
    username: string;
    company: string;
    date: string;
    action: string;
    changes: {};
    type: string;
}

export type StatisticsTableType = {
    userLogs: UserLogs[];
    statisticsCount: number;
    setUserLogs: (userLog) => void;
};

export type StatAccordion = {
    item: UserLogs;
};

// INTERFACES
export interface CreateConsignmentFormProps {
    isActiveModal: boolean;
    newGoods: NewGoods[];
    formErrors: string[];
    trucks: Truck[];
    drivers: User[];
    handleClose: () => void;
    handleSubmit: (consignment: consignmentFormValues) => void;
    handleFieldAdd: () => void;
    handleFieldChange: (e: NewGoods, index: number) => void;
    handelDeleteGoods: (id: string) => void;
}

export interface WriteOffActTableProps {
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (actCount: number) => void;
    setWriteOffActs: (acts: WriteOffAct[]) => void;
    writeOffActsCount: number;
    setWriteOffActsCount: (actsCount: number) => void;
    writeOffActs: WriteOffAct[];
}

export interface CreateWriteOffActFormProps {
    isActiveModal: boolean;
    formErrors: string[];
    consignments: Consignment[];
    handleClose: () => void;
    handleSubmit: (writeOffAct) => void;
    setAlertData: (alert: Alert) => void;
}

export interface CreateWaybillsFormProps {
    id: number;
    formWaybillErrors: object;
    isActiveWayBill: boolean;
    createWaybillData: CreateWaybillData;
    consignments: Consignment[];
    warehouses: Warehouse[];
    goodsOwners: GoodsOwners[];
    setWayBillActive: (waybillActive: boolean) => void;
    handleClose: () => void;
    setAlertData: (alert: Alert) => void;
    setConsignment: (consignment: Consignment[]) => void;
}

export interface WarehouseTableProps {
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowCount: number) => void;
    setWarehousesCount: (warhCount: number) => void;
    warehousesCount: number;
    warehouses: Warehouse[];
    currentUserRole: string;
    setWarehouses: (warehouses: Warehouse[]) => void;
    setAlertData: (alert: Alert) => void;
}

export interface CreateWarehouseFormProps {
    handleSubmit: any;
    isActiveModal: boolean;
    formErrors: string[],
    warehousemen: User[];
    handleClose: () => void;
}

export interface EnhancedTableProps {
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowCount: number) => void;
    setUserCount: (userCount: number) => void;
    userCount: number
    users: User[];
    setUser: (user: User[]) => void;
    setEditUserModal: (id: number) => void;
    setUpdateModalActive: (updateModalActive: boolean) => void;
}

export interface EnhancedHeadTableProps {
    numSelected: number;
    order: Order;
    orderBy: string;
    rowCount: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EnhancedTableToolbarProps {
    rowPerPage: number;
    userCount: number;
    page: number
    setUserCount: (userCount: number) => void;
    numSelected: number;
    // NOTE: unknown type
    users: any;
    selectedUsersIds: number[];
    // NOTE: unknown type
    setUser: (user: any) => void;
    setSelectedUsersIds: (selectedUsersIds: number[]) => void;
}

export interface UserCreateFormProps {
    createModal: boolean, updateModal: boolean;
    editUserModal: number;
    title: string, btnTitle: string;
    roles: Role[];
    formErrors: string[];
    companies: Company[];
    handleClose: () => void;
    handleSubmit: (user: userFormValues) => void;
}

export interface CheckpointWindowFormProps {
    checkpointID: number,
    status: boolean,
    currentUserRole: string;
    checkpoints: Checkpoint[];
    setAlertData: (alert: Alert) => void;
    setCheckpoints: (checkpoints: Checkpoint[]) => void;
}

export interface CheckpointsFormProps {
    id: number,
    isWaybillModal: boolean;
    checkpoints: Checkpoint[];
    currentUserRole: string;
    formErrorsCheckpoints: string[],
    setWaybillModalActive: (activeWaybillModal: boolean) => void;
    setAlertData: (alert: Alert) => void;
    handleSubmitWaybill: (id: number) => void,
    setCheckpoints: (checkpoints: Checkpoint[]) => void;
}

export interface CreateCheckpointsFormProps {
    isActiveModal: boolean;
    checkpointsHandleClose: () => void;
    handleSubmitCheckpoints: (values: Checkpoint) => void;
    editCheckpoint: Checkpoint
}
export interface checkpointsTableFormProps {
    checkpoints: Checkpoint[];
    setCheckpoints: (checkpoints: Checkpoint[]) => void;
    setEditCheckpoint: (checkpoints: Checkpoint) => void;
    setCreateCheckpoints: (setCreateCheckpoints: boolean) => void
}
export interface ConsignmentGoodsProps {
    isActiveModal: boolean;
    goods: Item[];
    selectedGoods: Item[];
    currentUserRole: string;
    titleStatus: string;
    handleClose: () => void;
    setTitleStatus: (titleStatus: string) => void;
    setSelectedGoods: (selectedGoods: Item[]) => void;
    handleGoodsSubmit: () => void;
    waybillStatus: string
}

export interface ConsignmentTableProps {
    setPage: (page: number) => void;
    page: number;
    rowsPerPage: number;
    setRowsPerPage: (rowCount: number) => void;
    setConsignment: (cons: Consignment[]) => void;
    setConsignmentCount: (consCount: number) => void;
    consignmentCount: number;
    formErrors: string[];
    consignments: Consignment[];
    currentUserRole: string;
    setModalGoodsActive: (modalGoodsActive: boolean) => void;
    setWayBillActive: (waybillActive: boolean) => void;
    setGoods: (goods: Item[]) => void;
    setConsID: (consID: number) => void;
    setCreateWaybillData: (createWaybillData: CreateWaybillData) => void;
    setWaybillStatus: (status: string) => void
}

export interface CreateCompanyFormProps {
    companies: Company[];
    rowsPerPage: number;
    companyCount: number;
    setCompanyCount: (setCompanyCount: number) => void;
    isActiveModal: boolean;
    formErrors: string[];
    handleClose: () => void;
    setCompany: (company: (prev) => Company[]) => void;
    setFormErrors: (errors: string[]) => void;
    setAlertData: (alert: Alert) => void;
}

export interface CompanyTableProps {
    setPage: (page: number) => void;
    page: number;
    rowsPerPage: number;
    setRowsPerPage: (rowCount: number) => void
    companyCount: number;
    setCompanyCount: (setCompanyCount: number) => void;
    companies: Company[];
    setCompany: (company: Company[]) => void;
    setAlertData: (alert: Alert) => void;
    changeCompanyStatus: (id: number, alertText: string) => void;
}

export interface WaybillTableProps {
    setRowsPerPage: (rows: number) => void;
    rowsPerPage: number;
    setPage: (page: number) => void;
    page: number;
    setWaybill: (waybill: Waybill[]) => void;
    waybillsCount: number;
    waybills: Waybill[];
    setCheckpoints: (checkpoints: Checkpoint[]) => void;
    setWaybillModalActive: (activeWaybillModal: boolean) => void;
    setWaybillID: (wayID: number) => void;
}

export interface WaybillProps {
    waybillCount: number;
    currentUserRole: string;
    waybillsJSON: string;
}

export interface SiteAlertProps {
    alertData: Alert;
    setAlertData: (alert: Alert) => void;
}

export interface SearchProps {
    handleSubmit: (text: string) => void;
    label: string;
}

export interface ConsignmentProps {
    consignmentsCount: number
    currentUserRole: string;
    consignmentsJSON: string;
    trucksJSON: string;
    driversJSON: string,
    warehousesJSON: string;
    goodsOwnersJSON: string,
}

export interface WriteOffActsProps {
    writeOffActCount: number,
    currentUserRole: string;
    writeOffActsJSON: string;
    consignmentsJSON: string;
}

export interface WarehouseProps {
    warehouseCount: number;
    currentUserRole: string;
    warehousesJSON: string;
    warehousemansJSON: string;
}

export interface CompanyProps {
    companiesCount: number;
    currentUserRole: string;
    companiesJSON: string;
}

export interface UsersProps {
    usersCount: number;
    usersJSON: string;
    rolesJSON: string;
    companiesJSON: string;
}

export interface BasicDateRangePickerProps {
    setUserLogs: (userLog) => void;
}

export interface StatisticsProps {
    statisticsCount: number;
    statisticsJSON: string;
}

export interface UserProfileProps {
    UserData: User;
}