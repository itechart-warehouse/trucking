import axios from 'axios';

import {
  ConsignmentUrl,
  UsersUrl,
  WarehouseUrl,
  writeOffActUrl,
  CompaniesUrl,
  WaybillUrl,
  MailTemplatesUrl,
  StatisticsUrl,
} from './clientAPI';

function httpClient() {
  return {
    users: {
      search: (page, pageCount, search) => axios.get(
        `${UsersUrl}?page=${page}&per_page=${pageCount}&search=${search}`,
      ),
      getAll: (page, pageCount) => axios.get(`${UsersUrl}?page=${page}&per_page=${pageCount}`),
      get: (id) => axios.get(`${UsersUrl}/${id}`),
      create: (user) => axios.post(`${UsersUrl}/create`, user),
      update: (id, data) => axios.patch(`${UsersUrl}/${id}/edit`, data),
      delete: (id) => axios.delete(`${UsersUrl}/${id}`),
    },
    companies: {
      search: (page, pageCount, search) => axios.get(
        `${CompaniesUrl}?page=${page}&per_page=${pageCount}&search=${search}`,
      ),
      create: (company) => axios.post(`${CompaniesUrl}`, company),
      delete: (id) => axios.delete(`${CompaniesUrl}/${id}`),
      updateStatus: (id) => axios.patch(`${CompaniesUrl}/${id}`),
      getAll: (page, pageCount = '') => axios.get(`${CompaniesUrl}?page=${page}&per_page=${pageCount}`),
    },
    waybill: {
      search: (page, pageCount, search) => axios.get(
        `${WaybillUrl}?page=${page}&per_page=${pageCount}&search=${search}`,
      ),
      create: (waybill, checkpoints, consignment_id) => axios.post(`${WaybillUrl}`, { waybill, checkpoints, consignment_id }),
      finish: (id) => axios.patch(`${WaybillUrl}/${id}`, id),
      getAll: (page, pageCount = '') => axios.get(`${WaybillUrl}?page=${page}&per_page=${pageCount}`),
    },
    checkpoints: {
      update: (data) => axios.patch('/checkpoints', data),
    },
    consignments: {
      search: (page, pageCount, search) => axios.get(
        `${ConsignmentUrl}?page=${page}&per_page=${pageCount}&search=${search}`,
      ),
      create: (consignment) => axios.post(`${ConsignmentUrl}`, consignment),
      getAll: (page, pageCount = '') => axios.get(`${ConsignmentUrl}?page=${page}&per_page=${pageCount}`),
    },
    goods: {
      updateStatus: (id, data) => axios.patch(`consignment/${id}/goods`, data),
    },
    writeOffActs: {
      search: (page, pageCount, search) => axios.get(
        `${writeOffActUrl}?page=${page}&per_page=${pageCount}&search=${search}`,
      ),
      create: (writeOffAct) => axios.post(`${writeOffActUrl}`, writeOffAct),
      getAll: (page, pageCount = '') => axios.get(`${writeOffActUrl}?page=${page}&per_page=${pageCount}`),
    },
    warehouses: {
      search: (page, pageCount, search) => axios.get(
        `${WarehouseUrl}?page=${page}&per_page=${pageCount}&search=${search}`,
      ),
      create: (warehouse) => axios.post(`${WarehouseUrl}`, warehouse),
      delete: (id) => axios.delete(`${WarehouseUrl}/${id}`),
      update: (id, warehouse) => axios.patch(`${WarehouseUrl}/${id}`, warehouse),
      getAll: (page, pageCount = '') => axios.get(`${WarehouseUrl}?page=${page}&per_page=${pageCount}`),
    },
    statistics: {
      getAll: (page, pageCount = '') => axios.get(`${StatisticsUrl}.json?page=${page}&per_page=${pageCount}`),
      dataFilter: (filters: any, startDate: string, endDate: string) => axios.get(
        `${StatisticsUrl}.json?name=${filters.name}&actions=${filters.action}&start_date=${startDate}&end_date=${endDate}`,
      ),
    },
    mailTemplates: {
      get: (id) => axios.get(`${MailTemplatesUrl}/${id}`),
      create: (template) => axios.post(`${MailTemplatesUrl}`, template),
      update: (template) => axios.patch(`${MailTemplatesUrl}/${template.id}`, template),
      delete: (id) => axios.delete(`${MailTemplatesUrl}/${id}`),
      search: (page, pageCount, search) => axios.get(
        `${MailTemplatesUrl}?page=${page}&per_page=${pageCount}&search=${search}`,
      ),
      getAll: (page, pageCount = '') => axios.get(`${MailTemplatesUrl}?page=${page}&per_page=${pageCount}`),
    },
  };
}

export default httpClient();
