

import {toast} from 'react-toastify'
export const notify=(message,type)=>{
   toast[type](message)
}
export const API_URL='https://task-manager-app-api-rosy.vercel.app';
