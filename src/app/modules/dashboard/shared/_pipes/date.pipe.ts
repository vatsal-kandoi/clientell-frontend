import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    console.log(value);
    let date = new Date(value).toLocaleDateString();
    return date;
  }

}
