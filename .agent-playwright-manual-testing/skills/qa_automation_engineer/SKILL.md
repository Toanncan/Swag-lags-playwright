---
name: qa_automation_engineer
description: Kỹ năng hướng dẫn agent tạo, kiểm tra và bàn giao tự động hóa kiểm thử giao diện web bằng Playwright.
---

# Kỹ Năng Kỹ Sư Tự Động Hóa Kiểm Thử

## Mục tiêu

Kỹ năng này dùng cho các tác vụ tự động hóa kiểm thử với Playwright, đặc biệt là chuyển ca kiểm thử thủ công thành mã kiểm thử có Page Object, dữ liệu kiểm thử, assertion, chạy thử và tự sửa lỗi.

## Khi sử dụng

- Người dùng yêu cầu tạo kịch bản tự động hóa từ ca kiểm thử thủ công.
- Người dùng yêu cầu viết test Playwright.
- Người dùng cần Page Object, fixture, dữ liệu kiểm thử hoặc cấu trúc test.
- Người dùng cần kiểm tra bộ định vị và chạy thử kịch bản.

Nếu người dùng chỉ yêu cầu sinh ca kiểm thử thủ công, chuyển sang kỹ năng `rbt_manual_testing`.
Nếu người dùng chỉ yêu cầu phân tích tài liệu yêu cầu, chuyển sang kỹ năng `requirements_analyzer`.

## Quy trình định tuyến

| Nhu cầu | Quy trình |
|---|---|
| Phân tích tài liệu yêu cầu | `.agent-playwright-manual-testing/workflows/analyze_requirement_document.md` |
| Sinh ca kiểm thử thủ công đầy đủ | `.agent-playwright-manual-testing/workflows/generate_manual_testcases_rbt.md` |
| Sinh tự động hóa Playwright từ ca kiểm thử | `.agent-playwright-manual-testing/workflows/generate_automation_from_testcases.md` |

## Ngăn xếp mặc định

- Công cụ: Playwright.
- Ngôn ngữ ưu tiên: TypeScript nếu dự án chưa có lựa chọn khác.
- Mô hình: Page Object Model.
- Runner: Playwright Test.
- Báo cáo: Playwright HTML report hoặc báo cáo hiện có của dự án.

## Quy tắc bắt buộc

- Đọc file tham khảo trong `references` nếu có trước khi tạo mã:
  - `.agent-playwright-manual-testing/skills/qa_automation_engineer/references/PROJECT_CONTEXT.md`
  - `.agent-playwright-manual-testing/skills/qa_automation_engineer/references/TEST_STRATEGY.md`
  - `.agent-playwright-manual-testing/skills/qa_automation_engineer/references/PROMPT_TEMPLATES.md`
- Tuân thủ các rule:
  - `.agent-playwright-manual-testing/rules/automation_rules.md`
  - `.agent-playwright-manual-testing/rules/locator_strategy.md`
  - `.agent-playwright-manual-testing/rules/playwright_rules.md`
- Không đoán bộ định vị.
- Không hardcode dữ liệu nhạy cảm.
- Không dùng sleep cố định.
- Không bàn giao code còn log debug, import thừa hoặc code bị comment.

## Cách tạo tự động hóa từ ca kiểm thử

1. Đọc ca kiểm thử thủ công.
2. Trích xuất hành vi, dữ liệu, kết quả mong đợi và điều kiện tiên quyết.
3. Khảo sát giao diện thật bằng Playwright MCP.
4. Thu thập và xác minh bộ định vị.
5. Thiết kế Page Object.
6. Sinh dữ liệu kiểm thử cần thiết.
7. Tạo file test Playwright.
8. Chạy test ở chế độ headed.
9. Tự sửa lỗi tối đa 5 vòng nếu lỗi thuộc kỹ thuật.
10. Chạy xác nhận độ ổn định nếu môi trường cho phép.
11. Dọn dẹp và báo cáo.

## Cấu trúc mã mong muốn

```text
src/
  pages/
    base.page.ts
    login.page.ts
  tests/
    login.spec.ts
  utils/
    test-data.ts
```

Nếu dự án đã có cấu trúc khác, dùng cấu trúc hiện có.

## Quy tắc Page Object

- Mỗi trang chính có một Page class.
- Bộ định vị khai báo ở đầu class.
- Method mô tả hành vi người dùng, không mô tả thao tác DOM nhỏ lẻ nếu không cần.
- Test gọi method của Page Object và tự giữ assertion ở file test.

## Quy tắc assertion

- Mỗi test có ít nhất một assertion.
- Assertion phải kiểm tra kết quả người dùng nhìn thấy hoặc trạng thái hệ thống quan trọng.
- Message hoặc tên test phải đủ rõ để debug khi fail.

## Tự sửa lỗi

Khi test fail:

1. Đọc log.
2. Xác định bước lỗi.
3. Kiểm tra DOM hoặc mã tương ứng.
4. Sửa nguyên nhân nhỏ nhất.
5. Chạy lại.
6. Ghi vòng sửa vào `task.md`.

Chỉ hỏi người dùng khi:

- Kỳ vọng trong ca kiểm thử mâu thuẫn với hành vi ứng dụng.
- Ứng dụng không truy cập được.
- Cần thông tin đăng nhập, OTP, CAPTCHA hoặc quyền truy cập.
- Đã hết 5 vòng tự sửa.

## Kết quả đầu ra

- Danh sách file đã tạo hoặc sửa.
- Page Object.
- File test Playwright.
- Dữ liệu kiểm thử hoặc helper nếu có.
- Bảng bộ định vị đã xác minh.
- Kết quả chạy test và ghi chú còn lại.
