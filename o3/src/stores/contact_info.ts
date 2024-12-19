import { defineStore } from 'pinia'

export const contact_info_store = defineStore('contact_info', {
    state: () => {
        return {
            name:  "",
            email: "",
            message: ""
        }
    },
});
