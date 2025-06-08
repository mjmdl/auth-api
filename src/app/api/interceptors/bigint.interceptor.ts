import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('pei');
    return next.handle().pipe(map(value => this.transform(value)));
  }

  private transform(value: any, maxDepth = 20): any {
    if (maxDepth <= 0 || value === null || value === undefined) {
      return value;
    } else if (typeof value === 'bigint') {
      return value.toString();
    } else if (Array.isArray(value)) {
      return value.map(item => this.transform(item, maxDepth - 1));
    } else if (typeof value === 'object') {
      if (typeof value.toJSON === 'function') {
        return this.transform(value.toJSON(), maxDepth - 1);
      }
      const result: any = {};
      for (const [key, val] of Object.entries(value)) {
        result[key] = this.transform(val, maxDepth - 1);
      }
      return result;
    } else {
      return value;
    }
  }
}
