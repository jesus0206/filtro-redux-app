import * as TodoImport from './todo.actions'
import { Todo } from './model/todo.model'

const todo1 = new Todo('hola')
const todo2 = new Todo('hola 1')
todo2.completado = true
const todo3 = new Todo('hola 2')

const estadoInicial: Todo[] = [todo1, todo2, todo3]

export function todoReducer(state = estadoInicial,
  action: TodoImport.Acciones): Todo[] {

  switch (action.type) {

    case TodoImport.AGREGAR_TODO:
      const todo = new Todo(action.texto)
      return [...state, todo]

    case TodoImport.TOGGLE_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id == action.id) {
          return {
            ...todoEdit, // para clonar todas las propiedades
            completado: !todoEdit.completado
          }
        } else {
          return todoEdit
        }
      });

    case TodoImport.EDITAR_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id == action.id) {
          return {
            ...todoEdit, // para clonar todas las propiedades
            texto: action.texto,
          }
        } else {
          return todoEdit
        }
      });


    case TodoImport.TOGGLE_ALL_TODO:
      return state.map(todoEdit => {
        return {
          ...todoEdit,
          completado: action.completado
        }
      });

    case TodoImport.BORRAR_ALL_TODO:
      return state.filter(todoEdit => !todoEdit.completado);

    default: return state
  }
}
