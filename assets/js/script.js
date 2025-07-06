$(document).on("click", "#copyFromQR, #copyUrl", function (e) {
  e.preventDefault();
  const input = document.getElementById("subUrl");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  $("#qrModal").modal("hide");
  alert("آدرس در کلیپ‌بورد کپی شد.");
});

function getCountryCode(fileName) {
  const countryMap = {
    afghanistan: "af",
    albania: "al",
    algeria: "dz",
    argentina: "ar",
    armenia: "am",
    australia: "au",
    austria: "at",
    azerbaijan: "az",
    bahrain: "bh",
    bangladesh: "bd",
    belarus: "by",
    belgium: "be",
    bosnia: "ba",
    brazil: "br",
    bulgaria: "bg",
    cambodia: "kh",
    canada: "ca",
    chile: "cl",
    china: "cn",
    colombia: "co",
    croatia: "hr",
    cuba: "cu",
    cyprus: "cy",
    czech: "cz",
    denmark: "dk",
    egypt: "eg",
    estonia: "ee",
    finland: "fi",
    france: "fr",
    georgia: "ge",
    germany: "de",
    greece: "gr",
    hongkong: "hk",
    hungary: "hu",
    iceland: "is",
    india: "in",
    indonesia: "id",
    iran: "ir",
    iraq: "iq",
    ireland: "ie",
    israel: "il",
    italy: "it",
    japan: "jp",
    jordan: "jo",
    kazakhstan: "kz",
    kenya: "ke",
    korea: "kr",
    kuwait: "kw",
    kyrgyzstan: "kg",
    laos: "la",
    latvia: "lv",
    lebanon: "lb",
    lithuania: "lt",
    luxembourg: "lu",
    malaysia: "my",
    malta: "mt",
    mexico: "mx",
    moldova: "md",
    mongolia: "mn",
    montenegro: "me",
    morocco: "ma",
    myanmar: "mm",
    nepal: "np",
    netherlands: "nl",
    newzealand: "nz",
    nicaragua: "ni",
    nigeria: "ng",
    northmacedonia: "mk",
    norway: "no",
    oman: "om",
    pakistan: "pk",
    palestine: "ps",
    panama: "pa",
    paraguay: "py",
    peru: "pe",
    philippines: "ph",
    poland: "pl",
    portugal: "pt",
    qatar: "qa",
    romania: "ro",
    russia: "ru",
    saudiarabia: "sa",
    serbia: "rs",
    singapore: "sg",
    slovakia: "sk",
    slovenia: "si",
    southafrica: "za",
    spain: "es",
    sri_lanka: "lk",
    sweden: "se",
    switzerland: "ch",
    syria: "sy",
    taiwan: "tw",
    tajikistan: "tj",
    thailand: "th",
    tunisia: "tn",
    turkey: "tr",
    turkmenistan: "tm",
    ukraine: "ua",
    uae: "ae",
    uk: "gb",
    unitedkingdom: "gb",
    us: "us",
    usa: "us",
    uzbekistan: "uz",
    venezuela: "ve",
    vietnam: "vn",
    yemen: "ye",
    unknown: "xx",
  };
  const baseName = fileName.replace(/\.txt$/i, "").toLowerCase();
  const normalized = baseName.replace(/[^a-z]/g, "");
  return countryMap[normalized] || "xx";
}

let source = "SoliSpirit/v2ray-configs";
$(document).on("click", "a[data-loc]", function (e) {
  e.preventDefault();
  let location = $(this).data("loc");
  //let title = location.toUpperCase();
  //let title = location.toLowerCase();
  let title = location;
  $("#countryLoc a").removeClass("active");
  $(this).addClass("active");
  let config =
    "https://raw.githubusercontent.com/" +
    source +
    "/refs/heads/main/Countries/" +
    title;
  $("#qrcode img").attr(
    "src",
    "https://quickchart.io/qr/?size=300x200&light=ffffff&text=" +
      encodeURIComponent(config)
  );
  $("#qrModal h4").html("QRCode (" + title + ")");
  $("#qrcode input").val(config);
  $("#qrModal").modal("show");
});

$("#qrModal").on("hidden.bs.modal", function () {
  $("#countryLoc a").removeClass("active");
});

function flagToCountryCode(flag) {
  const codePoints = flag.split(" ");
  return codePoints[1].toLowerCase();
}

function renderLocationData(locationPaths) {
  let html = "";
  locationPaths.forEach(function (element) {
    //let countryCode = flagToCountryCode(element);
    let countryCode = element;
    let getImage = getCountryCode(countryCode);
    if (getImage !== "xx") {
      html += '<a href="" data-loc="' + element + '">';
      html += '<div class="slide">';
      html +=
        '<img src="./assets/img/flags/' +
        getImage +
        '.svg?v1.2" alt="' +
        element +
        '" />';
      html += '<p dir="auto">' + getImage.toUpperCase() + "</p>";
      html += "</div>";
      html += "</a>";
    }
  });
  $("#countryLoc").html(html);
}

window.addEventListener("load", function () {
  const cachedData = localStorage.getItem("locationData");
  const cachedTime = localStorage.getItem("locationDataTime");
  if (
    cachedData !== "undefined" &&
    cachedTime !== "undefined" &&
    Date.now() - cachedTime < 15 * 60 * 1000
  ) {
    renderLocationData(cachedData?.split(","));
  } else {
    fetch("https://api.github.com/repos/" + source + "/contents/Countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let locationPaths = data.filter(
          (item) => !item.name.includes("🇽🇽 XX") && !item.name.includes("🆥🆥")
        );
        locationPaths = locationPaths.map((item) => item.name);
        console.log(locationPaths);
        localStorage.setItem("locationData", locationPaths);
        localStorage.setItem("locationDataTime", Date.now());
        renderLocationData(locationPaths);
      })
      .catch((error) => {
        //renderLocationData(["🇮🇷 IR", "🇹🇷 TR", "🇬🇧 GB", "🇺🇸 US", "🇵🇱 PL", "🇫🇮 FI", "🇸🇪 SE", "🇩🇪 DE", "🇫🇷 FR"]);
        renderLocationData([
          "ir",
          "tr",
          "gb",
          "us",
          "pl",
          "fi",
          "se",
          "de",
          "fr",
        ]);
      });
  }
});
