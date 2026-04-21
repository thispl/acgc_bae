<template>
	<apexchart type="bar" height="350" :options="chartOptions" :series="series" />
	<!-- <div v-else class="text-center mt-5 text-gray-500">
      No data available for selected filters.
    </div> -->
</template>

<script>
import { ref, watch, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default {
	name: "StackedBarChart",
	components: { apexchart: VueApexCharts },
	props: {
		chartData: {
			type: Array,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			default: "Stacked Bar Chart",
		},
	},
	setup(props) {
		const series = ref(props.chartData);

		// update series if props change
		watch(
			() => props.chartData,
			(newVal) => {
				series.value = newVal;
			},
		);

		const chartOptions = ref({
			chart: {
				type: "bar",
				height: 350,
				stacked: true,
				background: "#ffffff",
				toolbar: { show: true },
			},
			plotOptions: {
				bar: {
					horizontal: true,
					dataLabels: {
						total: {
							enabled: false,
							offsetX: 0,
							style: {
								fontSize: "13px",
								fontWeight: 900,
							},
						},
					},
				},
			},
			stroke: {
				width: 1,
				colors: ["#fff"],
			},
			title: {
				text: props.title,
			},
			xaxis: {
				categories: props.categories,
				labels: {
					formatter: function (val) {
						return val + "K";
					},
				},
			},
			yaxis: {
				title: { text: undefined },
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val + "K";
					},
				},
			},
			fill: { opacity: 1 },
			legend: {
				position: "bottom",
				horizontalAlign: "left",
				offsetX: 40,
			},
		});

		return { series, chartOptions };
	},
};
</script>

<style scoped></style>
