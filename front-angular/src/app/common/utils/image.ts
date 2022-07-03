export const validateImageFileFormat = (name: String) => {
  let ext = name.substring(name.lastIndexOf(".") + 1);
  if (
    ext.toLowerCase() == "jpg" ||
    ext.toLowerCase() == "jpeg" ||
    ext.toLowerCase() == "png"
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateImageFileSize = (size) => {
  let imageSizeInMb = Math.floor(size / 1024 / 1024);
  if (imageSizeInMb < 1) {
    return true;
  } else {
    return false;
  }
};

export const preview = (event) => {
  let files = event.target.files;
  if (files.length === 0) return;

  if (!validateImageFileFormat(files[0].name)) {
    return false;
  } else if (!validateImageFileSize(files[0].size)) {
    return false;
  } else {
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) return;
    let reader = new FileReader();
    let file: File;
    let preview: any;
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {

      file = event.target.files[0];
      preview = reader.result;


    };

    return {
      file: file,
      preview: preview
    }
  }
};
