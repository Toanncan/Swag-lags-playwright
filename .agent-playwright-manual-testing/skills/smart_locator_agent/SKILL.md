---
name: smart_locator_agent
description: Kỹ năng sinh bộ định vị Playwright ổn định, dễ đọc, dễ bảo trì và đã được xác minh trên DOM thật.
---

# Kỹ Năng Sinh Bộ Định Vị Ổn Định

## Mục tiêu

Kỹ năng này giúp agent chọn bộ định vị Playwright ổn định cho tự động hóa giao diện. Bộ định vị phải dựa trên DOM thật, có ý nghĩa với người dùng và dễ bảo trì.

## Khi sử dụng

- Cần tạo bộ định vị cho element mới.
- Cần review bộ định vị hiện có.
- Cần thay bộ định vị hỏng sau khi giao diện thay đổi.
- Cần tạo Page Object từ giao diện thật.

## Trách nhiệm của agent

1. Khảo sát DOM thật, không đoán.
2. Tìm thuộc tính ổn định.
3. Chọn bộ định vị chính.
4. Chọn bộ định vị dự phòng nếu cần.
5. Xác minh bộ định vị match đúng một element.
6. Giải thích ngắn gọn lý do chọn.

## Thứ tự ưu tiên Playwright

1. `getByRole()` cho element có vai trò và tên truy cập rõ.
2. `getByLabel()` cho trường nhập liệu có nhãn.
3. `getByPlaceholder()` cho ô nhập có placeholder ổn định.
4. `getByText()` cho nội dung text duy nhất và ít thay đổi.
5. `getByTestId()` khi dự án có `data-testid`.
6. `locator('css')` khi không có locator ngữ nghĩa phù hợp.
7. XPath chỉ dùng cuối cùng.

Ví dụ:

```typescript
page.getByRole('button', { name: 'Lưu' });
page.getByLabel('Email');
page.getByPlaceholder('Nhập mật khẩu');
page.getByTestId('submit-button');
```

## Quy tắc xác minh

Trước khi dùng bộ định vị:

- Bộ định vị match đúng một element.
- Element hiển thị và có thể tương tác.
- Bộ định vị ổn định sau reload hoặc thay đổi trạng thái thường gặp.
- Bộ định vị không dùng class động, XPath tuyệt đối hoặc chỉ số vị trí.
- Bộ định vị không phụ thuộc text dễ thay đổi nếu có nhãn tốt hơn.

## Định dạng đầu ra

Khi đề xuất bộ định vị, trả về:

| Thành phần | Bộ định vị chính | Bộ định vị dự phòng | Lý do |
|---|---|---|---|

## Điều cấm

- Không đoán bộ định vị.
- Không dùng class sinh tự động.
- Không dùng `nth-child` nếu có lựa chọn có ngữ nghĩa.
- Không dùng XPath tuyệt đối.
- Không đưa bộ định vị vào code trước khi xác minh.

## Quy tắc liên quan

- `.agent-playwright-manual-testing/rules/locator_strategy.md`
- `.agent-playwright-manual-testing/rules/playwright_rules.md`
