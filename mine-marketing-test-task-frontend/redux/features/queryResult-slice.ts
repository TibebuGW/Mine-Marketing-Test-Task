import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchResult {
  phoneCode: string;
  capitalCity: string;
  code: string;
  currencyCode: string[];
  name: string;
  userEmail: string;
}

interface SearchResultsState {
  results: SearchResult[];
}

const initialState: SearchResultsState = {
  results: [],
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<SearchResult>) => {
      state.results.push(action.payload);
    },
  },
});

export const {addResult} = searchResultsSlice.actions

export default searchResultsSlice.reducer

export const getAllResults = (state: RootState) => state.searchResults.results