//don't know 
"use client"

import * as React from "react"

import { fetchSession, type SessionUser } from "@/lib/auth-client"
import { useAuthModal } from "@/providers/auth-modal-context"

type SessionStatus = "loading" | "authenticated" | "unauthenticated"

interface SessionContextValue {
    status: SessionStatus
    user: SessionUser | null
    refresh: () => Promise<void>
    /**
     * Gate an action behind login. If the user is already authenticated,
     * `action` runs immediately. Otherwise the login modal opens instead.
     *
     *   <Button onClick={() => requireAuth(() => bookRoom(roomId))}>
     *     Book now
     *   </Button>
     */
    requireAuth: (action: () => void) => void
}

const SessionContext = React.createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = React.useState<SessionStatus>("loading")
    const [user, setUser] = React.useState<SessionUser | null>(null)
    const { openLogin } = useAuthModal()

    const refresh = React.useCallback(async () => {
        setStatus("loading")
        const result = await fetchSession()
        setUser(result.user)
        setStatus(result.authenticated ? "authenticated" : "unauthenticated")
    }, [])

    React.useEffect(() => {
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refresh()
    }, [refresh])

    const requireAuth = React.useCallback(
        (action: () => void) => {
            if (status === "authenticated") {
                action()
            } else {
                openLogin()
            }
        },
        [status, openLogin]
    )

    const value = React.useMemo<SessionContextValue>(
        () => ({ status, user, refresh, requireAuth }),
        [status, user, refresh, requireAuth]
    )

    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    )
}

export function useSession() {
    const ctx = React.useContext(SessionContext)
    if (!ctx) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return ctx
}