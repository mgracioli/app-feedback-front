import Home from '.'
import { routes } from '../../router'
import { createRouter, createWebHistory } from 'vue-router'
import { shallowMount } from '@vue/test-utils'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('views.Home', () => {
  it('Deve carregar a página Home corretamente', async () => {
    router.push('/')
    await router.isReady()  //os testes só serão rodados quando o router estiver pronto

    //shallowMount - monta só o componente Home, não monta os componentes internos da Home (ex.: CustomHeader, Contact...)
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })

    //toMatchSnapShot vai criar um snapshot, se ele ainda não existir, e comparar com o que está sendo carregado, se ambos forem iguais, oteste passa (nesse caso, ele vai serializar o html  da página Home, ou seja, transformar seu HTML em uma string e comparar ele com o HTML gerado nas proximas vezes que o teste for rodado)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
