# 语言切换素材处理记录

页面以同一组 HTML 文本节点切换中英文。图片只承载无字视觉，取消仅中文显示的白色遮盖块。XATOM、AI 模型名称等专有名称保留。

## 无字底图

现有功能卡片采用 `assets/simple-use/slide-1-clean.png` 至 `slide-4-clean.png`。Banner 采用 Figma 原始场景图片 `assets/hero/scene-1.png`、`scene-3.png` 至 `scene-5.png`，文字重建为 HTML。

以下两张图片使用内置 imagegen 编辑，均已存入本项目；原图保留。

- `assets/hero/scene-2-neutral.png`
- `assets/how/figma/mcp-ordering-neutral.png`

## 最终编辑提示词

### Banner 标签

Use case: text-localization. Edit target: the supplied product banner image. Remove ONLY the eight English words inside colored small badges: Meeting, Taxi, Emergency, Stocks, Delivery, Travel, Chat, Care. Leave those text areas empty with the matching existing badge color. Preserve all eight white pictogram icons on the left of the badges. Preserve badge shapes, gradients, transparency, positions, angles and sizes exactly. Preserve every product, holes, USB ports, device edges, colors, shadows, lighting, peach background, image framing and composition unchanged. Do not add any text, logos, or objects. Output the same full landscape image, original aspect ratio. This is a minimal precise text removal so the website can render real localizable HTML text in the empty badge areas.

### MCP 订餐流程

Use case: text-localization. Edit target: the supplied vertical restaurant-order workflow illustration with transparent background. Remove ALL text characters from the artwork, leaving every diagram shape and illustration in exactly the same location and size. Text to erase: XATOM, help me order Doco.; Recognized Order Request; Restaurant: Doco; Items: Burger + Fries + Cola; Quantity: 1 set; MAP; External Service Connection; Burger x1; Fries x1; Cola x1; Total $12; Confirm Order; Order submitted. The restaurant is now processing it...; Doco—your order has been placed. Estimated arrival: 25 minutes. Leave blank the speech bubbles, receipt, cloud caption areas, phone rows and yellow button where the text was. Preserve food icons, cutlery symbols, paper plane icon, document icon, woman, cube renderings, arrows, dots, outlines, cloud, phone, restaurant and all colored surfaces unchanged. Preserve original transparency. No added text. Minimal exact text removal, same composition and aspect ratio; this neutral artwork will get real HTML labels that change language.
