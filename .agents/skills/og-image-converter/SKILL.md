---
name: og-image-converter
description: Convert OG tag images to WebP format with 1200x630 resize. Use when adding new language OG images.
---

# OG Image Converter

이미지를 OG 태그 표준 형식(1200x630 WebP)으로 변환합니다.

## 사용법

```bash
# 스킬 디렉토리로 이동
cd .agents/skills/og-image-converter

# 의존성 설치 (최초 1회)
npm install

# 변환 실행
node convert.js <input-image> <output-webp>

# 예시: 프랑스어 이미지 변환
node convert.js /path/to/source.jpg ../../../static/og/ogtag-fr.webp
```

## 일괄 변환

```bash
# static/og 폴더의 모든 JPEG/PNG를 WebP로 변환
node convert.js --batch ../../../static/og
```

## 스펙
- 출력 크기: 1200 x 630 px
- 형식: WebP
- 품질: 85%
