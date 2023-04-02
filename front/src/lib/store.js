import { writable } from 'svelte/store'
import { browser } from "$app/environment";

export let userId = writable('');

const persist_storage = (key, initValue) => {
    if (browser) {
        const storedValueStr = localStorage.getItem(key)
        const store = writable(storedValueStr != null ? JSON.parse(storedValueStr) : initValue)
        store.subscribe((val) => {
            localStorage.setItem(key, JSON.stringify(val))
        })
        return store
        // window.localStorage.setItem('lists', JSON.stringify($lists))
    }

}

export const user_id = persist_storage("user_id", "")