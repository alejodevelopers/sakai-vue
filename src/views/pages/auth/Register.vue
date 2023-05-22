<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import useUsers from '../../../services/useUsers';
const { user, register, errors } = useUsers();
const { layoutConfig } = useLayout();
const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div class="" style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card pt-7 pb-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center">
                        <img src="https://www.tidelit.co/logo.png" alt="Image" height="100" width="" class="mb-4" />
                    </div>

                    <div>
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="username" type="text" placeholder="User Name" :class="errors[0]?.username ? 'w-full md:w-30rem mb-5 p-invalid' : 'w-full md:w-30rem mb-5'" style="padding: 1rem" v-model="user.username" />

                        <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" type="email" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.email" />

                        <!-- <label for="phone" class="block text-900 text-xl font-medium mb-2">Phone</label>
                        <InputText id="phone" type="number" placeholder="Number Phone" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.phone" />

                        <label for="cedula" class="block text-900 text-xl font-medium mb-2">Identification</label>
                        <InputText id="cedula" type="text" placeholder="Cedula" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.cedula" />

                        <label for="address" class="block text-900 font-medium text-xl mb-2">address</label>
                        <InputText id="address" v-model="user.address" placeholder="Address" class="w-full md:w-30rem mb-5" style="padding: 1rem"></InputText>
 -->
                        <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password" v-model="user.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                        <label for="password_confirmation" class="block text-900 font-medium text-xl mb-2">Password confirmation</label>
                        <Password id="password" v-model="user.password_confirmation" placeholder="Password confirm" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <!-- <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div> -->
                        <Button label="Register" @click="register" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
