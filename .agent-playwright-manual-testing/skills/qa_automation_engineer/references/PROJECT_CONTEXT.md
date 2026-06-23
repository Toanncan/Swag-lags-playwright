# Ngữ Cảnh Dự Án

## Hướng dẫn sử dụng

File này là mẫu để ghi thông tin hệ thống đang kiểm thử. Agent nên đọc file này trước khi tạo mã tự động hóa để hiểu miền nghiệp vụ, môi trường và ngăn xếp kỹ thuật.

## Tổng quan ứng dụng

| Mục | Nội dung |
|---|---|
| Tên ứng dụng | [Tên ứng dụng] |
| Mô tả | [Mô tả ngắn] |
| Loại ứng dụng | Web |
| URL môi trường kiểm thử | [URL staging hoặc test] |

## Ngăn xếp kỹ thuật

| Thành phần | Công nghệ |
|---|---|
| Giao diện | [React, Angular, Vue hoặc công nghệ khác] |
| Backend | [Node.js, Java, .NET hoặc công nghệ khác] |
| Cơ sở dữ liệu | [MySQL, PostgreSQL, MongoDB hoặc công nghệ khác] |
| Xác thực | [JWT, OAuth2, session hoặc cơ chế khác] |
| Tự động hóa kiểm thử | Playwright |

## Module chính

| Module | Mô tả | Độ ưu tiên |
|---|---|---|
| Đăng nhập | Đăng nhập, quên mật khẩu, xác thực nhiều bước nếu có | Cao |
| Trang tổng quan | Hiển thị thông tin sau đăng nhập | Trung bình |
| Quản lý người dùng | Thêm, sửa, xóa, phân quyền | Cao |
| [Module khác] | [Mô tả] | [Cao, Trung bình, Thấp] |

## Môi trường

| Môi trường | URL | Ghi chú tài khoản |
|---|---|---|
| Dev | [URL] | [Ghi chú, không ghi mật khẩu thật] |
| Staging | [URL] | [Ghi chú, không ghi mật khẩu thật] |
| Production | Không chạy test tự động nếu chưa được phép | Không áp dụng |

## Ghi chú đặc biệt

- [Quy tắc nghiệp vụ quan trọng]
- [Trường hợp ngoại lệ cần chú ý]
- [Vấn đề đã biết]
