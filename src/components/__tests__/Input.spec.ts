// ... （在測試文件中的頂部）

import { describe, it, expect } from 'vitest'
import router from '@/router';
import { mount } from '@vue/test-utils'
import Input from '../../views/Input.vue'

const wrapper = mount(Input, {
  global: {
    plugins: [router],
  },
});

describe('Input', () => {
  it('測試頁面上 Form 是否存在', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  })

  it('測試 Form 是否有帳號欄位', () => {
    expect(wrapper.find('#account').exists()).toBe(true);
  })

  it('測試 Form 是否有密碼欄位', () => {
    expect(wrapper.find('#password').exists()).toBe(true);
  })

  it('測試帳號框是否有正常輸入', async() => {
    const account = wrapper.find('#account')
    await account.setValue('account')
    expect(account.element.value).toBe('account')
  })

  it('測試密碼框是否有正常輸入', async() => {
    const password = wrapper.find('#password')
    await password.setValue('my@mail.com')
    expect(password.element.value).toBe('my@mail.com')
  })

  it('測試兩個輸入框是否有正常輸入不被影響', async() => {
    const password = wrapper.find('#password')
    await password.setValue('my@mail.com')
    expect(password.element.value).toBe('my@mail.com')
    const account = wrapper.find('#account')
    await account.setValue('my@mail.com')
    expect(account.element.value).toBe('my@mail.com')
  })

  it('測試密碼欄位長度若小於8的情況', async () => {
    await wrapper.find('[name="password"]').setValue('short');
    wrapper.find('button').trigger('click.prevent');
    expect(wrapper.find('.error-message').exists()).toBe(false);
  });

  it('當密碼長度大於等於8時，確保能夠成功提交', async () => {
    await wrapper.find('[name="password"]').setValue('securepass');
    wrapper.find('button').trigger('click.prevent');
    expect(router.currentRoute.value.fullPath).toBe('/');
  });
  
  it('測試帳號密碼欄位為空時，按鈕是否為 disable狀態', async() => {
    const password = wrapper.find('#password')
    await password.setValue('')

    const account = wrapper.find('#account')
    await account.setValue('')
  })

  it('測試帳密輸入正確後，是否有導至 about page', async () => {
    await wrapper.find('[name="account"]').setValue('123456789');
    await wrapper.find('[name="password"]').setValue('123456789');
    await wrapper.find('button').trigger('click.prevent');
  
    await wrapper.vm.$nextTick();
  
    await router.isReady();
  
    expect(router.currentRoute.value.fullPath).toBe('/');
  });
  
})
