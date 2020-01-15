import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from '../state/product.actions';
import { Product } from '../product';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
    constructor( private actions$: Actions, private productService: ProductService) {

    }

    @Effect()
    loadProducts$ = this.actions$.pipe(
      ofType(productActions.ProductActionTypes.Load),
      mergeMap(action =>
        this.productService.getProducts().pipe(
          map(products => (new productActions.LoadSuccess(products))),
          catchError( error => of(new productActions.LoadFail(error)))
        )
      )
    );

    @Effect()
    UpdateProducts$ = this.actions$.pipe(
      ofType(productActions.ProductActionTypes.UpdateProduct),
      map((action: productActions.UpdateProduct) => action.payload),
      mergeMap((product: Product) =>
        this.productService.updateProduct(product).pipe(
          map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
          catchError( error => of(new productActions.UpdateProductFail(error)))
        )
      )
    )
}
