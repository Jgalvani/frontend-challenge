import { Component, OnInit } from '@angular/core';
import { VolumesService } from '../services/volumes.service';

@Component({
  selector: 'app-select-volume',
  templateUrl: './select-volume.component.html',
  styleUrls: ['./select-volume.component.scss']
})
export class SelectVolumeComponent implements OnInit {

  private volumeList: string[];

  constructor(private volumesService: VolumesService) {
    this.volumeList = [];
   }

  ngOnInit() {
    this.volumesService.listVolumesFromAPI().then(
      (volumeList: string[]) => {
        this.volumeList = volumeList;
      });
  }

}
