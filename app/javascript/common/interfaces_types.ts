import * as React from "react";
import { AlertColor } from "@mui/material";
import { Order, UserData } from "../mixins/initialValues/userList";
import { consignmentFormValues } from "../initialValues/consignmentInitialValues";
import { userFormValues } from "../initialValues/userInitialValues";

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
  address: {
    town: string;
    street: string;
    building: number;
    apartment: number;
  };
  role: { role_name: string };
  passport: string;
  company: string;
};

export type Truck = {
  id: number;
  truck_number: string;
  fuel_consumption: number;
};

export type Item = {
  id: number;
  good_name: string;
  quantity: number;
  status: string;
  unit_of_measurement: string;
  bundle_seria: string;
  bundle_number: string;
};

export type Company = {
  id: number;
  name: string;
  is_suspended: boolean;
};

export type Role = {
  id: number;
  role_name: string;
};

export type Alert = {
  alertType: AlertColor;
  alertText: string;
  open: boolean;
};

export type NewGoods = {
  id: string;
  good_name: string;
  quantity: number;
  unit_of_measurement: string;
};

export type Checkpoint = {
  id: number;
  city: string;
  city_name: string;
  is_passed: boolean;
  pass_date: Date;
};

export type GoodsOwners = {
  goods_owner_name: string;
};

export type CreateWaybillData = {
  truckNumber: string;
  driverFio: string;
};

export type Waybill = {
  id: number;
  status: string;
  waybill_seria: string;
  waybill_number: number;
  startpoint: { town: string; street: string; building: string };
  endpoint: { town: string; street: string; building: string };
};

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
};

export type WriteOffAct = {
  id: number;
  good_name: string;
  description: string;
  lost_quantity: number;
  consignment: Consignment;
};

export type Warehouse = {
  id: number;
  warehouse_name: string;
  trusted: boolean;
  warehouseman: User;
};

export declare type AlignType = "left" | "center" | "right";

export type SearchData = {
  search: string;
  consignment: Consignment[];
  users: User[];
  waybills: Waybill[];
  company: Company[];
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
  writeOffActs: WriteOffAct[];
  searchData: string[] | number[];
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
  searchData: string[];
  setSearchData: (searchData: string[]) => void;
  setWayBillActive: (waybillActive: boolean) => void;
  handleClose: () => void;
  setAlertData: (alert: Alert) => void;
  setConsignment: (consignment: Consignment[]) => void;
}

export interface WarehouseTableProps {
  warehouses: Warehouse[];
  currentUserRole: string;
  searchData: string[];
  setWarehouses: (warehouses: Warehouse[]) => void;
  setAlertData: (alert: Alert) => void;
  setSearchData: (searchData: string[]) => void;
}

export interface CreateWarehouseFormProps {
  isActiveModal: boolean;
  formErrors: string[];
  warehousemen: User[];
  handleClose: () => void;
  setWarehouses: (warehouses: (prev) => Warehouse[]) => void;
  setFormErrors: (errors: string[]) => void;
  setAlertData: (alert: Alert) => void;
}

export interface EnhancedTableProps {
  users: User[];
  searchData: string[];
  setUser: (user: (prev) => User[]) => void;
  setEditUserModal: (id: number) => void;
  setUpdateModalActive: (updateModalActive: boolean) => void;
}

export interface EnhancedHeadTableProps {
  numSelected: number;
  order: Order;
  orderBy: string;
  rowCount: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof UserData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  // NOTE: unknown type
  users: any;
  selectedUsersIds: number[];
  // NOTE: unknown type
  setUser: (user: any) => void;
  setSelectedUsersIds: (selectedUsersIds: number[]) => void;
}

export interface UserCreateFormProps {
  createModal: boolean;
  updateModal: boolean;
  editUserModal: number;
  title: string;
  btnTitle: string;
  roles: Role[];
  formErrors: string[];
  companies: Company[];
  handleClose: () => void;
  handleSubmit: (user: userFormValues) => void;
}

export interface CheckpointWindowFormProps {
  checkpointID: number;
  status: boolean;
  currentUserRole: string;
  checkpoints: Checkpoint[];
  setAlertData: (alert: Alert) => void;
  setCheckpoints: (checkpoints: Checkpoint[]) => void;
}

export interface CheckpointsFormProps {
  id: number;
  isWaybillModal: boolean;
  checkpoints: Checkpoint[];
  currentUserRole: string;
  formErrorsCheckpoints: string[];
  setWaybillModalActive: (activeWaybillModal: boolean) => void;
  setAlertData: (alert: Alert) => void;
  handleSubmitWaybill: (id: number) => void;
  setCheckpoints: (checkpoints: Checkpoint[]) => void;
}

export interface CreateCheckpointsFormProps {
  isActiveModal: boolean;
  checkpointsHandleClose: () => void;
  handleSubmitCheckpoints: (values: Checkpoint) => void;
  editCheckpoint: Checkpoint;
}
export interface checkpointsTableFormProps {
  checkpoints: Checkpoint[];
  setCheckpoints: (checkpoints: Checkpoint[]) => void;
  setEditCheckpoint: (checkpoints: Checkpoint) => void;
  setCreateCheckpoints: (setCreateCheckpoints: boolean) => void;
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
  waybillStatus: string;
}

export interface ConsignmentTableProps {
  formErrors: string[];
  consignments: Consignment[];
  currentUserRole: string;
  searchData: string[];
  setModalGoodsActive: (modalGoodsActive: boolean) => void;
  setWayBillActive: (waybillActive: boolean) => void;
  setGoods: (goods: Item[]) => void;
  setConsID: (consID: number) => void;
  setCreateWaybillData: (createWaybillData: CreateWaybillData) => void;
  setWaybillStatus: (status: string) => void;
}

export interface CreateCompanyFormProps {
  isActiveModal: boolean;
  formErrors: string[];
  handleClose: () => void;
  setCompany: (company: (prev) => Company[]) => void;
  setFormErrors: (errors: string[]) => void;
  setAlertData: (alert: Alert) => void;
}

export interface CompanyTableProps {
  companies: Company[];
  searchData: string[];
  setCompany: (company: Company[]) => void;
  setAlertData: (alert: Alert) => void;
  changeCompanyStatus: (id: number, alertText: string) => void;
}

export interface WaybillTableProps {
  waybills: Waybill[];
  searchData: string[];
  setCheckpoints: (checkpoints: Checkpoint[]) => void;
  setWaybillModalActive: (activeWaybillModal: boolean) => void;
  setWaybillID: (wayID: number) => void;
}

export interface WaybillProps {
  currentUserRole: string;
  waybillsJSON: string;
}

export interface SiteAlertProps {
  alertData: Alert;
  setAlertData: (alert: Alert) => void;
}

export interface SearchProps {
  setData: (search: string[]) => void;
  Data: any;
  keyField: string;
}

export interface ConsignmentProps {
  currentUserRole: string;
  consignmentsJSON: string;
  trucksJSON: string;
  driversJSON: string;
  warehousesJSON: string;
  goodsOwnersJSON: string;
}

export interface WriteOffActsProps {
  currentUserRole: string;
  writeOffActsJSON: string;
  consignmentsJSON: string;
}

export interface WarehouseProps {
  currentUserRole: string;
  warehousesJSON: string;
  warehousemansJSON: string;
}

export interface CompanyProps {
  currentUserRole: string;
  companiesJSON: string;
}

export interface UsersProps {
  usersJSON: string;
  rolesJSON: string;
  companiesJSON: string;
}

export type MailTemplate = {
  id: number;
  name: string;
};

export interface MailTemplateTableProps {
  templates: MailTemplate[];
  searchData: string[];
  setTemplate: (template: MailTemplate[]) => void;
  setAlertData: (alert: Alert) => void;
}
export interface MailTemplateProps {
  templatesJSON: string;
}
