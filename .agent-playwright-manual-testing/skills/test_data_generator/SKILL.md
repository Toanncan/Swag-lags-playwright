---
name: test_data_generator
description: Kỹ năng sinh dữ liệu kiểm thử duy nhất, có thể truy vết, phù hợp cho ca kiểm thử thủ công và tự động hóa Playwright.
---

# Kỹ Năng Sinh Dữ Liệu Kiểm Thử

## Mục tiêu

Kỹ năng này hướng dẫn agent tạo dữ liệu kiểm thử đáng tin cậy, có cấu trúc, không trùng lặp và có thể truy vết về ca kiểm thử đã tạo ra dữ liệu đó.

## Khi sử dụng

- Tạo dữ liệu cho ca kiểm thử mới.
- Sinh dữ liệu hợp lệ, không hợp lệ, giá trị biên và trường hợp ngoại lệ.
- Chuẩn bị dữ liệu cho test Playwright.
- Tạo dữ liệu cho kiểm thử theo bảng dữ liệu.

## Nguyên tắc dữ liệu

Dữ liệu phải:

- Duy nhất trong phạm vi chạy test.
- Có thể truy vết.
- Phù hợp quy tắc kiểm tra của trường dữ liệu.
- Không chứa dữ liệu cá nhân thật.
- Không hardcode thông tin nhạy cảm.

## Mẫu đặt tên

```text
<prefix>_<tenCaKiemThu>_<timestamp>
```

Ví dụ:

```text
auto_login_20260622143000
user_register_20260622143000
```

## Loại dữ liệu thường dùng

### Email

```text
auto_<tenCaKiemThu>_<timestamp>@test.com
```

### Username

```text
user_<tenCaKiemThu>_<timestamp>
```

### Số điện thoại

Sinh số theo định dạng hợp lệ của hệ thống đang kiểm thử. Nếu tài liệu không nêu rõ định dạng, ghi thành điểm cần làm rõ.

### Mật khẩu

Chỉ sinh theo chính sách mật khẩu đã biết. Nếu chính sách chưa rõ, hỏi người dùng hoặc ghi thành điểm mơ hồ.

## Nhóm dữ liệu

| Nhóm | Nội dung |
|---|---|
| Hợp lệ | Đúng định dạng, đủ trường bắt buộc, nằm trong giới hạn |
| Không hợp lệ | Thiếu trường bắt buộc, sai định dạng, ký tự cấm, dữ liệu trùng |
| Giá trị biên | Nhỏ nhất, lớn nhất, nhỏ nhất cộng một, lớn nhất trừ một, rỗng, null |
| Ngoại lệ | Unicode, ký tự đặc biệt, chuỗi rất dài, HTML, SQL injection, khoảng trắng đầu cuối |

## Định dạng đầu ra

```json
{
  "hop_le": [
    { "email": "auto_tc01_20260622@test.com", "password": "Test@12345" }
  ],
  "khong_hop_le": [
    { "email": "", "password": "Test@12345", "loi_mong_doi": "Email là bắt buộc" }
  ],
  "gia_tri_bien": [
    { "field": "name", "value": "a", "ghi_chu": "Độ dài nhỏ nhất" }
  ]
}
```

## Quy tắc cho tự động hóa

- Dữ liệu tạo trong test phải không gây xung đột khi chạy song song.
- Dữ liệu cố định nên đọc từ cấu hình hiện có của dự án.
- Dữ liệu nhạy cảm phải lấy từ biến môi trường hoặc cơ chế bảo mật của dự án.
- Không đọc trực tiếp `.env` nếu dự án có lớp cấu hình hoặc fixture riêng.

## Quy tắc liên quan

- `.agent-playwright-manual-testing/rules/automation_rules.md`
