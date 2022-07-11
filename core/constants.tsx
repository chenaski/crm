import { createAction } from "@reduxjs/toolkit";
import { HYDRATE as HYDRATE_ACTION_TYPE } from "next-redux-wrapper";

import { RootState } from "~/core/store/store";

export const HYDRATE = createAction<RootState>(HYDRATE_ACTION_TYPE);
