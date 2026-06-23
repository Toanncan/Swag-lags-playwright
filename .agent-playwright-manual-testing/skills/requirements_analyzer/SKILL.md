---
name: requirements_analyzer
description: Kỹ năng phân tích tài liệu yêu cầu, giao diện, mockup và ticket để tạo tài liệu phân tích rõ ràng cho kiểm thử.
---

# Kỹ Năng Phân Tích Yêu Cầu

## Mục tiêu

Kỹ năng này hướng dẫn agent phân tích yêu cầu từ tài liệu, Jira ticket, user story, giao diện hoặc mockup. Kết quả là tài liệu phân tích có cấu trúc, giúp QA hiểu phạm vi, tiêu chí chấp nhận, điểm mơ hồ và rủi ro trước khi viết ca kiểm thử hoặc tự động hóa.

## Khi sử dụng

- Người dùng yêu cầu phân tích requirement, ticket, user story hoặc tài liệu nghiệp vụ.
- Người dùng muốn phát hiện điểm chưa rõ trước khi tạo ca kiểm thử.
- Người dùng cung cấp mockup hoặc ảnh giao diện và cần phân tích tác động kiểm thử.
- Người dùng cần tài liệu yêu cầu chuẩn hóa từ nội dung hiện có.

## Quy trình phân tích

### 1. Thu thập nguồn

Agent phải đọc đầy đủ nguồn được cung cấp:

- Tài liệu yêu cầu dạng text, Markdown, HTML hoặc tài liệu xuất từ Jira.
- Mockup, screenshot hoặc mô tả giao diện.
- Ticket liên quan nếu được tham chiếu.
- Bối cảnh dự án nếu có.

Nếu thiếu nguồn chính, agent hỏi người dùng thay vì tự suy đoán.

### 2. Trích xuất thông tin cốt lõi

Ghi nhận:

- Mã hoặc tên yêu cầu.
- Mục tiêu tính năng.
- Vai trò người dùng liên quan.
- Phạm vi áp dụng.
- Tiêu chí chấp nhận.
- Quy tắc nghiệp vụ.
- Dữ liệu đầu vào và đầu ra.
- Trạng thái, quyền hạn, ngoại lệ hoặc phụ thuộc nếu có.

### 3. Phân tích giao diện

Khi có giao diện hoặc mockup:

- Mô tả bố cục chính.
- Liệt kê trường nhập liệu, nút, bảng, bộ lọc, tab, modal và thông báo.
- Ghi rõ nhãn, loại trường, bắt buộc hay tùy chọn, định dạng và giới hạn.
- So sánh giao diện với tài liệu để tìm điểm thiếu hoặc không nhất quán.

### 4. Phát hiện điểm mơ hồ

Không tự suy diễn logic nghiệp vụ phức tạp. Nếu thiếu thông tin, ghi vào mục cần làm rõ.

Các nhóm thường gặp:

- Quy tắc bắt buộc hoặc tùy chọn chưa rõ.
- Độ dài, định dạng, giá trị biên hoặc thông báo lỗi chưa được nêu.
- Hành vi khi không có dữ liệu, lỗi mạng, timeout hoặc truy cập đồng thời.
- Quyền người dùng hoặc phân quyền chưa đầy đủ.
- Mockup và tài liệu mô tả khác nhau.

### 5. Đánh giá rủi ro kiểm thử

Với mỗi rủi ro, ghi:

- Mã rủi ro.
- Mô tả.
- Ảnh hưởng.
- Gợi ý giảm thiểu.

## Cấu trúc đầu ra

Agent nên xuất tài liệu Markdown theo cấu trúc:

```markdown
# Phân Tích Yêu Cầu: [Tên hoặc mã yêu cầu]

## 1. Tổng Quan
## 2. User Story
## 3. Phạm Vi
## 4. Tiêu Chí Chấp Nhận
## 5. Đặc Tả Trường Dữ Liệu
## 6. Quy Tắc Nghiệp Vụ
## 7. Phụ Thuộc
## 8. Điểm Mơ Hồ
## 9. Rủi Ro Kiểm Thử
## 10. Khuyến Nghị
```

## Quy tắc bắt buộc

- Luôn viết bằng tiếng Việt.
- Không sinh ca kiểm thử nếu workflow chỉ yêu cầu phân tích.
- Không tự đoán nghiệp vụ khi không có căn cứ.
- Nếu có Playwright MCP và cần xác minh giao diện thật, ưu tiên mở browser để quan sát.
- Ghi rõ giả định nếu bắt buộc phải đưa ra giả định tạm thời.
