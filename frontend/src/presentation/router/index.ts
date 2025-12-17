import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CriarSolicitacaoView from '../views/CriarSolicitacaoView.vue';
import ListarSolicitacoesView from '../views/ListarSolicitacoesView.vue';
import DetalheSolicitacaoView from '../views/DetalheSolicitacaoView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/criar',
      name: 'criar',
      component: CriarSolicitacaoView
    },
    {
      path: '/listar',
      name: 'listar',
      component: ListarSolicitacoesView
    },
    {
      path: '/solicitacao/:id',
      name: 'detalhe',
      component: DetalheSolicitacaoView
    }
  ]
});

export default router;

