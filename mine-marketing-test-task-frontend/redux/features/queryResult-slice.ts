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

const searchResults = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<SearchResult>) => {
      const existingResult = state.results.find(result => result.name === action.payload.name);
      if (!existingResult) {
        state.results.push(action.payload);
      }
    },
  },
});

export const {addResult} = searchResults.actions

export default searchResults.reducer

export const getAllResults = (state: RootState) => state.searchResultsReducer.results