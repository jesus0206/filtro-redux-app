import * as FilterImport from './filter.actions'

const estadoInicial: FilterImport.filtrosValidos = 'todos'

export function filtroReducer(state = estadoInicial, action: FilterImport.acciones): FilterImport.filtrosValidos {


  switch (action.type) {

    case FilterImport.SET_FILTER:
      return action.filtro

    default: return state;
  }

}
