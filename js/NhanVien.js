//Hệ số nhân lương cơ bản
const SEP = 3;
const TRUONGPHONG = 1.5;
const NHANVIEN = 1;

function NhanVien(maNV, tenNV, email, matKhau, ngayLam, chucVu) {
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.emailNhanVien = email;
    this.matKhauNhanVien = matKhau;
    this.ngayLamNhanVien = ngayLam;
    this.chucVuNhanVien = chucVu;
    this.luongCoBan = 400;
    this.tongLuongNhanVien = 0;

    this.tinhTongLuong = function () {
        if (this.chucVuNhanVien === "Sếp") {
            this.tongLuongNhanVien = this.luongCoBan * SEP;
        }
        else if (this.chucVuNhanVien === "Trưởng phòng") {
            this.tongLuongNhanVien = this.luongCoBan * TRUONGPHONG;
        }
        else if 
            (this.chucVuNhanVien === "Nhân viên") {
            this.tongLuongNhanVien = this.luongCoBan * NHANVIEN;
        }
    }
}