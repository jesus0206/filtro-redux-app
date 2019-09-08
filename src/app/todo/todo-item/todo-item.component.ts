import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {


  @Input() todo: Todo;
  @ViewChild('txtInputFisico', { static: true }) txtInputFisico: ElementRef

  chkField: FormControl;
  txtInput: FormControl;
  editing: boolean = false
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.chkField = new FormControl(this.todo.completado)
    this.txtInput = new FormControl(this.todo.completado, Validators.required)

    this.chkField
      .valueChanges
      .subscribe(value => {
        const accion = new ToggleTodoAction(this.todo.id);
        this.store.dispatch(accion)
      })

  }

  editar() {
    this.editing = true;
    if (this.txtInput.invalid) return;
    if (this.txtInput.value === this.todo.texto) return;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select()
    }, 1)
  }
  terminarEdicion() {
    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value)
    this.store.dispatch(accion);
    this.editing = false
  }
  borrarTodo() {
    const accion = new BorrarTodoAction(this.todo.id)
    this.store.dispatch(accion)
  }
}
