// redux/progress/progress.reducer.js
const initialState = {
  progress: [],
  loading: false,
  error: null,
};

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROGRESS_REQUEST":
    case "CREATE_PROGRESS_REQUEST":
    case "UPDATE_PROGRESS_REQUEST":
    case "DELETE_PROGRESS_REQUEST":
      return { ...state, loading: true };

    case "FETCH_PROGRESS_SUCCESS":
      return { ...state, loading: false, progress: action.payload };

    case "CREATE_PROGRESS_SUCCESS":
      return {
        ...state,
        loading: false,
        progress: [...state.progress, action.payload],
      };

    case "UPDATE_PROGRESS_SUCCESS":
      return {
        ...state,
        loading: false,
        progress: state.progress.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "DELETE_PROGRESS_SUCCESS":
      return {
        ...state,
        loading: false,
        progress: state.progress.filter((item) => item.id !== action.payload),
      };

    case "FETCH_PROGRESS_FAILURE":
    case "CREATE_PROGRESS_FAILURE":
    case "UPDATE_PROGRESS_FAILURE":
    case "DELETE_PROGRESS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default progressReducer;
