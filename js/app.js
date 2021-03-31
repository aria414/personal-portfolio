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
    const $name = $("<h2>").text(item.name);
    const $desc = $("<p>").text(item.description);

    //Create a div to hold the item descriptions <div class="item-descr">
    const $itemDescrDiv = $("<div>").attr("class", "item-descr");

    //create a div to hold the code links <div class="item-code-links">
    const $codeLinkDiv = $("<div>").attr("class", "item-code-links");

    //Create an <a> </a> to hold the Git and Live links
    const $livebtn = $(
      `<a href=${item.live}><i class="lar la-file-alt"> </i></a>`
    ).attr("target", "_blank");

    const $github = $(
      `<a href=${item.github}><i class="las la-external-link-alt"></a>`
    ).attr("target", "_blank");

    //Create a div to hold the h2 and p part of the item-descr
    const $itemDescText = $("<div>").attr("class", "item-desc-text");

    //Append the Live and Github links to the <div class="item-code-links">
    $codeLinkDiv.append($livebtn);
    $codeLinkDiv.append($github);

    //Append the project name and description to <div class="item-descr">
    $itemDescrDiv.append($name);

    // <div class="item-desc-text">
    //   <p>
    //     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
    //     error. Vero cumque recusandae laborum eveniet nulla aperiam .
    //   </p>
    //   <div class="item-code-links">
    //     <a href="https://seir-react-fgo.netlify.app/" target="_blank"
    //       ><i class="lar la-file-alt"> </i></a
    //     ><a
    //       href="https://github.com/aria414/seir-react-fgo"
    //       target="_blank"
    //       ><i class="las la-external-link-alt"></i
    //     ></a>
    //   </div>
    // </div>
    $itemDescText.append($desc);
    $itemDescText.append($codeLinkDiv);

    //Append the  <div class="item-code-links"> to the <div class="item-descr">
    //$itemDescrDiv.append($codeLinkDiv);

    //Append image inside section
    $section.append($img);

    //Append <div class="item-desc-text"> inside the <section class="gal-item">
    $section.append($itemDescText);

    //Append <div class="item-descr"> to section
    $section.append($itemDescrDiv);
  });
});

// <section class="gal-item">
// <img src="./images/fgoreact.jpg" />

// <div class="item-desc-text">
//   <p>
//     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
//     error. Vero cumque recusandae laborum eveniet nulla aperiam .
//   </p>
//   <div class="item-code-links">
//     <a href="https://seir-react-fgo.netlify.app/" target="_blank"
//       ><i class="lar la-file-alt"> </i></a
//     ><a
//       href="https://github.com/aria414/seir-react-fgo"
//       target="_blank"
//       ><i class="las la-external-link-alt"></i
//     ></a>
//   </div>
// </div>

// <div class="item-descr">
//   <h2>Fate/Grand Order Infopedia</h2>
// </div>
// </section>
