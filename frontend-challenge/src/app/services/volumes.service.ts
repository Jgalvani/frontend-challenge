import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class VolumesService {

  private volumes: any[];
  private categories: any[];
  private APIRootURL: string;
  public isChart: boolean;

  constructor(private httpClient: HttpClient) {
    this.APIRootURL = 'http://localhost:3000/api/';
    this.volumes = [];
    this.categories = [];
    this.isChart = false;
  };


  getVolumesFromAPI(name: string) {

    return new Promise(
      (resolve, reject) => {
          if (name.slice(0, 7) === 'volumes') {
          this.httpClient.get<any[]>(this.APIRootURL + name).subscribe(

            (response) => {
              this.volumes = response;
              console.log('Volumes GET success');
              this.isChart = true;
              //this.emitVolumesSubject();
              //this.emitIsChartSubject();
              resolve(response);

            }, (error) => {
              this.volumes = [] as any;
              console.log('Volumes GET failed');
              reject(error);
          });
        } else {
          this.volumes = [] as any;
            console.log('Volumes GET failed');
        }
      });
  }

  listVolumesFromAPI() {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get<string[]>(this.APIRootURL + 'files').subscribe(

          (response) => {
            let volumeList = [];
            for (const fileName of response) {
              if (fileName.slice(0, 7) === 'volumes') {
              volumeList.push(fileName)
              }
            };
            console.log('Volumes list GET success');
            resolve(volumeList);

          }, (error) => {
            console.log('Volumes list GET failed');
            reject(error);
        });
      });
  }

  getCategoriesFromAPI() {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get<string[]>(this.APIRootURL + 'categories').subscribe(

          (response) => {
            this.categories = response as any;
            console.log('Categories GET success');
            resolve(response);

          }, (error) => {
            console.log('Categories GET failed');
            reject(error);
        });
      });
  }

}
