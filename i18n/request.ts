import { LANGUAGE_KEY } from "@/constants"
import { languages } from "@/constants/options"
import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
    const cookieStore = await cookies()
    const locale = cookieStore.get(LANGUAGE_KEY)?.value || languages[0].value

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    }
})
