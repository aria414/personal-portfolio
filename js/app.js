////////////////////////////////////////////
// Function to make mobile nav scroll to the ID. top - 70 because I have a fixed nav at 70px height. Need to scroll to that offset
////////////////////////////////////////////
//select the links in .nav-closed class. .. $('a[href*="#"]')  --> Select all links with hashes
$(".nav-closed a")
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 70,
          },
          1000
        );
      }
    }
  });

$(".desk-nav a")
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 90,
          },
          1000
        );
      }
    }
  });
////////////////////////////////////////////
// Toggle menu button
////////////////////////////////////////////

$(".nav-icon").click(() => {
  $(".nav-closed").toggleClass("nav-open");
  $(".las.la-bars").toggleClass("bars-active");
  $(".overlay").toggleClass("overlay-on");
});

$(".nav-closed a").click(() => {
  $(".nav-closed").toggleClass("nav-open");
  $(".las.la-bars").toggleClass("bars-active");
  $(".overlay").toggleClass("overlay-on");
});
////////////////////////////////////////////
// Submit button
////////////////////////////////////////////
//Check if the value of either one of the input boxes are empty. If empty, yell at user. Otherwise, submit the message.
$("#submit").click(function () {
  if (
    !$("#full-name").val() ||
    !$("#email-address").val() ||
    !$("#message").val()
  ) {
    alert("Fill in the input boxes!");
  } else {
    $("#formspree").submit();
  }
});

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
    const $name = $("<h2>").text(item.name);
    const $desc = $("<p>").text(item.description);

    //Create a div to hold the item descriptions <div class="item-descr">
    const $itemDescrDiv = $("<div>").attr("class", "item-descr");

    //create a div to hold the code links <div class="item-code-links">
    const $codeLinkDiv = $("<div>").attr("class", "item-code-links");

    //Create an <a> </a> to hold the Git and Live links
    const $livebtn = $(
      `<a href=${item.live}><i class="fas fa-external-link-square-alt"></i></a>`
    ).attr("target", "_blank");

    const $github = $(
      `<a href=${item.github}><i class="fab fa-github-square"> </i></a>`
    ).attr("target", "_blank");

    //Create a div to hold the h2 and p part of the item-descr
    const $itemDescText = $("<div>").attr("class", "item-desc-text");

    //Append the Live and Github links to the <div class="item-code-links">
    $codeLinkDiv.append($livebtn);
    $codeLinkDiv.append($github);

    //Append the project name and description to <div class="item-descr">
    $itemDescrDiv.append($name);

    $itemDescText.append($desc);
    // $itemDescText.append($codeLinkDiv);

    //Append the  <div class="item-code-links"> to the <div class="item-descr">
    //$itemDescrDiv.append($codeLinkDiv);

    //Append image inside section
    $section.append($img);

    //Append <div class="item-desc-text"> inside the <section class="gal-item">
    $section.append($itemDescText);

    //Append <div class="item-descr"> with the title to section
    $section.append($itemDescrDiv);
    $section.append($codeLinkDiv);
  });
});
