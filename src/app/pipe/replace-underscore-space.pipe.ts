import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUnderscoreSpace'
})
export class ReplaceUnderscoreSpacePipe implements PipeTransform {

  transform(value: string) {
    return value.replace(/_/g, ' ');;
  }

}