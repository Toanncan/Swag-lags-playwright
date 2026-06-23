---
description: Phân tích tài liệu yêu cầu, phát hiện phạm vi, tiêu chí chấp nhận, phụ thuộc, điểm mơ hồ và rủi ro kiểm thử; không sinh ca kiểm thử.
skills:
  - requirements_analyzer
---

# Quy Trình: Phân Tích Tài Liệu Yêu Cầu

## Kỹ năng bắt buộc

Trước khi bắt đầu, agent phải đọc kỹ kỹ năng sau:

- `requirements_analyzer`: `.agent-playwright-manual-testing/skills/requirements_analyzer/SKILL.md`

## Mục đích

Quy trình này dùng để phân tích tài liệu yêu cầu như Jira ticket, file tài liệu, user story, mô tả nghiệp vụ hoặc mockup. Kết quả là tài liệu phân tích chi tiết, tập trung vào hiểu yêu cầu, phân rã phạm vi, phát hiện điểm mơ hồ và rủi ro kiểm thử. Quy trình này không sinh ca kiểm thử.

## Khi sử dụng

- Người dùng cung cấp tài liệu yêu cầu và yêu cầu phân tích hoặc review.
- Người dùng muốn hiểu rõ phạm vi, tiêu chí chấp nhận và phụ thuộc trước khi viết ca kiểm thử.
- Người dùng cần danh sách điểm mơ hồ để làm rõ với PO hoặc BA.
- Người dùng yêu cầu phân tích Jira ticket, requirement, user story hoặc mockup.

## Đầu vào cần thu thập

| Mục | Bắt buộc | Mô tả |
|---|---|---|
| Tài liệu yêu cầu | Có | File `.doc`, `.md`, URL Jira hoặc đoạn mô tả yêu cầu |
| Mockup hoặc ảnh chụp màn hình | Khuyến khích | Thiết kế giao diện, wireframe hoặc ảnh giao diện hiện tại |
| Ticket liên quan | Tùy chọn | Ticket phụ thuộc hoặc ticket có liên quan |
| Bối cảnh bổ sung | Tùy chọn | Thông tin hệ thống, miền nghiệp vụ, quy tắc hiện hành |

Nếu thiếu tài liệu yêu cầu chính, agent phải hỏi người dùng cung cấp trước khi phân tích.

## Các bước thực hiện

### Bước 1: Thu thập và đọc hiểu

1. Đọc tài liệu yêu cầu được cung cấp.
2. Nếu file là HTML xuất từ Jira, trích xuất nội dung chính thay vì đọc phần trang trí.
3. Xác định metadata nếu có: mã ticket, loại ticket, độ ưu tiên, trạng thái, sprint, người phụ trách, phiên bản sửa lỗi và nhãn.
4. Đọc mockup hoặc ảnh chụp màn hình nếu được cung cấp.
5. Kiểm tra ticket liên quan nếu được nêu trong tài liệu hoặc được người dùng cung cấp.
6. Xác nhận ngắn gọn phạm vi đã hiểu trước khi phân tích sâu.

### Bước 2: Trích xuất thông tin cốt lõi

1. Tóm tắt tổng quan ticket hoặc tính năng.
2. Trích xuất user story nếu có.
3. Xác định phạm vi áp dụng: module, trang, thành phần giao diện hoặc quy trình bị ảnh hưởng.
4. Phân rã từng tiêu chí chấp nhận thành nhóm logic rõ ràng.
5. Ghi nhận quy tắc mặc định, tùy chọn, ngoại lệ và điều kiện cấu hình nếu có.

### Bước 3: Phân tích giao diện nếu có mockup

1. Mô tả bố cục: điều hướng, vùng nội dung, biểu mẫu, bảng, hộp thoại.
2. Liệt kê thành phần: trường nhập liệu, nút, danh sách chọn, tab, bảng, thông báo.
3. Ghi rõ đặc tả trường dữ liệu: nhãn, loại điều khiển, bắt buộc hay không, định dạng, giới hạn.
4. So sánh mockup với tài liệu để phát hiện thiếu sót hoặc không nhất quán.

### Bước 4: Phân tích phụ thuộc

1. Xác định ticket, tính năng hoặc quy trình liên quan.
2. Tóm tắt ảnh hưởng của từng phụ thuộc.
3. Tách rõ quy tắc đến từ tài liệu chính và quy tắc đến từ tài liệu phụ thuộc.
4. Không tự đoán quy tắc nghiệp vụ khi tài liệu chưa nêu rõ.

### Bước 5: Phát hiện điểm mơ hồ và rủi ro

Với mỗi điểm mơ hồ, ghi:

| Trường | Nội dung |
|---|---|
| Mã | `AMB-XX` |
| Câu hỏi | Điều gì chưa rõ cần làm rõ |
| Nguy cơ | Ảnh hưởng nếu không làm rõ |
| Mức độ | Cao, Trung bình hoặc Thấp |

Hướng phát hiện điểm mơ hồ:

- Từ khóa không rõ như "khi cần", "tương tự", "vân vân", "áp dụng nếu phù hợp".
- Thiếu quy tắc kiểm tra dữ liệu: bắt buộc, độ dài, định dạng, giá trị biên.
- Hành vi ngoại lệ chưa rõ: lỗi mạng, không có dữ liệu, truy cập đồng thời.
- Không nhất quán giữa tài liệu và mockup.
- Giá trị ngưỡng hoặc cấu hình chưa xác định.

Với mỗi rủi ro kiểm thử, ghi mã `RISK-XX`, tên rủi ro, mô tả và cách giảm thiểu.

### Bước 6: Tổng hợp và bàn giao

Agent phải xuất tài liệu Markdown có cấu trúc:

```markdown
# Phân Tích Yêu Cầu: [Mã hoặc tên yêu cầu]

## 1. Tổng Quan
## 2. User Story
## 3. Phạm Vi Áp Dụng
## 4. Tiêu Chí Chấp Nhận
## 5. Phụ Thuộc
## 6. Phân Tích Giao Diện
## 7. Điểm Mơ Hồ Và Rủi Ro
## 8. Ma Trận Trạng Thái Nếu Có
## 9. Tóm Tắt Tiêu Chí Chấp Nhận
## 10. Khuyến Nghị Kiểm Thử
```

## Quy tắc quan trọng

- Không sinh ca kiểm thử trong quy trình này.
- Không tự đoán logic nghiệp vụ nếu tài liệu không nêu rõ.
- Không bỏ qua comment hoặc ticket liên quan khi chúng được tham chiếu.
- Phải ghi rõ điểm không nhất quán giữa tài liệu và mockup.
- Toàn bộ nội dung trả về phải bằng tiếng Việt.

## Quy trình tiếp theo

| Nhu cầu sau phân tích | Quy trình dùng tiếp |
|---|---|
| Sinh ca kiểm thử thủ công bài bản | `/generate_manual_testcases_rbt` |
| Sinh kịch bản tự động hóa Playwright từ ca kiểm thử | `/generate_automation_from_testcases` |
