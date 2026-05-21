<template>
  <!-- Tabs -->
  <div class="bg-white flex flex-nowrap gap-2 justify-center overflow-x-auto items-center">
    <button @click="activeTab='Summary'" class="font-semibold w-full text-sm text-center h-8 pt-1 px-2"
      :class="{'border-b-2 border-b-[#fba800] bg-[#fefdec]': activeTab === 'Summary' }">
      Summary
    </button>
    <p>|</p>
    <button @click="activeTab='Safety'" class="font-semibold w-full text-sm text-center h-8 pt-1 px-2"
      :class="{'border-b-2 border-b-[#fba800] bg-[#fefdec]': activeTab === 'Safety' }">
      Safety
    </button>
    <p>|</p>
    <button @click="activeTab='Safety Training'" class="font-semibold w-full text-sm text-center h-8 pt-1 px-2"
      :class="{'border-b-2 border-b-[#fba800] bg-[#fefdec]': activeTab === 'Safety Training' }">
      Safety Training
    </button>
  </div>
  <!-- Charts -->

  <div class="mt-4 bg-white">

  <!-- Summary -->
   <div v-if="activeTab =='Summary'" style="background-color: white;" class="pb-[10px]" >

     <div>
                <h1 class="text-3xl font-semibold text-center mb-3 mt-5 pt-5">Safety and Environment Summary</h1>
                
                
                
    </div>

      <div v-if="safetyEnvironmentDataFiltered.length" class="ml-[10px] my-[20px] w-full h-[100px] flex gap-10">

                <CountCard 
                    :countCardData="{
                        count: safetyEnvironmentDataFiltered[0].totals.applicable,
                        title: 'Applicable',
                        data: safetyEnvironmentDataFiltered[0].applicable
                    }"
                    />

                <CountCard 
                :countCardData="{
                    count: safetyEnvironmentDataFiltered[0].totals.actual,
                    title: 'Actual',
                    data: safetyEnvironmentDataFiltered[0].actual
                }"
                /> 

                <CountCard 
                :countCardData="{
                    count: safetyEnvironmentDataFiltered[0].totals.percentage,
                    title: 'Overall Percentage',
                    data: safetyEnvironmentDataFiltered[0].percentage
                }"
                />    

            </div>

             <div v-else class="text-center mt-5 text-gray-500">
                    No data available for selected filters.
                </div>


   </div>

  <!-- Safety  -->

  <div v-if="activeTab =='Safety'" style="background-color: white;" >


     <!-- Safety -->

         <div>
            <div>
                <h1 class="text-3xl font-semibold text-center mb-3 mt-5 pt-5">Safety - <span class="bg-gradient-to-t from-[#fd2b94] via-[#fba800] to-[#fd2b94] bg-clip-text text-transparent">Casewise</span></h1>
                
                
                
            </div>

            <div class="flex gap-5 justify-center">
                <div v-if="safetyDataFiltered.length"  class="flex flex-col gap-4  w-full">
                    <PolarAreaChart :chartData="safetyDataFiltered"  />
                </div>

                <div v-else class="text-center mt-5 text-gray-500">
                    No data available for selected filters.
                </div>
                
            </div>
        </div>

       


         <!-- Safety And Environment -->

         <div>
            <div>
                <h1 class="text-3xl font-semibold text-center mb-3 mt-5 pt-5">Safety and Environment</h1>
                
                
                
            </div>

            <div v-if="safetyEnvironmentDataFiltered.length" class="ml-[10px] my-[20px] w-full h-[100px] flex gap-10">

                <CountCard 
                    :countCardData="{
                        count: safetyEnvironmentDataFiltered[0].totals.applicable,
                        title: 'Applicable',
                        data: safetyEnvironmentDataFiltered[0].applicable
                    }"
                    />

                <CountCard 
                :countCardData="{
                    count: safetyEnvironmentDataFiltered[0].totals.actual,
                    title: 'Actual',
                    data: safetyEnvironmentDataFiltered[0].actual
                }"
                /> 

                <CountCard 
                :countCardData="{
                    count: safetyEnvironmentDataFiltered[0].totals.percentage,
                    title: 'Overall Percentage',
                    data: safetyEnvironmentDataFiltered[0].percentage
                }"
                />    

            </div>

            <div v-if="safetyEnvironmentDataFiltered.length" class="ml-[150px]">
                <div   class=" ">
                    <HeatMapChart :chartData="safetyEnvironmentDataFiltered" title="" />
                </div>

                

            </div> 
            <div v-else class="text-center mt-5 text-gray-500">
                    No data available for selected filters.
                </div>   
                
            
        </div>



  </div>



  <!-- Safety Training -->
  <div v-if="activeTab =='Safety Training'" style="background-color: white;" >

     <!-- Safety Training On -->

         <div>
            <div>
                <h1 class="text-3xl font-semibold text-center mb-3 mt-5 pt-5">Safety Training On</h1>
                
                
                
            </div>

            <div class="">
                <div v-if="safetyTrainingOnDataFiltered.length"  class=" ">
                    <HorizontalBarChart :chartData="safetyTrainingOnDataFiltered" />
                </div>

                <div v-else class="text-center mt-5 text-gray-500">
                    No data available for selected filters.
                </div> 

            </div>    
                
            
        </div>


  </div>


  <div class="w-full" style="color:#666666; text-align:end;"><p>Powered by <b style='color:#211a4b;'>TEAMPRO</b></p></div>
  </div>
   
</template>

<script>

import { computed } from 'vue';
import { useFilterStore } from '@/stores/filterStore';

import HorizontalBarChart from '@/components/chart/HorizontalBarChart.vue';
import PolarAreaChart from '@/components/chart/PolarAreaChart.vue';
import HeatMapChart from '@/components/chart/HeatMapChart.vue';
import CountCard from '@/components/CountCard.vue';


import safetyTrainingOnData from '@/data/maintenance/safety_training_on.js';
import safetyData from '@/data/maintenance/safety.js';
import safetyEnvironmentData from '@/data/maintenance/safety_and_environment.js';



export default {
  
  props: {
    isAutoRotateStopped: Boolean
  },

     setup(){

    const filterStore = useFilterStore();

     const safetyEnvironmentDataFiltered = computed(() =>
            filterStore.applyFilters(safetyEnvironmentData)
            );

     const safetyDataFiltered = computed(() =>
            filterStore.applyFilters(safetyData)
            );

     const safetyTrainingOnDataFiltered = computed(() =>
            filterStore.applyFilters(safetyTrainingOnData)
            );

     return {
               safetyEnvironmentDataFiltered, safetyDataFiltered ,safetyTrainingOnDataFiltered
     } 

     },
  data() {
    return {
      activeTab: 'Summary',
      safetyTrainingOnData,
      safetyData,
      safetyEnvironmentData,
      tabs: [
          'Summary',
          'Safety',
          'Safety Training'
      ],
      childTabIndex: 0,
      childIntervalId: null,
      resumeTimeoutId: null,

    };
  },

  components: {

    HorizontalBarChart,
    PolarAreaChart,
    HeatMapChart,
    CountCard


  },

  mounted() {
  this.startChildRotation();
},

watch: {
  isAutoRotateStopped(newVal) {
    if (newVal) {
      clearInterval(this.childIntervalId);
    } else {
      this.startChildRotation();
    }
  },

  '$route.path'() {
    this.childTabIndex = 0;
    this.activeTab = this.tabs[0];

    if (!this.isAutoRotateStopped) {
      this.startChildRotation();
    } else {
      clearInterval(this.childIntervalId);
    }
  }
},
beforeUnmount() {
  if (this.childIntervalId) {
    clearInterval(this.childIntervalId);
  }
},

  methods: {
startChildRotation() {
  if (this.childIntervalId) {
    clearInterval(this.childIntervalId);
  }

  if (this.isAutoRotateStopped) return;

  this.childIntervalId = setInterval(() => {
    this.childTabIndex++;

    if (this.childTabIndex >= this.tabs.length) {
      this.childTabIndex = 0;
      this.$emit('child-cycle-complete');
    }

    this.activeTab = this.tabs[this.childTabIndex];
  }, 5000);
}
  }
};
</script>
