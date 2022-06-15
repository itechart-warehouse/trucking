import axios from 'axios';

import {
  ConsignmentUrl,
  UsersUrl,
  WarehouseUrl,
  writeOffActUrl,
  CompaniesUrl,
  WaybillUrl,
  MailTemplatesUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      get: (id) => axios.get(`${UsersUrl}/${id}`),
      create: (user) => axios.post(`${UsersUrl}/create`, user),
      update: (id, data) => axios.patch(`${UsersUrl}/${id}/edit`, data),
      delete: (id) => axios.delete(`${UsersUrl}/${id}`),
    },
    companies: {
      create: (company) => axios.post(`${CompaniesUrl}`, company),
      delete: (id) => axios.delete(`${CompaniesUrl}/${id}`),
      updateStatus: (id) => axios.patch(`${CompaniesUrl}/${id}`),
    },
    waybill: {
      create: (waybill, checkpoints, consignment_id) => axios.post(`${WaybillUrl}`, { waybill, checkpoints, consignment_id }),
      finish: (id) => axios.patch(`${WaybillUrl}/${id}`, id),
    },
    checkpoints: {
      update: (data) => axios.patch('/checkpoints', data),
    },
    consignments: {
      create: (consignment) => axios.post(`${ConsignmentUrl}`, consignment),
    },
    goods: {
      updateStatus: (id, data) => axios.patch(`consignment/${id}/goods`, data),
    },
    writeOffActs: {
      getAll: () => axios.get(`${writeOffActUrl}.json`),
      create: (writeOffAct) => axios.post(`${writeOffActUrl}`, writeOffAct),
    },
    warehouses: {
      create: (warehouse) => axios.post(`${WarehouseUrl}`, warehouse),
      delete: (id) => axios.delete(`${WarehouseUrl}/${id}`),
      update: (id, warehouse) => axios.patch(`${WarehouseUrl}/${id}`, warehouse),
    },
    mailTemplates: {
      get: (id) => axios.get(`${MailTemplatesUrl}/${id}`),
      create: (template) => axios.post(`${MailTemplatesUrl}`, template),
      delete: (id) => axios.delete(`${MailTemplatesUrl}/${id}`),
    },
  };
}

export default httpClient();
