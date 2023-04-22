function doPost(e) {
  try {
    if (e?.postData?.contents) {
      const contents = JSON.parse(e.postData.contents);
      main(contents);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}
