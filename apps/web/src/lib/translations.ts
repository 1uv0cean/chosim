export const translations = {
  ko: {
    common: {
      title: "초심",
      subtitle: "본래 의도를 성찰하는 공간",
      loading: "불러오는 중...",
      error: "오류가 발생했습니다",
      returnHome: "홈으로 돌아가기"
    },
    home: {
      beginReflection: "성찰 시작하기",
      viewPastReflections: "지난 성찰 보기"
    },
    journal: {
      question: "당신의 본래 의도는 무엇이었나요?",
      titlePlaceholder: "성찰에 제목을 지어주세요 (선택사항)",
      contentPlaceholder: "시간을 갖고 천천히 써보세요. 이 여정을 시작했을 때의 진정한 마음을 떠올려보세요...",
      lockPeriodTitle: "언제 이 성찰을 다시 보시겠어요?",
      lockPeriodDescription: "선택한 기간이 지나야 글을 다시 볼 수 있어서, 진정한 재발견의 경험을 할 수 있습니다.",
      lockPeriodOptions: {
        30: { label: "30일", description: "한 달간의 성찰" },
        100: { label: "100일", description: "계절 하나가 바뀌는 시간" },
        365: { label: "365일", description: "완전한 일 년의 변화" }
      },
      submitButton: "나의 성찰 잠그기",
      submitting: "저장 중...",
      characterCount: "{current}/{max} 글자"
    },
    entries: {
      title: "당신의 성찰들",
      noEntries: "아직 작성한 성찰이 없습니다.",
      entryCount: "{count}개의 성찰이 기록되었습니다",
      firstReflection: "첫 번째 성찰 작성하기",
      startJourney: "자기 성찰의 여정을 시작해보세요.",
      availableReflections: "볼 수 있는 성찰",
      lockedReflections: "잠긴 성찰",
      reflectionLocked: "성찰이 잠겨있습니다",
      lockedDescription: "이 성찰은 현재 잠겨있습니다.",
      unlocksIn: "{days}일 후에 잠금이 해제됩니다",
      unlocksOn: "{date}에 잠금 해제",
      writtenOn: "{date}에 작성됨",
      unlockedAfter: "{days}일 후 잠금 해제됨",
      failedToLoad: "성찰을 불러올 수 없습니다"
    }
  },
  en: {
    common: {
      title: "Chosim",
      subtitle: "A space for reflecting on your original intentions",
      loading: "Loading...",
      error: "An error occurred",
      returnHome: "Return Home"
    },
    home: {
      beginReflection: "Begin Reflection",
      viewPastReflections: "View Past Reflections"
    },
    journal: {
      question: "What was your original intention?",
      titlePlaceholder: "Give your reflection a title (optional)",
      contentPlaceholder: "Take your time. Write from your heart about what you originally intended when you began this journey...",
      lockPeriodTitle: "When should this reflection unlock?",
      lockPeriodDescription: "Your entry will remain hidden until the selected time passes, allowing for genuine rediscovery.",
      lockPeriodOptions: {
        30: { label: "30 days", description: "One month of reflection" },
        100: { label: "100 days", description: "A season of growth" },
        365: { label: "365 days", description: "A full year of change" }
      },
      submitButton: "Lock Away My Reflection",
      submitting: "Saving...",
      characterCount: "{current}/{max} characters"
    },
    entries: {
      title: "Your Reflections",
      noEntries: "You haven't written any reflections yet.",
      entryCount: "{count} reflection{s} recorded",
      firstReflection: "Write Your First Reflection",
      startJourney: "Start your journey of self-reflection.",
      availableReflections: "Available Reflections",
      lockedReflections: "Locked Reflections",
      reflectionLocked: "Reflection Locked",
      lockedDescription: "This reflection is currently locked away.",
      unlocksIn: "It will unlock in {days} day{s}",
      unlocksOn: "on {date}",
      writtenOn: "Written on {date}",
      unlockedAfter: "Unlocked after {days} days",
      failedToLoad: "Failed to load entries"
    }
  },
  ja: {
    common: {
      title: "初心",
      subtitle: "本来の意図を振り返るための空間",
      loading: "読み込み中...",
      error: "エラーが発生しました",
      returnHome: "ホームに戻る"
    },
    home: {
      beginReflection: "振り返りを始める",
      viewPastReflections: "過去の振り返りを見る"
    },
    journal: {
      question: "あなたの本来の意図は何でしたか？",
      titlePlaceholder: "振り返りにタイトルをつけてください（任意）",
      contentPlaceholder: "時間をかけて、心から書いてください。この旅を始めたときの本来の意図について...",
      lockPeriodTitle: "この振り返りはいつロック解除しますか？",
      lockPeriodDescription: "選択した期間が過ぎるまでエントリーは非表示になり、真の再発見を可能にします。",
      lockPeriodOptions: {
        30: { label: "30日", description: "一ヶ月間の振り返り" },
        100: { label: "100日", description: "成長の季節" },
        365: { label: "365日", description: "完全な一年間の変化" }
      },
      submitButton: "私の振り返りをロックする",
      submitting: "保存中...",
      characterCount: "{current}/{max} 文字"
    },
    entries: {
      title: "あなたの振り返り",
      noEntries: "まだ振り返りを書いていません。",
      entryCount: "{count}個の振り返りが記録されています",
      firstReflection: "最初の振り返りを書く",
      startJourney: "自己振り返りの旅を始めましょう。",
      availableReflections: "利用可能な振り返り",
      lockedReflections: "ロックされた振り返り",
      reflectionLocked: "振り返りがロックされています",
      lockedDescription: "この振り返りは現在ロックされています。",
      unlocksIn: "{days}日後にロック解除されます",
      unlocksOn: "{date}にロック解除",
      writtenOn: "{date}に書かれました",
      unlockedAfter: "{days}日後にロック解除",
      failedToLoad: "エントリーの読み込みに失敗しました"
    }
  }
} as const;

export type Locale = keyof typeof translations;

export function t(locale: Locale, key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    return key; // fallback to key if translation not found
  }
  
  if (params) {
    return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
      return str.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
    }, value);
  }
  
  return value;
}