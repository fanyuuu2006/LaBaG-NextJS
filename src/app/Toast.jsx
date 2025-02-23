import Swal from "sweetalert2";
import "@/styles/Toast.css"

const Toast = Swal.mixin({
    toast: true,                
    position: 'center',         
    iconColor: 'white',          
    customClass: {
        popup: 'colored-toast', // 自訂css
    },
    showConfirmButton: false,     
    timer: 3000,                  
    timerProgressBar: true,       
});

export default Toast;