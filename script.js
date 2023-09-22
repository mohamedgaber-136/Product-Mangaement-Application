const product_name = document.getElementById("pdname");
const product_price = document.getElementById("pdprice");
const product_categ = document.getElementById("pdcateg");
const product_desc = document.getElementById("pddesc");
const dark_ = document.getElementById("dark_");
const light_ = document.getElementById("light_");
const add_ = document.getElementById("table_body");
const product_search = document.getElementById("search");
const update_btn = document.getElementById("update_btn");
const category_ = document.getElementById("category_");
const notFound = document.getElementById("Notfound");
const date = new Date();
let year_ = date.getFullYear();

copy_right.innerHTML = `<p>copyright&copy;${year_}</p>`;
let product_container = [];
let count;
if (localStorage.getItem("product_container") != null) {
  product_container = JSON.parse(localStorage.getItem("product_container"));
  add_display(product_container);
}
// IdGenerator
function idGenerator() {
  let id = "";
  for (let i = 0; i < 3; i++) {
    let randNum = Math.floor(Math.random() * 9);
    id += randNum;
  }
  return id;
}

//SEND DATA TO LOCAL AND DISPLAY IT
function sendData() {
 

  let NewId = idGenerator();
  if (
    valdiation_() == true &&
    numvalidate() == true &&
    categoryValid() == true
  ) {
    {
      let product = {
        name: product_name.value,
        price: product_price.value,
        categ: product_categ.value,
        descrip: product_desc.value,
        PdId: NewId,
        Date:new Date().toLocaleTimeString(),
      };

      product_container.push(product);
      localStorage.setItem(
        "product_container",
        JSON.stringify(product_container)
      );
      clearProduct();
      delete_classes();
      add_display(product_container);
    }
  }
}
function add_display(lists) {
  let cartona = ``;
  for (i = 0; i < lists.length; i++) {
    cartona += `<tr>
    <th>${i + 1}</th>
    <td>${lists[i].name}</td>
    <td>${lists[i].price}</td>
    <td id='categ_slot' ><span id='category_' >${lists[i].categ}</span></td>
    <td style='overflow-x: scroll;;width:100px;font-size:13px'>${lists[i].descrip}</td>
    <td><button onclick='setForm(${i})' class="btn btn-outline-warning rounded-circle"><i class="fa-solid fa-marker"></i></button></td>
    <td><button class="btn btn-outline-danger rounded-circle" onclick='delete_(${i})'><i class="fa-solid fa-trash"></i></button></td>
    <td id='soldDate'>${lists[i].Date}</td>
    <td id='soldDate'>${lists[i].PdId}</td>
    </tr>`;
    add_.innerHTML = cartona;
  }
}

//-----------------------END
// Updated -----------------
function saved() {
  if (
    valdiation_() == true &&
    numvalidate() == true &&
    categoryValid() == true
  ) {
    let updated = {
      name: product_name.value,
      price: product_price.value,
      categ: product_categ.value,
      descrip: product_desc.value,
      PdId: iD,
      Date:date.toLocaleTimeString()
    };
    product_container.splice(count, 1, updated);
    localStorage.setItem(
      "product_container",
      JSON.stringify(product_container)
    );
    clearProduct();
    add_display(product_container);
    update_btn.classList.replace("d-inline-block", "d-none");
    addBtn.style.display = "inline-block";
  }
}
let iD = "";
function setForm(ind) {
  iD = product_container[ind].PdId;
  product_name.value = product_container[ind].name;
  product_price.value = product_container[ind].price;
  product_categ.value = product_container[ind].categ;
  product_desc.value = product_container[ind].descrip;
  update_btn.classList.replace("d-none", "d-inline-block");
  addBtn.style.display = "none";
  count = ind;
}
//---------------------End

// Real Time Search
function searchProductCate(searchTerm) {
  let show = [];
  // console.log(searchTerm);
  let x = product_container.filter((ele) => ele.categ == searchTerm);
  console.log(x.length);
  if (x.length != 0 ) {
    console.log('here')
    show.push(...x);
    add_display(show);
    alert_.classList.replace("d-inline-block", "d-none");
  }else if(searchTerm=='All Categories'){
    console.log('nothere')
    alert_.classList.replace("d-inline-block", "d-none");
    add_display(product_container);
  }
  else {
    alert_.classList.replace("d-none", "d-inline-block");
    add_display('');
   
  }
}


function searchProduct() {
  let z = search.value;
  let searchResult = [];
  if (z.length > 2) {
    for (var i = 0; i < product_container.length; i++) {
      if (
        product_container[i].name.includes(z) ||
        product_container[i].PdId.includes(z)
      ) {
        searchResult.push(product_container[i]);
        add_display(searchResult);
      }
    }
  } else if (z.length == 0) {
    add_display(product_container);
  }
}
//----------------------End----------------------------

// Regex Validation
// Product Price Valid
function numvalidate() {
  let regex = /^[1-9]+[0-9]{3,6}$/;
  if (regex.test(product_price.value)) {
    product_price.classList.replace("is-invalid", "is-valid");
    validInfo1.classList.remove("validInfo");
    return true;
  } else {
    product_price.classList.add("is-invalid");
    validInfo1.classList.add("validInfo");
    return false;
  }
}
// Product Name Valid
function valdiation_() {
  let regex_ = /^[a-zA-Z0-9+ \-]{3,}$/
  if (regex_.test(product_name.value) == true) {
    product_name.classList.replace("is-invalid", "is-valid");
    validInfo.classList.remove("validInfo");

    return true;
  } else {
    product_name.classList.add("is-invalid");
    validInfo.classList.add("validInfo");
    return false;
  }
}
// category Valid
function categoryValid() {
  if (pdcateg.value == "selectItem") {
    categInfo.classList.add("validInfo");
    return false;
  } else {
    categInfo.classList.remove("validInfo");
    return true;
  }
}
//----------------------------End----------------------

// Delet Data and clear Local Storge and Delete Button
function delete_(i) {
  let arr = [];
  product_container.splice(i, 1);
  localStorage.setItem("product_container", JSON.stringify(product_container));
  add_display(product_container);
  if (product_container.length == 0) {
    add_.innerHTML = "";
  }
}
function clearProduct() {
  product_name.value = "";
  product_price.value = "";
  product_desc.value = "";
  product_categ.value = "selectItem";
}
function delete_classes() {
  product_name.classList.remove("is-valid");
  product_price.classList.remove("is-valid");
  product_categ.classList.remove("is-valid");
}
function RemovData() {
  localStorage.removeItem("product_container");
  add_.innerHTML = "";
}
// ----------------------End----------------------
// CHANGE Styles
function change() {
  circle.classList.toggle("light_mode");
  if (circle.classList.contains("light_mode")) {
    body.style.backgroundColor = "rgba(10, 15, 35, 0.796)";
    light_.style.display = "block";
    dark_.style.display = "none";
    foot_dark.style.display = "none";
    foot_light.style.display = "block";
    search.classList.add("bg-dark");
  } else {
    foot_dark.style.display = "block";
    foot_light.style.display = "none";
    dark_.style.display = "block";
    light_.style.display = "none";
    body.style.backgroundColor = "white";
  }
}

//------------------------- Jquery------------------
$("form").slideDown(1000);
