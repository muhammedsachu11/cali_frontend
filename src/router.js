import Vue from 'vue'
import Router from 'vue-router'


import HrSlotplanner from './components/HrSlotplanner.vue'

import CandidateSlot from './components/CandidateSlot.vue'




Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [


    { path: '/', name: 'hrslotplanner', component: HrSlotplanner },
    { path: '/hrslotplanner', name: 'hrslotplanner', component: HrSlotplanner },
    { path: '/candidateslot', name: 'candidateslot', component: CandidateSlot },


  ]
})

