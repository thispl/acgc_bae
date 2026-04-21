<template>
  <!-- Header Section -->
  <div class="bg-white flex p-5 items-center">
    <div class="flex flex-row">
     <img src="../assets/icons/ACGC LOGO FULL NAME.png" class="h-10" /><span><h1 class="font-semibold text-2xl ml-[20px] mt-[5px]">Monthly Progress Observation and Analysis - {{ this.selectedMonth }} {{this.selectedYear}}</h1></span>
    </div>

    <!-- Filter Section -->
    <div class="ml-auto flex gap-3">
      <!-- Date -->
      <!-- <input type="date" value="2025-11-12" class="border border-gray-300 rounded-md px-3 py-1 text-sm"></input>
      <input type="date" value="2025-11-12" class="border border-gray-300 rounded-md px-3 py-1 text-sm"></input> -->

      <!-- Project -->
      <!-- <input placeholder="Project" class="border border-gray-300 rounded-md px-3 py-1 text-sm"></input> -->

       <!-- Month -->
      <select v-model="selectedMonth" class="border border-gray-300 rounded-md px-2 py-1 text-sm w-30">
        <option value="" disabled>Select an Month</option>
        <option
            v-for="month in months" :key="month.id" :value="month.name"
        >
            {{ month.name }}
        </option>
      </select>

       <!-- Year -->
      <select v-model="selectedYear" class="border border-gray-300 rounded-md px-2 py-1 text-sm w-20">
        <option value="" disabled>Select an Year</option>
        <option
            v-for="year in years" :key="year.id" :value="year.name"
        >
            {{ year.name }}
        </option>
      </select>


      <!-- Site -->
      <select v-model="selectedSite" class="border border-gray-300 rounded-md px-2 py-1 text-sm w-20">
        <option value="" disabled>Select an Site</option>
        <option
            v-for="site in sites" :key="site.id" :value="site.name"
        >
            {{ site.name }}
        </option>
      </select>

   

      <!-- Employee -->
      <!-- <select v-model="selectedEmployee" class="border border-gray-300 rounded-md px-3 py-1 text-sm w-20">
        <option value="" disabled>Select an employee</option>
        <option
            v-for="employee in employees" :key="employee.id" :value="employee.name"
        >
            {{ employee.name }}
        </option>
      </select> -->

      <button type="button" @click="applyFilter()" class="bg-black text-white rounded-md px-5 py-1.5 text-sm">Filter</button>
    </div>
  </div>
  <!-- Tabs Section -->
  <div class="grid grid-cols-12 gap-5 mt-5" :key="gridKey">
    <div class="bg-white col-span-3 p-5 ">
        <h1 class="text-gray-400 font-medium">Departments</h1>
        <div>
            <!-- Management Button -->
            <router-link to="/management" @click="activeDepartment='management'" class="flex font-semibold px-3 py-1 mt-3 w-full text-left border border-gray-300 rounded-md transition-all duration-300 ease-in-out"
            active-class="border border-[#fba800] bg-[#fefdec]">
                Management & Overview
                <span class="ml-auto flex items-center">
                    <svg class="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="7 7 12 12 7 17" />
                        <polyline points="13 7 18 12 13 17" />
                    </svg>
                </span>
            </router-link>
            <!-- Maintenance Button -->
            <router-link to="/maintenance" @click="activeDepartment='maintenance'" class="flex font-semibold px-3 py-1 mt-3 w-full text-left border border-gray-300 rounded-md transition-all duration-300 ease-in-out"
            active-class="border border-[#fba800] bg-[#fefdec]">
                Maintenance
                <span class="ml-auto flex items-center">
                    <svg class="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="7 7 12 12 7 17" />
                        <polyline points="13 7 18 12 13 17" />
                    </svg>
                </span>
            </router-link>
            <!-- HR Button -->
            <router-link to="/hr" @click="activeDepartment='hr'" class="flex font-semibold px-3 py-1 mt-3 w-full text-left border border-gray-300 rounded-md transition-all duration-300 ease-in-out"
            active-class="border border-[#fba800] bg-[#fefdec]">
                HR
                <span class="ml-auto flex items-center">
                    <svg class="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="7 7 12 12 7 17" />
                        <polyline points="13 7 18 12 13 17" />
                    </svg>
                </span>
            </router-link>
            <!-- Safety, health & Environment Button -->
            <router-link to="/safety" @click="activeDepartment='safety'" class="flex font-semibold px-3 py-1 mt-3 w-full text-left border border-gray-300 rounded-md transition-all duration-300 ease-in-out"
            active-class="border border-[#fba800] bg-[#fefdec]">
                Safety, health & Environment
                <span class="ml-auto flex items-center">
                    <svg class="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="7 7 12 12 7 17" />
                        <polyline points="13 7 18 12 13 17" />
                    </svg>
                </span>
            </router-link>

            <!-- Warehouse & Procurement Button -->
            <!-- <router-link to="/warehouse" @click="activeDepartment='warehouse'" class="flex font-semibold px-3 py-1 mt-3 w-full text-left border border-gray-300 rounded-md transition-all duration-300 ease-in-out"
            active-class="border border-[#fba800] bg-[#fefdec]">
                Warehouse & Procurement
                <span class="ml-auto flex items-center">
                    <svg class="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="7 7 12 12 7 17" />
                        <polyline points="13 7 18 12 13 17" />
                    </svg>
                </span>
            </router-link> -->


            <!-- Customer SLA Button -->
            <!-- <router-link to="/customer-sla" @click="activeDepartment='customer'" class="flex font-semibold px-3 py-1 mt-3 w-full text-left border border-gray-300 rounded-md transition-all duration-300 ease-in-out"
            active-class="border border-[#fba800] bg-[#fefdec]">
                Customer SLA
                <span class="ml-auto flex items-center">
                    <svg class="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="7 7 12 12 7 17" />
                        <polyline points="13 7 18 12 13 17" />
                    </svg>
                </span>
            </router-link> -->

            <!-- Operations Button -->
            <router-link to="/operations" @click="activeDepartment='operations'" class="flex font-semibold px-3 py-1 mt-3 w-full text-left border border-gray-300 rounded-md transition-all duration-300 ease-in-out"
            active-class="border border-[#fba800] bg-[#fefdec]">
                Operations
                <span class="ml-auto flex items-center">
                    <svg class="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="7 7 12 12 7 17" />
                        <polyline points="13 7 18 12 13 17" />
                    </svg>
                </span>
            </router-link>
        </div>
    </div>
    <div class="col-span-9">
        <router-view />
    </div>

    
</div>
<!-- <div class="w-full" style="color:#666666; text-align:end;"><p>Powered by <b style='color:#211a4b;'>TEAMPRO</b></p></div> -->


</template>

<script>
import { useFilterStore } from '@/stores/filterStore';
import { useFilterOrgChartStore } from '@/stores/filterOrgChartStore';

export default {
    

  data() {
    return {
      employees: [
        { id: 1, name: "Riyaz" },
        { id: 2, name: "Amar" },
      ],
      sites: [
        // { id: "EWRC", name: "EWRC" },
        { id: "PS10", name: "PS10" },
        { id: "PS06", name: "PS06" },
        { id: "PS03", name: "PS03" },
        { id: "PS01", name: "PS01" },
        { id: "PRS1", name: "PRS1" },
        { id: "PS05", name: "PS05" },
       
      ],

      months:[
        {id:1 , name:"January"},
        {id:2 , name:"February"},
        {id:3 , name:"March"},
        {id:4 , name:"April"},
        {id:5 , name:"May"},
        {id:6 , name:"June"},
        {id:7 , name:"July"},
        {id:8 , name:"August"},
        {id:9 , name:"September"},
        {id:10 , name:"October"},
        {id:11 , name:"November"},
        {id:12 , name:"December"},
      ],

      years:[
     
      {id:2021 , name:"2021"},
      {id:2022 , name:"2022"},
      {id:2023 , name:"2023"},
      {id:2024 , name:"2024"},
      {id:2025 , name:"2025"},
      {id:2026 , name:"2026"},
      {id:2027 , name:"2027"},
      {id:2028 , name:"2028"},
      {id:2029 , name:"2029"},
      {id:2030 , name:"2030"}

      ],



      selectedEmployee: "Riyaz",
      selectedSite: "PS10",
      selectedMonth: "",
      selectedYear: "",
      gridKey: 0,
      
    };
  },

  created() {
    const now = new Date();
    now.setMonth(now.getMonth() - 1); // shows the previous month
    const currentMonthIndex = now.getMonth();
    const currentYearValue = now.getFullYear();

    this.selectedMonth = this.months[currentMonthIndex].name;
    this.selectedYear = currentYearValue.toString();
    this.applyFilter();
  },

    methods: {
    


      applyFilter() {
      const filterStore = useFilterStore();  

      const filterorgchartStore = useFilterOrgChartStore();  

      filterStore.setFilters({
        year: Number(this.selectedYear),
        month: this.selectedMonth,
        site: this.selectedSite
      });

      filterorgchartStore.setFilters({
        site:this.selectedSite
      })

     

      this.gridKey++; 
     
    }





  }


};
</script>

<style scoped>
    option {
        width: 10px;
    }
</style>
