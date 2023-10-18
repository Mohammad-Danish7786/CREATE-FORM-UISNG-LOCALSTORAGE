let form = document.querySelector("form");
let main = document.querySelector(".main");
let cAll = document.querySelector("#cAll");

form.addEventListener("submit", (event) => {
  let name = event.target.uname.value;
  let email = event.target.Email.value;
  let phone = event.target.Phone.value;
  var checkStatus = 0;

  // null handle operator(?? []) :- this is use for get item from localStorage if this have any data then give us otherwise give blank array. that is use for receive a blank array if  get null or undefine value from localStorage.
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  for (let v of userData) {
    if (v.email == email || v.phone == phone) {
      checkStatus = 1;
      break;
    }
  }
  if (checkStatus == 1) {
    alert("Email or phone Allready Exists");
  } else {
    userData.push({
      name,
      email,
      phone,
    });
    localStorage.setItem("userDetails", JSON.stringify(userData));
    event.preventDefault();

    displayData();
    event.target.reset();
  }
});

let displayData = () => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  let finalData = "";

  userData.forEach((element, i) => {
    finalData += `  <div class="item">
    <span onclick="removeData(${i})">&times;</span>
    <h5>Name</h5>
    <div>${element.name}</div>

    <h5>Email</h5>
    <div>${element.email}</div>

    <h5>Phone</h5>
    <div>${element.phone}</div>
  </div>`;
  });
  console.log(finalData);
  main.innerHTML = finalData;
};

let removeData = (index) => {
  let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
  userData.splice(index, 1);

  localStorage.setItem("userDetails", JSON.stringify(userData));
  displayData();
};

cAll.addEventListener("click", () => {
  localStorage.clear("userDetails");
  displayData();
});

displayData();
