<template>
    <div>
        <nav class="navbar navbar-light bg-light"> 
            <a href="/" class="navbar-brand">MENV Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input 
                                        v-model="task.title"
                                        type="text"
                                        placeholder="Nueva Tarea"
                                        class="form-control"
                                    > 
                                </div>
                                <div class="form-group">
                                    <textarea name="" id="" cols="30" rows="10"
                                        v-model="task.decription"
                                        class="form-control"
                                        placeholder="Nueva descripción">
                                    </textarea>
                                </div>
                                    
                                <template v-if="edit === false">
                                    <button class="btn btn-primary btn-block">Enviar</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-success btn-block">Editar</button>
                                </template>
                                
                            </form>
                        </div>
                    </div>
                </div>

                <div class="clo-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <th>Tarea</th>
                            <th>Descripción</th>
                            <th>Operación</th>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" >
                                <td>{{task.title}}</td>
                                <td>{{task.decription}}</td>
                                <td>
                                    <button @click="editTask(task._id)" class="btn btn-success">Editar</button>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">Eliminar</button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
   /* class Task {
        constructor(title, decription) {
            this.title = title;
            this.decription = decription;
        }
    }*/

    export default {
        data() {
            return {
                //task: new Task(),
                task: {
                    title: '',
                    decription: ''
                },
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },
        created() {
            this.getTasks();
        },
        methods:{
            getTasks() {
                fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data;
                    console.log(this.tasks);
                })

            },
            sendTask() {
                if(this.edit === false){
                    fetch('/api/tasks', {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                    })
                }else{
                    fetch('/api/tasks/'+this.taskToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                        this.edit = false;
                    })
                }
                
                //this.task = new Task();
                this.task.title = '';
                this.task.decription = '';
            },
            deleteTask(id) {
                fetch('/api/tasks/'+id, {
                    method: 'DELETE',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks();
                })
            },
            editTask(id) {
                alert('edita tarea '+id);
                fetch('/api/tasks/'+id)
                    .then(res => res.json())
                    .then(data => {
                        this.task.title = data.title;
                        this.task.decription = data.decription;
                        this.edit = true;
                        this.taskToEdit = data._id;
                    })
            }
        }
    }
</script>




