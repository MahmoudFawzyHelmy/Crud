let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCat = document.getElementById("productCat");
let productDesc = document.getElementById("productDesc");
let tableRow = document.getElementById("tableRow");
let mainBtn = document.getElementById("mainBtn");
mainBtn.onclick = function () {
  if (mainBtn.innerHTML === "Update Product") {
    finalUpdate();
  } else {
    addProduct();
  }
};
let productArr;
(function () {
  if (localStorage.getItem("data") === null) {
    productArr = [];
  } else {
    productArr = JSON.parse(localStorage.getItem("data"));
    display(productArr);
  }
})();
function addProduct() {
  if (nameRgx() == true && priceRgx() == true && catRgx() == true) {
    let product = {
      pName: productName.value,
      pPrice: productPrice.value,
      pCat: productCat.value,
      pDesc: productDesc.value,
    };
    productArr.push(product);
    localStorage.setItem("data", JSON.stringify(productArr));
    display(productArr);
  }
  clearForm();
}

function display(arr) {
  let box = "";
  for (let i = 0; i < arr.length; i++) {
    box += ` <tr>
   <td>${i + 1}</td>
   <td>${arr[i].pName}</td>
   <td>${arr[i].pPrice}</td>
   <td>${arr[i].pCat}</td>
   <td>${arr[i].pDesc}</td>
   <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
   <td><button class="btn btn-info" onclick="updateProducte(${i})">Update</button></td>
  </tr>`;
  }
  tableRow.innerHTML = box;
}
function deleteProduct(index) {
  productArr.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(productArr));
  display(productArr);
}
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCat.value = "";
  productDesc.value = "";
}
let globalIndex;
function updateProducte(index) {
  globalIndex = index;
  productName.value = productArr[index].pName;
  productPrice.value = productArr[index].pPrice;
  productCat.value = productArr[index].pCat;
  productDesc.value = productArr[index].pDesc;
  mainBtn.innerHTML = "Update Product";
}
function finalUpdate() {
  productArr[globalIndex].pName = productName.value;
  productArr[globalIndex].pPrice = productPrice.value;
  productArr[globalIndex].pCat = productCat.value;
  productArr[globalIndex].pDesc = productDesc.value;
  mainBtn.innerHTML = "Add Product";
  display(productArr);
}
function search(e) {
  let serached = [];
  for (let i = 0; i < productArr.length; i++) {
    if (productArr[i].pName.toLowerCase().includes(e.toLowerCase())) {
      serached.push(productArr[i]);
    }
  }
  display(serached);
}

function nameRgx() {
  let rgx = /^[A-z][a-z]/gi;
  if (rgx.test(productName.value) == true) {
    return true;
  } else {
    window.alert("Wrong Pttern");
    return false;
  }
}
function priceRgx() {
  let rgx = /^[0-9]/;
  if (rgx.test(productPrice.value) == true) {
    return true;
  } else {
    window.alert("Wrong Pttern");
    return false;
  }
}
function catRgx() {
  let rgx = /^[A-z][a-z]/gi;
  if (rgx.test(productCat.value) == true) {
    return true;
  } else {
    window.alert("Wrong Pttern");
    return false;
  }
}
