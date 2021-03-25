////////////////////////////////////////////
// Toggle menu button
////////////////////////////////////////////
// $(".nav-icon").click(function () {
//   $(".nav-closed").toggleClass("nav-open");
//   $(".las.la-caret-left").toggleClass("bars-active");
// });

$(".nav-icon").click(function () {
  $(".nav-closed").toggleClass("nav-open");
  $(".fas.fa-caret-left").toggleClass("bars-active");
});

//   <i class="las la-window-close"></i>
////////////////////////////////////////////
//PULL AND RENDER DATA FROM GOOGLE SHEET
////////////////////////////////////////////

$.ajax(
  "https://spreadsheets.google.com/feeds/list/1Rg_VD_Okxh90ARUonKDDmRD-5uNZ_-H6FZx21ctRwTk/1/public/full?alt=json"
).then((data) => {
  // checking my Data
  console.log(data);

  //Put our projects in a variable.
  const rawProjects = data.feed.entry;

  console.log(rawProjects);

  // Prettify our projects array

  const projects = rawProjects.map((project) => {
    return {
      //the name is stored in an gsx$name object with property $t
      name: project.gsx$name.$t,
      img: project.gsx$image.$t,
      description: project.gsx$description.$t,
      live: project.gsx$livelink.$t,
      github: project.gsx$githublink.$t,
    };
  });
  console.log("my beautiful array: ", projects);

  projects.forEach((item) => {
    //Create a section and append to gallery. Then dump data inside section
    const $section = $("<section>");
    $section.attr("class", "gal-item");
    // Grab the gallery div. Append section to div.
    const $gallery = $(".gallery");
    $gallery.append($section);

    //create the elements and set their attributes.
    const $img = $("<img>").attr("src", item.img);
    const $name = $("<h2>").attr("class", "lable").text(item.name);
    const $desc = $("<p>").attr("class", "largedesc").text(item.description);

    //create a div to hold the buttons
    const $div = $("<div>");
    const $livebtn = $("<button>")
      .attr("class", "code-btn")
      .html(`<a href="${item.live}"  target="_blank">Live</a>`);
    const $github = $("<button>")
      .attr("class", "code-btn")
      .html(`<a href="${item.github}"  target="_blank">Code</a>`);

    $div.append($livebtn);
    $div.append($github);

    //Put the elements inside the section
    $section.append($img);
    $section.append($name);
    $section.append($desc);
    $section.append($div);
  });
});
