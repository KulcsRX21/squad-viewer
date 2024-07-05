import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(/[\s-]+/).map(word => word[0].toUpperCase()).join('');
  }
}
