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
  errors,
} = useCompanies();

const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const urlObject = ref();
onBeforeMount(() => {
  initFilters();
  getCountries();
});

const onUpload = (event) => {
  let file = event.files[0];
  urlObject.value = event.files[0].objectURL;
  company.value.logo = file;
};

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
  companies.value = companies.value.filter(
    (val) => val.id !== company.value.id
  );
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
          :rows="meta?.per_page"
          :filters="filters"
          scrollable
          scrollHeight="500px"
          :totalRecords="meta?.total"
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
          :currentPageReportTemplate="`Showing ${meta?.current_page} to ${meta?.last_page} of ${meta?.total} companies`"
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
          <div class="flex justify-content-center">
            <!--  <img
              v-if="photo !== 'http://localhost:8000/storage/'"
              alt="user header"
              :src="photo"
              class="avatar my-4"
            /> -->
            <img
              v-if="urlObject"
              alt="user header"
              :src="urlObject"
              class="avatar my-4"
            />
            <img v-else alt="user header" :src="photo" class="avatar my-4" />
          </div>
          <div class="flex justify-content-center mb-4">
            <FileUpload
              name="picture"
              mode="basic"
              :auto="true"
              class="mr-2 my-2"
              :customUpload="true"
              accept="image/*"
              :maxFileSize="1000000"
              type="file"
              @uploader="onUpload"
            />
          </div>
          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-building"></i>
            </span>
            <InputText
              v-model="company.company_name"
              :class="{ 'p-invalid': errors.company_name }"
              placeholder="Company Name"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.company_name"
            >{{ errors.company_name[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-database"></i>
            </span>
            <InputText v-model="company.bank_name" placeholder="Bank Name" />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.bank_name"
            >{{ errors.bank_name[0] }}</InlineMessage
          >
          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-hashtag"></i>
            </span>
            <InputText
              v-model="company.account_number"
              placeholder="Account Number"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.account_number"
            >{{ errors.account_number[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-wallet"></i>
            </span>
            <InputText v-model="company.wallet" placeholder="Wallet" />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.wallet"
            >{{ errors.wallet[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-wallet"></i>
            </span>
            <InputText
              type="text"
              v-model="company.wallet_crypto"
              :class="{ 'p-invalid': errors.wallet_crypto }"
              placeholder="E-mail"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.wallet_crypto"
            >{{ errors.wallet_crypto[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-globe"></i>
            </span>
            <Dropdown
              :class="{ 'p-invalid': errors.country }"
              v-model="company.country"
              :options="countries"
              @change="onLocation"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Country"
              class="w-full md:w-14rem"
            >
            </Dropdown>
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.country"
            >{{ errors.country[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-globe"></i>
            </span>

            <Dropdown
              :class="{ 'p-invalid': errors.state }"
              v-model="company.state"
              :options="states"
              @change="onLocation"
              optionLabel="name"
              optionValue="name"
              placeholder="Select State"
              class="w-full md:w-14rem"
            >
            </Dropdown>
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.state"
            >{{ errors.state[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-globe"></i>
            </span>
            <Dropdown
              :class="{ 'p-invalid': errors.city }"
              v-model="company.city"
              :options="cities"
              @change="onLocation"
              optionLabel="name"
              optionValue="name"
              placeholder="Select State"
              class="w-full md:w-14rem"
            >
            </Dropdown>
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.city"
            >{{ errors.city[0] }}</InlineMessage
          >
          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-map-marker"></i>
            </span>
            <InputText
              v-model="company.address"
              @change="onLocation"
              placeholder="Address"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.address"
            >{{ errors.address[0] }}</InlineMessage
          >
          <iframe
            v-if="company.latitude && company.longitude"
            width="100%"
            height="500px"
            id="gmap_canvas"
            :src="`https://maps.google.com/maps?q=${company.latitude},${company.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>

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
.avatar {
  width: 300px;
  height: 300px;
  border: 6px solid #11998e;
  border-radius: 100%;
}

.file-select {
  position: relative;
  display: inline-block;
}

.file-select::before {
  background-color: #11998e;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  content: "Upload Image"; /* testo por defecto */
  position: absolute;
  width: 98px;
  height: 22px;
}
.file-select input[type="file"] {
  opacity: 0;
  width: 30px;
  height: 30px;
  display: none;
}
/* #src-file::before {
  content: 'upload image';
} */
</style>


