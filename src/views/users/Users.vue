<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, watch, watchEffect } from 'vue';
import { useToast } from 'primevue/usetoast';
import useUsers from '@/services/useUsers';
import useCountries from '@/services/useCountries';
import useLocation from '@/services/useLocation';
const { getLocation } = useLocation();
const { countries, cities, states, getCountries, getStates, getCities } = useCountries();

const toast = useToast();
const { getData, users, user, meta, create, update, selectedUsers, deleteUsersDialog, deleteUserDialog, userDialog, onFilter, onPage, onSort } = useUsers();

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
    getLocation(user.value.country, user.value.state, user.value.city, user.value.address)
        .then((d) => {
            user.value.latitude = d.latitude;
            user.value.longitude = d.longitude;
            user.value.location = d.location;
            user.value.neighborhood = d.neighborhood;
        })
        .catch((e) => {});
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    user.value = {};
    submitted.value = false;
    userDialog.value = true;
};

const hideDialog = () => {
    userDialog.value = false;
    submitted.value = false;
};

const saveUser = () => {
    submitted.value = true;
    if (user.value.id) {
        return update(user.value.id);
    } else {
        return create();
    }
};

const editUser = (editUser) => {
    user.value = { ...editUser };
    userDialog.value = true;
};

const confirmDeleteUser = (editUser) => {
    user.value = editUser;
    deleteUserDialog.value = true;
};

const deleteUser = () => {
    users.value = users.value.filter((val) => val.id !== user.value.id);
    deleteUserDialog.value = false;
    user.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteUsersDialog.value = true;
};
const deleteSelectedUsers = () => {
    users.value = users.value.filter((val) => !selectedUsers.value.includes(val));
    deleteUsersDialog.value = false;
    selectedUsers.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

watchEffect(() => {
    if (user.value.country) {
        getStates(user.value.country);
    }
    if (user.value.state) {
        getCities(user.value.state);
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
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable
                    ref="dt"
                    :value="users"
                    v-model:selection="selectedUsers"
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
                        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink RowsPerPageDropdown JumpToPageInput'
                    }"
                    :currentPageReportTemplate="`Showing ${meta.current_page} to ${meta.last_page} of ${meta.total} users`"
                    responsiveLayout="stack"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Users</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                    <Column :exportable="false" style="min-width: 8rem">
                        <template #body="slotProps">
                            <div class="row">
                                <Button icon="pi pi-pencil" outlined rounded class="" @click="editUser(slotProps.data)" />
                                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteUser(slotProps.data)" />
                            </div>
                        </template>
                    </Column>

                    <Column field="uuid" header="ID"> </Column>
                    <Column field="name" header="NAME" :sortable="true"> </Column>
                    <Column field="phone" header="PHONE" :sortable="true"> </Column>
                    <Column field="email" header="EMAIL" :sortable="true" headerStyle="width:14%; min-width:8rem;"></Column>

                    <Column field="username" header="USERNAME" :sortable="true" headerStyle="width:14%; min-width:10rem;"> </Column>
                    <Column field="address" header="ADDRESS" :sortable="true"> </Column>
                    <Column field="created_at" header="CREATE AT" :sortable="true"> </Column>
                </DataTable>

                <Dialog v-model:visible="userDialog" :style="{ width: '500px' }" header="User Details" :modal="true" class="p-fluid">
                    <img :src="'demo/images/user/' + user.image" :alt="user.image" v-if="user.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="user.name" required="true" autofocus :class="{ 'p-invalid': submitted && !user.name }" />
                        <small class="p-invalid" v-if="submitted && !user.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="cedula">Cedula</label>
                        <InputText id="cedula" v-model.trim="user.cedula" required="true" autofocus :class="{ 'p-invalid': submitted && !user.cedula }" />
                        <small class="p-invalid" v-if="submitted && !user.cedula">cedula is required.</small>
                    </div>
                    <div class="field">
                        <label for="username">UserName</label>
                        <InputText id="username" v-model="user.username" required="true" autofocues :class="{ 'p-invalid': submitted && !user.username }" />
                        <small class="p-invalid" v-if="submitted && !user.username">username is required.</small>
                    </div>
                    <div class="field">
                        <label for="email">E-mail</label>
                        <InputText id="email" type="email" v-model="user.email" required="true" :class="{ 'p-invalid': submitted && !user.email }" />
                        <small class="p-invalid" v-if="submitted && !user.email">username is required.</small>
                    </div>
                    <div class="field">
                        <label for="email">Phone</label>
                        <InputText id="phone" type="text" v-model="user.phone" required="true" :class="{ 'p-invalid': submitted && !user.phone }" />
                        <small class="p-invalid" v-if="submitted && !user.phone">phone is required.</small>
                    </div>
                    <div class="field">
                        <label for="country">Country</label>
                        <Dropdown v-model="user.country" :options="countries" optionLabel="name" optionValue="name" placeholder="Select Country" class="w-full md:w-14rem"> </Dropdown>
                    </div>
                    <div class="field">
                        <label for="country">State</label>
                        <Dropdown v-model="user.state" :options="states" optionLabel="name" optionValue="name" placeholder="Select State" class="w-full md:w-14rem"> </Dropdown>
                    </div>
                    <div class="field">
                        <label for="country">City</label>
                        <Dropdown v-model="user.city" :options="cities" @change="onLocation" optionLabel="name" optionValue="name" placeholder="Select City" class="w-full md:w-14rem"> </Dropdown>
                    </div>
                    <div class="field">
                        <label for="address">Address</label>
                        <InputText id="address" type="text" v-model="user.address" @change="onLocation" required="true" :class="{ 'p-invalid': submitted && !user.address }" />
                        <small class="p-invalid" v-if="submitted && !user.address">address is required.</small>
                    </div>
                    <div v-if="user.latitude && user.longitude">
                        <iframe
                            width="100%"
                            height="200px"
                            id="gmap_canvas"
                            :src="`https://maps.google.com/maps?q=${user.latitude},${user.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
                            frameborder="0"
                            scrolling="no"
                            marginheight="0"
                            marginwidth="0"
                        ></iframe>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveUser" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteUserDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="user"
                            >Are you sure you want to delete <b>{{ user.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUserDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteUser" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteUsersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="user">Are you sure you want to delete the selected users?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsersDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedUsers" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
