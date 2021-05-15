import { uploadFile, convertAudioToText } from "../../actions/FlaskAPICalls";
import { ToastMessage } from "../../components/ToastMessage";
import {
  setLoading,
  resetLoading,
  audioToText_UPLOAD_AND_CONVERT,
} from "../reducerActions";

// UPLOAD AUDIO FILE TO UPLOAD API AND TO CONVERSION API
export const UPLOAD_AND_CONVERT = (file) => {
  return async (dispatch) => {
    try {
      // UPLOADING AUDIO FILE TO UPLOAD API
      dispatch(setLoading());
      const uploadFileResponse = await uploadFile(file);
      dispatch(resetLoading());
      if (uploadFileResponse.data.status === "failed") {
        ToastMessage(
          "error",
          "Failed to upload",
          uploadFileResponse.data.message
        );
      }
      if (uploadFileResponse.data.status === "success") {
        ToastMessage(
          "success",
          "Uploaded successfully",
          "File uploaded successfully, conversion to text has begun"
        );
        const uploadedFileName = uploadFileResponse.data.filename;
        dispatch(setLoading());
        ToastMessage(
          "info",
          "Conversion in progress",
          "Audio file was uploaded successfully, please wait while the system converts the uploaded audio file to text. You will see the generated text on this screen only",
          10
        );
        // PASS THE FILE NAME OF THE UPLOADED AUDIO TO THE API, TO GET THE TEXT FORMAT OF THE UPLOADED AUDIO FILE  
        const audioToTextResponse = await convertAudioToText(uploadedFileName);
        dispatch(resetLoading());
        if (audioToTextResponse.data.status === "failed") {
          ToastMessage(
            "error",
            "Failed to convert",
            audioToTextResponse.data.message
          );
        }
        // if success we receive converted text
        if (audioToTextResponse.data.length > 0) {
          dispatch(audioToText_UPLOAD_AND_CONVERT(audioToTextResponse.data));
        }
      }
    } catch (err) {
      dispatch(resetLoading());
      ToastMessage("error", "Execution error", err.message);
    }
  };
};
