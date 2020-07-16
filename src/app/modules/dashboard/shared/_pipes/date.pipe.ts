import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let d1 = new Date();
    let d2 = new Date(value);
    var seconds = Math.floor(( d1 - d2) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + "y ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + "m ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + "d ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + "h ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + "m ago";
    }
    return Math.floor(seconds) + "s ago";
  }

}
