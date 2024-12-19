
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils'

import TestComponent from '../../src/components/TestComponent.vue'

describe('Contact_form', () => {
    const wrapper = mount(TestComponent)

    it('should render the events', () => {

        const title = wrapper.find("h1")

        expect(title.html()).toContain("Hello World!");

        expect(true).toBe(true)
    })
}) 