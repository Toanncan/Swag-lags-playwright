---
name: framework_architect
description: Kỹ năng thiết kế cấu trúc dự án tự động hóa Playwright khi dự án chưa có khung phù hợp.
---

# Kỹ Năng Thiết Kế Khung Playwright

## Mục tiêu

Kỹ năng này dùng khi cần tạo hoặc chuẩn hóa cấu trúc tự động hóa Playwright cho dự án web. Nội dung được giới hạn cho Playwright để phù hợp agent này.

## Khi sử dụng

- Dự án chưa có cấu trúc test Playwright.
- Người dùng yêu cầu tạo khung tự động hóa.
- Quy trình tạo tự động hóa từ ca kiểm thử cần nơi đặt lớp Page Object, file kiểm thử, fixture và helper.

Nếu dự án đã có cấu trúc hợp lý, dùng cấu trúc hiện có thay vì tạo mới.

## Thành phần bắt buộc

- `playwright.config.ts`
- `package.json` với script test phù hợp.
- Thư mục Page Object.
- Thư mục test.
- Thư mục fixture nếu cần đăng nhập hoặc chuẩn bị dữ liệu.
- Thư mục tiện ích cho cấu hình và dữ liệu kiểm thử.
- File hướng dẫn chạy nếu người dùng yêu cầu tạo khung hoàn chỉnh.

## Cấu trúc khuyến nghị

```text
project-root/
  playwright.config.ts
  package.json
  .env.example
  .gitignore
  src/
    pages/
      base.page.ts
      login.page.ts
    fixtures/
      auth.fixture.ts
      base.fixture.ts
    utils/
      env.config.ts
      test-data.ts
      helpers.ts
    tests/
      auth/
        login.spec.ts
  test-data/
    users.json
```

## Nguyên tắc thiết kế

- Page Object chứa locator và hành động người dùng.
- Test chứa logic kiểm thử và assertion.
- Cấu hình môi trường không hardcode trong test.
- Dữ liệu nhạy cảm lấy từ biến môi trường hoặc cơ chế cấu hình của dự án.
- Không dùng sleep cố định.
- Có screenshot hoặc trace khi fail nếu dự án cần debug.

## Quy tắc Playwright

- Viewport debug là `1920x1080`.
- Local debug chạy headed.
- CI có thể chạy headless.
- Dùng bộ định vị ngữ nghĩa trước CSS hoặc XPath.
- Dùng assertion web-first của Playwright.

## Điều cấm

- Không tạo framework mới chồng lên cấu trúc hiện có.
- Không hardcode URL, tài khoản hoặc mật khẩu trong test.
- Không đặt bộ định vị trực tiếp trong file kiểm thử.
- Không tạo file lớn gom quá nhiều module.
- Không bàn giao code còn log debug hoặc code bị comment.

## Quy tắc liên quan

- `.agent-playwright-manual-testing/rules/automation_rules.md`
- `.agent-playwright-manual-testing/rules/locator_strategy.md`
- `.agent-playwright-manual-testing/rules/playwright_rules.md`
