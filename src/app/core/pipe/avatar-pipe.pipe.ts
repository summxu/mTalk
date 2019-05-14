import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarPipe'
})
export class AvatarPipePipe implements PipeTransform {
  transform(value: any): any {
    return `url('${value}')`;
  }
}
