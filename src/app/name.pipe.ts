import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(items: any[], term: string): any {
    if (!term) { return items; }
    // I am unsure what id is here. did you mean title?
    return items.filter(item => item.id.indexOf(term) !== -1);
}
}
