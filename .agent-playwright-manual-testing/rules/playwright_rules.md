# Quy Tắc Dành Riêng Cho Playwright

## 1. Thiết lập trình duyệt

- Khi debug giao diện, dùng viewport `1920x1080`.
- Với Playwright MCP, thứ tự bắt buộc là:

```text
1. browser_navigate(url)
2. browser_resize(1920, 1080)
3. browser_wait_for(...)
4. browser_snapshot()
```

- Chạy headed trong giai đoạn thiết lập và debug.
- Chỉ dùng headless khi test đã pass ổn định hoặc khi chạy trong CI.

## 2. Tìm element

- Ưu tiên Playwright MCP để mở browser và xác minh giao diện thật.
- Không suy đoán locator từ tên tính năng hoặc tài liệu.
- Không copy locator cũ nếu chưa xác minh lại trên DOM hiện tại.

## 3. Thứ tự ưu tiên bộ định vị

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. `locator('css')`
7. XPath, chỉ dùng khi không có lựa chọn ổn định hơn.

Ví dụ:

```typescript
page.getByRole('button', { name: 'Đăng nhập' });
page.getByLabel('Email');
page.getByPlaceholder('Nhập mật khẩu');
```

Tránh:

```typescript
page.locator('//button[@class="btn-login"]');
page.locator('.form-input:nth-child(2)');
```

## 4. Chiến lược chờ

Không dùng:

- `page.waitForTimeout()`
- Delay tự tạo bằng `setTimeout`
- Bất kỳ sleep cố định nào

Nên dùng:

```typescript
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Thành công');
await expect(page).toHaveURL(/dashboard/);
```

Chỉ dùng `waitForSelector()` khi assertion thông thường không đáp ứng được tình huống đặc biệt.

## 5. Cấu trúc test

```typescript
test.describe('Tên module', () => {
  test.beforeEach(async ({ page }) => {
    // Chuẩn bị dữ liệu, điều hướng hoặc đăng nhập.
  });

  test('mô tả hành vi cần kiểm thử', async ({ page }) => {
    // Sắp xếp dữ liệu.
    // Thực hiện hành động.
    // Kiểm tra kết quả.
  });
});
```

## 6. Điều kiện bàn giao

- Test chạy pass ở chế độ headed.
- Test chạy ổn định với `--repeat-each=2 --retries=0` khi môi trường cho phép.
- Không còn log debug, sleep cố định hoặc dữ liệu nhạy cảm hardcode.
