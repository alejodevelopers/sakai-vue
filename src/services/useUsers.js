import {ref} from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast';

const useUsers = () =>{
    const toast = useToast();
    const user = ref({
        name:'',
        email:'',
        username:'',
        cedula:'',
        phone:0,
        password:'',
        address:'',
    });
    const users = ref([])
    const errors = ref([]);
    const register = async()=>{
        const options = {
            method: 'POST',
            url: 'http://api-quasar.test/api/users',
            headers: {Accept: 'application/json'},
            data: {
                name:user.value.name,
                email:user.value.email,
                cedula:user.value.cedula,
                phone:user.value.phone,
                password:user.value.password,
                address:user.value.address,
                password:user.value.password.confirmation
            }
        }
        try {
            const {data}= await axios.request(options);
            if(data){
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }else{
                toast.add({ severity: 'warning', summary: 'Successful', detail: 'Error', life: 3000 });
            }
            console.log(data);
        } catch (error) {
            if(error.response.status === 422){
                errors.value =error.response.data.errors;
                user.value;
            }
   
            console.log(error);
        }
    }
    const create = async()=>{
        const options = {
            method: 'POST',
            url: 'http://api-quasar.test/api/users/create',
            headers: {Accept: 'application/json'},
            data: {
                name:user.value.name,
                email:user.value.email,
                cedula:user.value.cedula,
                phone:user.value.phone,
                password:user.value.password,
                address:user.value.address,
            }
        }
        try {
            const {data}= await axios.request(options);
            if(data){
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }else{
                toast.add({ severity: 'warning', summary: 'Successful', detail: 'Error', life: 3000 });
            }
            console.log(data);
        } catch (error) {
            if(error.response.status === 422){
                errors.value =error.response.data.errors;
                user.value;
            }
   
            console.log(error);
        }
    }

    const getData = async()=>{
        const options = {
            method: 'GET',
            url: 'http://api-quasar.test/api/users',
            headers: {Accept: 'application/json'},
        }
        try {
            const {data}= await axios.request(options);
            users.value = data.data;
        
        } catch (error) {
            console.log(error);
        }
    }
    const deleteUser = async(id)=>{
        const options = {
            method: 'DELETE',
            url: `http://api-quasar.test/api/users/${id}`,
            headers: {Accept: 'application/json'},
        }
        try {
            const {data}= await axios.request(options);
            user.value = data;
        
        } catch (error) {
            console.log(error);
        }
    }

    getData();

    return {
        register,
        user,
        errors,
        getData,
        deleteUser,
        users
    }
}

export default useUsers
