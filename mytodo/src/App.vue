<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h1 class="card-title">MyTodo</h1>
          </div>
          <div class="card-body">
            <form class="mb-3">
              <div class="input-group">
                <input type="text" class="form-control" v-model="title" placeholder="Enter new Todo item">
                <div class="input-group-append">
                  <button class="btn btn-outline-primary" type="button" @click="addTodo()">Add Todo</button>
                </div>
              </div>
            </form>
            <form class="mb-3">
              <div class="input-group">
                <input type="text" class="form-control" v-model="query" placeholder="Search Todo item">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="searchTodo()">Search</button>
                </div>
              </div>
            </form>
            <div v-if="todos.length > 0">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Completed</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(todo, index) in todos" :key="index">
                    <td>{{ todo.title }}</td>
                    <td>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="todo.completed" @change="updateTodo(todo)">
                        <label class="form-check-label">{{ todo.completed ? 'Yes' : 'No' }}</label>
                      </div>
                    </td>
                    <td>{{ todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '-' }}</td>
                    <td>{{ todo.priority }}</td>
                    <td><button class="btn btn-danger" @click="removeId=todo._id;deleteTodo()">Delete</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <p>No todo items found.</p>
            </div>
            <hr>
            <div v-if="searchResults.length > 0">
              <h5>Search Results:</h5>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Completed</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(todo, index) in searchResults" :key="index">
                    <td>{{ todo.title }}</td>
                    <td>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" v-model="todo.completed" @change="updateTodo(todo)">
                        <label class="form-check-label">{{ todo.completed ? 'Yes' : 'No' }}</label>
                      </div>
                    </td>
                    <td>{{ todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '-' }}</td>
                    <td>{{ todo.priority }}</td>
                    <td><button class="btn btn-danger" @click="removeId=todo._id;deleteTodo()">Delete</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else-if="searchResults.length === 0 && isSearching">
              <p>No results found for "{{ query }}".</p>
            </div>
            <hr>
            <ul>
              <li>This todo list app is created by IICSC using Vue.js and Axios.</li>
              <li>This app is designed for learning purpose only, and should not be used in any critical production environment.</li>
              <li>The data is stored in a local MongoDB database and accessed through a Node.js/Express API.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      searchResults: [],
      title: '',
      query: '',
      removeId: '',
      isSearching: false,
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      const response = await axios.get('http://localhost:3000/todos');
      this.todos = response.data;
    },
    async addTodo() {
      if (!this.title) {
        return;
      }

      const todo = { title: this.title, completed: false, dueDate: null, priority: 'low' };
      await axios.post('http://localhost:3000/todos', todo);

      this.title = '';
      this.fetchTodos();
    },
    async searchTodo() {
      if (!this.query) {
        this.fetchTodos();
        return;
      }

      const response = await axios.get(`http://localhost:3000/todos?q=${this.query}`);
      this.searchResults = response.data;
      this.isSearching = true;
    },
    async updateTodo(todo) {
      const update = { title: todo.title, completed: todo.completed, dueDate: todo.dueDate, priority: todo.priority };
      await axios.put(`http://localhost:3000/todos/${todo._id}`, update);
      this.fetchTodos();
    },
    async deleteTodo() {
      if (!this.removeId) {
        return;
      }

      const todo = this.todos.find(t => t._id === this.removeId);
      const confirm = window.confirm(`Are you sure to delete the todo item "${todo.title}"?`);
      if (!confirm) {
        return;
      }

      await axios.delete(`http://localhost:3000/todos/${this.removeId}`);
      this.removeId = '';
      this.fetchTodos();
    },
  },
};
</script>