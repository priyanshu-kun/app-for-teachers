import {configureStore} from "@reduxjs/toolkit"
import auth from "./auth.Slice"

export const store = configureStore({
    reducer: {
        auth
    }
})