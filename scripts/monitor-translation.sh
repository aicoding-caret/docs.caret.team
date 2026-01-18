#!/bin/bash

# 번역 진행상황 모니터링 스크립트

echo "=== 번역 진행상황 모니터링 ==="
echo "업데이트: 10초마다 자동 갱신 (Ctrl+C 종료)"
echo ""

while true; do
  clear
  echo "=== 번역 진행상황 모니터링 ($(date '+%Y-%m-%d %H:%M:%S')) ==="
  echo ""

  # 프랑스어 진행상황
  if [ -f /tmp/fr-translate.log ]; then
    echo "🇫🇷 프랑스어:"
    tail -1 /tmp/fr-translate.log | grep -E "Progress|Complete|Successful" || tail -3 /tmp/fr-translate.log
  fi
  echo ""

  # 독일어 진행상황
  if [ -f /tmp/de-translate.log ]; then
    echo "🇩🇪 독일어:"
    tail -1 /tmp/de-translate.log | grep -E "Progress|Complete|Successful" || tail -3 /tmp/de-translate.log
  fi
  echo ""

  # 러시아어 진행상황
  if [ -f /tmp/ru-translate.log ]; then
    echo "🇷🇺 러시아어:"
    tail -1 /tmp/ru-translate.log | grep -E "Progress|Complete|Successful" || tail -3 /tmp/ru-translate.log
  fi
  echo ""

  # 활성 프로세스 확인
  echo "활성 프로세스: $(ps aux | grep "translate-with-gemini.js" | grep -v grep | wc -l)개"
  echo ""

  sleep 10
done
