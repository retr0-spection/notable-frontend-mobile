import { createSelector } from "redux-orm";
import orm from "./schema";

export const note = createSelector(orm.Note);
export const noteBlock = createSelector(orm.Note.blocks);