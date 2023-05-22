import {ref} from 'vue'
import axios from 'axios'
const useUsers = () =>{
    const user = ref({
        name:'',
        email:'',
        username:'',
        cedula:'',
        phone:0,
        password:'',
        address:'',
    });
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
            console.log(data);
        } catch (error) {
            if(error.response.status === 422){
                errors.value =error.response.data.errors;
                user.value;
            }
            console.log(errors.value);
        }
    }

    return {
        register,
        user,
        errors,
    }
}

export default useUsers
