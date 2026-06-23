---
name: rbt_manual_testing
description: Kỹ năng sinh ca kiểm thử thủ công theo hai chế độ: nhanh và đầy đủ 6 bước dựa trên rủi ro.
---

# Kỹ Năng Sinh Ca Kiểm Thử Thủ Công

## Mục tiêu

Kỹ năng này hướng dẫn agent sinh ca kiểm thử thủ công từ yêu cầu. Kỹ năng có hai chế độ:

| Chế độ | Khi dùng | Cách chạy |
|---|---|---|
| Nhanh | Yêu cầu rõ, phạm vi nhỏ | Sinh trong một lượt |
| Đầy đủ theo rủi ro | Yêu cầu phức tạp, cần phân tích và checkpoint | Chạy tuần tự 6 bước |

## Nguyên tắc cốt lõi

- Con người xác nhận chiến lược, phạm vi và điểm mơ hồ quan trọng.
- Agent phân tích, phân rã, đề xuất rủi ro và sinh ca kiểm thử.
- Người dùng review trước khi chốt danh sách ca kiểm thử.

## Khi sử dụng

- Sinh ca kiểm thử thủ công từ requirement hoặc user story.
- Phân tích yêu cầu để phát hiện điểm mơ hồ.
- Phân rã hệ thống thành module hoặc tính năng.
- Xây dựng ma trận truy vết.
- Áp dụng kiểm thử dựa trên rủi ro.

Không dùng kỹ năng này để sinh code tự động hóa. Khi cần code Playwright, dùng `qa_automation_engineer`.

## Cách chọn chế độ

### Chế độ nhanh

Dùng khi:

- Người dùng yêu cầu sinh nhanh ca kiểm thử.
- Yêu cầu đã rõ và phạm vi nhỏ.
- Không cần checkpoint từng bước.

### Chế độ đầy đủ theo rủi ro

Dùng khi:

- Người dùng gọi `/generate_manual_testcases_rbt`.
- Người dùng yêu cầu quy trình 6 bước hoặc kiểm thử dựa trên rủi ro.
- Phạm vi lớn hoặc có nhiều module.
- Yêu cầu còn mơ hồ, cần hỏi làm rõ.

Nếu không chắc chế độ, agent hỏi người dùng chọn.

## Chế độ nhanh

Agent thực hiện trong một lượt:

1. Đọc và hiểu yêu cầu.
2. Xác định luồng chính, luồng âm, giá trị biên và trường hợp ngoại lệ.
3. Áp dụng kỹ thuật thiết kế ca kiểm thử:
   - Phân vùng tương đương.
   - Phân tích giá trị biên.
   - Bảng quyết định.
   - Chuyển trạng thái.
4. Với biểu mẫu, liệt kê từng trường và sinh kiểm tra dữ liệu riêng cho từng trường.
5. Sinh bảng ca kiểm thử Markdown đầy đủ.

Định dạng:

```markdown
| Mã TC | Module | Kịch Bản | Điều Kiện Tiên Quyết | Bước Thực Hiện | Dữ Liệu Kiểm Thử | Kết Quả Mong Đợi | Độ Ưu Tiên |
```

## Bảng kiểm tra dữ liệu theo loại trường

| Loại trường | Nội dung cần kiểm thử |
|---|---|
| Text | Bắt buộc, độ dài nhỏ nhất, độ dài lớn nhất, chỉ khoảng trắng, ký tự đặc biệt, HTML, SQL injection, Unicode, khoảng trắng đầu cuối |
| Email | Đúng định dạng, thiếu `@`, thiếu miền, nhiều `@`, miền sai, độ dài lớn nhất, trùng email nếu có ràng buộc duy nhất |
| Số điện thoại | Tiền tố hợp lệ, độ dài, ký tự chữ, ký tự đặc biệt, khoảng trắng, mã vùng không hợp lệ |
| Ngày giờ | Đúng định dạng, ngày không tồn tại, năm nhuận, quá khứ, tương lai, giá trị nhỏ nhất, giá trị lớn nhất, múi giờ nếu áp dụng |
| Số hoặc tiền tệ | Nhỏ nhất, lớn nhất, số âm, số 0, số thập phân, ký tự không phải số, số quá lớn, số có số 0 đầu |
| Danh sách chọn | Giá trị mặc định, tất cả lựa chọn hợp lệ, lựa chọn bị vô hiệu, chưa chọn khi bắt buộc |
| Checkbox hoặc radio | Trạng thái mặc định, chọn, bỏ chọn, bắt buộc, chỉ chọn một trong nhóm radio |
| Tải file | Loại file hợp lệ, loại file sai, kích thước lớn nhất, file rỗng, tên file đặc biệt, nhiều file nếu hỗ trợ |
| Mật khẩu | Độ dài, chữ hoa, chữ thường, chữ số, ký tự đặc biệt, hiện ẩn mật khẩu, xác nhận mật khẩu khớp |
| Textarea | Độ dài lớn nhất, xuống dòng, HTML, bộ đếm ký tự nếu có |

Mỗi trường có đặc tính riêng nên phải có ca kiểm thử riêng; không dùng một bộ kiểm tra chung cho mọi trường.

## Chế độ đầy đủ theo rủi ro

### Bước 1: Khởi tạo bối cảnh

Yêu cầu người dùng cung cấp tên dự án, mục tiêu kiểm thử, mô tả hệ thống và tài liệu yêu cầu. Tóm tắt phạm vi và chờ xác nhận.

### Bước 2: Phân tích và hỏi đáp

Phân tích luồng chính, luồng thay thế, luồng ngoại lệ, điểm mơ hồ và mâu thuẫn. Đặt câu hỏi theo mã `Q1`, `Q2`... rồi dừng chờ người dùng trả lời.

### Bước 3: Phân rã

Chia tính năng thành module, sub-module hoặc luồng nghiệp vụ. Mô tả chức năng và phụ thuộc.

### Bước 4: Truy vết

Map module hoặc quy tắc sang mã yêu cầu. Liệt kê kịch bản cấp cao và dừng để người dùng review.

### Bước 5: Sinh ca kiểm thử

Đánh giá rủi ro từng module, sinh ca kiểm thử chi tiết, bao phủ luồng chính, luồng âm, biên, ngoại lệ và kiểm tra từng trường dữ liệu.

### Bước 6: Chuẩn hóa bảng

Xuất bảng Markdown:

```markdown
| Mã TC | Module | Mức Rủi Ro | Tiêu Đề | Điều Kiện Tiên Quyết | Bước Thực Hiện | Kết Quả Mong Đợi | Độ Ưu Tiên | Dữ Liệu Kiểm Thử |
```

## Điều cấm

- Không gộp nhiều bước trong chế độ đầy đủ.
- Không tự đoán logic nghiệp vụ.
- Không bỏ qua phân tích điểm mơ hồ.
- Không dùng dữ liệu kiểm thử chung chung.
- Không gộp kiểm tra nhiều trường vào một ca kiểm thử nếu từng trường có quy tắc riêng.
- Không chỉ sinh luồng chính.

## Yêu cầu đầu ra

- Toàn bộ nội dung bằng tiếng Việt.
- Ca kiểm thử có dữ liệu cụ thể.
- Bảng Markdown rõ ràng, sẵn sàng đưa sang Jira, Excel hoặc TestRail.
