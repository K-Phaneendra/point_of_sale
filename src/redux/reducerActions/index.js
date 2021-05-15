import { LOADING, AUDIO_TO_TEXT, PRINT, FACE_RECOGNITION } from "./actionType";

export const setLoading = () => ({ type: LOADING.SET_LOADING });
export const resetLoading = () => ({ type: LOADING.RESET_LOADING });

// connects to audioToText reducer through type
export const audioToText_UPLOAD_AND_CONVERT = (payload) => ({
  type: AUDIO_TO_TEXT.UPLOAD_AND_CONVERT,
  payload,
});

// connects to facerecognition reducer through type
export const faceRecognition_PREDICT_GENDER = (payload) => ({
  type: FACE_RECOGNITION.PREDICT_GENDER,
  payload,
});

export const set_printable_content = (payload) => ({
  type: PRINT.CONTENT,
  payload,
});
