<script setup>
name: "profile";
import useUsers from "@/services/useUsers";
import { onMounted, watchEffect, ref } from "vue";
import useCountries from "@/services/useCountries";
import { usePrimeVue } from "primevue/config";
import useLocation from "@/services/useLocation";

const PrimeVue = usePrimeVue();
const { profile, user, update, errors, photo, postImage } = useUsers();
const { getLocation } = useLocation();
const urlObject = ref();
PrimeVue.config.locale = {
  upload: "",
  choose: "",
};

const { countries, cities, states, getCountries, getStates, getCities } =
  useCountries();
const onLocation = () => {
  getLocation(
    user.value.country,
    user.value.state,
    user.value.city,
    user.value.address
  )
    .then((d) => {
      user.value.latitude = d.latitude;
      user.value.longitude = d.longitude;
      user.value.location = d.location;
      user.value.neighborhood = d.neighborhood;
    })
    .catch((e) => {});
};
const onUpload = (event) => {
  let file = event.files[0];
  urlObject.value = event.files[0].objectURL;
  user.value.picture = file;
};

watchEffect(() => {
  if (user.value.country) {
    getStates(user.value.country);
  }
  if (user.value.state) {
    getCities(user.value.state);
  }
});

onMounted(() => {
  profile();
});
</script>


<template>
  <Toast />

  <div class="grid">
    <div class="col-12 lg:col-8 xl:col-6">
      <Card>
        <template #header>
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
            <img
              v-else
              alt="user header"
              :src="photo"
              class="avatar my-4"
            />
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
        </template>
        <template #title>
          <strong class="flex justify-content-center mt-4"
            >Manage Profile
          </strong>
        </template>
        <template #subtitle>
          <span class="flex justify-content-center"
            >Update your profile now and get access to exclusive benefits!
          </span>
        </template>
        <template #content>
          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText
              v-model="user.name"
              :class="{ 'p-invalid': errors.name }"
              placeholder="Name"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.name"
            >{{ errors.name[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText v-model="user.username" placeholder="Username" />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.username"
            >{{ errors.username[0] }}</InlineMessage
          >
          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-phone"></i>
            </span>
            <InputText v-model="user.phone" placeholder="Phone" />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.phone"
            >{{ errors.phone[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-id-card"></i>
            </span>
            <InputText v-model="user.cedula" placeholder="ID" />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.cedula"
            >{{ errors.cedula[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-envelope"></i>
            </span>
            <InputText
              type="email"
              v-model="user.email"
              :class="{ 'p-invalid': errors.email }"
              placeholder="E-mail"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.email"
            >{{ errors.email[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <InputText
              type="password"
              v-model="user.password"
              :class="{ 'p-invalid': errors.password }"
              placeholder="New Password"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.password"
            >{{ errors.password[0] }}</InlineMessage
          >

          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <InputText
              type="password"
              v-model="user.password_confirmation"
              :class="{ 'p-invalid': errors.password }"
              placeholder="Password Confirmation"
            />
          </div>
          <InlineMessage
            class="w-full justify-content-start"
            v-if="errors.password"
            >{{ errors.password[0] }}</InlineMessage
          >
        </template>
      </Card>
    </div>
    <div class="col-12 lg:col-8 xl:col-6">
      <Card>
        <template #content>
          <div class="p-inputgroup flex-1 my-3">
            <span class="p-inputgroup-addon">
              <i class="pi pi-globe"></i>
            </span>
            <Dropdown
              :class="{ 'p-invalid': errors.country }"
              v-model="user.country"
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
              v-model="user.state"
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
              v-model="user.city"
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
              v-model="user.address"
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
            width="100%"
            height="500px"
            id="gmap_canvas"
            :src="`https://maps.google.com/maps?q=${user.latitude},${user.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </template>
        <template #footer>
          <Button
            label="Update"
            severity="success"
            raised
            @click.prevent="update(user.id)"
          />
        </template>
      </Card>
    </div>
  </div>
</template>
<style scoped>
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