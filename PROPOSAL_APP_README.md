# 💍 Ứng Dụng Cầu Hôn Lãng Mạn - Proposal App

Một ứng dụng ReactJS tuyệt đẹp để cầu hôn người yêu với hiệu ứng trực quan ấn tượng.

## ✨ Tính Năng

- **Glassmorphism Design**: Giao diện hiện đại với gradient hồng nhạt và trắng
- **Hero Section**: Câu chào lãng mạn và ảnh kỷ niệm
- **Counter Section**: Bộ đếm số ngày yêu nhau cập nhật realtime
- **Interactive Question**: Câu hỏi cầu hôn với hiệu ứng tương tác
  - Nút "Đồng ý" sáng bóng và hiệu ứng lấp lánh
  - Nút "Không" sẽ nhảy sang vị trí ngẫu nhiên khi di chuột
- **Confetti Effect**: Bắn pháo hoa giấy toàn màn hình khi nhấn "Đồng ý"
- **Smooth Animations**: Sử dụng Framer Motion cho các hiệu ứng mượt mà

## 🛠️ Công Nghệ

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Canvas Confetti** - Hiệu ứng pháo hoa
- **Lucide React** - Icons

## 🚀 Cài Đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm start

# Build cho production
npm build
```

## ⚙️ Tùy Chỉnh

### 1. Thay Đổi Ngày Bắt Đầu Mối Quan Hệ

Mở file `src/App.tsx` và sửa dòng:

```typescript
const relationshipStartDate = new Date("2022-06-15");
```

Thay '2022-06-15' bằng ngày bạn bắt đầu yêu nhau.

### 2. Thêm Ảnh Kỷ Niệm

Sửa component `Hero` trong `src/components/Hero.tsx`:

```typescript
<Hero memoryImage={require('./path-to-your-image.jpg')} />
```

Hoặc để mặc định, component sẽ hiển thị một emoji 💑

### 3. Tùy Chỉnh Lời Thoại

Bạn có thể chỉnh sửa các đoạn text trong:

- `src/components/Hero.tsx` - Hero section
- `src/components/Counter.tsx` - Counter section
- `src/components/Question.tsx` - Question section

### 4. Thay Đổi Màu Sắc

Sửa file `tailwind.config.js` hoặc sử dụng các class Tailwind:

- `from-pink-100` → `from-blue-100`
- `to-rose-100` → `to-purple-100`

## 📱 Cấu Trúc Thư Mục

```
src/
├── components/
│   ├── Hero.tsx          # Hero section
│   ├── Counter.tsx       # Counter section (ngày yêu nhau)
│   ├── Question.tsx      # Question section (câu hỏi cầu hôn)
│   └── index.ts          # Export components
├── types/
│   └── canvas-confetti.d.ts  # Type definitions
├── App.tsx               # Main app component
├── App.css              # Tailwind CSS
├── index.css            # Global styles
└── index.tsx            # Entry point
```

## 🎨 Điểm Nổi Bật

### Hero Section

- Heading động với hiệu ứng scale
- Ảnh kỷ niệm với glow effect Glassmorphism

### Counter Section

- Hiển thị số ngày, giờ, phút, giây
- Cập nhật realtime mỗi giây
- Hiệu ứng hover scale trên mỗi card

### Question Section

- Nút "Đồng ý" với hiệu ứng lấp lánh
- Nút "Không" nhảy sang vị trí ngẫu nhiên
- Hiệu ứng pháo hoa từ nhiều hướng
- Thông báo ngọt ngào sau khi nhấn "Đồng ý"

## 🎯 Tips

1. **Thêm nhạc nền**: Sử dụng HTML5 audio element
2. **Tùy chỉnh pháo hoa**: Sửa `particleCount` và `spread` trong `Question.tsx`
3. **Responsive**: Ứng dụng đã tối ưu cho mobile và desktop
4. **Performance**: Sử dụng React.memo() nếu có các component nặng

## 💝 Lưu Ý

- Thay đổi ngày bắt đầu mối quan hệ để bộ đếm chính xác
- Kiểm thử trên các trình duyệt khác nhau
- Đảm bảo cho phép canvas cho audio autoplay nếu thêm nhạc

## 📦 Deployment

Có thể deploy lên:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

```bash
npm run build
# Sau đó upload thư mục `build/` lên host
```

---

**Chúc bạn cầu hôn thành công! 💍❤️**
