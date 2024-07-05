import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'marketValue'
})
export class MarketValuePipe implements PipeTransform {
  transform(value: string): string {
    const numericValue = parseFloat(value.slice(1, -1));
    const formattedNumber = (numericValue % 1 === 0 ?
      numericValue.toString() : numericValue.toFixed(1)
    ).replace(/\.0$/, '');
    return `€${formattedNumber}${value.slice(-1)}`;
  }
}
