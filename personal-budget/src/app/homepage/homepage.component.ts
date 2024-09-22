import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartItem } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{

  public dataSource = {
    datasets: [
        {
            data: [Array<{budget: any}>()],
            backgroundColor: [
                '#8ab17d',
                '#588b8b',
                '#ffd5c2',
                '#f28f3b',
                '#c8553d',
                '#2d3047',
                '#93b7be',
            ]
        }
    ],
    labels: [Array<{title: any}>()]
};


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
     this.http.get('http://localhost:3000/budget')
     .subscribe((res: any) => {
       for (var i = 0; i < res.myBudget.length; i++) {
         this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
         this.dataSource.labels[i] = res.myBudget[i].title;
         this.createChart();
     }
     });
  }

  createChart() {
    let chartStatus = Chart.getChart('myChart');
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    var ctx = document.getElementById('myChart') as ChartItem;
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }
}
