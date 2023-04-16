import { useEffect, useState } from "react"

const useTheme = () => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        if (theme === "light") {
            document.body.classList.remove("dark")
        } else {
            document.body.classList.add("dark")
        }
    })

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return {
        theme,
        toggleTheme
    }
}

export default useTheme;