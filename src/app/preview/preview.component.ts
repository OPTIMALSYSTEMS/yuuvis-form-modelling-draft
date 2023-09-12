import { Component, Input } from '@angular/core';
import { ProcessUser, Task } from '@yuuvis/framework';
import { PreviewInput } from './preview.interface';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  private _testProcessUser: ProcessUser = {
    id: 'puid',
    title: 'Dummy user',
  };
  @Input() set input(i: PreviewInput) {
    if(!this.task)
    this.task = {
      id: '',
      processInstanceId: '',
      assignee: this._testProcessUser,
      claimTime: new Date(),
      createTime: new Date(),
      dueDate: new Date(),
      description: '',
      taskForm: {
        model: i.model,
        data: {},
        outcomes: i.outcomes,
      },
      formKey: '',
      initiator: this._testProcessUser,
      name: 'Task name',
      owner: this._testProcessUser,
      parentTaskId: '',
      processDefinition: {
        id: '',
        idPrefix: '',
      },
      subject: 'Task subject',
      suspended: false,
      variables: [],
      attachments: [],
    };
  }

  task?: Task;
  onTaskUpdated(e: any) {
    console.log(e);
  }
}
