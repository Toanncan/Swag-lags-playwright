---
description: Chuyển ca kiểm thử thủ công thành kịch bản tự động hóa Playwright có Page Object, dữ liệu kiểm thử, chạy thử và tự sửa lỗi.
skills:
  - qa_automation_engineer
  - ui_debug_agent
  - smart_locator_agent
  - test_data_generator
---

# Quy Trình: Tạo Kịch Bản Tự Động Hóa Playwright Từ Ca Kiểm Thử

## Kỹ năng bắt buộc

Trước khi bắt đầu, agent phải đọc kỹ:

- `qa_automation_engineer`: `.agent-playwright-manual-testing/skills/qa_automation_engineer/SKILL.md`
- `ui_debug_agent`: `.agent-playwright-manual-testing/skills/ui_debug_agent/SKILL.md`
- `smart_locator_agent`: `.agent-playwright-manual-testing/skills/smart_locator_agent/SKILL.md`
- `test_data_generator`: `.agent-playwright-manual-testing/skills/test_data_generator/SKILL.md`

Nếu dự án chưa có cấu trúc tự động hóa, đọc thêm:

- `framework_architect`: `.agent-playwright-manual-testing/skills/framework_architect/SKILL.md`

## Mục đích

Quy trình này đọc ca kiểm thử thủ công do người dùng cung cấp, khảo sát giao diện thật bằng Playwright MCP, xác minh locator trên DOM thật, sinh Page Object và file test Playwright, chạy kiểm thử, tự sửa lỗi trong giới hạn cho phép, rồi bàn giao kết quả sạch.

## Nguyên tắc thực thi

- Chỉ dùng Playwright cho tự động hóa giao diện web.
- Không đoán bộ định vị. Mọi bộ định vị phải được xác minh trên DOM thật.
- Khi khảo sát giao diện, dùng viewport `1920x1080`.
- Mọi mã kiểm thử phải theo Page Object Model.
- Mỗi ca kiểm thử phải có ít nhất một assertion rõ ràng.
- Không hỏi người dùng trong quá trình tự sửa lỗi, trừ khi có mâu thuẫn nghiệp vụ, ứng dụng không truy cập được hoặc hết 5 vòng tự sửa.
- Phải tạo và cập nhật `task.md` để theo dõi tiến độ.

## Đầu vào cần thu thập

| Đầu vào | Bắt buộc | Cách lấy |
|---|---|---|
| File ca kiểm thử | Có | Người dùng cung cấp path, URL hoặc nội dung trực tiếp |
| URL ứng dụng | Có | Người dùng cung cấp hoặc lấy từ ca kiểm thử |
| Tài khoản đăng nhập | Tùy trường hợp | Dùng fixture có sẵn hoặc hỏi người dùng |
| Ngữ cảnh dự án | Khuyến khích | Đọc từ `PROJECT_CONTEXT.md` nếu có |

Nếu thiếu file ca kiểm thử hoặc URL ứng dụng, agent phải hỏi trước khi bắt đầu.

## Các bước thực hiện

### Bước 1: Phân tích ca kiểm thử

1. Đọc file ca kiểm thử thủ công.
2. Trích xuất mã ca kiểm thử, tiêu đề, bước thực hiện, kết quả mong đợi, dữ liệu kiểm thử, độ ưu tiên và điều kiện tiên quyết.
3. Xác định các trang hoặc màn hình đi qua.
4. Tạo file `task.md` theo mẫu:

```markdown
# Tiến Độ Tạo Tự Động Hóa

- [x] Bước 1: Phân tích ca kiểm thử
- [ ] Bước 2: Khảo sát giao diện
- [ ] Bước 3: Thiết kế Page Object
- [ ] Bước 4: Chuẩn bị dữ liệu kiểm thử
- [ ] Bước 5: Sinh kịch bản Playwright
- [ ] Bước 6: Chạy thử và tự sửa lỗi
- [ ] Bước 7: Dọn dẹp và bàn giao
```

### Bước 2: Khảo sát giao diện bằng Playwright MCP

1. Mở URL ứng dụng.
2. Resize browser về `1920x1080`.
3. Chờ trang tải xong.
4. Dùng `browser_snapshot` để đọc cây truy cập.
5. Xác định các thành phần cần tương tác.
6. Thu thập bộ định vị tốt nhất theo kỹ năng `smart_locator_agent`.
7. Thử tương tác để xác minh bộ định vị.

Ghi lại bảng bộ định vị:

| Trang | Thành phần | Hành động | Bộ định vị chính | Bộ định vị dự phòng | Đã xác minh |
|---|---|---|---|---|---|

### Bước 3: Thiết kế Page Object

1. Kiểm tra cấu trúc dự án hiện tại.
2. Nếu đã có thư mục page, đặt file đúng vị trí hiện có.
3. Nếu chưa có cấu trúc, áp dụng kỹ năng `framework_architect`.
4. Mỗi trang hoặc màn hình chính có một Page class.
5. Bộ định vị nằm trong lớp trang, không đặt trực tiếp trong file kiểm thử.
6. Method mô tả hành vi người dùng, ví dụ `login()` hoặc `submitSearch()`.

### Bước 4: Chuẩn bị dữ liệu kiểm thử

1. Tách dữ liệu cố định, dữ liệu cần sinh động và dữ liệu nhạy cảm.
2. Dữ liệu cần duy nhất phải có tiền tố, tên ca kiểm thử và timestamp.
3. Không hardcode mật khẩu hoặc thông tin nhạy cảm trong mã.
4. Không đọc trực tiếp file `.env`; dùng cấu hình hoặc biến môi trường theo dự án.

### Bước 5: Sinh kịch bản Playwright

1. Tạo file test theo module hoặc nhóm ca kiểm thử.
2. Dùng Page Object để thực hiện thao tác.
3. Dùng assertion từ Playwright để kiểm tra kết quả.
4. Không dùng `waitForTimeout()` hoặc delay cố định.
5. Không để import thừa, code comment tạm hoặc log debug.

### Bước 6: Chạy thử và tự sửa lỗi

Chạy kiểm thử ở chế độ headed trong giai đoạn debug:

```bash
npx playwright test <test_file> --headed
```

Nếu lỗi, tự xử lý tối đa 5 vòng:

1. Đọc log và xác định bước lỗi.
2. Phân loại lỗi: locator hỏng, timeout, assertion sai, điều hướng sai, dữ liệu trùng hoặc lỗi biên dịch.
3. Sửa đúng nguyên nhân.
4. Chạy lại test.
5. Ghi kết quả từng vòng vào `task.md`.

Khi đã pass, chạy xác nhận độ ổn định:

```bash
npx playwright test <test_file> --repeat-each=2 --retries=0
```

### Bước 7: Dọn dẹp và bàn giao

Trước khi bàn giao, agent phải:

- Xóa log debug, code bị comment và locator không dùng.
- Đảm bảo không còn `waitForTimeout()` hoặc delay cố định.
- Đảm bảo không hardcode dữ liệu nhạy cảm.
- Cập nhật `task.md` với trạng thái cuối.
- Báo cáo số ca pass, fail, skip và danh sách file đã tạo hoặc sửa.

## Kết quả đầu ra

- `task.md` theo dõi tiến độ và kết quả.
- Page Object classes.
- File test Playwright.
- Bộ sinh dữ liệu kiểm thử nếu cần.
- Bảng bộ định vị đã xác minh.
- Báo cáo kết quả chạy kiểm thử.
