import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRegisterUser, fetchLoginUser } from "./userAPI";

interface userThunk {
    username: string;
    password: string;
}
type user = {
    token: string;
}

type userState = {
    user: user | null;
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
};

const initialState: userState = {
    user: null,
    status: "idle",
    error: null,
};
/*export const fetchRegisterUserThunk = createAsyncThunk("user/fetchRegisterUser", async ({ username, password}: userThunk, {rejectWithValue})) => {
    const response = await fetchRegisterUser(username, password);
    const responseJson = await response.json();
    console.log(responseJson.message.toString());
    if (!response.ok) {
        return rejectWithValue("Failed to register users");
    }else if (responseJson.message.toString() === "Usuario registrado correctamente") {
        return responseJson.message;
    }else {
        return rejectWithValue(responseJson.message);
    }
};
export const fetchRegisterUserThunk = createAsyncThunk("user/fetchLoginUser", async ({ username, password}: userThunk, {rejectWithValue})) => {
    const response = await fetchRegisterUser(username, password);
    const responseJson = await response.json();
    console.log(responseJson.message.toString());
    if (!response.ok) {
        return rejectWithValue("Failed to register users");
    }else if (responseJson.message.toString() === "Inicio de sesión exitoso") {
        return responseJson.message;
    }else {
        return rejectWithValue(responseJson.message);
    }
};*/
