function getTextFromFile(input) {
  let size = input.files.length;
  let file = input.files[size - 1];
  let reader = new FileReader();

  reader.readAsText(file);
  reader.onload = function () {
    const returnedInputArea = (document.querySelectorAll(
      ".input-text"
    )[0].textContent = reader.result);
  };
  reader.onerror = function () {
    console.log(reader.error);
  };
}
// The plugin
$.fn.json_beautify = function () {
  var obj = JSON.parse(this.val());
  var pretty = JSON.stringify(obj, undefined, 4);
  this.val(pretty);
};

// Then use it like this on any textarea
$("textarea").on("change", () => {
  $("textarea").json_beautify();
});

function saveStaticDataToFile() {
  const input = document.querySelectorAll(".Returned-text")[0].value;
  var blob = new Blob([input], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `shikimori-list-${JSON.parse(input).length}-anime.json`);
}

function encrypt() {
  const input = document.querySelectorAll(".input-text")[0].value;
  const returnedInputArea = document.querySelectorAll(".Returned-text")[0];
  let array = JSON.parse(input);
  let result = [];
  try {
    for (const element of array) {
      console.log(element.title);
      const anime = {
        list_id: element.list_id,
        score: element.score,
        target_id: element.target_id,
        title: element.title,
        ya_id: element.ya_id,
        status: "completed",
        target_type: "Anime",
      };
      result.push(anime);
    }
  } catch {
    $(".error").text("Incorrect data format");
  }
  returnedInputArea.textContent = JSON.stringify(result);
}
