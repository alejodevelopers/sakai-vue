<script setup>
name: 'profile';
import useUsers from '@/services/useUsers';
import { onMounted } from 'vue';
const { profile, user, update, errors } = useUsers();

onMounted(() => {
    profile();
});
</script>


<template>
    <Toast />

    <div class="grid">
        <div class="col-12 lg:col-8 xl:col-6">
            <div class="card mb-0">
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText v-model="user.name" :class="{ 'p-invalid': errors }" placeholder="Name" />
                </div>

                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText v-model="user.username" :class="{ 'p-invalid': errors }" placeholder="Username" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-phone"></i>
                    </span>
                    <InputText v-model="user.phone" :class="{ 'p-invalid': errors }" placeholder="Phone" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-map-marker"></i>
                    </span>
                    <InputText v-model="user.address" :class="{ 'p-invalid': 'error de direccion' }" placeholder="Address" />
                </div>
                <small id="text-error" class="p-error">{{ errors.address }}</small>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-id-card"></i>
                    </span>
                    <InputText v-model="user.cedula" :class="{ 'p-invalid': errors[0]?.cedula }" placeholder="ID" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-envelope"></i>
                    </span>
                    <InputText v-model="user.email" :class="{ 'p-invalid': errors[0]?.email }" placeholder="E-mail" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-globe"></i>
                    </span>
                    <InputText v-model="user.country" :class="{ 'p-invalid': errors[0]?.country }" placeholder="Country" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-globe"></i>
                    </span>
                    <InputText v-model="user.state" :class="{ 'p-invalid': errors[0]?.state }" placeholder="State" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-globe"></i>
                    </span>
                    <InputText v-model="user.city" :class="{ 'p-invalid': errors[0]?.city }" placeholder="City" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-lock"></i>
                    </span>
                    <InputText v-model="user.password" :class="{ 'p-invalid': errors[0]?.password }" placeholder="New Password" />
                </div>
                <div class="p-inputgroup flex-1 my-4">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-lock"></i>
                    </span>
                    <InputText v-model="user.password_confirmation" :class="{ 'p-invalid': errors[0]?.password }" placeholder="Password Confirmation" />
                </div>
                <Button label="Update" severity="success" raised @click="update(user.id)" />
            </div>
        </div>
    </div>
</template>