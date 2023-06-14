<script setup>
import { reactive,computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { useLayout } from '@/layout/composables/layout';
const credentials = reactive({
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: ''
});
const auth = useAuthStore();
const router = useRouter();
const registerFn = async () => {
    await auth.register(credentials);
    await router.push('/');
};

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>

    <div class="py-8">
        <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-column align-items-center justify-content-center">
                <div class="" style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full surface-card pt-7 pb-8 px-5 sm:px-8" style="border-radius: 53px">
                        <div class="text-center">
                            <img src="/img/logo-footer.png" alt="Image" width="300" class="mb-4" />
                        </div>

                        <div>
                            <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText id="username" type="text" placeholder="User Name" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="credentials.username" />

                            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email" type="email" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="credentials.email" />

                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" v-model="credentials.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                            <label for="password_confirmation" class="block text-900 font-medium text-xl mb-2">Password confirmation</label>
                            <Password id="password" v-model="credentials.password_confirmation" placeholder="Password confirm" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                            <Button label="Register" @click="registerFn" class="w-full p-3 text-xl"></Button>
                        </div>
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
