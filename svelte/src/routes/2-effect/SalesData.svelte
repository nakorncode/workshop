<script lang="ts">
  import * as echarts from 'echarts';
  import { onMount } from 'svelte';

  let saleData = $state({
    shirts: 5,
    cardigans: 20,
    chiffons: 36,
    pants: 10,
    heels: 10,
    socks: 20
  });

  let myChart: echarts.ECharts | null = null;

  function updateSaleData() {
    if (myChart) {
      myChart.setOption({
        series: [{
          data: [saleData.shirts, saleData.cardigans, saleData.chiffons, saleData.pants, saleData.heels, saleData.socks]
        }]
      });
    }
  }

  // เมื่อ Component เริ่มใช้งาน และเรนเดอร์ HTML ครบหมดแล้ว
  onMount(() => {
    const chartDom = document.getElementById('chart')!;
    myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: 'Sales Data'
      },
      tooltip: {},
      xAxis: {
        data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
      },
      yAxis: {},
      series: [{
        name: 'Sales',
        type: 'bar',
        data: [saleData.shirts, saleData.cardigans, saleData.chiffons, saleData.pants, saleData.heels, saleData.socks]
      }]
    };
    myChart.setOption(option);
    updateSaleData();
  })

  // เมื่อ $state() ภายในมีการเปลี่ยนแปลง จะมีการรัน $effect() ใหม่อีกครั้ง
  $effect(() => {
    updateSaleData();
  })
</script>

<div id="chart" class="h-100"></div>

<div class="space-y-4 grid grid-cols-6 gap-4">
  <label class="block">
    <span>Shirts:</span>
    <input class="input" type="number" value={saleData.shirts} oninput={e => saleData.shirts = +(e.target as HTMLInputElement).value} placeholder="Shirts" />
  </label>
  <label class="block">
    <span>Cardigans:</span>
    <input class="input" type="number" value={saleData.cardigans} oninput={e => saleData.cardigans = +(e.target as HTMLInputElement).value} placeholder="Cardigans" />
  </label>
  <label class="block">
    <span>Chiffons:</span>
    <input class="input" type="number" value={saleData.chiffons} oninput={e => saleData.chiffons = +(e.target as HTMLInputElement).value} placeholder="Chiffons" />
  </label>
  <label class="block">
    <span>Pants:</span>
    <input class="input" type="number" value={saleData.pants} oninput={e => saleData.pants = +(e.target as HTMLInputElement).value} placeholder="Pants" />
  </label>
  <label class="block">
    <span>Heels:</span>
    <input class="input" type="number" value={saleData.heels} oninput={e => saleData.heels = +(e.target as HTMLInputElement).value} placeholder="Heels" />
  </label>
  <label class="block">
    <span>Socks:</span>
    <input class="input" type="number" value={saleData.socks} oninput={e => saleData.socks = +(e.target as HTMLInputElement).value} placeholder="Socks" />
  </label>
</div>
