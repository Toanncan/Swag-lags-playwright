---
description: Sinh ca kiểm thử thủ công chất lượng cao theo quy trình kiểm thử dựa trên rủi ro gồm 6 bước từ tài liệu yêu cầu.
skills:
  - rbt_manual_testing
  - requirements_analyzer
---

# Quy Trình: Sinh Ca Kiểm Thử Thủ Công Theo Rủi Ro

## Kỹ năng bắt buộc

Trước khi bắt đầu, agent phải đọc kỹ:

- `rbt_manual_testing`: `.agent-playwright-manual-testing/skills/rbt_manual_testing/SKILL.md`
- `requirements_analyzer`: `.agent-playwright-manual-testing/skills/requirements_analyzer/SKILL.md`

Sử dụng chế độ đầy đủ 6 bước trong kỹ năng `rbt_manual_testing`.

## Mục đích

Quy trình này sinh ca kiểm thử thủ công từ tài liệu yêu cầu theo hướng kiểm thử dựa trên rủi ro. Agent phải đi tuần tự từng bước, có điểm dừng để người dùng xác nhận, và không tự đoán quy tắc nghiệp vụ khi tài liệu chưa rõ.

## Nguyên tắc thực thi

- Chạy tuần tự đủ 6 bước, không gộp nhiều bước thành một lần trả lời.
- Dừng lại chờ người dùng phản hồi tại Bước 2 và Bước 4.
- Nếu chưa có tài liệu yêu cầu, hỏi người dùng cung cấp trước khi bắt đầu.
- Toàn bộ kết quả phải bằng tiếng Việt.
- Dữ liệu kiểm thử phải cụ thể, không dùng mô tả chung chung.

## Các bước thực hiện

### Bước 1: Khởi tạo bối cảnh

1. Yêu cầu người dùng cung cấp tên dự án hoặc tính năng, mô tả hệ thống, mục tiêu kiểm thử và tài liệu yêu cầu.
2. Đọc kỹ tài liệu và tóm tắt phạm vi.
3. Xác nhận đã hiểu bối cảnh.
4. Chờ người dùng xác nhận trước khi sang Bước 2.

### Bước 2: Phân tích yêu cầu và đặt câu hỏi

1. Xác định luồng chính, luồng thay thế và luồng ngoại lệ.
2. Phát hiện thiếu sót, mâu thuẫn và điểm chưa rõ.
3. Đặt câu hỏi có mã `Q1`, `Q2`... kèm bối cảnh và giả định nếu không được trả lời.
4. Dừng lại chờ người dùng trả lời trước khi sang Bước 3.

### Bước 3: Phân rã hệ thống

1. Chia tính năng thành module hoặc thành phần nhỏ.
2. Mô tả chức năng từng module.
3. Ghi nhận phụ thuộc giữa các module.

### Bước 4: Đảm bảo độ bao phủ

1. Lập ma trận truy vết từ module hoặc quy tắc sang mã yêu cầu.
2. Kiểm tra khoảng trống bao phủ.
3. Liệt kê kịch bản kiểm thử cấp cao.
4. Dừng lại chờ người dùng review trước khi sinh ca kiểm thử chi tiết.

### Bước 5: Sinh ca kiểm thử chi tiết

1. Đánh giá mức rủi ro cho từng module: Cao, Trung bình hoặc Thấp.
2. Sinh ca kiểm thử đầy đủ: mã ca kiểm thử, module, tiêu đề, điều kiện tiên quyết, bước thực hiện, kết quả mong đợi, dữ liệu kiểm thử, độ ưu tiên.
3. Bao phủ luồng chính, luồng âm, giá trị biên, trường hợp ngoại lệ và lỗi.
4. Áp dụng phân vùng tương đương, phân tích giá trị biên, bảng quyết định và chuyển trạng thái khi phù hợp.
5. Với biểu mẫu, phải liệt kê từng trường nhập liệu và sinh ca kiểm thử kiểm tra dữ liệu riêng cho từng trường.
6. Không gộp nhiều trường vào một ca kiểm thử kiểm tra dữ liệu nếu từng trường có quy tắc riêng.
7. Nếu số lượng quá lớn, chia theo module và hỏi người dùng trước khi tiếp tục phần kế tiếp.

### Bước 6: Chuẩn hóa định dạng

Đóng gói toàn bộ ca kiểm thử vào bảng Markdown:

```markdown
| Mã TC | Module | Mức Rủi Ro | Tiêu Đề | Điều Kiện Tiên Quyết | Bước Thực Hiện | Kết Quả Mong Đợi | Độ Ưu Tiên | Dữ Liệu Kiểm Thử |
```

Quy tắc:

- Không bỏ sót ca kiểm thử đã sinh ở Bước 5.
- Bước thực hiện và kết quả mong đợi phải đánh số tương ứng.
- Nếu bảng dài, tách thành nhiều phần rõ ràng.

## Kết quả đầu ra

- Bảng ca kiểm thử thủ công hoàn chỉnh.
- Ma trận truy vết yêu cầu.
- Danh sách điểm mơ hồ đã được xử lý hoặc còn cần làm rõ.
- Ghi chú rủi ro kiểm thử theo module.
