//@ts-nocheck
import { BASE_URL } from "@/constants/environments";
import { generalService } from "@/services/general";
import tokenMethod from "@/utils/token";
import axios from "axios";

// function version ---> https://codesandbox.io/p/sandbox/react-ckeditor-upload-image-demo-cwcvh4?file=%2Fsrc%2FApp.tsx%3A40%2C2
function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const res = await generalService.uploadImage({ image: file });
          resolve({
            default: res?.data?.url,
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    abort: () => {},
  };
}

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
    uploadAdapter(loader);
}

export { MyCustomUploadAdapterPlugin };
