import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';

import { ClipboardService } from 'ngx-clipboard';
import tinycolor from 'tinycolor2';

class Color {
  name: string;
  value: string;
  valueDark: string;
  valueLight: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('code') code: ElementRef;
  editMode = false;
  color: Color;

  @ViewChild('colorinput') myTarget: ElementRef;

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    console.log(event.target);
    console.log(event.srcElement.id);

    if (event.srcElement.id === 'colorLabel') {
      this.editMode = true;
    } else if (event.srcElement.id !== 'colorInput') {
      this.editMode = false;
    }
  }
  constructor(private _clipboardService: ClipboardService) {}

  ngOnInit(): void {
    this.color = new Color();

    this.color.value = '#a8ff00';
    this.color.name = '$base-color';
    this.changeColor(this.color.value);
  }

  changeColor(colorValue) {
    // should get 20 from user
    this.color.valueDark = tinycolor(this.color.value)
      .darken(20)
      .toString();

    this.color.valueLight = tinycolor(this.color.value)
      .lighten(20)
      .toString();
  }
  // toggleEditMode() {
  //   this.editMode = true;
  // }
  copyToClipboard() {
    console.log(this.code.nativeElement.innerText);
    const text = this.code.nativeElement.innerText;
    this._clipboardService.copyFromContent(text);
  }
}
