# KHParts Shopify 主题部署指南

## 一、上传主题（3 分钟）

1. 登录 [Shopify 后台](https://admin.shopify.com)（需要先注册一个 Shopify 店铺，月费 $39 起步，14 天免费试用）；
2. 进入 **Online Store（在线商店）→ Themes（主题）**；
3. 点击右上角 **Add theme（添加主题）→ Upload zip file（上传 zip 文件）**；
4. 选择本目录下的 **`KHParts-theme-v1.zip`**；
5. 上传完成后，点击主题右侧的 **"..." → Publish（发布）**。

> 注意：Shopify 会先校验主题，如果报错会列出具体文件。正常上传时，主题会出现在列表里，先预览再发布更稳妥。

## 二、基础设置（后台操作）

### 1. 品牌信息

进入 **Online Store → Themes → Customize（自定义）**：

- **Brand（品牌）**：修改品牌名、标语、主色（蓝色 `#0b4a8b`）、强调色（橙色 `#f15a24`）、上传 Logo；
- **Social links（社媒链接）**：填入你的 YouTube / TikTok / Instagram / Facebook / Telegram / WhatsApp 链接（WhatsApp 格式：`https://wa.me/你的号码`）。

### 2. 菜单

进入 **Online Store → Navigation（导航）**：

- 创建 **Main menu（主菜单）**：建议结构：Home（首页）、Shop parts（全部商品）、Tucson/Sportage、Elantra/Forte、Santa Fe/Sorento、Workshop（视频页）、Contact（联系页）；
- 创建 **Footer menu（页脚菜单）**：Shop by vehicle + Help 两组链接。

### 3. 商品与集合

- 创建集合：`Tucson Sportage`、`Elantra Forte`、`Santa Fe Sorento`、`Bestsellers`（按车型或品类分组）；
- 首页"Bestsellers"区块在 **Customize → Featured products** 里选择对应集合；
- 商品详情建议至少上传 3–5 张图：主图、安装图、与 OEM 对比图、装车图（视频内容截图也行）；
- 每个商品填写 SKU、OEM 件号（放描述里）、适配车型（放描述里）。

### 4. 关键页面

- **Contact（联系页）**：创建页面，模板选 `page.contact`，即可显示联系表单 + WhatsApp/Telegram 入口；
- **Shipping & Returns**、**Fitment guide**、**Wholesale**：创建普通页面，模板 `page`，用富文本写内容；
- **Workshop（视频页）**：可用首页的 Video gallery 区块单独做一页，或先链接到 YouTube 频道。

## 三、收款与物流

- **收款**：Shopify Payments（美国主体最顺），或 PayPal + 信用卡网关；
- **美国市场物流**：Shopify Shipping 接入 USPS/UPS/FedEx，或绑定 3PL 海外仓（ShipBob、ShipMonk 等）；
- **免税/合规**：美国销售需在后台设置销售税；跨境主体建议注册美国公司或使用 Shopify 合作服务商。

## 四、与社媒打通

- **TikTok**：后台安装 TikTok 官方 App（TikTok Shop / 购物车直链），主页挂店铺链接；
- **YouTube**：视频描述挂独立站链接 + 评论区置顶链接；
- **Instagram/Facebook**：绑定 Shopify 后可直接在帖子/快拍里挂商品链接；
- **WhatsApp/Telegram**：把号码放进 Theme Settings 的 Social links，全站自动显示联系按钮。

## 五、验证清单（发布前过一遍）

- [ ] 首页各区块按预期显示（Hero、适配查询、产品墙、视频、社媒、订阅）
- [ ] 移动端菜单和购物车抽屉正常
- [ ] 商品页可选规格、加购、价格联动正常
- [ ] 车型适配查询表单有反馈提示
- [ ] 社媒链接全部可点、目标正确
- [ ] 页脚免责声明保留（Hyundai/Kia 商标归属声明，避免侵权投诉）
- [ ] 联系表单能收到测试邮件

## 六、后续迭代建议

- 接入 **Klaviyo**：邮件复购（按里程推保养件）；
- 接入 **ReConvert / PostPurchase**：售后加购；
- 接入 **Judge.me**：买家秀和视频评论（对汽配信任感极重要）；
- 接入 **OEM 适配 App**（如 PartsFit / Fitment）做更专业的车型适配查询；
- 独立站上线后，社媒流量统一用 UTM 追踪：`?utm_source=tiktok&utm_medium=profile`
