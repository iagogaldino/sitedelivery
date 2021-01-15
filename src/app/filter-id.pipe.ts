import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterId'
})
export class FilterIdPipe implements PipeTransform {

  transform(items: any[], term: string): any {
    try {
      if (!term) { return items; }
      if (term === 'undefined') {  return items; }

      const cc = items.filter(item => item.nome.toLowerCase().indexOf(term.toLowerCase()) !== -1);
      return cc;

    } catch (e) { console.log('?'); return items; }
}

}
