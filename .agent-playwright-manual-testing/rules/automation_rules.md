# Quy Tắc Chung Cho Tự Động Hóa Kiểm Thử

## Phạm vi

Áp dụng cho mọi tác vụ tạo hoặc sửa mã tự động hóa trong agent này. Với giao diện web, framework mặc định là Playwright.

## 1. Kiến trúc

- Bắt buộc dùng Page Object Model.
- Tách rõ Page class, file test, dữ liệu kiểm thử và tiện ích dùng chung.
- Bộ định vị đặt trong lớp trang, không đặt trực tiếp trong file kiểm thử.
- Assertion đặt trong file test, không đặt trong Page class trừ khi dự án hiện tại đã có quy ước khác.
- Không tạo cấu trúc mới khi dự án đã có cấu trúc phù hợp.

## 2. Dữ liệu kiểm thử

- Trường yêu cầu duy nhất như email, username hoặc mã nghiệp vụ phải được sinh động.
- Dữ liệu sinh ra phải có thể truy vết về ca kiểm thử.
- Mẫu khuyến nghị:

```text
<prefix>_<tenCaKiemThu>_<timestamp>_<random>
```

- Không dùng dữ liệu cá nhân thật.
- Không hardcode tài khoản, mật khẩu, token hoặc thông tin nhạy cảm.
- Mỗi test chạy song song phải có dữ liệu riêng để tránh xung đột.

## 3. Chất lượng mã

- Code phải đơn giản, dễ đọc, dễ bảo trì.
- Không để lại `console.log`, `print`, log tạm hoặc code bị comment.
- Không để import, bộ định vị, biến hoặc helper không dùng.
- Không lặp logic; tạo helper khi hành động lặp lại có ý nghĩa dùng chung.
- Mỗi test phải độc lập, không phụ thuộc thứ tự chạy.

## 4. Quản lý file

- Kiểm tra cấu trúc thư mục hiện có trước khi tạo file mới.
- Đặt file theo quy ước hiện tại của dự án.
- Không xóa file source của người dùng nếu không có yêu cầu rõ ràng.
- Nếu cần sửa file đang có thay đổi ngoài phạm vi tác vụ, đọc kỹ và giữ nguyên phần không liên quan.

## 5. Quy tắc đặt tên cho Playwright TypeScript

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| Page class | PascalCase, hậu tố `Page` | `LoginPage.ts` |
| File test | kebab-case, hậu tố `.spec.ts` | `login.spec.ts` |
| Test block | Mô tả hành vi bằng tiếng Việt hoặc theo chuẩn dự án | `test('đăng nhập thành công')` |
| Biến bộ định vị | lowerCamelCase, ưu tiên `readonly` | `readonly loginButton` |
| Helper | Tên rõ chức năng | `data-generator.ts` |

## 6. Assertion

- Mỗi ca kiểm thử phải có ít nhất một assertion.
- Assertion phải kiểm tra hành vi hoặc trạng thái người dùng quan sát được.
- Ưu tiên assertion của Playwright:

```typescript
await expect(page.getByText('Đăng nhập thành công')).toBeVisible();
await expect(page).toHaveURL(/dashboard/);
```

## 7. Tính độc lập

- Dùng `beforeEach` và `afterEach` cho setup hoặc teardown.
- Không chia sẻ trạng thái có thể thay đổi giữa các test.
- Nếu test tạo dữ liệu, phải có cleanup khi dự án hỗ trợ.
