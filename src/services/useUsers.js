import {ref} from 'vue'
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '../stores/auth';
import { useApi } from '@/api/useAPI.js'
const useUsers = () =>{
    const api = useApi()
    const authStore = useAuthStore();
    const userDialog = ref(false);
    const deleteUserDialog = ref(false);
    const deleteUsersDialog = ref(false);
    const selectedUsers = ref(null);
    const page = ref(1)
    const paginator =ref(15)
    const orderBy = ref('desc');
    const sort = ref('id');
    const users = ref([])
    const errors = ref([]);
    const toast = useToast();
    const user = ref({
        name:'',
        email:'',
        username:'',
        cedula:'',
        phone:0,
        password:'',
        password_confirmation:'',
        country:'',
        state:'',
        city:'',
        address:'',
        latitude:'',
        longitude:'',
        location:'',
        neighborhood:''
    });
    const meta = ref({
        current_page: 1,
        from: 1,
        last_page: 3,
        links: [],
        path: "/api/users",
        per_page: 50,
        to: 50,
        total: 101
    })
 

    const onPage = (event) => {
        const pg = 1 + event.page
        page.value = pg
        paginator.value = event.rows
        return getData();  
    };
    const onSort = (event) => {
        if(event.sortOrder=== 1){
            orderBy.value = 'asc'
        }else{
            orderBy.value = 'desc'
        }
        sort.value = event.sortField
        getData();
    };
    const onFilter = (event) => {
    };

    const create = async() => {
       try {
        const {data} = await api.post("/users",user.value)

            if(data){
                userDialog.value = false;
                user.value = data.data;
                toast.add({ severity: 'success', summary: 'Successful', detail: data.msg, life: 5000 });
                getData();
            }

        } catch (error) {
            if(error.response.status === 422){
                errors.value = error.response.data.errors;
            }
        }
    }
    const update = async(id) => {
       try {
        const {data} = await api.put(`/users/${id}`,user.value)

            if(data){
                userDialog.value = false;
                user.value = data.data
                toast.add({ severity: 'success', summary: 'Successful', detail: data.msg, life: 5000 });
                getData();
            }
        } catch (error) {
 
            if(error.response.status === 422){
                errors.value = error.response.data.errors;
            }
        }
    }

    const getData = async()=>{
       
        try {
            const {data}= await api.get('/users',{
                params:{
                    page:page.value,
                    paginator: paginator.value,
                    orderBy:orderBy.value,
                    sort:sort.value
                }
            })
            meta.value = data.meta;
            users.value = data.data            
        } catch (error) {
            
        }

    }
    const profile = async()=>{
       
        try {
            const {data}= await api.get('/profile')
            if(data){
                user.value = data;
            }
        } catch (error) {
            console.log(error);
        }

    }
    const deleteUser = async(id)=>{
        try{
            const {data }= api.delete(`/users/${id}`);
            console.log(data.data);
        }catch(error){

        }
    }

 


    return {
        getData,
        user,
        profile,
        meta,
        errors,
        create,
        users,
        deleteUser,
        selectedUsers,
        deleteUsersDialog,
        deleteUserDialog,
        userDialog,
        onFilter,
        onPage,
        update,
        onSort
    }
}

export default useUsers
