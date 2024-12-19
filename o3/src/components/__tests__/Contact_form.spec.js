


import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils'

import ContactForm from '../ContactForm.vue'

describe('ContactForm', () => {

    const test_name = "Håkon F. Fjellanger";
    const test_mail = "hfredrif@gmail.com";
    const test_msg = "This is a short little message just to say hi :3";
    

    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    });

    it('Fields are initially empty', async () => {
        const wrapper = mount(ContactForm);
        
        const name = wrapper.find('[data-testid="f_name"]');
        const email = wrapper.find('[data-testid="f_email"]');
        const message = wrapper.find('[data-testid="f_msg"]');

        expect(name.text()).toBe('');
        expect(email.text()).toBe('');
        expect(message.text()).toBe('');
    });

    /*

    it('Cannot submit without name', async () => {
        const wrapper = mount(ContactForm);
        
        const name = wrapper.find('[data-testid="f_name"]');
        const email = wrapper.find('[data-testid="f_email"]');
        const message = wrapper.find('[data-testid="f_msg"]');

        await email.setValue(test_msg);
        await message.setValue(test_msg);

        expect(name.text()).toBe('');
        expect(email.text()).toBe(test_mail);
        expect(message.text()).toBe(test_msg);
    });

    /**/
});