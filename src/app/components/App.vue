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
                            <form @submit.prevent="addTask">
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
                                <button class=" btn btn-primary btn-block">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                task: {
                    title: '',
                    decription: ''
                }
            }
        },
        methods:{
            addTask() {
                console.log(this.task);
            }
        }
    }
</script>




