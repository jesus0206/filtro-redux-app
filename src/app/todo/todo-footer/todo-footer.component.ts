import { Component, OnInit } from '@angular/core';
import { filtrosValidos, setFiltroAction } from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Todo } from '../model/todo.model';
import { BorrarAllTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: filtrosValidos[] = ['todos', 'completados', 'pendientes']
  filtroActual: filtrosValidos;
  pendientes: number
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos)
      this.filtroActual = state.filtro
    })
  }
  cambiarFiltro(filtro: filtrosValidos) {
    const accion = new setFiltroAction(filtro);
    this.store.dispatch(accion)
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length
  }

  borrarAll() {
    const accion = new BorrarAllTodoAction();
    this.store.dispatch(accion)
  }
}
