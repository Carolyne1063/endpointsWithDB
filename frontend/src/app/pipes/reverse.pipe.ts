import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  transform(sentence: string): string {
    if(!sentence) return sentence;
    return sentence.split('').reverse().join('');
  }
}
