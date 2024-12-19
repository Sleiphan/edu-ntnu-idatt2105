


import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils'

import Calculator from '../Calculator.vue'

describe('Calculator', () => {
    it('1 + 2 = 3', async () => {
        const wrapper = mount(Calculator);

        const btn_1 = wrapper.find('[data-testid="calc-btn-1"]');
        const btn_2 = wrapper.find('[data-testid="calc-btn-2"]');
        const btn_plus = wrapper.find('[data-testid="calc-btn-plus"]');
        const btn_equals = wrapper.find('[data-testid="calc-btn-equals"]');
        const display = wrapper.find('[data-testid="calc-display"]');

        await btn_1.trigger('click');
        await btn_plus.trigger('click');
        await btn_2.trigger('click');
        await btn_equals.trigger('click');
        await expect(display.text()).toBe('3');
    })

    it('2 - 3 = -1', async () => {
        const wrapper = mount(Calculator);

        const btn_2 = wrapper.find('[data-testid="calc-btn-2"]');
        const btn_3 = wrapper.find('[data-testid="calc-btn-3"]');
        const btn_minus = wrapper.find('[data-testid="calc-btn-minus"]');
        const btn_equals = wrapper.find('[data-testid="calc-btn-equals"]');
        const display = wrapper.find('[data-testid="calc-display"]');

        await btn_2.trigger('click');
        await btn_minus.trigger('click');
        await btn_3.trigger('click');
        await btn_equals.trigger('click');
        await expect(display.text()).toBe('-1');
    })

    it('2 * 3 = 6', async () => {
        const wrapper = mount(Calculator);

        const btn_2 = wrapper.find('[data-testid="calc-btn-2"]');
        const btn_3 = wrapper.find('[data-testid="calc-btn-3"]');
        const btn_minus = wrapper.find('[data-testid="calc-btn-multiply"]');
        const btn_equals = wrapper.find('[data-testid="calc-btn-equals"]');
        const display = wrapper.find('[data-testid="calc-display"]');

        await btn_2.trigger('click');
        await btn_minus.trigger('click');
        await btn_3.trigger('click');
        await btn_equals.trigger('click');
        await expect(display.text()).toBe('6');
    })

    it('2 / 4 = 0.5', async () => {
        const wrapper = mount(Calculator);

        const btn_2 = wrapper.find('[data-testid="calc-btn-2"]');
        const btn_4 = wrapper.find('[data-testid="calc-btn-4"]');
        const btn_divide = wrapper.find('[data-testid="calc-btn-divide"]');
        const btn_equals = wrapper.find('[data-testid="calc-btn-equals"]');
        const display = wrapper.find('[data-testid="calc-display"]');

        await btn_2.trigger('click');
        await btn_divide.trigger('click');
        await btn_4.trigger('click');
        await btn_equals.trigger('click');
        await expect(display.text()).toBe('0.5');
    })

    it('number buttons write to the display', async () => {
        const wrapper = mount(Calculator);

        var text = '';

        const display = wrapper.find('[data-testid="calc-display"]');

        for (var i = 1; i < 10; i++) {
            const num = wrapper.find('[data-testid="calc-btn-'+i+'"]');
            await num.trigger('click');
            text = text.concat(''+i);
            expect(display.text()).toBe(text);
        }

        const num = wrapper.find('[data-testid="calc-btn-0"]');
        await num.trigger('click');
        text = text.concat('0');
        expect(display.text()).toBe(text);
    })

    it('0-button does not add unnecessary zeros', async () => {
        const wrapper = mount(Calculator);

        const btn_0 = wrapper.find('[data-testid="calc-btn-0"]');
        const btn_1 = wrapper.find('[data-testid="calc-btn-1"]');
        const display = wrapper.find('[data-testid="calc-display"]');

        expect(display.text()).toBe('0');
        await btn_0.trigger('click');
        await btn_0.trigger('click');
        await btn_0.trigger('click');
        await btn_0.trigger('click');
        expect(display.text()).toBe('0');
        await btn_1.trigger('click');
        await btn_0.trigger('click');
        expect(display.text()).toBe('10');
    })

    it('delete-button', async () => {
        const wrapper = mount(Calculator);

        const btn_1 = wrapper.find('[data-testid="calc-btn-1"]');
        const btn_del = wrapper.find('[data-testid="calc-btn-delete"]');
        const display = wrapper.find('[data-testid="calc-display"]');

        
        await btn_1.trigger('click');
        await btn_1.trigger('click');
        await btn_del.trigger('click');
        expect(display.text()).toBe('1');
        await btn_1.trigger('click');
        await btn_1.trigger('click');
        await btn_del.trigger('click');
        expect(display.text()).toBe('11');
        await btn_del.trigger('click');
        await btn_del.trigger('click');
        expect(display.text()).toBe('0');
        await btn_del.trigger('click');
        expect(display.text()).toBe('0');
    })
}) 