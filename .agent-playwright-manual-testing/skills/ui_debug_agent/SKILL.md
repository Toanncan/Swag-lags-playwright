---
name: ui_debug_agent
description: Kỹ năng khảo sát giao diện thật bằng Playwright MCP, phân tích DOM, xác minh bộ định vị và hỗ trợ gỡ lỗi kiểm thử giao diện.
---

# Kỹ Năng Khảo Sát Và Gỡ Lỗi Giao Diện

## Mục tiêu

Kỹ năng này hướng dẫn agent mở ứng dụng web thật, đọc DOM, thu thập bộ định vị ổn định, xác minh tương tác và hỗ trợ sửa lỗi tự động hóa giao diện bằng Playwright.

## Khi sử dụng

- Cần khám phá giao diện của một trang hoặc module mới.
- Cần tìm bộ định vị cho element cụ thể.
- Cần gỡ lỗi element không tìm thấy, click bị chặn hoặc timeout.
- Cần xác minh bộ định vị trên DOM thật trước khi đưa vào code.
- Cần phân tích form, bảng, modal, iframe, shadow DOM hoặc nội dung động.

## Trình tự Playwright MCP bắt buộc

```text
1. browser_navigate(url)
2. browser_resize(1920, 1080)
3. browser_wait_for(...)
4. browser_snapshot()
5. browser_click, browser_type hoặc browser_hover nếu cần
6. browser_take_screenshot nếu cần bằng chứng hình ảnh
```

Quy tắc:

- Không navigate lại nếu đã ở đúng trang.
- Luôn resize ngay sau khi mở trang.
- Luôn wait trước khi snapshot.
- Dùng snapshot để phân tích DOM và lấy ref tương tác.
- Chỉ dùng screenshot khi cần bằng chứng trực quan hoặc debug layout.

## Quy trình khảo sát

### 1. Chuẩn bị trang

1. Mở URL.
2. Resize về `1920x1080`.
3. Chờ dấu hiệu trang đã tải.
4. Nếu cần đăng nhập, dùng fixture có sẵn hoặc hỏi người dùng. Không đọc trực tiếp `.env`.

### 2. Thu thập cấu trúc DOM

Dùng `browser_snapshot` để xác định:

- Nút, ô nhập liệu, liên kết, tiêu đề, bảng, modal.
- Vai trò, tên truy cập, nhãn, placeholder, test id.
- Quan hệ cha con.
- Trạng thái hiển thị, bật tắt, chọn, mở rộng.

### 3. Xác định bộ định vị Playwright

Ưu tiên:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. CSS selector ổn định
7. XPath nếu không còn cách tốt hơn

### 4. Xác minh bộ định vị

Bộ định vị chỉ được chấp nhận khi:

- Match đúng một element trong phạm vi.
- Element hiển thị và có thể tương tác.
- Không chứa class động hoặc vị trí DOM mong manh.
- Đã được thử tương tác hoặc assertion trên trang thật.

## Xử lý tình huống đặc biệt

### Trang yêu cầu đăng nhập

- Dùng fixture hiện có nếu dự án đã có.
- Hỏi người dùng nếu thiếu tài khoản hoặc cần OTP.
- Không hardcode hoặc đọc trực tiếp dữ liệu nhạy cảm.

### Modal

- Dùng snapshot sau khi modal mở.
- Chờ animation hoàn tất nếu có.
- Tương tác bằng ref hoặc locator trong vùng modal.

### Iframe

- Kiểm tra snapshot có thấy nội dung iframe không.
- Nếu cần code Playwright, dùng `frameLocator`.
- Không đoán selector bên trong iframe nếu chưa đọc DOM.

### Shadow DOM

- Playwright có thể xuyên shadow DOM với locator phù hợp.
- Vẫn phải xác minh bộ định vị trên giao diện thật.

### Nội dung động

- Chờ text hoặc trạng thái cụ thể trước khi snapshot.
- Nếu lazy load, scroll tới vùng cần khảo sát rồi snapshot lại.

### Bảng và danh sách

- Xác định pattern cho row và cell.
- Ưu tiên lọc theo nội dung ổn định, ví dụ row có text nghiệp vụ rồi tìm nút trong row.

## Điều cấm

- Không đoán bộ định vị từ tên tính năng.
- Không dùng screenshot để chọn bộ định vị nếu snapshot có đủ thông tin.
- Không copy bộ định vị cũ khi chưa xác minh.
- Không dùng class động, XPath tuyệt đối hoặc vị trí DOM.
- Không chụp screenshot liên tục nếu không cần.

## Kết quả đầu ra

- Bảng bộ định vị chính và bộ định vị dự phòng.
- Phân tích DOM liên quan.
- Gợi ý Page Object.
- Nguyên nhân lỗi giao diện và cách sửa.

## Quy tắc liên quan

- `.agent-playwright-manual-testing/rules/locator_strategy.md`
- `.agent-playwright-manual-testing/rules/playwright_rules.md`
- `.agent-playwright-manual-testing/rules/automation_rules.md`
