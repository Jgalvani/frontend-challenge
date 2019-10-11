import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../canvasjs.min';
import { VolumesService } from '../services/volumes.service';
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evolution-graph',
  templateUrl: './evolution-graph.component.html',
  styleUrls: ['./evolution-graph.component.scss']
})
export class EvolutionGraphComponent implements OnInit {

  //volumesSubscription: Subscription;
  //isChartSubscription: Subscription;
  private volumes: any[];
  private index: number;
  private dataPoints: any[];
  private isChart: boolean;
  private chart: CanvasJS.Chart;
  private category: string;


  constructor(
    private volumesService: VolumesService,
    private route: ActivatedRoute,) {
    this.volumes = [];
    this.index = 0;
    this.dataPoints = [];
    this.isChart = false;
    this.category = '';
  }

  ngOnInit() {
    const name = this.route.snapshot.params['name'];

    this.volumesService.getVolumesFromAPI(name).then(
      (volumes: any[]) => {
        if (volumes) {
          this.volumes = volumes;
          this.index = volumes.length - 12;

          this.getDataPoints();
        } else {
          this.volumes = [] as any;
        }

        if (this.volumes) {
          this.isChart = this.volumesService.isChart;
          this.getCategory(name);
          // Chart is automatically rendered when this.category is set.
        }
      }, error => {
        console.log(error);
      });
  }

  recursiveCategorySearch(categoryList, id: number) {
    for (const category of categoryList) {

      if (category['id'] === id) {
        this.category = category['name'];
      } else {
        this.recursiveCategorySearch(category['children'], id);
      }
    }
  }

  getCategory(name: string) {

    this.volumesService.getCategoriesFromAPI().then(

      (categories: any[]) => {
        const id = +name.split('-')[1]
                        .split('.')[0];

        if (categories['id'] === id) {
          this.category = categories['name'];

        } else {

          while (!this.category) {
            let parentCategories = categories;
            let childCategories = parentCategories['children'];

            for (const category of childCategories)  {
              this.recursiveCategorySearch(category['children'], id);
            }
          }
        }
        this.getChart();
      });
  }

  getDataPoints() {
    const len = this.volumes.length;
    let end = this.index + 12;
    this.dataPoints = [];

    if (end > len) {
      end = len;
    }
    const volumes = this.volumes.slice(this.index, end);
          for (const volume of volumes) {
            this.dataPoints.push({
              y: volume['volume'],
              label: volume['timespan']
            });
    }
  }

  getChart() {
    this.chart = new CanvasJS.Chart("volumesChart", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "volume of searches in Google for: " + this.category
      },
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });

    this.chart.render();
  }
  getPreviousMonths() {
    const previousIndex = this.index;

    if (this.index >= 12) {
      this.index -= 12;
    } else {
      this.index = 0;
    }

    if (this.index !== previousIndex){
      this.getDataPoints();
      this.getChart();
    }
  }

  getNextMonths() {
    const len = this.volumes.length;
    const previousIndex = this.index;

    if (this.index <= len - 24) {
      this.index += 12;
    } else {
      this.index = len - 12;
    }

    if (this.index !== previousIndex){
      this.getDataPoints();
      this.getChart();
    }
  }

}
