# Mẫu Yêu Cầu

## Mục đích

File này chứa mẫu yêu cầu bằng tiếng Việt để agent tham khảo khi người dùng cung cấp thông tin chưa rõ hoặc cần thống nhất định dạng đầu ra.

## 1. Phân tích yêu cầu

```text
Hãy phân tích yêu cầu sau:

Yêu cầu:
[Nội dung yêu cầu]

Đầu ra cần có:
- Tổng quan
- Phạm vi
- Tiêu chí chấp nhận
- Trường dữ liệu
- Quy tắc nghiệp vụ
- Điểm mơ hồ
- Rủi ro kiểm thử
```

## 2. Sinh ca kiểm thử thủ công

```text
Hãy sinh ca kiểm thử thủ công cho yêu cầu sau:

Yêu cầu:
[Nội dung yêu cầu]

Định dạng:
| Mã TC | Module | Kịch Bản | Điều Kiện Tiên Quyết | Bước Thực Hiện | Dữ Liệu Kiểm Thử | Kết Quả Mong Đợi | Độ Ưu Tiên |

Yêu cầu:
- Bao phủ luồng chính, luồng âm, giá trị biên và trường hợp ngoại lệ.
- Dữ liệu kiểm thử phải cụ thể.
- Viết bằng tiếng Việt.
```

## 3. Tạo tự động hóa Playwright từ ca kiểm thử

```text
Hãy chuyển ca kiểm thử sau thành mã tự động hóa Playwright:

Ca kiểm thử:
[Nội dung ca kiểm thử]

Yêu cầu:
- Dùng Page Object Model.
- Khảo sát giao diện thật trước khi chọn locator.
- Không dùng sleep cố định.
- Có assertion rõ ràng.
- Dữ liệu kiểm thử phải có thể truy vết.

Đầu ra:
- Page Object.
- File test Playwright.
- Dữ liệu kiểm thử nếu cần.
- Ghi chú cách chạy.
```

## 4. Sinh bộ định vị

```text
Hãy khảo sát element sau và đề xuất bộ định vị Playwright ổn định:

Element:
[Mô tả element]

Trang:
[URL hoặc mô tả trang]

Đầu ra:
| Thành phần | Bộ định vị chính | Bộ định vị dự phòng | Lý do |
```

## 5. Sinh dữ liệu kiểm thử

```text
Hãy sinh dữ liệu kiểm thử cho module sau:

Module:
[Tên module]

Danh sách trường:
[Danh sách trường]

Yêu cầu:
- Dữ liệu hợp lệ.
- Dữ liệu không hợp lệ.
- Giá trị biên.
- Trường hợp ngoại lệ.
- Định dạng JSON hoặc Markdown.
```
