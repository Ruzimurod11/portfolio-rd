export interface IExperience {
    company: string
    role: string
    /** free-form period, e.g. "2024 — hozir" */
    period: string
    /** key in messages/*.json */
    descriptionKey: string
}

/**
 * TODO: to'ldiring. Bo'sh bo'lsa `/about` sahifasida tajriba bo'limi umuman
 * ko'rsatilmaydi — o'ylab topilgan ish joyi yozilmaydi.
 *
 * Har bir yozuv uchun `descriptionKey` ni uchala `messages/*.json` fayliga ham
 * qo'shish kerak, aks holda `tests/i18n.test.ts` qizil bo'ladi.
 */
export const experience: IExperience[] = []
