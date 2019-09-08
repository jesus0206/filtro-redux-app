import { Action } from '@ngrx/store';
export const SET_FILTER = '[Filter] set Filtro'

export type filtrosValidos = 'todos' | 'completados' | 'pendientes'


export class setFiltroAction implements Action {
  readonly type = SET_FILTER;
  constructor(public filtro: filtrosValidos) {
  }
}

export type acciones = setFiltroAction
