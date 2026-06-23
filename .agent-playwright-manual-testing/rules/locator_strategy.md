# Chiến Lược Chọn Bộ Định Vị

## Nguyên tắc cốt lõi

Bộ định vị phải ổn định, dễ đọc và phản ánh cách người dùng tương tác với giao diện. Không chọn element dựa trên cấu trúc DOM phục vụ styling nếu có lựa chọn có ngữ nghĩa tốt hơn.

## 1. Thứ tự ưu tiên chung

1. Thuộc tính truy cập và ngữ nghĩa giao diện.
2. Thuộc tính chuyên dụng cho kiểm thử như `data-testid`, `data-test`, `data-qa`.
3. Thuộc tính định danh ổn định như `id` hoặc `name`.
4. Bộ định vị ngữ nghĩa của Playwright như `getByRole`, `getByLabel`.
5. CSS selector.
6. XPath, chỉ dùng khi không còn lựa chọn tốt hơn.

## 2. Quy tắc ổn định

Bộ định vị phải:

- Match đúng một element trong phạm vi cần thao tác.
- Vẫn đúng khi giao diện thay đổi bố cục hoặc thêm wrapper.
- Không phụ thuộc class động, hash build, vị trí tuyệt đối hoặc cấu trúc DOM quá sâu.
- Không phụ thuộc text dễ thay đổi nếu có nhãn hoặc vai trò ổn định hơn.

Không dùng:

- Class động như `.css-abc123` hoặc `.sc-xyz`.
- `nth-child` hoặc `nth-of-type` khi có locator tốt hơn.
- XPath tuyệt đối dựa trên vị trí.
- ID tự sinh bởi framework nếu ID thay đổi theo lần chạy.

## 3. Quy trình xác minh

Trước khi đưa bộ định vị vào code:

1. Dùng snapshot hoặc DOM thật để xác định element.
2. Kiểm tra bộ định vị match đúng một element.
3. Kiểm tra element đang hiển thị và có thể tương tác.
4. Thử thao tác hoặc assertion bằng locator.
5. Reload hoặc chuyển trạng thái trang nếu cần để kiểm tra độ ổn định.

## 4. Quy tắc Playwright

Chi tiết áp dụng Playwright nằm tại:

- `.agent-playwright-manual-testing/rules/playwright_rules.md`
