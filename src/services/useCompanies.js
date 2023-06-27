import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "../stores/auth";
import { useApi } from "@/api/useAPI.js";

const useCompanies = () => {
  const api = useApi();
  const companyDialog = ref(false);
  const deleteCompanyDialog = ref(false);
  const deleteCompaniesDialog = ref(false);
  const selectedCompanies = ref(null);
  const page = ref(1);
  const paginator = ref(15);
  const orderBy = ref("desc");
  const sort = ref("id");
  const logo = ref();
  const companies = ref([]);
  const errors = ref([]);
  const toast = useToast();
  const company = ref({
    company_name: "",
    logo: "",
    country: "",
    state: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    location: "",
    neighborhood: "",
    bank_name: "",
    account_number: "",
    wallet: "",
    wallet_crypto: ""
  });
  const meta = ref({
    current_page: 1,
    from: 1,
    last_page: 3,
    links: [],
    path: "/api/companies",
    per_page: 50,
    to: 50,
    total: 101
  });

  const onPage = event => {
    const pg = 1 + event.page;
    page.value = pg;
    paginator.value = event.rows;
    return getData();
  };

  const onSort = event => {
    if (event.sortOrder === 1) {
      orderBy.value = "asc";
    } else {
      orderBy.value = "desc";
    }
    sort.value = event.sortField;
    getData();
  };
  
  const onFilter = event => {};

  const create = async () => {
    try {
      const { data } = await api.post("/companies", company.value);
      if (data) {
        companyDialog.value = false;
        company.value = data.data;
        toast.add({
          severity: "success",
          summary: "Successful",
          detail: data.msg,
          life: 5000
        });
        getData();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };
  const postImage = async e => {
    try {
      const { data } = await api.post(
        "image",
        { image: e },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (data) {
        company.value.picture = data;
      }
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };
  const update = async id => {
    try {
      const { data } = await api.post(
        `companies/${id}`,
        {
          _method: "PUT",
          company_name: company.value.name,
          logo: company.value.logo,
          country: company.value.country,
          state: company.value.state,
          city: company.value.city,
          address: company.value.address,
          latitude: company.value.latitude,
          longitude: company.value.longitude,
          location: company.value.location,
          neighborhood: company.value.neighborhood,
          bank_name: company.value.bank_name,
          account_number: company.value.account_number,
          wallet: company.value.wallet,
          wallet_crypto: company.value.wallet_crypto,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (data) {
        companyDialog.value = false;
        company.value = data.data;
        toast.add({
          severity: "success",
          summary: "Successful",
          detail: data.msg,
          life: 5000
        });
        getData();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const getData = async () => {
    try {
      const { data } = await api.get("/companies", {
        params: {
          page: page.value,
          paginator: paginator.value,
          orderBy: orderBy.value,
          sort: sort.value
        }
      });
      meta.value = data.meta;
      companies.value = data.data;
    } catch (error) {}
  };
 
  const deleteCompany = async id => {
    try {
      const { data } = api.delete(`/companies/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getData,
    company,
    meta,
    errors,
    create,
    companies,
    deleteCompany,
    selectedCompanies,
    deleteCompaniesDialog,
    deleteCompanyDialog,
    companyDialog,
    onFilter,
    onPage,
    update,
    onSort
  };
};

export default useCompanies;
