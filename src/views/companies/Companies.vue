<script setup>
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted, onBeforeMount, watch, watchEffect } from "vue";
import { useToast } from "primevue/usetoast";
import useCompanies from "@/services/useCompanies";
import useCountries from "@/services/useCountries";
import useLocation from "@/services/useLocation";
const { getLocation } = useLocation();
const { countries, cities, states, getCountries, getStates, getCities } =
  useCountries();

const toast = useToast();
const {
  getData,
  companies,
  company,
  meta,
  create,
  update,
  selectedCompanies,
  deleteCompaniesDialog,
  deleteCompanyDialog,
  companyDialog,
  onFilter,
  onPage,
  onSort,
} = useCompanies();

const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

onBeforeMount(() => {
  initFilters();
  getCountries();
});

onMounted(() => {
  getData();
});

const onLocation = () => {
  getLocation(
    company.value.country,
    company.value.state,
    company.value.city,
    company.value.address
  )
    .then((d) => {
      company.value.latitude = d.latitude;
      company.value.longitude = d.longitude;
      company.value.location = d.location;
      company.value.neighborhood = d.neighborhood;
    })
    .catch((e) => {});
};

const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const openNew = () => {
  company.value = {};
  submitted.value = false;
  companyDialog.value = true;
};

const hideDialog = () => {
  companyDialog.value = false;
  submitted.value = false;
};

const saveCompany = () => {
  submitted.value = true;
  if (company.value.id) {
    return update(company.value.id);
  } else {
    return create();
  }
};

const editCompany = (editCompany) => {
  company.value = { ...editCompany };
  companyDialog.value = true;
};

const confirmDeleteCompany = (editCompany) => {
  company.value = editCompany;
  deleteCompanyDialog.value = true;
};

const deleteCompany = () => {
  companies.value = companies.value.filter((val) => val.id !== company.value.id);
  deleteCompanyDialog.value = false;
  company.value = {};
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Company Deleted",
    life: 3000,
  });
};

const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < companies.value.length; i++) {
    if (companies.value[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const createId = () => {
  let id = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const exportCSV = () => {
  dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
  deleteCompaniesDialog.value = true;
};
const deleteSelectedCompanies = () => {
  companies.value = companies.value.filter(
    (val) => !selectedCompanies.value.includes(val)
  );
  deleteCompaniesDialog.value = false;
  selectedCompanies.value = null;
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Companies Deleted",
    life: 3000,
  });
};

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

watchEffect(() => {
  if (company.value.country) {
    getStates(company.value.country);
  }
  if (company.value.state) {
    getCities(company.value.state);
  }
});
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="New"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="confirmDeleteSelected"
                :disabled="!selectedCompanies || !selectedCompanies.length"
              />
            </div>
          </template>

          <template v-slot:end>
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="companies"
          v-model:selection="selectedCompanies"
          dataKey="id"
          :paginator="true"
          :lazy="true"
          :rows="meta.per_page"
          :filters="filters"
          scrollable
          scrollHeight="500px"
          :totalRecords="meta.total"
          @page="onPage($event)"
          @sort="onSort($event)"
          @filter="onFilter($event)"
          :rowsPerPageOptions="[15, 30, 50, 100]"
          :paginatorTemplate="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px':
              'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px':
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default:
              'CurrentPageReport FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink RowsPerPageDropdown JumpToPageInput',
          }"
          :currentPageReportTemplate="`Showing ${meta.current_page} to ${meta.last_page} of ${meta.total} companies`"
          responsiveLayout="stack"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Manage Companies</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <div class="row">
                <Button
                  icon="pi pi-pencil"
                  outlined
                  rounded
                  class=""
                  @click="editCompany(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  outlined
                  rounded
                  severity="danger"
                  @click="confirmDeleteCompany(slotProps.data)"
                />
              </div>
            </template>
          </Column>

          <Column field="uuid" header="ID"> </Column>
          <Column field="name" header="NAME" :sortable="true"> </Column>
          <Column field="phone" header="PHONE" :sortable="true"> </Column>
          <Column
            field="email"
            header="EMAIL"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          ></Column>

          <Column
            field="companyname"
            header="USERNAME"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
          </Column>
          <Column field="address" header="ADDRESS" :sortable="true"> </Column>
          <Column field="created_at" header="CREATE AT" :sortable="true">
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="companyDialog"
          :style="{ width: '500px' }"
          header="Company Details"
          :modal="true"
          class="p-fluid"
        >
          <img
            :src="'demo/images/company/' + company.image"
            :alt="company.image"
            v-if="company.image"
            width="150"
            class="mt-0 mx-auto mb-5 block shadow-2"
          />
          <div class="field">
            <label for="name">Name</label>
            <InputText
              id="name"
              v-model.trim="company.name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !company.name }"
            />
            <small class="p-invalid" v-if="submitted && !company.name"
              >Name is required.</small
            >
          </div>
          <div class="field">
            <label for="cedula">Cedula</label>
            <InputText
              id="cedula"
              v-model.trim="company.cedula"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !company.cedula }"
            />
            <small class="p-invalid" v-if="submitted && !company.cedula"
              >cedula is required.</small
            >
          </div>
          <div class="field">
            <label for="companyname">CompanyName</label>
            <InputText
              id="companyname"
              v-model="company.companyname"
              required="true"
              autofocues
              :class="{ 'p-invalid': submitted && !company.companyname }"
            />
            <small class="p-invalid" v-if="submitted && !company.companyname"
              >companyname is required.</small
            >
          </div>
          <div class="field">
            <label for="email">E-mail</label>
            <InputText
              id="email"
              type="email"
              v-model="company.email"
              required="true"
              :class="{ 'p-invalid': submitted && !company.email }"
            />
            <small class="p-invalid" v-if="submitted && !company.email"
              >companyname is required.</small
            >
          </div>
          <div class="field">
            <label for="email">Phone</label>
            <InputText
              id="phone"
              type="text"
              v-model="company.phone"
              required="true"
              :class="{ 'p-invalid': submitted && !company.phone }"
            />
            <small class="p-invalid" v-if="submitted && !company.phone"
              >phone is required.</small
            >
          </div>
          <div class="field">
            <label for="country">Country</label>
            <Dropdown
              v-model="company.country"
              :options="countries"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Country"
              class="w-full md:w-14rem"
            >
            </Dropdown>
          </div>
          <div class="field">
            <label for="country">State</label>
            <Dropdown
              v-model="company.state"
              :options="states"
              optionLabel="name"
              optionValue="name"
              placeholder="Select State"
              class="w-full md:w-14rem"
            >
            </Dropdown>
          </div>
          <div class="field">
            <label for="country">City</label>
            <Dropdown
              v-model="company.city"
              :options="cities"
              @change="onLocation"
              optionLabel="name"
              optionValue="name"
              placeholder="Select City"
              class="w-full md:w-14rem"
            >
            </Dropdown>
          </div>
          <div class="field">
            <label for="address">Address</label>
            <InputText
              id="address"
              type="text"
              v-model="company.address"
              @change="onLocation"
              required="true"
              :class="{ 'p-invalid': submitted && !company.address }"
            />
            <small class="p-invalid" v-if="submitted && !company.address"
              >address is required.</small
            >
          </div>
          <div v-if="company.latitude && company.longitude">
            <iframe
              width="100%"
              height="200px"
              id="gmap_canvas"
              :src="`https://maps.google.com/maps?q=${company.latitude},${company.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
          <template #footer>
            <Button
              label="Cancel"
              icon="pi pi-times"
              class="p-button-text"
              @click="hideDialog"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              class="p-button-text"
              @click="saveCompany"
            />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteCompanyDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span v-if="company"
              >Are you sure you want to delete <b>{{ company.name }}</b
              >?</span
            >
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteCompanyDialog = false"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteCompany"
            />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteCompaniesDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span v-if="company"
              >Are you sure you want to delete the selected companies?</span
            >
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteCompaniesDialog = false"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteSelectedCompanies"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/demo/styles/badges.scss";
</style>

