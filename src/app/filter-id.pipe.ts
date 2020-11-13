import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterId'
})
export class FilterIdPipe implements PipeTransform {

  transform(items: any[], term: string): any {
    if (!term) { return items; }
    console.log(items);
    // I am unsure what id is here. did you mean title?
    return items.filter(item => item.nome.toLowerCase().indexOf(term.toLowerCase()) !== -1);
}

}
