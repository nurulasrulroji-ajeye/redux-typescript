import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../app/store';
import { Post, Posts } from '../types';

export type postState = {
    posts: Posts;
    status: 'idle' | 'loading' | 'failed';
    message: string;
};

const postsAdapter = createEntityAdapter<Post>({
    selectId: (post) => post.id,
    // sortComparer: (a, b) => {
    //     if (a.id < b.id) {
    //         return 1;
    //     } else {
    //         return -1;
    //     }
    // },
});

const postInitialEntityState = postsAdapter.getInitialState({
    status: 'idle',
    message: '',
});

const URL = 'http://localhost:3005';

export const getTodo = createAsyncThunk("todos/getTodo", async (_, thunkApi) => {
    const res = await axios.get<Posts>(`${URL}/todos`).catch((err) => {
        thunkApi.rejectWithValue(err);
        throw err;
    });
    return res.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo: Omit<Post, 'id'>, thunkApi) => {
    const res = await axios.post<Post>(`${URL}/todos`, todo).catch((err) => {
        thunkApi.rejectWithValue(err);
        throw err
    });
    return res.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (todoId: number, thunkApi) => {
    const res = await axios.delete<Post>(`${URL}/todos/${todoId}`, {
        data: { id: todoId },
    }).catch((err) => {
        thunkApi.rejectWithValue(err);
        throw err;
    });
    return { data: res.data, todoId };
})

const date = new Date();
export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo: Partial<Post>, thunkApi) => {
    const res = await axios.patch<Post>(`${URL}/todos/${todo.id}`, {
        title: todo.title,
        date: date.toLocaleDateString(),
        note: todo.note
    }).catch((err) => {
        thunkApi.rejectWithValue(err)
        throw err;
    });
    return res.data;
});


const todoSlice = createSlice({
    name: "todos",
    initialState: postInitialEntityState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodo.pending, (state) => {
                state.status = 'loading';
                state.message = '';
            })
            .addCase(getTodo.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message) {
                    state.message = action.error.message;
                }
            })
            .addCase(getTodo.fulfilled, (state, action) => {
                state.status = 'success bro';
                postsAdapter.setAll(state, action.payload)
            })
            .addCase(addTodo.pending, (state) => {
                state.status = 'loading';
                state.message = '';
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message) {
                    state.message = action.error.message;
                }
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.status = 'success bro';
                postsAdapter.addOne(state, action.payload)
            })
            .addCase(deleteTodo.pending, (state) => {
                state.status = 'loading';
                state.message = '';
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message) {
                    state.message = action.error.message;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = 'success bro';
                postsAdapter.removeOne(state, action.payload.todoId);
            })
            .addCase(updateTodo.pending, (state) => {
                state.message = '';
            })
            .addCase(updateTodo.rejected, (state, action) => {
                if (action.error.message) {
                    state.message = action.error.message;
                }
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Post>) => {
                state.status = 'idle';
                const { id, ...updateData } = action.payload;
                postsAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: { ...updateData },
                });
            })
    },
});

export default todoSlice.reducer
export const todoSelector = postsAdapter.getSelectors<RootState>(state => state.todos)
export const selectStatus = (state: RootState) => state.todos.status;
export const selectMessage = (state: RootState) => state.todos.message;