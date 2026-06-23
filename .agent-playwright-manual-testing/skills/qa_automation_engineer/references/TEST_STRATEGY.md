# Chiến Lược Kiểm Thử

## Hướng dẫn sử dụng

File này là mẫu chiến lược kiểm thử để agent tham khảo khi sinh ca kiểm thử hoặc mã tự động hóa Playwright. Cập nhật nội dung theo từng dự án trước khi dùng thực tế.

## Mục tiêu kiểm thử

- Đảm bảo các luồng nghiệp vụ chính hoạt động đúng.
- Phát hiện lỗi sớm trong vòng đời phát triển.
- Duy trì bộ kiểm thử hồi quy ổn định.
- Tạo dữ liệu kiểm thử có thể truy vết.

## Phạm vi kiểm thử

| Loại kiểm thử | Áp dụng | Công cụ |
|---|---|---|
| Kiểm thử chức năng giao diện | Có | Playwright |
| Kiểm thử hồi quy | Có | Playwright |
| Kiểm thử dữ liệu | Có | Helper dữ liệu hoặc fixture |
| Kiểm thử hiệu năng | Tùy chọn | Theo công cụ dự án |
| Kiểm thử bảo mật | Tùy chọn | Theo công cụ dự án |

## Chiến lược tự động hóa

| Mục | Lựa chọn |
|---|---|
| Mô hình thiết kế | Page Object Model |
| Khung kiểm thử | Playwright |
| Ngôn ngữ ưu tiên | TypeScript |
| Runner | Playwright Test |
| Báo cáo | Playwright HTML report hoặc công cụ hiện có |

## Phạm vi tự động hóa

- Smoke test: bao phủ luồng chính quan trọng.
- Regression test: bao phủ ca kiểm thử đã ổn định.
- Data-driven test: dùng JSON, fixture hoặc helper dữ liệu khi có nhiều bộ dữ liệu.

## Quản lý dữ liệu kiểm thử

- Dùng prefix và timestamp để dữ liệu có thể truy vết.
- Tách dữ liệu khỏi logic test.
- Không hardcode thông tin nhạy cảm trong code.
- Cleanup dữ liệu nếu hệ thống và dự án hỗ trợ.

## Kế hoạch chạy test

| Giai đoạn | Mô tả | Khi chạy |
|---|---|---|
| Smoke | Luồng chính | Mỗi build hoặc trước khi merge |
| Regression | Bộ kiểm thử đầy đủ | Trước release |
| Gỡ lỗi local | Chạy headed với viewport `1920x1080` | Khi phát triển hoặc sửa lỗi |
| CI | Chạy headless nếu test đã ổn định | Pipeline |

## Môi trường kiểm thử

- Ưu tiên môi trường staging hoặc test.
- Không chạy tự động hóa trên production nếu chưa được cho phép.
- Local debug chạy headed.
- CI có thể chạy headless.
