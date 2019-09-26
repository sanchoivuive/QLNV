/* - Thêm nhân viên
 - Xóa nhân viên
- Sửa nhân viên
- Tìm kiếm nhân viên
- local Storage*/

//khai báo biến Global
var DSNhanVien = [];

//Other methods
function getID(id) {
    return document.getElementById(id);
}

function LayThongTinNV() {
  var ma = getID("msnv").value;
  var ten = getID("name").value;
  var email = getID("email").value;
  var matKhau = getID("password").value;
  var ngayLam = getID("datepicker").value;
  var chucVu = getID("chucvu").value;

  //tạo đối tượng
  var nv = new NhanVien(ma, ten, email, matKhau, ngayLam, chucVu);
  nv.tinhTongLuong();
  return nv;
}

function ThemNhanVien() {
  var nv = LayThongTinNV();
  
  DSNhanVien.push(nv);
  HienThi(DSNhanVien);
}
console.log(DSNhanVien);

function HienThi(mangDS) {
    var mang = mangDS;
    var danhsach = getID("tableDanhSach");
    var noidung = "";
    
    for (var i = 0; i < mang.length; i++) {
        var nv1 = mang[i];
        noidung += `
        <tr>
        <td> ${nv1.maNhanVien}</td>
        <td> ${nv1.tenNhanVien}</td>
        <td> ${nv1.emailNhanVien}</td>
        <td> ${nv1.ngayLamNhanVien}</td>
        <td> ${nv1.chucVuNhanVien}</td>
        <td> ${nv1.tongLuongNhanVien}</td>
        <td><button class="btn btn-warning" data-toggle="modal" data-target="#myModal" data-id="${nv1.maNhanVien}" onClick="SuaNhanVien(event)">Sửa</button> 
            <button class="btn btn-danger" data-id="${nv1.maNhanVien}" onClick="XoaNhanVien(event)">Xóa</button>
        </td>
        </tr>`;
    }
    danhsach.innerHTML = noidung;
}

// function TimTheoIndex(idx) {
//   idx = DSNhanVien.findIndex(function(nv2) {
//     return nv2.maNhanVien === id;
//   });

//   // if (idx == -1) {
//   //   alert("không tìm thấy nhân viên");
//   //   return;
//   // }
//   return idx;
// }

function XoaNhanVien(event) {
  var id = event.target.getAttribute("data-id");
  var idx = DSNhanVien.findIndex(function(nv2) {
    return nv2.maNhanVien === id;
  });
  if (idx == -1) {
    alert("không tìm thấy nhân viên");
    return;
  }
  DSNhanVien.splice(idx, 1);
  HienThi(DSNhanVien);
}

function SuaNhanVien(event) {
  var id = event.target.getAttribute("data-id");
  var idx = DSNhanVien.findIndex(function(nv2) {
    return nv2.maNhanVien === id;
  });
  if (idx == -1) {
    alert("không tìm thấy nhân viên");
    return;
  }
  
  var nvCanSua = DSNhanVien[idx];

  getID("msnv").disabled = true;
  getID("name").value = nvCanSua.tenNhanVien;
  getID("email").value = nvCanSua.emailNhanVien ;
  getID("password").value = nvCanSua.matKhauNhanVien ;
  getID("datepicker").value = nvCanSua.ngayLamNhanVien ;
  getID("chucvu").value = nvCanSua.chucVuNhanVien;

  getID("btnCapNhat").addEventListener("click",CapNhatNhanVien);
}

function CapNhatNhanVien() {
  var nv = LayThongTinNV();

  //thay thế
  var idx = TimViTri(nv.maNhanVien);
  DSNhanVien[idx] = nv;
  HienThi(DSNhanVien);
  }
  
function TimViTri(id) {
  for (var i = 0; i < DSNhanVien.length; i++) {
    if (DSNhanVien[i].maNhanVien === id) {
      return i;
    }
  }
  return -1;
} 

function LuuLocalStorage() {
  //chuyển thành stringify
  var jsonData = JSON.stringify(DSNhanVien);
  localStorage.setItem('danhsach',jsonData);
}
function LayLocalStorage() {
  var jsonData = localStorage.getItem('danhsach');
  if (!jsonData) {
    DSNhanVien = [];
    return;
  }
  DSNhanVien = JSON.parse(jsonData);
  HienThi(DSNhanVien);
}

function TimNV() {
  var noiDungTim = getID("searchName").value;
  console.log("TCL: TimNV -> noiDungTim", noiDungTim)
  noiDungTim = noiDungTim.toLowerCase().trim();

  if (!isNaN(noiDungTim)) {
    TimNVTheoMa(noiDungTim);
  } else {
    TimNVTheoTen(noiDungTim);
  }
}

function TimNVTheoTen(tenTim) {
  var DSTimThay = [];
  DSTimThay = DSNhanVien.filter(function(nv) {
    return nv.tenNhanVien
      .toLowerCase()
      .trim()
      .indexOf(tenTim) !== -1;
  });
  console.log("TCL: TimNVTheoTen -> DSTimThay", DSTimThay)

  if (DSTimThay.length === 0) {
    alert("Không có nhân viên cần tim");
    return;
  }  else {
    HienThi(DSTimThay);
  }
}

function TimNVTheoMa(maTim) {
  var DSTimThay = [];

  DSTimThay = DSNhanVien.filter(function(nv) {
    return (nv.maNhanVien.indexOf(maTim) !== -1);
  });
  console.log("TCL: TimNVTheoMa -> DSTimThay", DSTimThay)

  if (DSTimThay.length === 0) {
    alert("Không có nhân viên cần tim");
    return;
  } else {
    HienThi(DSTimThay);
  }
}



//Gọi hàm
getID("btnThemNV").addEventListener("click", ThemNhanVien);
getID("btnLuuLocal").addEventListener("click", LuuLocalStorage);
getID("btnLayLocal").addEventListener("click", LayLocalStorage);

getID("btnTimNV").addEventListener("click", TimNV);
