import {configureStore} from "@reduxjs/toolkit"
import auth from "./auth.Slice"
import activate from "./activate.Slice"

export const store = configureStore({
    reducer: {
        auth,
        activate
    }
})