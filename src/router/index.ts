import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/ui/HomePage.vue';
import PollCreatePage from '../components/ui/PollCreatePage.vue';
import FormCreatePage from '../components/ui/FormCreatePage.vue';
import PollVote from '../components/polls/PollVote.vue';
import FormView from '../components/forms/FormView.vue';
import FormResults from '../components/forms/FormResults.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/polls/create',
    name: 'PollCreatePage',
    component: PollCreatePage,
  },
  {
    path: '/polls/:id',
    name: 'PollVote',
    component: PollVote,
    props: true,
  },
  {
    path: '/forms/create',
    name: 'FormCreatePage',
    component: FormCreatePage,
  },
  {
    path: '/forms/:id',
    name: 'FormView',
    component: FormView,
    props: true,
  },
  {
    path: '/forms/:id/results',
    name: 'FormResults',
    component: FormResults,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
