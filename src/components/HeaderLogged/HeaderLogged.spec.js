import { shallowMount } from "@vue/test-utils";
import { routes } from "@/router";
import HeaderLogged from '.';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

//mockando a store
const mockStore = {currentUser: {}}
jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('components.HeaderLogged', () => {
  it('Deve renderizar o coomponente HeaderLogged corretamente', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global:{
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  //o teste abaixo não depende dos dados armazenados na store, então não é preciso mocká-la
  it('Deve renderizar o texto "sair" no botão de logout quando não houver usuário logado', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(HeaderLogged, {
      global:{
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button')
    expect(buttonLogout.text()).toBe('sair')
  })

  //o teste abaixo depende dos dados armazenados na store, então é preciso mocká-la (insere-se um nome para o currentUser para enganar o teste de forma que ele pense que há um usuário logado)
  it('Deve renderizar o texto "nome do usuário (sair)" no botão de logout quando houver um usuário logado', async () => {
    router.push('/')
    await router.isReady()

    mockStore.currentUser.name = 'teste'

    const wrapper = shallowMount(HeaderLogged, {
      global:{
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button')
    expect(buttonLogout.text()).toBe('teste (sair)')
  })
})
