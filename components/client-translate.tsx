"use client"

import parse from "html-react-parser"
import { Formats, useTranslations } from "next-intl"

interface Props {
    translationKey: string
    namespace?: string
    values?: Record<string, string | number | Date>
    formats?: Formats
    className?: string
    isParse?: boolean
}

export default function ClientTranslate({
    namespace,
    translationKey,
    values,
    formats,
    className,
    isParse,
}: Props) {
    const t = useTranslations(namespace)
    if (!translationKey) return ""
    return (
        <span className={className}>
            {isParse
                ? parse(t(translationKey, values, formats))
                : t(translationKey, values, formats)}
        </span>
    )
}
