import Swal from 'sweetalert2'

const ICONS = {
    0: 'success',
    1: 'error',
    2: 'warning',
    3: 'info'
}

const showAlert = ({title,text,icon}) => {
    Swal.fire({
        title,
        text,
        icon: ICONS[icon] || 'info'
    })
}

export default showAlert