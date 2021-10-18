import {createAction} from '@reduxjs/toolkit'

export const apiCallBegan = createAction('api/call/began');
export const apiCallSuccess = createAction('api/call/success');
export const apiCallFailed = createAction('api/call/failed');